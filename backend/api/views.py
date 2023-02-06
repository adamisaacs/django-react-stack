from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse, HttpResponseNotAllowed

from django.views.decorators.csrf import csrf_exempt

from .serializers import TodoSerializer, ChatSerializer
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
@csrf_exempt
def TrainNetwork(request):
    if request.method == 'POST':
        accuracy = train_network()
        response =  JsonResponse({'accuracy': accuracy})
        return response
    else:
        return HttpResponseNotAllowed(['POST'])