from django.shortcuts import render
from rest_framework import viewsets

from .serializers import TodoSerializer
from .models import Todo

# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('created')
    serializer_class = TodoSerializer