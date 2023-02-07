from django.db import models

# Create your models here.
class Todo(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=60)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class Chat(models.Model):
    messageTime = models.DateTimeField(auto_now_add=True)
    user = models.CharField(max_length=15)
    message = models.CharField(max_length=200)

    def __str__(self):
        return self.message


class NeuralNet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=20)
    model = models.TextField()
    weights = models.TextField(default='')
    accuracy = models.TextField(default='')

    def __str__(self):
        return self.model