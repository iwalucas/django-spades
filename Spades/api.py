from . import models
from . import serializers
from rest_framework import viewsets, permissions


class EventViewSet(viewsets.ModelViewSet):
    """ViewSet for the Event class"""

    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializer
    permission_classes = [permissions.IsAdminUser]


