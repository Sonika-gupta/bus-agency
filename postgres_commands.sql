"bus_stop_type": {
    "location" city_id,
    "pickup_time": "timestamp"
},
"location": {
    "address1": "varchar",
    "address2": "varchar",
    "city": "city_type",
    "state": "state_type"
},
"state_type": ["delhi", "mumbai", "chennai", "kolkata"]
"bus":{
    "type": {
        "ac": "boolean",
        "sleeper": "boolean",
        "seater": "boolean",
        "volvo": "boolean"
    },
    "amenities": {
        "blanket": "boolean",
        "water_bottle": "boolean",
        "snacks": "boolean",
        "charging_point": "boolean",
        "movie": "boolean",
        "track_my_bus": "boolean",
        "emergency_contact": "boolean",
        "toilet": "boolean"
    }
}    

CREATE TYPE bus_chart_type as ENUM ('35-seater', '45-seater');
CREATE TYPE user_type as ENUM ('admin', 'agent', 'customer');
CREATE TYPE days_type as ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TYPE seat_type as ENUM ('window', 'aisle');

CREATE TABLE users(
id SERIAL PRIMARY KEY,
type user_type,
username varchar(15) NOT NULL,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL)

CREATE TABLE buses(
id SERIAL PRIMARY KEY,
bus_number INT NOT NULL UNIQUE,
name varchar(30),
chart bus_chart_type,
running_days days_type,
ac boolean,
seater boolean,
sleeper boolean,
volvo boolean,
source INT NOT NULL,
destination INT NOT NULL,
depart_time timestamp NOT NULL,
arrival_time timestamp NOT NULL,
boarding_point JSON,
dropping_point JSON,
duration varchar(5) DEFAULT '00:00',
running_days JSON,
seat_fare INT NOT NULL,
sleeper_fare INT NOT NULL,
agent_seat_fare INT NOT NULL,
agent_sleeper_fare INT NOT NULL,
blanket boolean,
water_bottle boolean,
snacks boolean,
charging_point boolean,
movie boolean,
track_my_bus boolean,
emergency_contact boolean,
toilet boolean,
reschedulable boolean,
live_tracking boolean);

CREATE TABLE seats (
bus_id INT NOT NULL REFERENCES buses(id),
number INT NOT NULL,
type seat_type NOT NULL,
is_booked boolean NOT NULL DEFAULT false,
booked_by INT REFERENCES users(id),
last_modified JSON);


    /* "{
                "modified_time": "timestamp",
                "modified_by": "user_id"
            } */

/* 
INSERT INTO 
buses (bus_number, name, source, destination, depart_time, arrival_time, boarding_point, dropping_point, seat_fare, sleeper_fare, agent_seat_fare, agent_sleeper_fare)
values ('111', 'delhi-to-manali', '00', '11', '2020-06-22 00:00:00', '2020-06-22 00:08:00', '{"location": "rohini", "time": "00:00"}', '{"location": "manali-bus-stand", "time": "08:00"}', 0, 0, 0, 0); */