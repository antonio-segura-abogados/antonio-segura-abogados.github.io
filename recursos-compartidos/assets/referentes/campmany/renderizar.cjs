/** Rasteriza los originales SVG sin cambiar geometría, proporciones ni colores. */
const fs = require('node:fs');
const path = require('node:path');
const { Resvg } = require(process.argv[2] || '@resvg/resvg-js');

for (const name of ['logo-oficial', 'premium-hero-oficial']) {
  const svg = fs.readFileSync(path.join(__dirname, `${name}.svg`));
  const rendered = new Resvg(svg, { fitTo: { mode: 'width', value: 1800 } }).render();
  fs.writeFileSync(path.join(__dirname, `${name}.png`), rendered.asPng());
  console.log(`${name}: ${rendered.width} × ${rendered.height} px`);
}
