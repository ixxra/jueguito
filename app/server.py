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
