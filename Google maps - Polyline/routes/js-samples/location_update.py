import requests
import json
import mysql.connector
import decode_jason

table_name = 'cst8276.geolocation'
API_key = 'AIzaSyB1LFq0u9p4JGn15wdpnBPpzS3F3gjdrNM'
mydb = mysql.connector.connect(user='DBcst8276', password='8276',
                               host='127.0.0.1',
                               database='cst8276')

mycursor = mydb.cursor()
mycursor.execute("SELECT address FROM " + table_name)
addresses = mycursor.fetchall()
print(mycursor.rowcount, "record selected.")


# print(addresses)


def update(address_str, address_lat, address_lng):
    sql = "UPDATE " + table_name + " SET longitude = %s, latitude = '%s', json = %s WHERE address = '" \
          + address_str + "'"
    
    # turple datatype
    # insert_json = "'{ \"lat\":%s, \"lng\":%s}'"
    print("type:", type(address_lat), type(address_lng))
    # '{"lat": "Michael", "lng": "Rodgers"}'
    ini_string = {"lat": address_lat, "lng": address_lng}
    print("JSON:", ini_string, type(ini_string))
    # insert_json_string = ("{lat:" + str(address_lat) + ", lng:" + str(address_lng) + "}")
    insert_json = json.dumps(ini_string)

    val = (address_lng, address_lat, insert_json)
    mycursor.execute(sql, val)
    mydb.commit()
    print(mycursor.rowcount, "record updated.")


index = 0
while index < len(addresses):
    link = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + \
           ''.join(addresses[index]) + ',+CA&key=' + API_key
    res = requests.get(link)
    response = json.loads(res.text)
    json_dump = json.dumps(response)
    p = decode_jason.Locate(json_dump)
    lat = p.results[0]['geometry']['location']['lat']
    lng = p.results[0]['geometry']['location']['lng']
    print('latitude: ', lat, ', longitude: ', lng)
    update(''.join(addresses[index]), lat, lng)
    index = index + 1
else:
    print("Finished update.")

mydb.close()
