from django.shortcuts import render

# Create your views here.
def neuralnet(request):
    return render(request, 'base.html', {
        'title': "Neural Network",
        'description': "Use the neural network to recognize handwritten numbers."
    })
