USE pihole;

CREATE TABLE IF NOT EXISTS `query_log` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `queryTime` datetime NOT NULL,
   `queryType` varchar(5) NOT NULL,
   `domain` varchar(255) NOT NULL,
   `handledBy` varchar(10) NOT NULL,
   `originClient` varchar(255) NOT NULL,
   `status` varchar(50) NOT NULL,
   `action` varchar(20) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `disabled_timer` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `time` datetime NOT NULL,
   `disableMinutes` int(4) NOT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Enable the event scheduler if it is not already enabled
SET GLOBAL event_scheduler = ON;

-- Create an event to delete rows where queryTime is more than 48 hours old
CREATE EVENT IF NOT EXISTS delete_old_queries
ON SCHEDULE EVERY 1 HOUR
DO
  DELETE FROM query_log
  WHERE queryTime < NOW() - INTERVAL 48 HOUR;

-- Create an event to delete rows where time is less than or equal to the current time
CREATE EVENT IF NOT EXISTS delete_expired_timers
ON SCHEDULE EVERY 1 HOUR
DO
  DELETE FROM disabled_timer
  WHERE time <= NOW();
