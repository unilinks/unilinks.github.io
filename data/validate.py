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
        pass

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


def create_test(id):
        test_name = "test_{0}".format(id)
        test = validate_file(id)
        setattr(JsonValidate, test_name, test)


if __name__ == "__main__":
        create_test("index")
        jf = open("index.json", "r")
        try:
                files = json.load(jf)
        except json.decoder.JSONDecodeError:
                jf.close()
                unittest.main()
        jf.close()
        try:
                for subj in files:
                        create_test(subj['id'])
        except KeyError:
                unittest.main()
        unittest.main()
