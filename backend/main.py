# main.py
import websockets
import asyncio
from DataPacket import DataPacket

WEBSOCKET_PORT = 8009

async def handler(websocket, path):
    print(f"New connection from {websocket.remote_address}")
    
    # Send a message to the client
    await websocket.send("Hello, Client!")
    
    # Receive a message from the client
    message = await websocket.recv()
    print(f"Received message: {message}")
    
    # Respond to the client
    await websocket.send(f"Echo: {message}")

async def main():
    # Start the WebSocket server on a specific address and port
    server = await websockets.serve(handler, "localhost", WEBSOCKET_PORT)
    print(f"WebSocket server started on ws://localhost:{WEBSOCKET_PORT}")
    
    # Run the server indefinitely
    await asyncio.Future()  # Run forever
    
asyncio.run(main())
