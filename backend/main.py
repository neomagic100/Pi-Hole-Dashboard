# main.py
import websockets
import asyncio
import websocket
import json
from DataPacket import DataPacket

WEBSOCKET_PORT = 8008

def on_open(ws):
    print("Connection opened from :8000")
    
def on_message(ws, message):
    data_packet = DataPacket(message)
    print(data_packet)

if __name__ == "__main__":
    ws = websocket.WebSocketApp("ws://localhost:" + str(WEBSOCKET_PORT))
    ws.on_open = on_open
    ws.on_message = on_message
    ws.run_forever()
    