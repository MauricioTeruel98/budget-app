CREATE DATABASE budget
    DEFAULT CHARACTER SET = 'utf8mb4';

CREATE TABLE fact(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    concept VARCHAR(255) NOT NULL COMMENT 'concept',
    amount FLOAT NOT NULL COMMENT 'amount',
    type VARCHAR(255) NOT NULL COMMENT 'type',
    create_time DATETIME NOT NULL COMMENT 'Create Time',
)ENGINE=InnoDb;


INSERT INTO fact VALUES(NULL, 'Sueldo', '1.200', 'ingress', CURTIME());