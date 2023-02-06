from rest_framework import viewsets, views
from rest_framework.response import Response

from .serializers import TodoSerializer, ChatSerializer, TrainNetworkSerializer
from .models import Todo, Chat

from .components.neuralnet import train_network


# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('created')
    serializer_class = TodoSerializer


class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all().order_by('messageTime')
    serializer_class = ChatSerializer



# Neural Network
class TrainNetworkView(views.APIView):
    serializer_class = TrainNetworkSerializer

    def post(self, request, format=None):
        accuracy = train_network()
        return Response({'accuracy': accuracy})