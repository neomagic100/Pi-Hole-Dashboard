import asyncio
import websockets

async def connect():
    async with websockets.connect("ws://localhost:8009") as websocket:
        # Send a message to the server
        await websocket.send("Hello, Server!")
        
        # Receive the server's response
        response = await websocket.recv()
        print(f"Server says: {response}")

# Connect to the WebSocket server
asyncio.run(connect())
