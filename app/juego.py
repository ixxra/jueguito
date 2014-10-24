import turtle as t
from random import shuffle
from time import time

wn = t.Screen()

wn.title('Cristales :D!')

def p_score(n):
    if n == 0:
        print 'tienes', n, 'puntos x.x'
    if n == 1:
        print 'tienes', n, 'punto :D'
    if n > 1:
        print 'tienes', n, 'puntos :D'

imagenes = ['solucion' + str(i) + '.gif' for i in range(20)]

for imagen in imagenes:
    t.register_shape(imagen)

t.register_shape('error.gif')

t.register_shape('sugerencia.gif')

pregunta = [l.strip() for l in open('preguntas').read().splitlines() if len(l.strip())>0]

opcionA = [l.strip() for l in open('opcionA').read().splitlines() if len(l.strip())>0]

opcionB = [l.strip() for l in open('opcionB').read().splitlines() if len(l.strip())>0]

opcionC = [l.strip() for l in open('opcionC').read().splitlines() if len(l.strip())>0]

respuesta = [l.strip() for l in open('respuestas').read().splitlines() if len(l.strip())>0]

assert len(pregunta) == len(respuesta), 'no hay la misma cantidad de preguntas que de respuestas'

indice = range(len(pregunta))

shuffle(indice)

puntos = 0

x = raw_input('Bienvenido!, si quieres saber como jugar escribe h y presiona enter, si no, simplemente presiona enter para empezar a jugar ')

if 'h' == ' '.join(x.lower().strip().split()):
    print 'Hola amiguito!, En este juego te haremos preguntas de cirstalografia.\nCada que te hagamos una pregunta te mostraremos 3 opciones con indices\n tu debes escribir el indice de tu respuesta en el teclado y presionar enter.\n Diviertete! :D'

for i in range(10):
    n = indice[i]
    wn.bgpic('sugerencia.gif')
    print pregunta[n]
    print opcionA[n]
    print opcionB[n]
    print opcionC[n]
    x = raw_input()
    if respuesta[n] == ' '.join(x.lower().strip().split()):
#        print 'cambiando el fondo'
        wn.bgpic('solucion'+str(n)+'.gif')
#        print 'solucion'+str(n)+'.gif'
        puntos += 1
        print 'bien! :D'
        p_score(puntos)
#        t = time()
        raw_input('presiona enter para continuar')
#        while time()-t < 6:
#             True
    else:
        wn.bgpic('error.gif')
        print 'no ):, la respuesta es', respuesta[n]
        p_score(puntos)
#        t = time()
        raw_input('presiona enter para continuar')

print 'Felicidades!, has acabado con', puntos, 'puntos'

x = raw_input('Ingresa tu nombre ')

open('record', 'a').write(x + ' ' + str(puntos) + '\n')

record = open('record').read().splitlines()

scoreboard = []

for line in record:
    a = ' '.join(line.split()[:-1])
    b = int(line.split()[-1])
    scoreboard.append((a,b))
    
scoreboard = sorted(scoreboard, key=lambda (n, p): p, reverse=True)

scores = [a + ' ' + str(b) for (a,b) in scoreboard]


print ''.join([a + '\n' for a in scores])
