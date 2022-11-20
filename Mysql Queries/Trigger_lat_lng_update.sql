use cst8276;
-- use the root user to run this before creating the triggers
-- SET GLOBAL log_bin_trust_function_creators = 1; 

drop trigger if exists polyline_update_startpoint;
drop trigger if exists polyline_update_endpoint;

-- trigger1
create trigger polyline_update_startpoint after insert on polyline for each row 
update polyline
set start_lat = (select latitude from geolocation ge where ge.address = polyline.start_point_address), 
start_lng = (select longitude from geolocation ge where ge.address = polyline.start_point_address);

-- trigger2
create trigger polyline_update_endpoint after insert on polyline for each row 
update polyline
set end_point_lat = (select latitude from geolocation ge where ge.address = polyline.end_point_address), 
end_point_lng = (select longitude from geolocation ge where ge.address = polyline.end_point_address);


-- drop trigger if exists polyline_update_startpoint;
-- create trigger polyline_update_startpoint before insert on polyline for each row 
-- begin 
-- 	select latitude, longitude from geolocation ge where ge.address = polyline.start_point_address
--     into polyline.start_lat, polyline.start_lng
--     end;