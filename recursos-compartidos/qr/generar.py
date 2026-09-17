#!/usr/bin/env python3
"""Genera SVG y PNG (negro/blanco, cuatro módulos de margen) del registro.
Generado no equivale a publicado ni a verificado en una prueba física.
"""
from pathlib import Path
import json
from PIL import Image, ImageDraw
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderSVG

HERE=Path(__file__).resolve().parent

def export_qr(url,stem):
    qr=QrCodeWidget(url,barLevel='M',barBorder=4)
    qr.qr.make();count=qr.qr.moduleCount; quiet=4; cell=16
    image=Image.new('RGB',((count+2*quiet)*cell,)*2,'white'); draw=ImageDraw.Draw(image)
    for y,row in enumerate(qr.qr.modules):
        for x,ink in enumerate(row):
            if ink: draw.rectangle(((x+quiet)*cell,(y+quiet)*cell,(x+quiet+1)*cell-1,(y+quiet+1)*cell-1),fill='black')
    image.save(stem.with_suffix('.png'))
    bounds=qr.getBounds(); dimension=bounds[2]-bounds[0]
    drawing=Drawing(dimension,dimension);drawing.add(qr)
    renderSVG.drawToFile(drawing,str(stem.with_suffix('.svg')))
    return {'destino':url,'modulos':count,'margenModulos':quiet,'correccion':'M','png':stem.name+'.png','svg':stem.name+'.svg'}

if __name__=='__main__':
    data=json.loads((HERE/'destinos.json').read_text());out=HERE/'generados';out.mkdir(exist_ok=True)
    entries={}
    for route in data['routes']:
        dest=data['publicBaseUrl']+'#'+route['path']
        if route['id']=='expediente': dest+='?tour=1'
        entries[route['id']]=export_qr(dest,out/route['id'])
        route['qrGenerated']=True
        route['qrUrl']=dest
        route['qrSvg']='generados/'+route['id']+'.svg'
    for source in data.get('external',[]):
        entries[source['id']]=export_qr(source['url'],out/source['id']);source['qrGenerated']=True;source['qrSvg']='generados/'+source['id']+'.svg'
    (HERE/'destinos.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    (out/'registro.json').write_text(json.dumps(entries,ensure_ascii=False,indent=2)+'\n')
    print(f'{len(entries)} QR generados en SVG y PNG. Base: {data["publicBaseUrl"]}')
