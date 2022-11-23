
# app.py
from flask import Flask, jsonify, request, render_template
import datetime
import mysql.connector
import json

app = Flask(__name__)


@app.route('/get_coordinates/<route_id>', methods=['GET'])
def get_coordinates(route_id):

    data = None
    cnx = mysql.connector.connect(user='DBcst8276', database='cst8276', host='localhost' , port=3306, password='8276')
    cursor = cnx.cursor()
    query = (f"SELECT polyline_route from polyline where id={route_id}")
    cursor.execute(query)

    for polyline_route in cursor:
        data = json.loads(polyline_route[0])

    cursor.close()
    cnx.close()
    message = {'route':data}
    return jsonify(message)  # serialize and use JSON headers



# run app
app.run(debug=True)