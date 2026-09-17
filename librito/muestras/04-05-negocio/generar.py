#!/usr/bin/env python3
"""Páginas 04–05. Relato secuencial: negocio y oportunidad.
Datos editoriales en las carpetas de cada página. No altera los PDF aprobados.
"""
from pathlib import Path
import importlib.util
import json
import tempfile
import hashlib
import pymupdf
from pypdf import PdfReader
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.colors import HexColor

HERE=Path(__file__).resolve().parent
BOOK=HERE.parents[1]; ROOT=BOOK.parent; SLIDES=BOOK/'slides'
spec=importlib.util.spec_from_file_location('recursos_portada',SLIDES/'01-portada/generar-horizontal.py')
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
W,H=base.ANCHO,base.ALTO
BLUE,DARK,WHITE,LIGHT=[base.COLORES[k] for k in ('as-blue-brand','as-blue-dark','as-white','as-blue-light')]
MUTED='#435e70'; PALE='#edf7fd'; LINE='#c7dbe8'
P4=SLIDES/'04-cadena-de-valor/variantes/01-recorrido'
P5=SLIDES/'05-oportunidad/variantes/01-escala'
PREVIOUS=[SLIDES/'01-portada/03-diagonal.pdf',SLIDES/'02-presentacion/variantes/01-candidatura/pagina.pdf',SLIDES/'03-direccion-tecnologica/variantes/01-direccion/pagina.pdf']

class P:
    def __init__(self,c): self.c=c
    def text(self,s,x,y,size=11.5,weight='Regular',ink=DARK,tracking=0):
        self.c.setFillColor(HexColor(ink));t=self.c.beginText(x,H-y);t.setFont('Jakarta-'+weight,size);t.setCharSpace(tracking);t.textOut(s);self.c.drawText(t)
    def centered(self,s,x,y,size=11.5,weight='Regular',ink=DARK):
        width=pdfmetrics.stringWidth(s,'Jakarta-'+weight,size);self.text(s,x-width/2,y,size,weight,ink)
    def para(self,s,x,y,width,size=11.5,leading=17,ink=MUTED,weight='Regular'):
        lines=[];line=''
        for word in s.split():
            trial=(line+' '+word).strip()
            if line and pdfmetrics.stringWidth(trial,'Jakarta-'+weight,size)>width: lines.append(line);line=word
            else: line=trial
        if line: lines.append(line)
        for i,line in enumerate(lines): self.text(line,x,y+i*leading,size,weight,ink)
        return y+len(lines)*leading
    def line(self,x,y,x2,y2,ink=BLUE,width=1):
        self.c.setStrokeColor(HexColor(ink));self.c.setLineWidth(width);self.c.setLineCap(1);self.c.line(x,H-y,x2,H-y2)
    def circle(self,x,y,r,fill=WHITE,stroke=None,width=1):
        self.c.setFillColor(HexColor(fill));self.c.setStrokeColor(HexColor(stroke or fill));self.c.setLineWidth(width);self.c.circle(x,H-y,r,stroke=bool(stroke),fill=1)
    def rect(self,x,y,w,h,fill=WHITE,stroke=None,r=0):
        self.c.setFillColor(HexColor(fill));self.c.setStrokeColor(HexColor(stroke or fill));self.c.setLineWidth(.8)
        if r:self.c.roundRect(x,H-y-h,w,h,r,stroke=bool(stroke),fill=1)
        else:self.c.rect(x,H-y-h,w,h,stroke=bool(stroke),fill=1)
    def path(self,points,ink=BLUE,width=1):
        self.c.setStrokeColor(HexColor(ink));self.c.setLineWidth(width);p=self.c.beginPath();p.moveTo(points[0][0],H-points[0][1])
        for x,y in points[1:]:p.lineTo(x,H-y)
        self.c.drawPath(p,stroke=1,fill=0)
    def poly(self,points,fill):
        self.c.setFillColor(HexColor(fill));p=self.c.beginPath();p.moveTo(points[0][0],H-points[0][1])
        for x,y in points[1:]:p.lineTo(x,H-y)
        p.close();self.c.drawPath(p,stroke=0,fill=1)
    def arrowhead(self,x,y,ink=BLUE,size=4):
        self.path([(x-size,y-size),(x,y),(x-size,y+size)],ink,1.4)
    def slanted(self,s,x,y,size=48,angle=4):
        c=self.c;c.saveState();c.translate(x,H-y);c.rotate(angle);c.setFillColor(HexColor(BLUE));t=c.beginText(0,0);t.setFont('Jakarta-ExtraBold',size);t.setCharSpace(-1.4);t.textOut(s);c.drawText(t);c.restoreState()


def footer(p,number,message):
    p.text(message,34 if number%2==0 else 43,399,7.3,'SemiBold',MUTED,.12)
    p.text(str(number).zfill(2),545,399,9,'SemiBold')


def route(p,data):
    """Una sola línea de valor con bifurcación documental, sin prometer concesión."""
    centers=[64,160,294,424,526]
    p.text('EL RECORRIDO DEL CLIENTE',35,217,7.5,'SemiBold',MUTED,.7)
    for x,stage in zip(centers,data['etapas']):p.centered(stage['titulo'],x,239,10.2,'SemiBold')
    # Enlace común, con dos formas de preparar documentos que convergen antes de revisar.
    p.line(64,273,211,273,BLUE,2)
    p.path([(211,273),(231,257),(248,257)],BLUE,1.6)
    p.path([(211,273),(231,295),(248,295)],BLUE,1.6)
    p.path([(344,257),(363,257),(383,273)],BLUE,1.6)
    p.path([(344,295),(363,295),(383,273)],BLUE,1.6)
    p.line(383,273,526,273,BLUE,2)
    for i in (0,1,3,4):
        x=centers[i]
        p.circle(x,273,9, BLUE if i<4 else DARK)
        p.circle(x,273,2.8,WHITE)
    p.arrowhead(112,273);p.arrowhead(202,273);p.arrowhead(394,273);p.arrowhead(478,273)
    # La tercera etapa tiene una bifurcación explícita, no una actividad duplicada.
    p.rect(233,245,122,24,WHITE,LINE,5)
    p.rect(233,283,122,24,PALE,None,5)
    p.centered(data['etapas'][2]['opciones'][0],294,260,8.5,'SemiBold')
    p.centered(data['etapas'][2]['opciones'][1],294,298,8.5,'SemiBold',base.COLORES['as-blue-medium'])
    p.line(35,317,551,317,LINE,.5)
    p.text('LO QUE APORTA EL DESPACHO',35,331,7.5,'SemiBold',MUTED,.7)
    for i,x in enumerate(centers):
        vals=data['etapas'][i]['valor']
        for j,line in enumerate(vals):p.centered(line,x,348+j*12,9.5,ink=MUTED)
    p.text(data['nota'],35,377,8.5,ink=MUTED)


def page4(p,data):
    p.text('EL PUNTO DE PARTIDA',35,43,8.5,'SemiBold',MUTED,1)
    p.text(data['lineasTitulo'][0],32,96,40,'ExtraBold',tracking=-1.4)
    p.slanted(data['lineasTitulo'][1],35,158,53,4)
    p.para(data['intro'],35,182,502,11.3,16,DARK)
    route(p,data)
    footer(p,4,data['puente'])


def page5(p,data):
    p.text('LA OPORTUNIDAD',43,43,8.5,'SemiBold',MUTED,1)
    p.text(data['lineasTitulo'][0],39,103,42,'ExtraBold',tracking=-1.4)
    p.slanted(data['lineasTitulo'][1],43,166,47,3)
    p.para(data['intro'],43,207,511,11.5,17,DARK)
    # Un campo continuo recoge la diagonal de portada; tres resultados, sin tarjetas.
    p.poly([(43,276),(561,244),(561,376),(43,376)],DARK)
    p.poly([(43,276),(561,244),(561,252),(43,284)],BLUE)
    for i,item in enumerate(data['objetivos']):
        x=59+i*169
        p.text(item['titulo'],x,310,22,'ExtraBold',WHITE,-.6)
        p.para(item['texto'],x,331,141,10.5,14.5,'#d0e3ee')
    footer(p,5,data['puente'])


def export(path,fn,number,data):
    c=canvas.Canvas(str(path),pagesize=(W,H),pageCompression=1,invariant=1)
    c.setTitle(f'Página {number:02d} / '+data['titulo']);c.setAuthor('Pol Surriel Muixench');c.setSubject('Negocio y oportunidad / Candidatura a Antonio Segura Abogados / Propuesta en revisión');c.setTrimBox((0,0,W,H))
    fn(P(c),data);c.showPage();c.save()
    with pymupdf.open(path) as d:d[0].get_pixmap(dpi=240,alpha=False).save(path.with_suffix('.png'))


def verify(path):
    r=PdfReader(path);assert len(r.pages)==1
    assert abs(float(r.pages[0].mediabox.width)-W)<.01 and abs(float(r.pages[0].mediabox.height)-H)<.01
    for ref in r.pages[0]['/Resources']['/Font'].values():
        f=ref.get_object()
        if 'Jakarta' in str(f.get('/BaseFont','')):assert '/FontFile2' in f['/FontDescriptor']
    with pymupdf.open(path) as d:
        for block in d[0].get_text('dict')['blocks']:
            if block['type']!=0:continue
            for line in block['lines']:
                for span in line['spans']:
                    x0,y0,x1,y1=span['bbox'];assert 0<x0<x1<W and 0<y0<y1<H,(path,span)


def main():
    before={p:hashlib.sha256(p.read_bytes()).hexdigest() for p in PREVIOUS}
    with tempfile.TemporaryDirectory(prefix='asa-negocio-') as temp:
        base.fuentes(Path(temp))
        for target,fn,num in [(P4,page4,4),(P5,page5,5)]:
            export(target/'pagina.pdf',fn,num,json.loads((target/'texto.json').read_text()));verify(target/'pagina.pdf')
    spread=pymupdf.open();page=spread.new_page(width=2*W,height=H)
    for i,target in enumerate([P4,P5]):
        with pymupdf.open(target/'pagina.pdf') as d:page.show_pdf_page(pymupdf.Rect(i*W,0,(i+1)*W,H),d,0)
    spread.set_metadata({'title':'Páginas 04–05 / Negocio y oportunidad','author':'Pol Surriel Muixench'})
    spread.save(HERE/'negocio-04-05.pdf',deflate=True);page.get_pixmap(dpi=170,alpha=False).save(HERE/'negocio-04-05.png')
    book=pymupdf.open()
    for target in PREVIOUS+[P4/'pagina.pdf',P5/'pagina.pdf']:
        with pymupdf.open(target) as d:book.insert_pdf(d)
    book.set_metadata({'title':'Librito en orden / Páginas 01–05','author':'Pol Surriel Muixench'})
    book.save(HERE/'librito-01-05.pdf',deflate=True)
    assert all(hashlib.sha256(p.read_bytes()).hexdigest()==before[p] for p in PREVIOUS)
    print('Páginas 04–05 generadas. Secuencia 01–05. Tamaño, fuentes y límites verificados. Originales 01–03 intactos.')

if __name__=='__main__':main()
