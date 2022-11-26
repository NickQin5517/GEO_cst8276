import json


# json_dump = json.dumps(response)
class Locate(object):
    def __init__(self, json_dump):
        self.results = None
        self.__dict__ = json.loads(json_dump)

# p = Locate(json_dump)
#
# lat = p.results[0]['geometry']['location']['lat']
# lng = p.results[0]['geometry']['location']['lng']
#
# print('latitude: ', lat, ', longitude: ', lng)
