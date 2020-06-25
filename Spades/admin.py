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
    readonly_fields = ['name', 'created', 'last_updated', 'info','user']
    date_hierarchy = 'created'

    
    class Media:
        js = (
            'Spades/js/prettyjson.js', 
            'Spades/js/eventadmin.js', 
        )
        css = { 
            'all':('Spades/css/eventadmin.css',),
        } 

admin.site.register(Event, EventAdmin)


