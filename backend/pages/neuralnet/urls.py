from django.urls import path
from . import views

app_name = 'neuralnet'

urlpatterns = [
    path('', views.neuralnet, name='neuralnet'),
]