#!/usr/bin/env python3
"""Apertura en orden: portada elegida, candidatura personal y argumento de dirección.
Los textos editables están junto a cada página; no cambia la portada elegida.
"""
from pathlib import Path
import importlib.util
import json
import tempfile
from PIL import Image, ImageDraw, ImageFont
import pymupdf
from pypdf import PdfReader
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics

HERE=Path(__file__).resolve().parent
BOOK=HERE.parents[1]; ROOT=BOOK.parent; SLIDES=BOOK/'slides'
spec=importlib.util.spec_from_file_location('recursos',SLIDES/'01-portada/generar-horizontal.py')
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
W,H=base.ANCHO,base.ALTO
BLUE,DARK,WHITE=[base.COLORES[key] for key in ('as-blue-brand','as-blue-dark','as-white')]
spec=importlib.util.spec_from_file_location('etiqueta_qr',ROOT/'recursos-compartidos/qr/etiqueta.py')
qr_diseno=importlib.util.module_from_spec(spec);spec.loader.exec_module(qr_diseno)
MUTED='#435e70'
P2=SLIDES/'02-presentacion/variantes/01-candidatura'
P3=SLIDES/'03-direccion-tecnologica/variantes/01-direccion'
REPORT=ROOT/'recursos-compartidos/investigacion/informes/anthropic-economic-scenarios-2026-09.pdf'
QR_DATA=json.loads((ROOT/'recursos-compartidos/qr/destinos.json').read_text())
REPORT_URL=next(e['url'] for e in QR_DATA['external'] if e['id']=='informe-anthropic')

class P:
    def __init__(self,c): self.c=c
    def text(self,s,x,y,size=11.5,weight='Regular',ink=DARK,tracking=0):
        self.c.setFillColor(HexColor(ink));t=self.c.beginText(x,H-y);t.setFont('Jakarta-'+weight,size);t.setCharSpace(tracking);t.textOut(s);self.c.drawText(t)
    def para(self,s,x,y,width,size=11.5,leading=18,ink=MUTED,weight='Regular'):
        lines=[];line=''
        for word in s.split():
            trial=(line+' '+word).strip()
            if line and pdfmetrics.stringWidth(trial,'Jakarta-'+weight,size)>width: lines.append(line);line=word
            else: line=trial
        if line: lines.append(line)
        for i,line in enumerate(lines): self.text(line,x,y+i*leading,size,weight,ink)
        return y+len(lines)*leading
    def line(self,x,y,x2,y2,ink=BLUE,thickness=1):
        self.c.setStrokeColor(HexColor(ink));self.c.setLineWidth(thickness);self.c.line(x,H-y,x2,H-y2)
    def rect(self,x,y,w,h,ink):
        self.c.setFillColor(HexColor(ink));self.c.rect(x,H-y-h,w,h,fill=1,stroke=0)
    def arrow(self,x,y,length=38,ink=BLUE,thickness=2):
        self.line(x,y,x+length,y,ink,thickness);self.line(x+length-9,y-9,x+length,y,ink,thickness);self.line(x+length-9,y+9,x+length,y,ink,thickness)


def footer(p,n,message):
    p.text(message,34 if n==2 else 43,399,7.5,'SemiBold',MUTED,.2)
    p.text(str(n).zfill(2),545,399,9,'SemiBold')


def page2(p,text):
    p.text('UNA CANDIDATURA PERSONAL',35,43,8.5,'SemiBold',MUTED,1)
    p.text('Quiero trabajar',31,117,47,'ExtraBold',tracking=-1.7)
    # La segunda línea recupera el gesto ascendente de la portada, sobre papel blanco.
    c=p.c;c.saveState();c.translate(36,H-199);c.rotate(5)
    c.setFillColor(HexColor(BLUE));t=c.beginText(0,0);t.setFont('Jakarta-ExtraBold',59);t.setCharSpace(-2.1);t.textOut('con vosotros.');c.drawText(t)
    c.restoreState()
    p.arrow(498,181,48,BLUE,2.6)
    # Cuerpo breve, una sola lectura. La firma es un segundo foco humano.
    y=p.para(text['parrafos'][0],35,247,318,12,19,DARK)
    p.para(text['parrafos'][1],35,y+11,318,11.5,18,MUTED)
    p.line(407,262,444,262,BLUE,3)
    p.text('Pol',405,299,28,'ExtraBold',tracking=-.8)
    p.text('Surriel',405,329,28,'ExtraBold',tracking=-.8)
    p.text('Candidatura a',407,351,8.5,'Regular',MUTED)
    p.text('director tecnológico',407,365,8.5,'SemiBold',DARK)
    footer(p,2,'ANTONIO SEGURA ABOGADOS / UNA PROPUESTA PARA VUESTRO EQUIPO')


def qr(p,x,y,side=79.37):
    qr_diseno.codigo(p.c,H,REPORT_URL,x,y,side,base.COLORES['as-blue-light'])


def page3(p,text,capture):
    p.text('EL CAMBIO QUE VIENE',43,43,8.5,'SemiBold',MUTED,1)
    p.text('El cambio',40,99,38,'ExtraBold',tracking=-1.2)
    p.text('necesita',40,140,38,'ExtraBold',tracking=-1.2)
    p.text('dirección.',39,187,44,'ExtraBold',BLUE,-1.5)
    p.para(text['argumento'],43,224,270,11.5,17,DARK)
    qr(p,41,300)
    qr_diseno.etiqueta(p.c,H,'Informe completo aquí',138,301,BLUE,REPORT_URL,tamano=8.8)
    p.text('Economic Scenarios for',138,348,8.5,'SemiBold',MUTED)
    p.text('Transformative AI',138,361,8.5,'SemiBold',MUTED)
    p.text('Anthropic Institute · 2026',138,378,8.2,ink=MUTED)
    p.text('TRES ESCENARIOS DE IA',354,75,8.5,'SemiBold',MUTED,.5)
    # Extracto real del primer panel, sin redibujar datos, recortar escenarios ni suprimir ejes.
    p.c.drawImage(str(capture),347,H-95-224.7,width=192,height=224.7,mask='auto')
    p.para('Empleo cognitivo en EE. UU. Los tres escenarios incluyen ocupaciones jurídicas; no son predicciones.',350,338,199,8.5,12,MUTED)
    p.text('Fuente: fig. 4, p. 34; sectores, p. 25.',350,381,8.5,ink=MUTED)
    footer(p,3,'EL PRIMER PASO: ENTENDER VUESTRO NEGOCIO.')


def export(target,fun,n,text,capture=None):
    c=canvas.Canvas(str(target),pagesize=(W,H),pageCompression=1,invariant=1)
    c.setTitle(f'Página {n:02d} / '+text['titulo']);c.setAuthor('Pol Surriel Muixench');c.setSubject('Candidatura personal a Antonio Segura Abogados; propuesta en revisión');c.setTrimBox((0,0,W,H))
    p=P(c)
    if capture: fun(p,text,capture)
    else: fun(p,text)
    c.showPage();c.save()
    with pymupdf.open(target) as d: d[0].get_pixmap(dpi=240,alpha=False).save(target.with_suffix('.png'))


def verify(path):
    reader=PdfReader(path);assert len(reader.pages)==1
    assert abs(float(reader.pages[0].mediabox.width)-W)<.01
    for ref in reader.pages[0]['/Resources']['/Font'].values():
        f=ref.get_object()
        if 'Jakarta' in str(f.get('/BaseFont','')): assert '/FontFile2' in f['/FontDescriptor']
    with pymupdf.open(path) as d:
        for b in d[0].get_text('dict')['blocks']:
            if b['type']!=0:continue
            for line in b['lines']:
                for span in line['spans']:
                    x0,y0,x1,y1=span['bbox'];assert 0<x0<x1<W and 0<y0<y1<H,(path,span)


def main():
    with tempfile.TemporaryDirectory(prefix='asa-apertura-') as work:
        tmp=Path(work);base.fuentes(tmp)
        capture=P3/'extracto-informe-figura-4.png'
        with pymupdf.open(REPORT) as report:
            report[33].get_pixmap(dpi=400,clip=pymupdf.Rect(90,115,231,280),alpha=False).save(capture)
        export(P2/'pagina.pdf',page2,2,json.loads((P2/'texto.json').read_text()))
        export(P3/'pagina.pdf',page3,3,json.loads((P3/'texto.json').read_text()),capture)
        for target in [P2/'pagina.pdf',P3/'pagina.pdf']:verify(target)
        book=pymupdf.open()
        for path in [SLIDES/'01-portada/03-diagonal.pdf',P2/'pagina.pdf',P3/'pagina.pdf']:
            with pymupdf.open(path) as d:book.insert_pdf(d)
        book.set_metadata({'title':'Apertura / Páginas 01–03 en orden','author':'Pol Surriel Muixench'})
        book.save(HERE/'apertura-en-orden.pdf',deflate=True)
        spread=pymupdf.open();page=spread.new_page(width=2*W,height=H)
        for i,target in enumerate([P2/'pagina.pdf',P3/'pagina.pdf']):
            with pymupdf.open(target) as d: page.show_pdf_page(pymupdf.Rect(i*W,0,(i+1)*W,H),d,0)
        # Preservar también la acción del QR en la versión enfrentada.
        page.insert_link({'kind':pymupdf.LINK_URI,'from':pymupdf.Rect(W+41,300,W+120.37,379.37),'uri':REPORT_URL})
        spread.set_metadata({'title':'Primera apertura / Páginas 02–03','author':'Pol Surriel Muixench'})
        spread.save(HERE/'apertura-02-03.pdf',deflate=True)
        page.get_pixmap(dpi=170,alpha=False).save(HERE/'apertura-02-03.png')
        # QR a escala de la página renderizada: comprobación de decodificación posterior.
        with pymupdf.open(P3/'pagina.pdf') as d:
            d[0].get_pixmap(dpi=300,clip=pymupdf.Rect(41,300,120.37,379.37),alpha=False).save(tmp/'qr-prueba.png')
            # Archivo temporal fuera de las carpetas de entregables.
            (Path('/private/tmp')/'asa-qr-impreso.png').write_bytes((tmp/'qr-prueba.png').read_bytes())
        print('Portada existente conservada; páginas 02 y 03 generadas en orden; A5 y fuentes verificados; QR real incorporado.')

if __name__=='__main__': main()
