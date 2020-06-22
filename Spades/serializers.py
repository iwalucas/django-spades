from . import models

from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Event
        fields = (
            'pk', 
            'name', 
            'created', 
            'last_updated', 
            'info', 
        )


