Django Spades can be used to keep track of things(events) that happen on your django and you want to track.

There is basically two usages:
1 - API 
2 - Saving a record model

Quick start
-----------

1. Install:

    pip install django-spades


1. Add "Spades" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = [
        ...
        'Spades',
    ]

2. Run `python manage.py migrate` to create the models.

You should see it under admin with a nice rendeding of the json field
