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
		data = json.loads(raw)
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
	for subj in files:
		create_test(subj['id'])
	unittest.main()
