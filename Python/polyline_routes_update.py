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
    index = index + 1

mydb.close()
