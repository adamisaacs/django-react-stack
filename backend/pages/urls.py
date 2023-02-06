from django.urls import path
from . import views

app_name = 'pages'

urlpatterns = [
    path('', views.home, name='home'),
    path('apps/', views.apps, name='apps'),
    path('apps/chat/', views.chat, name='chat'),
    path('apps/clock/', views.clock, name='clock'),
    path('apps/iss/', views.iss, name='iss'),
    path('apps/neuralnet/', views.neuralnet, name='neuralnet'),
    path('apps/todo/', views.todo, name='todo'),
    path('apps/ttt/', views.ttt, name='ttt'),
]