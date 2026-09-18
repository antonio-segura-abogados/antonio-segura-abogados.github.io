import countryData from './paises.json';

export type SelectOption = { value: string; label: string; aliases?: string };
// INE: https://www.ine.es/daco/daco42/codmun/cod_provincia.htm
export const provinces: SelectOption[] = [
  ['01', 'Araba/Álava'], ['02', 'Albacete'], ['03', 'Alicante/Alacant'], ['04', 'Almería'],
  ['05', 'Ávila'], ['06', 'Badajoz'], ['07', 'Illes Balears', 'Baleares'], ['08', 'Barcelona'],
  ['09', 'Burgos'], ['10', 'Cáceres'], ['11', 'Cádiz'], ['12', 'Castellón/Castelló'],
  ['13', 'Ciudad Real'], ['14', 'Córdoba'], ['15', 'A Coruña', 'La Coruña'], ['16', 'Cuenca'],
  ['17', 'Girona', 'Gerona'], ['18', 'Granada'], ['19', 'Guadalajara'], ['20', 'Gipuzkoa', 'Guipúzcoa'],
  ['21', 'Huelva'], ['22', 'Huesca'], ['23', 'Jaén'], ['24', 'León'], ['25', 'Lleida', 'Lérida'],
  ['26', 'La Rioja'], ['27', 'Lugo'], ['28', 'Madrid'], ['29', 'Málaga'], ['30', 'Murcia'],
  ['31', 'Navarra'], ['32', 'Ourense', 'Orense'], ['33', 'Asturias'], ['34', 'Palencia'],
  ['35', 'Las Palmas'], ['36', 'Pontevedra'], ['37', 'Salamanca'], ['38', 'Santa Cruz de Tenerife'],
  ['39', 'Cantabria'], ['40', 'Segovia'], ['41', 'Sevilla'], ['42', 'Soria'], ['43', 'Tarragona'],
  ['44', 'Teruel'], ['45', 'Toledo'], ['46', 'Valencia/València'], ['47', 'Valladolid'],
  ['48', 'Bizkaia', 'Vizcaya'], ['49', 'Zamora'], ['50', 'Zaragoza'], ['51', 'Ceuta'], ['52', 'Melilla'],
].map(([value, label, aliases]) => ({ value, label, aliases })).sort((a, b) => a.label.localeCompare(b.label, 'es'));

// INE, lista de países (10-12-2024), consultada el 18-09-2026:
// https://www.ine.es/daco/daco42/clasificaciones/paisesyterritorios.xls
const aliases: Record<string, string> = {
  '108': 'española español', '115': 'italiana italiano', '343': 'colombiana colombiano',
  '228': 'marroquí', '351': 'venezolana venezolano', '348': 'peruana peruano',
  '340': 'argentina argentino', '345': 'ecuatoriana ecuatoriano', '326': 'dominicana dominicano',
  '303': 'mexicana mexicano', '302': 'estadounidense Estados Unidos', '125': 'británica británico',
  '244': 'Esuatini Eswatini', '143': 'Chequia', '144': 'Eslovaquia', '430': 'Corea del Sur',
  '138': 'Bielorrusia', '121': 'Holanda',
};
export const countries: SelectOption[] = countryData.map(country => ({ value: country.value, label: country.label, aliases: aliases[country.value] }))
  .sort((a, b) => a.label.localeCompare(b.label, 'es'));
export const nationalities: SelectOption[] = [...countries];
nationalities.push({ value: 'stateless', label: 'Sin nacionalidad (apátrida)' }, { value: 'unlisted', label: 'Mi nacionalidad no aparece' });

export function citizenshipOf(value = ''): 'spanish' | 'eu' | 'other' | 'unknown' {
  const selected = value.split(',');
  if (selected.includes('108')) return 'spanish';
  if (countryData.some(country => country.european && selected.includes(country.value))) return 'eu';
  if (!value || selected.includes('unknown') || selected.includes('unlisted')) return 'unknown';
  return 'other';
}
