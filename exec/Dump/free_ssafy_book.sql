-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: k6e203.p.ssafy.io    Database: free_ssafy
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int unsigned NOT NULL AUTO_INCREMENT,
  `basket_id` int unsigned NOT NULL,
  `user_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `product_id` int unsigned NOT NULL,
  `store_user_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `book_price` int unsigned NOT NULL,
  `book_count` int unsigned NOT NULL,
  `book_date` date DEFAULT NULL,
  `book_hour` time DEFAULT NULL,
  `book_status` tinyint(1) DEFAULT NULL,
  `book_set` int DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  KEY `basket_id` (`basket_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  KEY `store_user_id` (`store_user_id`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`basket_id`) REFERENCES `basket` (`basket_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `book_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `basket` (`user_id`),
  CONSTRAINT `book_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `basket` (`product_id`),
  CONSTRAINT `book_ibfk_4` FOREIGN KEY (`store_user_id`) REFERENCES `basket` (`store_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (202,285,'Urkdrhkddms',466,'Srkdrhkddms',1790,1,'2022-05-27','17:30:00',1,1),(203,286,'Urkdrhkddms',466,'Srkdrhkddms',1790,1,'2022-05-25','17:30:00',1,2),(204,287,'Urkdrhkddms',235,'GS25',2874,1,'2022-05-20','18:30:00',1,3),(205,288,'Urkdrhkddms',260,'GS25',3870,1,'2022-05-20','18:30:00',1,3),(206,289,'Urkdrhkddms',298,'GS25',15700,1,'2022-05-20','18:30:00',1,3),(207,290,'Urkdrhkddms',265,'GS25',7495,1,'2022-05-25','18:00:00',1,4),(208,291,'Urkdrhkddms',290,'GS25',13489,1,'2022-05-25','18:00:00',1,4),(209,292,'Urkdrhkddms',277,'GS25',52939,1,'2022-05-25','18:00:00',1,4),(210,293,'Urkdrhkddms',243,'GS25',940,1,'2022-05-20','18:00:00',1,5),(211,294,'Urkdrhkddms',278,'ministop',2990,1,'2022-05-20','16:00:00',1,6),(212,295,'Urkdrhkddms',278,'ministop',23920,7,'2022-05-20','16:00:00',1,6),(213,296,'Urkdrhkddms',280,'ministop',32264,7,'2022-05-20','16:00:00',1,6),(214,297,'Urkdrhkddms',344,'ministop',29940,10,'2022-05-29','17:00:00',1,7),(215,298,'Urkdrhkddms',272,'GS25',90909,13,'2022-05-24','18:00:00',1,8),(216,299,'Urkdrhkddms',309,'ministop',16110,18,'2022-05-20','18:00:00',1,9),(217,300,'Urkdrhkddms',255,'GS25',156800,14,'2022-05-26','18:00:00',1,10),(218,301,'Urkdrhkddms',290,'GS25',5994,1,'2022-05-20','17:30:00',1,11),(219,302,'Urkdrhkddms',235,'GS25',8868,1,'2022-05-20','17:30:00',1,11),(220,303,'Urkdrhkddms',247,'GS25',1280,2,'2022-05-20','17:30:00',1,12),(221,304,'Urkdrhkddms',248,'GS25',6665,3,'2022-05-20','17:30:00',1,12),(222,305,'Urkdrhkddms',243,'GS25',8545,2,'2022-05-20','17:30:00',1,12),(223,307,'yoonji',469,'lotte',8000,1,'2022-05-19','17:30:00',1,13),(224,308,'yoonji',479,'lotte',18000,1,'2022-05-19','17:30:00',1,13),(225,309,'yoonji',491,'lotte',22800,1,'2022-05-19','17:30:00',1,13),(226,310,'kbjid17',465,'Srkdrhkddms',1790,1,'2022-05-20','21:00:00',0,14),(227,311,'kbjid17',469,'lotte',8000,1,'2022-05-25','19:00:00',1,15),(228,314,'yoonji',599,'lotte',1196,1,'2022-05-20','19:00:00',1,16),(229,315,'yoonji',589,'lotte',2990,1,'2022-05-19','19:30:00',1,17),(230,316,'yoonji',469,'lotte',10990,1,'2022-05-19','19:30:00',1,17),(231,317,'yoonji',590,'lotte',3245,1,'2022-05-19','20:00:00',1,18),(232,318,'yoonji',470,'lotte',10745,1,'2022-05-19','20:00:00',1,18),(233,319,'yoonji',590,'lotte',3245,1,'2022-05-20','20:00:00',1,19),(234,320,'yoonji',471,'lotte',11245,1,'2022-05-20','20:00:00',1,19),(235,321,'yoonji',471,'lotte',8000,1,'2022-05-19','15:30:00',1,20),(236,322,'yoonji',590,'lotte',3245,1,'2022-05-19','11:30:00',1,21),(237,323,'yoonji',469,'lotte',11245,1,'2022-05-19','11:30:00',1,21),(238,313,'kbjid17',466,'Srkdrhkddms',1790,1,'2022-05-25','11:30:00',0,22),(239,324,'kbjid17',465,'Srkdrhkddms',7160,3,'2022-05-25','11:30:00',0,22),(240,325,'kbjid17',517,'nonghyupmall',6000,1,'2022-05-22','11:30:00',1,23),(241,326,'kbjid17',518,'nonghyupmall',27600,3,'2022-05-22','11:30:00',1,23),(242,327,'kbjid17',519,'nonghyupmall',35100,1,'2022-05-22','11:30:00',1,23),(243,328,'kbjid17',519,'nonghyupmall',42600,1,'2022-05-22','11:30:00',1,23),(244,329,'yoonji',569,'topmart',2592,1,'2022-05-20','09:00:00',1,24),(245,330,'Urkdrhkddms',464,'Srkdrhkddms',1790,1,'2022-05-21','11:00:00',0,25),(246,331,'yoonji',590,'lotte',3245,1,'2022-05-20','09:00:00',1,26),(247,332,'yoonji',469,'lotte',11245,1,'2022-05-20','09:00:00',1,26),(248,333,'yoonji',589,'lotte',2990,1,'2022-05-20','10:00:00',0,27),(249,334,'yoonji',469,'lotte',10990,1,'2022-05-20','10:00:00',1,27),(250,339,'Urkdrhkddms',517,'nonghyupmall',6000,1,'2022-05-21','10:30:00',1,28),(251,340,'Urkdrhkddms',518,'nonghyupmall',13200,1,'2022-05-21','10:30:00',1,28),(252,337,'kbjid17',469,'lotte',8000,1,'2022-05-21','10:30:00',1,29),(253,338,'kbjid17',589,'lotte',10990,1,'2022-05-21','10:30:00',0,29),(254,342,'Urkdrhkddms',523,'nonghyupmall',5600,1,'2022-05-21','10:00:00',0,30),(255,343,'Urkdrhkddms',523,'nonghyupmall',5600,1,'2022-05-21','11:30:00',0,31),(256,344,'yoonji',590,'lotte',3245,1,'2022-05-20','09:30:00',1,32),(257,345,'yoonji',469,'lotte',11245,1,'2022-05-20','09:30:00',1,32),(258,346,'kbjid17',590,'lotte',3245,1,'2022-05-21','12:00:00',0,33);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20 11:45:41
