#!/usr/bin/python3

import unittest
import json

class JsonValidate(unittest.TestCase):
	pass

def validate_file(subject):
	f = open("{0}.json".format(subject), "r")
	data = json.load(f)
	f.close()
	def test(self):
		self.assertEqual(1, 1)
	return test




if __name__ == "__main__":
	jf = open("index.json", "r")
	files = json.load(jf)
	jf.close()
	for subj in files:
		test_name = "test_{0}".format(subj['id'])
		test = validate_file(subj['id'])
		setattr(JsonValidate, test_name, test)
	unittest.main()
