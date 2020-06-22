import unittest
from django.urls import reverse
from django.test import Client
from .models import Event
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.contenttypes.models import ContentType

def create_event(**kwargs):
    defaults = {}
    defaults["name"] = "name"
    defaults["info"] = '''{
                        "userId": 1,
                        "id": 1,
                        "title": "big title",
                        "completed": false
                        }''' 
    defaults.update(**kwargs)
    return Event.objects.create(**defaults)



class EventViewTest(unittest.TestCase):
    '''
    Tests for Event
    '''
    def setUp(self):
        self.client = Client()


