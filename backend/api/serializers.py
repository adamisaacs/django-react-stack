from rest_framework import serializers
from .models import Todo, Chat, NeuralNet

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = [
            'url',
            'created',
            'title',
            'description',
        ]


class ChatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Chat
        fields = [
            'url',
            'messageTime',
            'user',
            'message',
        ]


class NeuralNetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = NeuralNet
        fields = [
            'url',
            'id',
            'name',
            'created',
            'model',
            'weights',
            'accuracy',
        ]