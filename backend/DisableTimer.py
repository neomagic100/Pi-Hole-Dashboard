import time
import asyncio

class DisableTimer:
   _timerInstance = None
   
   def __new__(cls, runUntilTime:int):
      if cls._timerInstance is None:
         cls._timerInstance = super(DisableTimer, cls).__new__(cls)
         cls._timerInstance.endTime = runUntilTime
         cls._timerInstance.timerFinished = False
      return cls._timerInstance
   
   # def __init__(self, runUntilTime: int):
   #    self.timerFinished = False
   #    self.endTime = runUntilTime
      
   def timerCallback(cls):
      cls._timerInstance.timerFinished = True
      
   async def startDisableTimer(cls, callback = None):
      print(f"Timer started {cls._timerInstance.endTime}")
      while time.time() < cls._timerInstance.endTime:
         await asyncio.sleep(1)
         
      print(f"Timer ended {cls._timerInstance.endTime}")
      cls._timerInstance.timerFinished = True
      if callback:
         callback()

# Singleton timer instance
# class Timer:
#    timerInstance = None
   
#    def __new__(cls, ntpTime: int):      
#       if cls.timerInstance is None:
#          cls.timerInstance = super(Timer, cls).__new__(cls)
#          cls.timerInstance.ntpTimeEnd = ntpTime
#       # else:
#       #    cls.timerInstance.ntpTimeEnd = ntpTime
         
#       return cls.timerInstance
   
#    async def startTimer(cls, callback=None):
#       print(f"Timer started {cls.timerInstance.ntpTimeEnd}")
#       while time.time() < cls.timerInstance.ntpTimeEnd:
#          await asyncio.sleep(1)
         
#       print(f"Timer ended {cls.timerInstance.ntpTimeEnd}")
      
#       if callback:
#          callback()
         