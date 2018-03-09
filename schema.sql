CREATE TABLE users (
id serial,
authid varchar(40) primary key,
name varchar(40)
);

CREATE TABLE employees(
id serial,
phone varchar(11) primary key,
name varchar(40),
managerauthid varchar(40) REFERENCES users(authid),
latitude varchar(40),
longitude varchar(40)
);

CREATE TABLE messages(
id serial primary key,
type varchar(6),
managerauthid varchar(40) REFERENCES users(authid),
employeephone varchar(11) REFERENCES employees(phone),
body varchar(255),
timestamp timestamp default current_timestamp
);

create table routes (
id serial primary key,
employeephone varchar(11) REFERENCES employees(phone),
managerauthid varchar(40) REFERENCES users(authid),
description varchar(255),
startingLat varchar(40),
startingLon varchar(40),
destLat varchar(40),
destLon varchar(40),
status varchar(10)
);