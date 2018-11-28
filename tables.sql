create table towns(
	id serial not null primary key,
	code text not null,
	location text not null
);

create table registration_numbers (
	id serial not null primary key,
  registration_number_area text not null,
	registration_number varchar not null,
	town_id int not null,
	foreign key (town_id) references towns(id)
);
