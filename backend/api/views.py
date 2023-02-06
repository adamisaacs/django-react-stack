from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import TodoSerializer, ChatSerializer, NeuralNetSerializer
from .models import Todo, Chat, NeuralNet


# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('created')
    serializer_class = TodoSerializer


class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all().order_by('messageTime')
    serializer_class = ChatSerializer


# Neural Network
class NeuralNetViewSet(viewsets.ModelViewSet):
    queryset = NeuralNet.objects.all().order_by('created')
    serializer_class = NeuralNetSerializer