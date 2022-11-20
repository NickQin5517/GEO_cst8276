use cst8276;
drop table if exists `polyline`;
create table `polyline` (
	id int auto_increment primary key,
    polyline_name varchar(255),
    start_point_address varchar(255),
    start_lat varchar(255),
    start_lng varchar(255),
    end_point_address varchar(255),
    end_point_lat varchar(255),
    end_point_lng varchar(255),
    polyline_route json,
    updated DATETIME DEFAULT NOW()
);

delete from `cst8276`.`polyline`;
insert into polyline (
    polyline_name, 
    start_point_address, 
    end_point_address)
    -- polyline_route)
values(
    'route1',
    'Algonquin College',
    'Rideau Center'
);


