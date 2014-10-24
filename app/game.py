import random
import csv
'''
def p_score(n):
    if n == 0:
        print 'tienes', n, 'puntos x.x'
    if n == 1:
        print 'tienes', n, 'punto :D'
    if n > 1:
        print 'tienes', n, 'puntos :D'
'''

def get_question(id):
    assert isinstance(id, int) and 0 <= id and id < 20, \
        'Invalid id'

    image = 'solucion{0}.gif'.format(id)
    f = open('data/preguntas')
    
    for i in range(id + 1):
        body = f.readline()

    body = body.strip()

    hints = []
    ops = [open('data/' + f) for f in ('opcionA', 'opcionB', 'opcionC')]

    for i in range(id + 1):
        hints = [ f.readline().strip()[2:] for f in ops]

    f = open('data/respuestas')
    for i in range(id + 1):
        answer = f.readline()
    answer = answer.strip()

    return {'id': id, 
            'body': body,
            'hints': [
                    {'id': 'a', 'text': hints[0]},
                    {'id': 'b', 'text': hints[1]},
                    {'id': 'c', 'text': hints[2]}
                ],
            'answer': {
                'id': answer,
                'img': image
            }    
        }
   

def new_game():
    total = list(range(20))
    random.shuffle(total)

    return total[:10]


def get_records():
    r = csv.reader(open('record'))
    next(r) #We skip the header
    recs = [(n, g, int(p)) for n, g, p in r]
    return sorted(recs, key=lambda x: x[-1], reverse=True)
    

def save_record(name:str, game:str, points:int):
    w = csv.writer(open('record', 'a'))
    w.writerow([name, game, points])


#x = raw_input('Bienvenido!, si quieres saber como jugar escribe h y presiona enter, si no, simplemente presiona enter para empezar a jugar ')

#if 'h' == ' '.join(x.lower().strip().split()):
#    print 'Hola amiguito!, En este juego te haremos preguntas de cirstalografia.\nCada que te hagamos una pregunta te mostraremos 3 opciones con indices\n tu debes escribir el indice de tu respuesta en el teclado y presionar enter.\n Diviertete! :D'

#open('record', 'a').write(x + ' ' + str(puntos) + '\n')

#record = open('record').read().splitlines()

#scoreboard = []

#for line in record:
#    a = ' '.join(line.split()[:-1])
#    b = int(line.split()[-1])
#    scoreboard.append((a,b))
    
#scoreboard = sorted(scoreboard, key=lambda (n, p): p, reverse=True)

#scores = [a + ' ' + str(b) for (a,b) in scoreboard]


#print ''.join([a + '\n' for a in scores])
