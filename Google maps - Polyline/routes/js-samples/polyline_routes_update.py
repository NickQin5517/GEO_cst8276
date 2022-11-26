import requests
import json
import mysql.connector
import decode_jason

table_name = 'cst8276.polyline'
API_key = 'AIzaSyB1LFq0u9p4JGn15wdpnBPpzS3F3gjdrNM'
mydb = mysql.connector.connect(user='DBcst8276', password='8276',
                               host='127.0.0.1',
                               database='cst8276')

mycursor = mydb.cursor()
mycursor.execute("select start_point_address, end_point_address from " + table_name)
# rows contains all the point pairs
rows = mycursor.fetchall()
# create second connection
table_name2 = 'cst8276.geolocation'
mydb2 = mysql.connector.connect(user='DBcst8276', password='8276',
                               host='127.0.0.1',
                               database='cst8276')
mycursor2 = mydb2.cursor()
mycursor2.execute("select * from " + table_name2)
rows2 = mycursor2.fetchall()

# print(len(rows))


def insert_db_route(start_point, end_point, locations):
    route_name = "Route: ", start_point, " to ", end_point
    print("Route: ", start_point, " to ", end_point)
    sql = "UPDATE " + table_name + " SET polyline_route = '" + locations \
          + "', polyline_name = '" + ''.join(route_name) \
          + "' where start_point_address = '" + ''.join(start_point) \
          + "' and end_point_address = '" + ''.join(end_point) + "'"
    mycursor.execute(sql)
    mydb.commit()
    print(mycursor.rowcount, "record updated.")

# insert coordinates from table geolocation
def insert_db_coordinates(start_point, end_point):
    index = 0
    while index < len(rows2):
        if start_point == rows2[index][1]:
            sql2 = "UPDATE " + table_name + " SET start_lat = %s, start_lng = %s WHERE start_point_address = '" \
                + start_point + "'"
            val = (rows2[index][3], rows2[index][2])
            mycursor2.execute(sql2, val)
            mydb2.commit()
        if end_point == rows2[index][1]:
            sql2 = "UPDATE " + table_name + " SET end_point_lat = %s, end_point_lng = %s WHERE end_point_address = '" \
                + end_point + "'"
            val = (rows2[index][3], rows2[index][2])
            mycursor2.execute(sql2, val)
            mydb2.commit()
        index = index + 1
            


index = 0
while index < len(rows):
    link = "https://maps.googleapis.com/maps/api/directions/json?origin=" + rows[index][0] \
           + "&destination=" + rows[index][1] \
           + "&key=" + API_key

    res = requests.get(link)
    # read json body
    response = json.loads(res.text)

    start_location = response['routes'][0]['legs'][0]['steps'][0]['start_location']
    # print(start_location)
    # create a list to store all the location data (latitude and longitude)
    point_list = [start_location]
    # create a list obj for the transfer locations
    transfer_locations = response['routes'][0]['legs'][0]['steps']
    for location in transfer_locations:
        point_list.append(location['end_location'])
        # print(location['end_location'])

    insert_json = json.dumps(point_list)
    print("inserting", insert_json)
    # insert json data into the database
    # insert_db_route(insert_json)
    insert_db_route(rows[index][0], rows[index][1], insert_json)
    insert_db_coordinates(rows[index][0], rows[index][1])
    index = index + 1

mydb.close()
