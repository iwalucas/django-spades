from django.contrib import admin
from django import forms
from .models import Event
from django.contrib.auth.models import User

import json

class EventAdminForm(forms.ModelForm):
    
    class Meta:
        model = Event
        fields = '__all__'
        widgets = {
            'info': forms.Textarea(attrs={
                                    'class': 'pretty',
                                    'disabled': True,
                                    'rows':1, 
                                    'cols':15
                                    })
        } 

class EventAdmin(admin.ModelAdmin):
    form = EventAdminForm
    list_display = ['name', 'created', 'last_updated', 'user',]
    readonly_fields = ['name', 'created', 'last_updated','user']
    date_hierarchy = 'created'

    fieldsets = (
        (
            None, {
                'fields':('name', 'created', 'last_updated','user','info')
            }
        ),
    )

    
    class Media:
        js = (
            'Spades/js/prettyjson.js', 
            'Spades/js/eventadmin.js', 
        )
        css = { 
            'all':('Spades/css/eventadmin.css',),
        } 

admin.site.register(Event, EventAdmin)


