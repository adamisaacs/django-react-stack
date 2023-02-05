from django.shortcuts import render

# Create your views here.
def chat(request):
    return render(request, 'base.html', {
        'title': "Real-time Chat",
        'description': "Chat anonymously with your friends."
    })
