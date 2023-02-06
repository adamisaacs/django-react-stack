from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'todos', views.TodoViewSet)
router.register(r'chats', views.ChatViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('train_network/', views.TrainNetwork, name='TrainNetwork'),
]