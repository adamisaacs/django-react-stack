from django.shortcuts import render

# Create your views here.
def ttt(request):
    return render(request, 'base.html', {
        'title': 'Tic-Tac-Toe',
        'description': 'Tic-Tac-Toe game made with the React documentation tutorial.'
    })