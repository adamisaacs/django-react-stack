from django.urls import path
from . import views

app_name = 'clock'

urlpatterns = [
    path('', views.clock, name='clock'),
]