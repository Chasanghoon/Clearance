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
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basket` (
  `basket_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `product_id` int unsigned NOT NULL,
  `store_user_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `basket_count` int unsigned NOT NULL,
  `basket_bookcheck` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`basket_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  KEY `store_user_id` (`store_user_id`),
  CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `basket_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `basket_ibfk_3` FOREIGN KEY (`store_user_id`) REFERENCES `product` (`store_user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=347 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
INSERT INTO `basket` VALUES (285,'Urkdrhkddms',466,'Srkdrhkddms',1,1),(286,'Urkdrhkddms',466,'Srkdrhkddms',1,1),(287,'Urkdrhkddms',235,'GS25',1,1),(288,'Urkdrhkddms',260,'GS25',1,1),(289,'Urkdrhkddms',298,'GS25',1,1),(290,'Urkdrhkddms',265,'GS25',1,1),(291,'Urkdrhkddms',290,'GS25',1,1),(292,'Urkdrhkddms',277,'GS25',1,1),(293,'Urkdrhkddms',243,'GS25',1,1),(294,'Urkdrhkddms',278,'ministop',1,1),(295,'Urkdrhkddms',278,'ministop',7,1),(296,'Urkdrhkddms',280,'ministop',7,1),(297,'Urkdrhkddms',344,'ministop',10,1),(298,'Urkdrhkddms',272,'GS25',13,1),(299,'Urkdrhkddms',309,'ministop',18,1),(300,'Urkdrhkddms',255,'GS25',14,1),(301,'Urkdrhkddms',290,'GS25',1,1),(302,'Urkdrhkddms',235,'GS25',1,1),(303,'Urkdrhkddms',247,'GS25',2,1),(304,'Urkdrhkddms',248,'GS25',3,1),(305,'Urkdrhkddms',243,'GS25',2,1),(310,'kbjid17',465,'Srkdrhkddms',1,1),(311,'kbjid17',469,'lotte',1,1),(313,'kbjid17',466,'Srkdrhkddms',1,1),(314,'yoonji',599,'lotte',1,1),(315,'yoonji',589,'lotte',1,1),(316,'yoonji',469,'lotte',1,1),(317,'yoonji',590,'lotte',1,1),(318,'yoonji',470,'lotte',1,1),(319,'yoonji',590,'lotte',1,1),(320,'yoonji',471,'lotte',1,1),(321,'yoonji',471,'lotte',1,1),(322,'yoonji',590,'lotte',1,1),(323,'yoonji',469,'lotte',1,1),(324,'kbjid17',465,'Srkdrhkddms',3,1),(325,'kbjid17',517,'nonghyupmall',1,1),(326,'kbjid17',518,'nonghyupmall',3,1),(327,'kbjid17',519,'nonghyupmall',1,1),(328,'kbjid17',519,'nonghyupmall',1,1),(329,'yoonji',569,'topmart',1,1),(330,'Urkdrhkddms',464,'Srkdrhkddms',1,1),(331,'yoonji',590,'lotte',1,1),(332,'yoonji',469,'lotte',1,1),(333,'yoonji',589,'lotte',1,1),(334,'yoonji',469,'lotte',1,1),(337,'kbjid17',469,'lotte',1,1),(338,'kbjid17',589,'lotte',1,1),(339,'Urkdrhkddms',517,'nonghyupmall',1,1),(340,'Urkdrhkddms',518,'nonghyupmall',1,1),(342,'Urkdrhkddms',523,'nonghyupmall',1,1),(343,'Urkdrhkddms',523,'nonghyupmall',1,1),(344,'yoonji',590,'lotte',1,1),(345,'yoonji',469,'lotte',1,1),(346,'kbjid17',590,'lotte',1,1);
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20 11:45:40
