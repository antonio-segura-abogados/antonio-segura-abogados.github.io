"""QR vectorial y etiqueta inclinada común a las páginas del librito.

Las coordenadas parten de la esquina superior izquierda. La etiqueta se coloca
fuera del código: conserva tamaño, URL, corrección M y cuatro módulos blancos.
Los colores y las fuentes proceden de la composición que llama al componente.
"""
import math

from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics


def codigo(cv, alto, url, x, top, lado, borde):
    qr = QrCodeWidget(url, barLevel='M', barBorder=4)
    qr.qr.make()
    celda = lado / (qr.qr.moduleCount + 8)
    cv.saveState()
    cv.setFillColor(HexColor('#ffffff'))
    cv.setStrokeColor(HexColor(borde))
    cv.setLineWidth(.7)
    cv.roundRect(x - 1, alto - top - lado - 1, lado + 2, lado + 2, 4,
                 fill=1, stroke=1)
    cv.setFillColor(HexColor('#000000'))
    for fila, valores in enumerate(qr.qr.modules):
        for columna, tinta in enumerate(valores):
            if tinta:
                cv.rect(x + (columna + 4) * celda,
                        alto - top - (fila + 5) * celda,
                        celda, celda, fill=1, stroke=0)
    cv.restoreState()
    cv.linkURL(url, (x, alto - top - lado, x + lado, alto - top),
               relative=0, thickness=0)


def medidas(texto, tamano=9.2):
    ancho = pdfmetrics.stringWidth(texto, 'Jakarta-ExtraBold', tamano) + 34
    altura = tamano + 10
    angulo = math.radians(5)
    return (ancho * math.cos(angulo) + altura * math.sin(angulo),
            ancho * math.sin(angulo) + altura * math.cos(angulo))


def etiqueta(cv, alto, texto, x, top, color, url, direccion='izquierda', tamano=9.2):
    """Banda ascendente a 5°, con flecha hacia el QR y enlace en toda la banda."""
    ancho = pdfmetrics.stringWidth(texto, 'Jakarta-ExtraBold', tamano) + 34
    altura = tamano + 10
    caja_ancho, caja_alto = medidas(texto, tamano)
    cv.saveState()
    cv.translate(x + altura * math.sin(math.radians(5)), alto - top - caja_alto)
    cv.rotate(5)
    cv.setFillColor(HexColor(color))
    cv.roundRect(0, 0, ancho, altura, 2, fill=1, stroke=0)
    cv.setFillColor(HexColor('#ffffff'))
    rotulo = cv.beginText(25 if direccion == 'izquierda' else 9, 5.4)
    rotulo.setFont('Jakarta-ExtraBold', tamano)
    rotulo.setCharSpace(0)
    rotulo.textOut(texto)
    cv.drawText(rotulo)
    cv.setStrokeColor(HexColor('#ffffff'))
    cv.setLineWidth(1.15)
    cv.setLineCap(1)
    cv.setLineJoin(1)
    centro_y = altura / 2
    if direccion == 'izquierda':
        puntos = [(18, centro_y), (9, centro_y), (12, centro_y + 3)]
        remate = [(9, centro_y), (12, centro_y - 3)]
    elif direccion == 'derecha':
        puntos = [(ancho - 19, centro_y), (ancho - 10, centro_y), (ancho - 13, centro_y + 3)]
        remate = [(ancho - 10, centro_y), (ancho - 13, centro_y - 3)]
    else:
        puntos = [(ancho - 14, centro_y - 4), (ancho - 14, centro_y + 4), (ancho - 17, centro_y + 1)]
        remate = [(ancho - 14, centro_y + 4), (ancho - 11, centro_y + 1)]
    for coordenadas in (puntos, remate):
        trazo = cv.beginPath()
        trazo.moveTo(*coordenadas[0])
        for punto in coordenadas[1:]:
            trazo.lineTo(*punto)
        cv.drawPath(trazo)
    cv.restoreState()
    cv.linkURL(url, (x, alto - top - caja_alto, x + caja_ancho, alto - top),
               relative=0, thickness=0)
    return caja_ancho, caja_alto


def demo(p, alto, datos, url, x, top, tx, ancho_texto, azul, borde, tenue):
    codigo(p.c, alto, url, x, top, 28 * 72 / 25.4, borde)
    direccion = 'izquierda' if x < tx else 'derecha'
    etiqueta(p.c, alto, 'Demo interactiva', tx, top + 1, azul, url, direccion)
    p.text(datos['qrTitulo'], tx, top + 40, 10, 'SemiBold')
    final = p.para(datos['qrDetalle'], tx, top + 54, ancho_texto, 9, 12)
    assert final <= top + 78, 'El detalle del QR debe ocupar como máximo dos líneas.'
    p.text('Datos ficticios', tx, final, 7.2, ink=tenue)
