from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'base.html', {
        'title': "Adam Isaacs' Portfolio",
        'description': 'A portfolio for my web apps.'
    })

def apps(request):
    return render(request, 'base.html', {
        'title': "Apps",
        'description': 'The list of the web apps I have created.'
    })

def chat(request):
    return render(request, 'base.html', {
        'title': "Real-time Chat",
        'description': "Chat anonymously with your friends."
    })

def clock(request):
    return render(request, 'base.html', {
        'title': "Circular Clock",
        'description': 'A circular clock with a simple aesthetic.'
    })

def iss(request):
    return render(request, 'base.html', {
        'title': "Where's the ISS?",
        'description': "Find out where the ISS is and if it's visible from your location."
    })

def neuralnet(request):
    return render(request, 'base.html', {
        'title': "Neural Network",
        'description': "Use the neural network to recognize handwritten numbers."
    })

def todo(request):
    return render(request, 'base.html', {
        'title': "To-do List",
        'description': "Keep track of your to-do list."
    })

def ttt(request):
    return render(request, 'base.html', {
        'title': 'Tic-Tac-Toe',
        'description': 'Tic-Tac-Toe game made with the React documentation tutorial.'
    })