from django.shortcuts import render

# Create your views here.
def apps(request):
    return render(request, 'base.html', {
        'title': "Apps",
        'description': 'The list of the web apps I have created.'
    })
