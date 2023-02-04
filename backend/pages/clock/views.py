from django.shortcuts import render

# Create your views here.
def clock(request):
    return render(request, 'base.html', {
        'title': "Circular Clock",
        'description': 'A circular clock with a simple aesthetic.'
    })
