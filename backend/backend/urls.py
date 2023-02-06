"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.shortcuts import render, redirect


def add_trailing_slash(request, permanent=True):
    path = request.path
    return redirect(path + '/', permanent=permanent)


def render_react(request):
    return render(request, "base.html")


urlpatterns = [
    re_path(r'^(?!.*/$)(.+)$', add_trailing_slash),

    path('admin/', admin.site.urls),

    path('api/', include('api.urls')),

    path('', include('home.urls')),
    path('apps/', include('apps.urls')),
    path('apps/neuralnet/', include('neuralnet.urls')),
    path('apps/chat/', include('chat.urls')),
    path('apps/todo/', include('todo.urls')),
    path('apps/iss/', include('iss.urls')),
    path('apps/clock/', include('clock.urls')),
    path('apps/ttt/', include('ttt.urls')),

    #re_path(r'^(?:.*)/?$', render_react), # Use React for every other URL (404 handling, etc)
]
