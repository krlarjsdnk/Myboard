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
);
CREATE TABLE `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` varchar(45) NOT NULL,
  `userpass` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `ndboard` VALUES (1,1,0,0,'홍길동','guest','1234','첫 번째 글의 제목입니다.','내용 입니다1.',0,'2023-09-25 17:15:28',0,0),(2,2,0,0,'홍길순','guest','1234','두 번째 글의 제목입니다.','내용 입니다2.',0,'2023-09-25 17:15:28',0,0),(3,3,0,0,'홍길자','guest','1234','세 번째 글의 제목입니다.','내용 입니다3.',0,'2023-09-25 17:15:28',0,0),(4,4,0,0,'홍길길','guest','1234','네 번째 글의 제목입니다.','내용 입니다4.',0,'2023-09-25 17:15:28',0,0),(5,2,1,1,'홍길동','guest','1234','Re: 두 번째 글의 답글입니다.','내용 입니다2.1.',0,'2023-09-25 17:17:20',0,0),(6,2,3,1,'홍길동','guest','1234','Re: 두 번째 글의 답글입니다.','내용 입니다2.1.',0,'2023-09-25 17:18:48',0,0),(7,2,2,2,'홍길동','guest','1234','Re Re: 두 번째 글의 답글입니다.','내용 입니다2.1.',0,'2023-09-25 17:19:58',0,0),(8,2,4,2,'홍길동','guest','1234','Re Re: 세번째 글의 답글입니다.','내용 입니다2.1.',0,'2023-09-25 17:31:11',0,0);
insert into members(userid, username, userpass) values ('aaa', 'aaa', 123);
use mybbs;
select * from members;
select * from ndboard;
truncate ndboard;
truncate members;
delete from members where id = 3;

UPDATE ndboard AS A 
	JOIN (SELECT num FROM ndboard) AS B ON A.num = B.num
    SET A.orNum = B.num WHERE B.num < 2000;

call UpdateMem;