import json
import re

TYPE_FIELD = "type"
DATA_FIELD = "data"
TYPE_FETCH = "fetchData"
TYPE_LOG   = "getLogs"
TYPE_COMMAND = "command"
TYPE_TIMER = "timerStart"
NO_VALUE = "None"
FLOAT_REGEX = r'^-?\d+\.\d+$'

class DATA_KEYS:
   PI1 = "pi1"
   PI2 = "pi2"
   DOMAINS_BEING_BLOCKED = "domains_being_blocked"
   DNS_QUERIES_TODAY = "dns_queries_today"
   ADS_BLOCKED_TODAY = "ads_blocked_today"
   ADS_PERCENTAGE_TODAY = "ads_percentage_today"
   STATUS = "status"
   GRAVITY_LAST_UPDATED = "gravity_last_updated"
   TIMER_KEY = "ntpTime"

class DataPacket:
   def __init__(self, jsonMsg: bytearray):
      msg = json.loads(jsonMsg)
      if not jsonMsg:
         return None
      self.dataType = msg.get(TYPE_FIELD)
      self.rawData = msg.get(DATA_FIELD)
      self.data = None
      self.parseData()
      
   def parseData(self):
      if self.dataType == TYPE_FETCH:
         self.parseFetchData()
      elif self.dataType == TYPE_LOG:
         self.parseLogData()
      elif self.dataType ==  TYPE_TIMER:
         self.parseTimer()
      elif self.dataType == TYPE_COMMAND:
         return
      else:
         print("Unknown Type")
         
   def parseTimer(self):
      msg = self.rawData
      if not msg:
         return
      self.data = msg if isinstance(msg, int) else int(msg)
      self.data += 3000
      
   def parseLogData(self):
      msg = self.rawData
      if not msg or (msg and len(msg) == 0):
         return
      for nestedList in msg:
         if len(nestedList) == 0:
            continue
         for index, item in enumerate(nestedList):
            if "N/A" in item: # Fix weird #0
               nestedList[index] = "N/A"
            nestedList[index] = DataPacket.typeConvertData(item)
            
      self.data = msg
      
   def parseFetchData(self):
      msg = self.rawData
      if msg and msg.get(DATA_KEYS.PI1) and msg.get(DATA_KEYS.PI2):
         pi1Dict = msg.get(DATA_KEYS.PI1)
         pi2Dict = msg.get(DATA_KEYS.PI2)
         self.data = {
            DATA_KEYS.PI1: self._parseFetchDict(pi1Dict),
            DATA_KEYS.PI2: self._parseFetchDict(pi2Dict)
         }
         
   def storeData(self):
      return
         
   def typeConvertData(value: str):
      value = value.strip()
      
      if value == "":
         return NO_VALUE
      
      if value.isnumeric():
         return int(value)
      
      floatAttempt = re.match(FLOAT_REGEX, value)
      if floatAttempt is not None:
         return float(value)
      
      return str(value)
   
   def _parseFetchDict(self, d : dict):
      keepValues = {
         DATA_KEYS.DOMAINS_BEING_BLOCKED : d.get(DATA_KEYS.DOMAINS_BEING_BLOCKED),
         DATA_KEYS.DNS_QUERIES_TODAY : d.get(DATA_KEYS.DNS_QUERIES_TODAY),
         DATA_KEYS.ADS_BLOCKED_TODAY : d.get(DATA_KEYS.ADS_BLOCKED_TODAY),
         DATA_KEYS.ADS_PERCENTAGE_TODAY : d.get(DATA_KEYS.ADS_PERCENTAGE_TODAY),
         DATA_KEYS.STATUS : d.get(DATA_KEYS.STATUS),
         DATA_KEYS.GRAVITY_LAST_UPDATED : d.get(DATA_KEYS.GRAVITY_LAST_UPDATED)
      }
      return keepValues
   
   def __str__(self):
      return f"({self.dataType}) {self.data}"
   