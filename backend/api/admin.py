from django.contrib import admin
from .models import Todo, Chat, NeuralNet

# Register your models here.
admin.site.register(Todo)

admin.site.register(Chat)

admin.site.register(NeuralNet)