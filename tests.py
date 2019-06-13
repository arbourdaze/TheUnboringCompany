import unittest
import json
import sys
import os
import Middleware as mid


class MiddlewareTestCase(unittest.TestCase):
    def test_get_minutes_0(self):
        with open('test/testGetMinutes.json') as json_file:
            data = json.load(json_file)
        minutes = mid.get_minutes(data)
        self.assertEqual(minutes, 130)


    def test_time_filter_0(self):
        with open('test/testTimeFilter.json') as json_file:
            data = json.load(json_file)
        correctList = []
        timeLimit = 100
        mid.time_filter(data, timeLimit, correctList)
        self.assertEqual(len(correctList), 0)

        
    def test_time_filter_1(self):
        with open('test/testTimeFilter.json') as json_file:
            data = json.load(json_file)
        correctList = []
        timeLimit = 120
        mid.time_filter(data, timeLimit, correctList)
        self.assertEqual(len(correctList), 3)


    def test_get_response_0(self):
        with open('test/testGetResponse.json') as json_file:
            data = json.load(json_file)
            result = mid.get_response(data)
        self.assertEqual(len(json.loads(result)), 3)


unittest.main()


