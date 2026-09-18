const carpeta = '../../../../recursos-compartidos/assets/ccse/tematicas';
const iconos = import.meta.glob<string>('../../../../recursos-compartidos/assets/ccse/tematicas/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
});

// El título visible identifica la temática; la ilustración no duplica su lectura.
export function IconoTematica({ id }: { id: string }) {
  return <img className="practice-topic-icon" src={iconos[`${carpeta}/${id}.svg`]} alt="" aria-hidden="true" width={128} height={128} decoding="async" />;
}
