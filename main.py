# main.py

from fastapi import FastAPI

app = FastAPI()


@app.get("/ping")
def ping():
    return {"message": "pong"}


@app.get("/")
def greet():
    return {"message": "Hello World"}
