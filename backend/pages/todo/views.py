from django.shortcuts import render

# Create your views here.
def todo(request):
    return render(request, 'base.html', {
        'title': "To-do List",
        'description': "Keep track of your to-do list."
    })
