-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: mybbs
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `ndboard`
--

DROP TABLE IF EXISTS `ndboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ndboard` (
  `num` int NOT NULL AUTO_INCREMENT,
  `orNum` int NOT NULL,
  `grNum` int NOT NULL,
  `grLayer` int NOT NULL DEFAULT '0',
  `writer` varchar(45) NOT NULL,
  `userid` varchar(45) NOT NULL DEFAULT 'guest',
  `userpass` varchar(45) DEFAULT NULL,
  `title` varchar(500) NOT NULL,
  `contents` text NOT NULL,
  `hit` int NOT NULL DEFAULT '0',
  `wdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fileCount` int NOT NULL DEFAULT '0',
  `memoCount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ndboard`
--

LOCK TABLES `ndboard` WRITE;
/*!40000 ALTER TABLE `ndboard` DISABLE KEYS */;
INSERT INTO `ndboard` VALUES (1,1,0,0,'홍길동','guest','1234','첫 번째 글의 제목입니다.','내용 입니다1.',0,'2023-09-25 17:15:28',0,0),(2,2,0,0,'홍길순','guest','1234','두 번째 글의 제목입니다.','내용 입니다2.',0,'2023-09-25 17:15:28',0,0),(3,3,0,0,'홍길자','guest','1234','세 번째 글의 제목입니다.','내용 입니다3.',0,'2023-09-25 17:15:28',0,0),(4,4,0,0,'홍길길','guest','1234','네 번째 글의 제목입니다.','내용 입니다4.',0,'2023-09-25 17:15:28',0,0),(5,2,1,1,'홍길동','guest','1234','Re: 두 번째 글의 답글입니다.','내용 입니다2.1.',0,'2023-09-25 17:17:20',0,0),(6,2,3,1,'홍길동','guest','1234','Re: 두 번째 글의 답글입니다.','내용 입니다2.1.',0,'2023-09-25 17:18:48',0,0),(7,2,2,2,'홍길동','guest','1234','Re Re: 두 번째 글의 답글입니다.','내용 입니다2.1.',0,'2023-09-25 17:19:58',0,0),(8,2,4,2,'홍길동','guest','1234','Re Re: 세번째 글의 답글입니다.','내용 입니다2.1.',0,'2023-09-25 17:31:11',0,0);
/*!40000 ALTER TABLE `ndboard` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-04 17:25:34
