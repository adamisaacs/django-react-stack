from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'base.html', {
        'title': "Adam Isaacs' Portfolio",
        'description': 'A portfolio for my web apps.'
    })
