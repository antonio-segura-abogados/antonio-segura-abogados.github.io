#!/usr/bin/env python3
"""EXPLORACIÓN RECHAZADA POR POL. Primera exploración interior: tres parejas A5. Ejecutar con requirements.txt.
La interfaz impresa es una maqueta vectorial editorial, no una captura del navegador.
Comparte datos y tokens con la escena React. No genera códigos QR ficticios.
"""
from pathlib import Path
import importlib.util
import json
import tempfile
import re
from PIL import Image, ImageDraw, ImageFont
import pymupdf
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.colors import HexColor

HERE = Path(__file__).resolve().parent
PROJECT = HERE.parents[2]
BOOK = PROJECT / 'librito'
DATA = json.loads((PROJECT / 'recursos-compartidos/demo/seguimiento.json').read_text())
TOKENS = dict(re.findall(r'--(as-[\w-]+):\s*(#[0-9a-fA-F]{6});', (PROJECT / 'recursos-compartidos/estilos/tokens.css').read_text()))
SPEC = json.loads((BOOK / 'formato.json').read_text())
W, H = SPEC['anchoMm'] * 72/25.4, SPEC['altoMm'] * 72/25.4
BLUE, DARK, ACTION, WHITE = [TOKENS[k] for k in ('as-blue-brand','as-blue-dark','as-blue-medium','as-white')]
PALE, LINE, MUTED, GREEN = '#eef7fd', '#dbe5eb', '#557080', '#287056'
VARIANTS = [('01-editorial','01 / Editorial','Lectura tranquila. Pantalla protagonista.'), ('02-diagonal','02 / Diagonal','Más carácter de portada. Contraste y dirección.'), ('03-anotada','03 / Anotada','Lectura visual. Interfaz, señales y detalle.')]

spec = importlib.util.spec_from_file_location('base_portada', BOOK / 'slides/01-portada/generar-horizontal.py')
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

class P:
    def __init__(self, c, h=H): self.c, self.h = c, h
    def text(self, s, x, y, size=10.5, weight='Regular', color=DARK, tracking=0):
        self.c.setFillColor(HexColor(color)); t=self.c.beginText(x,self.h-y)
        t.setFont('Jakarta-'+weight,size); t.setCharSpace(tracking); t.textOut(s); self.c.drawText(t)
    def para(self, s, x, y, width, size=10.5, leading=15, color=MUTED, weight='Regular'):
        lines=[]; line=''
        for word in s.split():
            trial=(line+' '+word).strip()
            if pdfmetrics.stringWidth(trial,'Jakarta-'+weight,size) > width and line:
                lines.append(line); line=word
            else: line=trial
        if line: lines.append(line)
        for i,line in enumerate(lines): self.text(line,x,y+i*leading,size,weight,color)
        return y+len(lines)*leading
    def box(self,x,y,w,h,fill=WHITE,stroke=None,r=0):
        self.c.setFillColor(HexColor(fill)); self.c.setStrokeColor(HexColor(stroke or fill)); self.c.setLineWidth(.7)
        if r: self.c.roundRect(x,self.h-y-h,w,h,r,fill=1,stroke=bool(stroke))
        else: self.c.rect(x,self.h-y-h,w,h,fill=1,stroke=bool(stroke))
    def line(self,x1,y1,x2,y2,color=LINE,width=.7):
        self.c.setStrokeColor(HexColor(color)); self.c.setLineWidth(width); self.c.line(x1,self.h-y1,x2,self.h-y2)
    def circle(self,x,y,r,fill=BLUE):
        self.c.setFillColor(HexColor(fill)); self.c.circle(x,self.h-y,r,fill=1,stroke=0)
    def poly(self,points,fill):
        self.c.setFillColor(HexColor(fill)); path=self.c.beginPath(); path.moveTo(points[0][0],self.h-points[0][1])
        for x,y in points[1:]: path.lineTo(x,self.h-y)
        path.close(); self.c.drawPath(path,fill=1,stroke=0)
    def arrow(self,x,y,w=15,color=WHITE):
        self.line(x,y,x+w,y,color,1); self.line(x+w-4,y-4,x+w,y,color,1); self.line(x+w-4,y+4,x+w,y,color,1)
    def check(self,x,y,color=GREEN):
        self.line(x-3,y,x-1,y+2,color,1); self.line(x-1,y+2,x+4,y-3,color,1)


def nav_icon(p,name,x,y,color):
    if name=='Inicio':
        p.line(x-5,y,x,y-4,color); p.line(x,y-4,x+5,y,color); p.line(x-4,y,x-4,y+6,color); p.line(x+4,y,x+4,y+6,color); p.line(x-4,y+6,x+4,y+6,color)
    elif name=='Documentos':
        p.box(x-4,y-5,8,12,WHITE,color,1); p.line(x-2,y-1,x+2,y-1,color); p.line(x-2,y+2,x+2,y+2,color)
    elif name=='Práctica':
        p.box(x-6,y-4,12,10,WHITE,color,1); p.line(x,y-4,x,y+6,color)
    elif name=='Consultas':
        p.box(x-6,y-4,12,9,WHITE,color,2); p.line(x-3,y+5,x-4,y+7,color)
    else:
        p.circle(x,y-3,2.5,color); p.line(x-5,y+5,x+5,y+5,color); p.line(x-5,y+5,x-2,y+1,color); p.line(x+5,y+5,x+2,y+1,color)


def home(p,x,y,width):
    """Maqueta vectorial 300 x 535. Etiquetas idénticas al conjunto de datos."""
    s=width/300; height=535*s; c=p.c; c.saveState(); c.translate(x,p.h-y-height); c.scale(s,s); q=P(c,535)
    q.box(3,4,297,530,'#e5edf2',r=17); q.box(0,0,296,530,WHITE,LINE,17)
    c.drawImage(str(PROJECT/'recursos-compartidos/assets/marca/logo-azul-web.jpg'),18,535-53,width=92,height=37.14,mask='auto')
    q.circle(266,32,12,PALE); q.text('L',262,35,9,'SemiBold')
    q.line(18,66,278,66); q.text(DATA['objetivo'],18,81,7.4,'SemiBold'); q.text('AS-2026-0142',222,81,5.8,color=MUTED)
    q.text(DATA['saludo'],18,108,10,color=MUTED); q.text(DATA['titular'],18,130,18,'ExtraBold',tracking=-.4)
    q.box(18,147,260,153,PALE,'#cde2ef',9)
    q.poly([(207,148),(277,148),(277,176)],'#deeffb')
    q.circle(31,163,2.5); q.text('Tu turno',38,166,7.5,'SemiBold',ACTION); q.text('Paso 2 de 5',223,166,6.8,color=MUTED)
    q.text('Completar',30,191,18,'ExtraBold',tracking=-.45); q.text('documentación',30,211,18,'ExtraBold',tracking=-.45)
    q.para(DATA['resumen'],30,229,233,8,11)
    q.box(30,261,236,27,ACTION,r=4); q.text(DATA['cta'],41,278,8,'SemiBold',WHITE); q.arrow(240,274,12)
    q.text('Tu recorrido',18,326,10,'ExtraBold'); q.text('5 etapas',247,326,7,color=MUTED)
    for i,step in enumerate(DATA['pasos']):
        sy=350+i*29
        if i<4: q.line(30,sy+8,30,sy+27,'#a8cbbf' if i==0 else LINE)
        q.circle(30,sy,10, TOKENS['as-green-pale'] if i==0 else ACTION if i==1 else '#f1f6f9')
        if i==0: q.check(30,sy)
        else: q.text(str(i+1).zfill(2),25.4,sy+2.3,6.5,'SemiBold',WHITE if i==1 else MUTED)
        q.text(step['nombre'],49,sy-1,8.4,'SemiBold',ACTION if i==1 else DARK)
        q.text(step['detalle'] if i==1 else step['responsable'],49,sy+10,6.4,color=MUTED)
        if i==1: q.box(241,sy-7,36,13,PALE,r=2); q.text('Ahora',247,sy+2,6.5,'SemiBold',ACTION)
    q.line(0,490,296,490)
    for i,name in enumerate(['Inicio','Documentos','Práctica','Consultas','Perfil']):
        nx=30+i*59; col=ACTION if i==0 else MUTED; nav_icon(q,name,nx,503,col); tw=pdfmetrics.stringWidth(name,'Jakarta-Regular',5.7); q.text(name,nx-tw/2,520,5.7,color=col)
    c.restoreState(); return height


def chrome(p,page,tag):
    p.text('TU APP DE EXTRANJERÍA',34 if page==12 else 43,32,7.3,'SemiBold',ACTION,1.1)
    p.text('SEGUIMIENTO' if page==12 else 'EL PASO ACTUAL',424 if page==12 else 454,32,6.8,'SemiBold',MUTED,.5)
    p.line(34,385,561,385)
    p.text('POL SURRIEL / PROPUESTA PARA AS',34,400,6.5,'SemiBold',MUTED,.4)
    p.text('Concepto de interfaz · Datos ficticios',252,400,6.5,color=MUTED)
    p.text(str(page),544,400,9,'SemiBold')


def title(p,kind,x,y,size=28,color=DARK,gap=31):
    for i,line in enumerate(DATA['editorial'][kind]['titulo']): p.text(line,x,y+gap*i,size,'ExtraBold',color,-.6)


def points(p,x,y,width,spacing=49,color=DARK,body=MUTED,numbered=True,size=10.5):
    for i,point in enumerate(DATA['editorial']['seguimiento']['puntos']):
        bx=x+23 if numbered else x
        if numbered: p.text(str(i+1).zfill(2),x,y+i*spacing,8.5,'SemiBold',BLUE)
        p.text(point['titulo'],bx,y+i*spacing,size,'SemiBold',color)
        p.para(point['texto'],bx,y+15+i*spacing,width-(23 if numbered else 0),9,12,body)


def qr(p,x,y):
    side=SPEC['qrTamanoConZonaSilencioMm']*72/25.4
    p.box(x,y,side,side,WHITE,LINE,3)
    p.text('QR',x+28,y+30,14,'SemiBold',MUTED)
    p.text('PENDIENTE',x+15,y+45,6.5,'SemiBold',MUTED,.4)
    p.text('DE PUBLICACIÓN',x+9,y+55,6,'Regular',MUTED)
    p.text('Explorar la escena',x-1,y+side+12,7.3,'SemiBold',ACTION)


def types(p,x,y,colw=177,rowgap=39,two=True):
    for i,t in enumerate(DATA['tipos']):
        xx=x+(i%2)*colw if two else x
        yy=y+(i//2)*rowgap if two else y+i*rowgap
        p.line(xx,yy-7,xx+10,yy-7,BLUE,2)
        p.text(t['nombre'],xx+18,yy-4,9,'SemiBold')
        p.text(t['detalle'],xx+18,yy+10,8,color=MUTED)


def detail(p,x,y,w,h,compact=False):
    p.box(x+2,y+3,w,h,'#edf2f5',r=8); p.box(x,y,w,h,WHITE,LINE,8)
    p.box(x,y,w,27,PALE,r=8); p.box(x,y+15,w,12,PALE)
    p.circle(x+14,y+14,2.2); p.text('TU TURNO · DOCUMENTACIÓN',x+22,y+17,7,'SemiBold',ACTION,.45)
    p.text('Completar documentación',x+15,y+47,14,'ExtraBold',tracking=-.25)
    if compact:
        docw=w*.49
        for i,doc in enumerate(DATA['documentos']):
            yy=y+69+i*30
            p.text(doc['nombre'],x+15,yy,9,'SemiBold'); p.text(doc['estado'],x+15,yy+12,7,color=GREEN if i==0 else '#86632b')
        p.line(x+docw,y+39,x+docw,y+h-12)
        p.para('Prepara una copia completa y legible. Incluye todas las páginas.',x+docw+15,y+48,w-docw-30,9,13)
        p.box(x+docw+15,y+h-37,w-docw-30,24,ACTION,r=3)
        p.text('Usar documento de ejemplo',x+docw+25,y+h-22,8,'SemiBold',WHITE)
    else:
        for i,doc in enumerate(DATA['documentos']):
            yy=y+69+i*29
            p.line(x+15,yy-10,x+w-15,yy-10)
            p.text(doc['nombre'],x+15,yy+3,9,'SemiBold')
            label=doc['estado']; tw=pdfmetrics.stringWidth(label,'Jakarta-Regular',7)
            p.text(label,x+w-tw-16,yy+3,7,color=GREEN if i==0 else '#86632b')
        p.para('Prepara una copia completa y legible. El equipo te indicará si necesita el original.',x+15,y+131,w-30,9,13)
        p.box(x+15,y+h-31,w-30,24,ACTION,r=3); p.text('Usar documento de ejemplo',x+26,y+h-16,8,'SemiBold',WHITE); p.arrow(x+w-44,y+h-19,13)


def editorial_left(p):
    title(p,'seguimiento',34,86,28)
    p.para(DATA['editorial']['seguimiento']['intro'],34,152,259)
    points(p,34,222,269,spacing=49)
    p.poly([(339,93),(538,65),(538,364),(339,364)],PALE)
    home(p,347,45,184)


def editorial_right(p):
    title(p,'paso',43,79,27)
    p.para(DATA['editorial']['paso']['intro'],287,67,263,10.5,15)
    detail(p,43,137,510,139,compact=True)
    types(p,43,315,194,39)
    qr(p,477,289)


def diagonal_left(p):
    p.poly([(34,49),(291,49),(388,374),(34,374)],DARK)
    p.poly([(34,49),(291,49),(322,153),(34,206)],BLUE)
    title(p,'seguimiento',52,94,25,WHITE,29)
    p.para(DATA['editorial']['seguimiento']['intro'],52,163,217,10.5,15,WHITE)
    points(p,52,247,213,spacing=43,color=WHITE,body='#c4dbe8',numbered=False,size=10)
    home(p,341,46,184)


def diagonal_right(p):
    title(p,'paso',43,81,28)
    p.para(DATA['editorial']['paso']['intro'],290,69,262,10.5,15)
    detail(p,43,144,310,182)
    types(p,381,160,rowgap=35,two=False)
    p.poly([(43,341),(442,323),(442,373),(43,373)],DARK)
    p.text('Un paso preparado para',58,351,10.5,'SemiBold',WHITE)
    p.text('cada situación.',58,366,10.5,'SemiBold',WHITE)
    qr(p,477,289)


def annotated_left(p):
    title(p,'seguimiento',34,88,23,gap=28)
    p.para(DATA['editorial']['seguimiento']['intro'],34,153,166,10.5,15)
    p.text('01',34,274,44,'ExtraBold',BLUE,-2)
    p.text('Una próxima acción.',35,297,10,'SemiBold')
    p.para('Todo empieza por saber qué hacer ahora.',35,316,153,9,13)
    home(p,215,49,176)
    for i,pt in enumerate(DATA['editorial']['seguimiento']['puntos']):
        yy=110+i*87
        p.circle(413,yy-3,9,PALE); p.text(str(i+1),410.5,yy,7.5,'SemiBold',ACTION)
        end=p.para(pt['titulo'],430,yy-1,119,10,13,DARK,'SemiBold')
        p.para(pt['texto'],430,end+6,122,9,13)
        p.line(393,yy-4,403,yy-4,BLUE)
    p.line(35,362,550,362,BLUE,1.5)
    p.text('COMPLETADO',35,376,7,'SemiBold',MUTED,.4)
    p.text('TU TURNO',191,376,7,'SemiBold',ACTION,.4)
    p.text('REVISIÓN',332,376,7,'SemiBold',MUTED,.4)
    p.text('ESPERA',499,376,7,'SemiBold',MUTED,.4)


def annotated_right(p):
    title(p,'paso',43,81,28)
    qr(p,477,48)
    p.para(DATA['editorial']['paso']['intro'],43,141,395,10.5,15)
    detail(p,43,199,510,123,compact=True)
    for i,t in enumerate(DATA['tipos']):
        xx=43+i*129
        p.text(str(i+1).zfill(2),xx,347,7,'SemiBold',ACTION)
        p.text(t['nombre'],xx+18,347,9,'SemiBold')
        p.para(t['detalle'],xx+18,362,106,8,11)


def single(path,fun,page,tag):
    c=canvas.Canvas(str(path),pagesize=(W,H),pageCompression=1,invariant=1)
    c.setTitle(f'{tag} / Página {page} / Propuesta AS'); c.setAuthor('Pol Surriel Muixench'); c.setSubject('Exploración visual. Datos ficticios. QR pendiente de publicación.'); c.setTrimBox((0,0,W,H))
    p=P(c); chrome(p,page,tag); fun(p); c.showPage(); c.save()
    with pymupdf.open(path) as doc:
        doc[0].get_pixmap(dpi=200,alpha=False).save(path.with_suffix('.png'))
    return path


def generate(temp):
    base.fuentes(temp)
    allpages=[]; spreads=[]
    for (slug,title_,desc),(left,right) in zip(VARIANTS,[(editorial_left,editorial_right),(diagonal_left,diagonal_right),(annotated_left,annotated_right)]):
        pair=[]
        for page,folder,fun in [(12,'12-seguimiento',left),(13,'13-paso-actual',right)]:
            target=BOOK/'slides'/folder/'descartadas'/slug; target.mkdir(parents=True,exist_ok=True)
            path=single(target/'pagina.pdf',fun,page,title_); allpages.append(path); pair.append(path)
            (target/'fuente.json').write_text(json.dumps({'variante':slug,'pagina':page,'generador':'../../../../muestras/12-13/generar.py','datos':'../../../../../recursos-compartidos/demo/seguimiento.json','estado':'rechazada por Pol; conservación histórica','descripcion':desc},ensure_ascii=False,indent=2)+'\n')
        spread=pymupdf.open(); out=spread.new_page(width=2*W,height=H)
        for i,path in enumerate(pair):
            with pymupdf.open(path) as d: out.show_pdf_page(pymupdf.Rect(i*W,0,(i+1)*W,H),d,0)
        spread[0].get_pixmap(dpi=150,alpha=False).save(HERE/f'{slug}.png')
        spreads.append(spread)
    combined=pymupdf.open()
    for d in spreads: combined.insert_pdf(d); d.close()
    combined.set_metadata({'title':'Páginas 12-13 / Tres direcciones de interior','author':'Pol Surriel Muixench','subject':'Comparativa de parejas enfrentadas. Orden: editorial, diagonal, anotada. Formato 420 x 148 mm.'})
    combined.save(HERE/'comparativa-12-13.pdf',deflate=True)
    writer=PdfWriter()
    for path in allpages: writer.append(path)
    writer.add_metadata({'/Title':'Muestras A5 / 01 editorial, 02 diagonal, 03 anotada','/Author':'Pol Surriel Muixench'})
    writer._root_object[NameObject('/PageLayout')]=NameObject('/TwoPageLeft')
    with open(HERE/'muestras-a5.pdf','wb') as f: writer.write(f)
    # Vista ampliada de la maqueta utilizada en papel. No es una captura web.
    phone=temp/'home.pdf'; c=canvas.Canvas(str(phone),pagesize=(300,535),invariant=1); home(P(c,535),0,0,300); c.save()
    with pymupdf.open(phone) as d: d[0].get_pixmap(dpi=200,alpha=False).save(PROJECT/'vertical/diseno/seguimiento/home-maqueta.png')
    thumbs=[]; fontfile=temp/'Jakarta-SemiBold.ttf'; font=ImageFont.truetype(str(fontfile),29)
    for slug,head,desc in VARIANTS:
        img=Image.open(HERE/f'{slug}.png').convert('RGB'); img.thumbnail((1900,670))
        board=Image.new('RGB',(1980,780),'#eaf0f4'); draw=ImageDraw.Draw(board); draw.text((40,24),head+'  ·  '+desc,font=font,fill=DARK)
        board.paste(img,(40,83)); thumbs.append(board)
    montage=Image.new('RGB',(1980,780*3),'#eaf0f4')
    for i,t in enumerate(thumbs): montage.paste(t,(0,i*780))
    montage.save(HERE/'comparativa-12-13.png')
    # Cajas, texto y fuentes: comprobaciones estructurales; la revisión visual se hace aparte.
    for path in allpages:
        reader=PdfReader(path); assert len(reader.pages)==1
        assert abs(float(reader.pages[0].mediabox.width)-W)<.01
        assert abs(float(reader.pages[0].mediabox.height)-H)<.01
        fonts=reader.pages[0]['/Resources']['/Font']
        for ref in fonts.values():
            f=ref.get_object()
            if 'Jakarta' in str(f.get('/BaseFont','')):
                fd=f['/FontDescriptor']; assert '/FontFile2' in fd
        with pymupdf.open(path) as d:
            assert 'QR' in d[0].get_text() if 'paso-actual' in str(path) else 'Tu expediente,' in d[0].get_text()
            for block in d[0].get_text('dict')['blocks']:
                if block['type']!=0: continue
                for line in block['lines']:
                    for span in line['spans']:
                        x0,y0,x1,y1=span['bbox']; assert 0<=x0<x1<=W and 0<=y0<y1<=H, (path,span)
    print('6 páginas A5 verificadas; 3 parejas; tipografía incrustada; comparativa y maqueta ampliada generadas.')

if __name__=='__main__':
    with tempfile.TemporaryDirectory(prefix='asa-interior-') as tmp: generate(Path(tmp))
