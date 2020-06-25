from django.urls import reverse
from django.db.models import CharField
from django.db.models import DateTimeField
from django.db.models import TextField
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
from django.contrib.auth import models as auth_models
from django.db import models as models 
import json
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.conf import settings



class Event(models.Model):
    # Fields
    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    last_updated = models.DateTimeField(auto_now=True, editable=False)
    info = models.TextField()
    user = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE,
        )

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return u'%s' % self.pk

    def get_absolute_url(self):
        return reverse('EventTracker_event_detail', args=(self.pk,))


    def get_update_url(self):
        return reverse('EventTracker_event_update', args=(self.pk,))

    # def user(self):
    #     j = json.loads(self.info)
    #     if 'User' in j:
    #         user = User.objects.get(id=j['User'])
    #         return user

    def save(self, *args, **kwargs):
        try:
            j = json.loads(self.info)
        except:
            raise ValidationError('Info needs to be of JSON format')


        super().save(*args, **kwargs)  



