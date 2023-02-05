from django.shortcuts import render
from rest_framework import viewsets

from .serializers import TodoSerializer, ChatSerializer
from .models import Todo, Chat

# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('created')
    serializer_class = TodoSerializer


class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all().order_by('messageTime')
    serializer_class = ChatSerializer