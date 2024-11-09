import json

TYPE_FIELD = "type"
DATA_FIELD = "data"

class DataPacket:
   def __init__(self, jsonMsg: bytearray):
      msg = json.loads(jsonMsg)
      if not jsonMsg:
         return None
      self.dataType = msg.get(TYPE_FIELD)
      self.data = msg.get(DATA_FIELD)
   
   def __str__(self):
      return f"({self.dataType}) {self.data}"