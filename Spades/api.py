from . import models
from . import serializers
from rest_framework import viewsets, permissions

class CanPost(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in ['POST']

class EventViewSet(viewsets.ModelViewSet):
    """ViewSet for the Event class"""

    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializer
    permission_classes = [permissions.IsAdminUser|CanPost]

    def perform_create(self, serializer):
        if self.request.user.id:
            serializer.save(user=self.request.user)
        else:
            serializer.save()
