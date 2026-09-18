import type { CSSProperties } from 'react';

function Rayo() {
  return <svg viewBox="0 0 24 32" fill="currentColor" aria-hidden="true"><path d="M14.5 1 2 18h8L8.5 31 22 12h-8L16 1Z" /></svg>;
}

export function IndicadorRacha({ racha, efecto }: { racha: number; efecto: string }) {
  const mensaje = racha >= 12 ? 'Extraordinario' : racha >= 8 ? 'Imparable' : racha >= 5 ? 'En plena racha' : racha >= 3 ? 'Muy buen ritmo' : racha ? 'Buen comienzo' : 'Cada acierto suma';
  return <div className={`quiz-streak ${efecto} ${racha ? 'is-active' : ''}`} aria-label={`Racha del cuestionario: ${racha} aciertos consecutivos`}>
    <span className="quiz-streak-icon"><Rayo /></span>
    <span className="quiz-streak-copy"><small>RACHA DE ESTA SESIÓN</small><strong>{mensaje}</strong></span>
    <span className="quiz-streak-count" aria-hidden="true"><strong>{racha}</strong><small>{racha === 1 ? 'acierto' : 'seguidos'}</small></span>
  </div>;
}

export function EnergiaRacha({ nivel }: { nivel: number }) {
  const cantidad = 3 + nivel * 3;
  return <div className="quiz-energy" aria-hidden="true">
    <span className="quiz-energy-halo" />
    <span className="quiz-energy-ring" />
    <span className="quiz-energy-core"><Rayo /></span>
    {Array.from({ length: cantidad }, (_, i) => {
      const angulo = (i / cantidad) * Math.PI * 2 - Math.PI / 2;
      const distancia = 42 + nivel * 14 + (i % 2) * 12;
      return <span className="quiz-energy-ray" key={i} style={{
        '--ray-x': `${Math.cos(angulo) * distancia}px`,
        '--ray-y': `${Math.sin(angulo) * distancia * .8}px`,
        '--ray-turn': `${Math.cos(angulo) * 45}deg`,
        '--ray-delay': `${(i % 3) * 35}ms`,
      } as CSSProperties}><Rayo /></span>;
    })}
  </div>;
}
