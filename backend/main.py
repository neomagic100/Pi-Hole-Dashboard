# main.py
import websocket
from DataPacket import DataPacket

WEBSOCKET_PORT = 8008

def on_open(ws):
    print("Connection opened from :8000")
    
def on_message(ws, message):
    data_packet = DataPacket(message)
    data_packet.storeData()
    
ws = websocket.WebSocketApp("ws://websocket:" + str(WEBSOCKET_PORT))
ws.on_open = on_open
ws.on_message = on_message
ws.run_forever()
