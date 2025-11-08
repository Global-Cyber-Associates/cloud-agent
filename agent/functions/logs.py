import wmi
from datetime import datetime
from functions.sender import send_data
import threading
import time

def send_log(event_type, username=None):
    payload = {
        "type": "user_event",
        "event": event_type,
        "timestamp": datetime.now().isoformat(),
        "username": username,
    }
    send_data("system_logs", payload)
    print(f"📤 Log sent: {payload}")

def watch_user_events():
    c = wmi.WMI()
    watcher = c.Win32_NTLogEvent.watch_for(
        notification_type="Creation",
        EventCode=["4624", "4634", "4800", "4801"]
    )

    while True:
        try:
            event = watcher()
            username = event.InsertionStrings[5] if event.InsertionStrings else None
            if event.EventCode == "4624":
                send_log("login", username)
            elif event.EventCode == "4634":
                send_log("logout", username)
            elif event.EventCode == "4800":
                send_log("lock", username)
            elif event.EventCode == "4801":
                send_log("unlock", username)
        except Exception as e:
            print(f"[❌] Log watcher error: {e}")
            time.sleep(1)

def start_logs_thread():
    t = threading.Thread(target=watch_user_events, daemon=True)
    t.start()
