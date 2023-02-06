from rest_framework import serializers
from .models import Todo, Chat

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


class TrainNetworkSerializer(serializers.Serializer):
    pass