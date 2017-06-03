#!/usr/bin/python3

import unittest
import json
from jsonschema import validate

indexschema = {
                "title":"JSon schema for index file.",
                "type":"array",
                "items":{
                        "type":"object",
                        "properties":{
                                "id":{
                                        "type":"string"
                                        },
                                "title":{
                                        "type":"string"
                                        }
                                },
                        "required":["id", "title"]
                        }
                }

subschema = {
                "title":"JSon schema for subjects.",
                "type":"array",
                "items":{
                        "type":"object",
                        "properties":{
                                "title":{
                                        "type":"string",
                                        },
                                "entries":{
                                        "type":"array",
                                        "items":{
                                                "type":"object",
                                                "properties":{
                                                        "name":{
                                                                "type":"string"
                                                                },
                                                        "url":{
                                                                "type":"string"
                                                                }
                                                        },
                                                "required":["name", "url"]
                                                }
                                        }
                                },
                        "required":["title", "entries"]
                        }
                }

class JsonValidate(unittest.TestCase):
        
        def setUp(self):
                jf = open("index.json", "r")
                self.files = [_id['id'] for _id in json.load(jf)]
                jf.close() 
        
        def test_index(self):
                validate_file("index")

        def test_files(self):
                assert(self.files)
                for _file in self.files:
                        validate_file(_file)


def validate_file(subject):
        f = open("{0}.json".format(subject), "r")
        raw = f.read()
        f.close()
        def test(self):
                try:
                  data = json.loads(raw)
                except json.decoder.JSONDecodeError as e:
                  raise AttributeError("Error in {0}: {1}".format(subject, str(e)))
                if subject == "index":
                        validate(data, indexschema)
                else:
                        validate(data, subschema)
        return test
