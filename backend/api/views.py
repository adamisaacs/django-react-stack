from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import TodoSerializer, ChatSerializer, NeuralNetSerializer
from .models import Todo, Chat, NeuralNet

from .components.neuralnet import create_network, train_network


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
    
    def create(self, request, *args, **kwargs):
        if NeuralNet.objects.count() >= 3:
            raise Exception({'error': 'Too many models stored'})

        
        network = create_network()
        name = request.data.get('name')
        serializer = self.get_serializer(data={'model': network, 'name': name})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

    def update(self, request, pk=None, *args, **kwargs):
        network = self.get_object()
        model = request.data.get('model')
        if network.weights == '':
            weights, accuracy = train_network(model)
            network.weights = weights
            network.accuracy = accuracy
        else:
            weights, accuracy = train_network(model, network.weights)
            network.weights = weights
            network.accuracy = accuracy
        network.save()
        serializer = self.get_serializer(network)
        return Response(serializer.data)
