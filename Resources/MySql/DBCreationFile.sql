CREATE DATABASE StarsTraffic;

USE StarsTraffic;

CREATE TABLE IF NOT EXISTS Stars2018 (
    ID INT AUTO_INCREMENT,
    Map VARCHAR(255),
    ImageNo VARCHAR(255),
	RptNo VARCHAR(255),
    Weekday varchar(255),
    CrashDate DATE,
    CrashTime TIME,
    VehCount INT,
    Agency VARCHAR(255),
    Troop VARCHAR(10),
    County VARCHAR(255),
    City VARCHAR(255),
    CrashType VARCHAR(255),
    Severity VARCHAR(255),
    AtStreet VARCHAR(255),
    OnStreet VARCHAR(255),
    LightCond VARCHAR(255),
    Injured INT,
    Killed INT,
    PRIMARY KEY (ID)
);

LOAD DATA INFILE 'C:\Users\ShadowG\2018 St Louis Traffic City and County.xls.csv' 
INTO TABLE Stars2018 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

USE StarsTraffic;
select * from 2018starstest