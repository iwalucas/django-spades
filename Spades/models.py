from django.urls import reverse
from django.conf import settings
from django.db import models as models
from django.conf import settings


class Event(models.Model):
    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    last_updated = models.DateTimeField(auto_now=True, editable=False)
    info = models.JSONField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True
    )

    class Meta:
        ordering = ("-created",)

    def __str__(self):
        return "%s" % self.pk

    def get_absolute_url(self):
        return reverse("Spades_event_detail", args=(self.pk,))

    def get_update_url(self):
        return reverse("Spades_event_update", args=(self.pk,))
