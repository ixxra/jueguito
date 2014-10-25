import game
import bobo
import os


@bobo.query('/')
def index():
    return open(os.path.join(os.path.dirname(__file__),
        'public/index.html')).read()

@bobo.query('/api/v0.1/question/:id', content_type='application/json')
def question(id):
    try:
        return game.get_question(int(id))
    except AssertionError:
        raise bobo.NotFound


@bobo.query('/api/v0.1/game/new', content_type='application/json')
def new_game():
    return game.new_game()


@bobo.query('/api/v0.1/game/records', content_type='application/json')
def get_records():
    return [
        {
            'name': n, 
            'game': g, 
            'points': p
        } for \
        n, g, p in game.get_records()
    ]


@bobo.query('/api/v0.1/game/patrick/:id', content_type='application/json')
def get_patrick(id):
    try:
        return game.get_crystal(int(id))
    except AssertionError:
        raise bobo.NotFound
