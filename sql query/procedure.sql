USE `mybbs`;
DROP procedure IF EXISTS `UpdateMem`;

DELIMITER $$
USE `mybbs`$$
CREATE PROCEDURE `UpdateMem` ()
BEGIN
	ALTER TABLE members AUTO_INCREMENT=1;
	SET @COUNT = 0;
	UPDATE `members` SET id = @COUNT:=@COUNT+1;
END$$

DELIMITER ;

DELIMITER $$

USE `mybbs`$$
CREATE PROCEDURE `UpdateBoard` ()
BEGIN
	ALTER TABLE ndboard AUTO_INCREMENT=1;
	SET @COUNT = 0;
	UPDATE `ndboard` SET num = @COUNT:=@COUNT+1;
END$$

DELIMITER ;

DELIMITER $$
	CREATE PROCEDURE loopInsert()
    BEGIN
		DECLARE i INT DEFAULT 1;
        WHILE I <= 1000 DO
			INSERT INTO ndboard (orNum, grNum, writer, userid, userpass, title, contents)
			VALUES (0, 0, '홍길동', 'guest', '1234', concat(i, '번 제목입니다.'), concat(i, '번 내용입니다.'));
			SET i = i + 1;
        END WHILE;
	END$$
DELIMITER ;
use mybbs;
CALL loopInsert();