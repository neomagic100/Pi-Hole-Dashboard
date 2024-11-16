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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

