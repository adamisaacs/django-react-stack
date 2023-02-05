from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=60)
    description = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Chat(models.Model):
    user = models.CharField(max_length=15)
    message = models.CharField(max_length=200)
    messageTime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message