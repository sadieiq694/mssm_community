DROP DATABASE mssm_community_2;
CREATE DATABASE mssm_community_2;
USE mssm_community_2;

-- Table: event registration
DROP TABLE IF EXISTS `event_registration`;
CREATE TABLE `event_registration` (
  reg_id int(11) NOT NULL AUTO_INCREMENT,
  student int(11) NOT NULL,
  event int(11) NOT NULL,
  confirmed_yn int(11) NOT NULL,
  PRIMARY KEY (`reg_id`),
  KEY `event_registration_events` (`event`),
  KEY `event_registration_students` (`student`),
  CONSTRAINT `event_registration_events` FOREIGN KEY (`event`) REFERENCES `events` (`event_id`),
  CONSTRAINT `event_registration_students` FOREIGN KEY (`student`) REFERENCES `people` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


LOCK TABLES `event_registration` WRITE;
INSERT INTO `event_registration` VALUES (1,1,1,1),(2,2,2,1),(3,3,2,0);
UNLOCK TABLES;

-- Table: events
CREATE TABLE events (
    event_id int NOT NULL AUTO_INCREMENT,
    event_name varchar(255) NOT NULL,
    event_loc varchar(255) NOT NULL,
    chaperone int NOT NULL,
    event_start char(25) NOT NULL,
    event_end char(25) NOT NULL,
    CONSTRAINT events_pk PRIMARY KEY (event_id)
) COMMENT 'must change constantly depending on the time';


-- Table: people
CREATE TABLE people (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    CONSTRAINT people_pk PRIMARY KEY (id)
);

INSERT INTO `mssm_community_2`.`people` (`name`) VALUES ('Luisa Hetzler');
INSERT INTO `mssm_community_2`.`people` (`name`) VALUES ('Sadie Allen');
INSERT INTO `mssm_community_2`.`people` (`name`) VALUES ('Allison Johnson');
INSERT INTO `mssm_community_2`.`people` (`name`) VALUES ('Gregory Hamlin');
INSERT INTO `mssm_community_2`.`people` (`name`) VALUES ('Andrea Rawson');

-- Table: roles
CREATE TABLE roles (
    role_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    CONSTRAINT roles_pk PRIMARY KEY (role_id)
);

-- Table: sign_out
CREATE TABLE sign_out (
    signout_id int NOT NULL AUTO_INCREMENT,
    student_id int NOT NULL,
    location varchar(255) NOT NULL,
    signout_time char(25) NOT NULL,
    signin_time char(25) NOT NULL,
    event_id int,
    CONSTRAINT sign_out_pk PRIMARY KEY (signout_id)
);

-- Table: user_roles
CREATE TABLE user_roles (
    reg_id int NOT NULL AUTO_INCREMENT,
    person_id int NOT NULL,
    role_id int NOT NULL,
    CONSTRAINT user_roles_pk PRIMARY KEY (reg_id)
);

-- foreign keys
-- Reference: event_registration_events (table: event_registration)
ALTER TABLE event_registration ADD CONSTRAINT event_registration_events FOREIGN KEY event_registration_events (event)
    REFERENCES events (event_id);

-- Reference: event_registration_students (table: event_registration)
ALTER TABLE event_registration ADD CONSTRAINT event_registration_students FOREIGN KEY event_registration_students (student)
    REFERENCES people (id);

-- Reference: events_people (table: events)
ALTER TABLE events ADD CONSTRAINT events_people FOREIGN KEY events_people (chaperone)
    REFERENCES people (id);

-- Reference: sign_out_people (table: sign_out)
ALTER TABLE sign_out ADD CONSTRAINT sign_out_people FOREIGN KEY sign_out_people (student_id)
    REFERENCES people (id);

-- Reference: user_roles_people (table: user_roles)
ALTER TABLE user_roles ADD CONSTRAINT user_roles_people FOREIGN KEY user_roles_people (person_id)
    REFERENCES people (id);

-- Reference: user_roles_roles (table: user_roles)
ALTER TABLE user_roles ADD CONSTRAINT user_roles_roles FOREIGN KEY user_roles_roles (role_id)
    REFERENCES roles (role_id);

-- End of file.

