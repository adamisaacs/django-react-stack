from rest_framework import serializers
from .models import Todo, Chat, NeuralNet

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = [
            'url',
            'title',
            'description',
            'created',
        ]


class ChatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Chat
        fields = [
            'url',
            'user',
            'message',
            'messageTime',
        ]


class NeuralNetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = NeuralNet
        fields = [
            'url',
            'model',
            'created',
        ]