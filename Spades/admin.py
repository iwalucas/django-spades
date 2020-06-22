from django.contrib import admin
from django import forms
from .models import Event
from django.contrib.auth.models import User

import json

class EventAdminForm(forms.ModelForm):

    class Meta:
        model = Event
        fields = '__all__' 

class EventAdmin(admin.ModelAdmin):
    form = EventAdminForm
    list_display = ['name', 'created', 'last_updated', 'user',]
    readonly_fields = ['name', 'created', 'last_updated', 'info']
    date_hierarchy = 'created'

    def user(self, obj):
        data = json.loads(obj.info)
        try:
            user = User.objects.get(id=data['User'])
            return user
        except:
            return ''
    
    class Media:
        js = (
            'js/prettyjson.js', 
            'js/eventadmin.js', 
        )
        css = { 
            'all':('css/eventadmin.css',),
        } 

admin.site.register(Event, EventAdmin)


