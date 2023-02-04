from django.shortcuts import render

# Create your views here.
def iss(request):
    return render(request, 'base.html', {
        'title': "Where's the ISS?",
        'description': "Find out where the ISS is and if it's visible from your location."
    })
