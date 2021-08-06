/* 'bus_stop_type': {
    'location' city_id,
    'pickup_time': 'timestamp'
},
'location': {
    'address1': 'varchar',
    'address2': 'varchar',
    'city': 'city_type',
    'state': 'state_type'
},
'city_type': ['delhi', 'mumbai', 'chennai', 'kolkata'] */

CREATE TYPE bus_chart_type as ENUM ('35-seater', '45-seater');
CREATE TYPE user_type as ENUM ('admin', 'agent', 'customer');
CREATE TYPE days_type as ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TYPE seat_type as ENUM ('window', 'aisle');
CREATE TYPE state_type as ENUM (
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal')

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    type user_type DEFAULT 'customer',
    fname varchar(20) NOT NULL,
    lname varchar(20) NOT NULL,
    username varchar(40) NOT NULL,
    email citext NOT NULL UNIQUE,
    contact number(10) NOT NULL,
    isActive boolean DEFAULT true,
    lastActive timestamp,
    password TEXT NOT NULL DEFAULT substring(md5((random())::text), 6, 8)
)

CREATE TABLE service_providers (
    id SERIAL PRIMARY KEY,
    name varchar(40) NOT NULL,
    vat_no char(15) NOT NULL UNIQUE,
    address_line1 TEXT,
    address_line2 TEXT,
    city varchar(20) NOT NULL,
    state state_type NOT NULL,
    pincode char(6) NOT NULL,
    contact char(10) NOT NULL,
    landline char(10),
    fax char(10),
    comments TEXT,
    designation varchar(20) NOT NULL,
    user_id INT NOT NULL REFERENCES users(id)
)

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
    running_days bit(7),
    bus_type bus_type,
    boarding_points json[],
    dropping_points json[],
    amenities character varying(30)[],
    last_modified timestamp without time zone DEFAULT now()
    service_provider_id INT NOT NULL REFERENCES service_providers(id),
)

-- not accessible outside db
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    schedule_date date NOT NULL,
    running_day days_type NOT NULL,
    bus_id INT REFERENCES buses(id)
)

-- not accessible outside db
CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    seat_number INT NOT NULL,
    isBooked bool DEFAULT false,
    seat_type seat_type,
    trip_id INT REFERENCES trips(id) NOT NULL
)


CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    booked_by INT REFERENCES users(id) NOT NULL,
    booked_on timestamp DEFAULT now() NOT NULL,
    modified_time timestamp,
    passenger_details json NOT NULL,
    seat_id INT REFERENCES seats(id) UNIQUE,
    trip_id INT REFERENCES trips(id) NOT NULL
)

ALTER TABLE seats ADD COLUMN booking_id INT REFERENCES bookings(id)

-- for password:
-- CREATE EXTENSION pgcrypto
/*
CREATE TABLE locations (
id SERIAL PRIMARY KEY,
city_id INT NOT NULL REFERENCES cities(id),
state_id INT NOT NULL REFERENCES states(id)
);
 */

    /* '{
                'modified_time': 'timestamp',
                'modified_by': 'user_id'
            } */

/*
INSERT INTO
buses (bus_number, bus_name, source, destination, depart_time, arrival_time, boarding_points, dropping_points, seat_fare, sleeper_fare, agent_seat_fare, agent_sleeper_fare)
values ('111', 'delhi-to-manali', '00', '11', '2020-06-22 00:00:00', '2020-06-22 00:08:00', '{'location': 'rohini', 'time': '00:00'}', '{'location': 'manali-bus-stand', 'time': '08:00'}', 0, 0, 0, 0); */

