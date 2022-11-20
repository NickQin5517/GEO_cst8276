--   host: 'localhost',
--   user: 'DBcst8276', // grant with DBA permission
--   password: '8276', //
--   database: 'cst8276',
-- 	 Google API key: AIzaSyB1LFq0u9p4JGn15wdpnBPpzS3F3gjdrNM

CREATE DATABASE `cst8276` ;
CREATE TABLE `polyline` (
  `id` int NOT NULL AUTO_INCREMENT,
  `polyline_name` varchar(255) DEFAULT NULL,
  `start_point_address` varchar(255) DEFAULT NULL,
  `start_lat` varchar(255) DEFAULT NULL,
  `start_lng` varchar(255) DEFAULT NULL,
  `end_point_address` varchar(255) DEFAULT NULL,
  `end_point_lat` varchar(255) DEFAULT NULL,
  `end_point_lng` varchar(255) DEFAULT NULL,
  `polyline_route` json DEFAULT NULL,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- TEST RAW DATA, insert into the polyline table
-- '10', 'Route: algonquin college to Britannia Beach, Ottawa, ON', 'algonquin college', '45.3499278', '-75.7549368', 'Britannia Beach, Ottawa, ON', '45.3653197', '-75.8014626', '[{\"lat\": 45.3470145, \"lng\": -75.7592736}, {\"lat\": 45.346976, \"lng\": -75.7594166}, {\"lat\": 45.3691626, \"lng\": -75.77273389999999}, {\"lat\": 45.36041849999999, \"lng\": -75.7932063}, {\"lat\": 45.366926, \"lng\": -75.79761700000002}, {\"lat\": 45.366143, \"lng\": -75.8001139}]', '2022-11-18 16:05:22'

