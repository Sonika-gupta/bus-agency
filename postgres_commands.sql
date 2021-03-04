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
        "charging_points": "boolean",
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
bus_name varchar(30),
source INT NOT NULL,
destination INT NOT NULL,
depart_time time NOT NULL,
arrival_time time NOT NULL,
duration interval DEFAULT '00:00:00'::interval,
seat_fare INT NOT NULL,
sleeper_fare INT NOT NULL,
agent_seat_fare INT NOT NULL,
agent_sleeper_fare INT NOT NULL,

chart bus_chart_type,
running_days days_type,
ac boolean,
seater boolean,
sleeper boolean,
volvo boolean,
boarding_points JSON,
dropping_points JSON,
running_days JSON,
blanket boolean,
water_bottle boolean,
snacks boolean,
charging_points boolean,
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
/* 
CREATE TABLE locations (
id SERIAL PRIMARY KEY,
city_id INT NOT NULL REFERENCES cities(id),
state_id INT NOT NULL REFERENCES states(id)
);
 */

    /* "{
                "modified_time": "timestamp",
                "modified_by": "user_id"
            } */

/* 
INSERT INTO 
buses (bus_number, bus_name, source, destination, depart_time, arrival_time, boarding_points, dropping_points, seat_fare, sleeper_fare, agent_seat_fare, agent_sleeper_fare)
values ('111', 'delhi-to-manali', '00', '11', '2020-06-22 00:00:00', '2020-06-22 00:08:00', '{"location": "rohini", "time": "00:00"}', '{"location": "manali-bus-stand", "time": "08:00"}', 0, 0, 0, 0); */
	
	