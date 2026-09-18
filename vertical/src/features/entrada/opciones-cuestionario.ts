import type { SelectOption } from './catalogos';

export const unknown = { value: 'unknown', label: 'No lo sé; necesito revisarlo' };
export const options = (items: [string, string][]): SelectOption[] => items.map(([value, label]) => ({ value, label }));
export const choices = (items: [string, string][]): SelectOption[] => [...options(items), unknown];
export const yesNo = choices([['yes', 'Sí'], ['no', 'No']]);
export const permits = options([
  ['work', 'Residencia y trabajo por cuenta ajena'], ['self', 'Residencia y trabajo por cuenta propia'],
  ['nonprofit', 'Residencia no lucrativa'], ['family', 'Residencia por reagrupación familiar'],
  ['spanishFamily', 'Residencia como familiar de una persona española'], ['euFamily', 'Tarjeta de familiar de ciudadano de la Unión'],
  ['arraigo', 'Residencia por arraigo'], ['humanitarian', 'Residencia por razones humanitarias'],
  ['professional', 'Profesional cualificado, tarjeta azul o traslado de empresa'], ['remote', 'Teletrabajo internacional'],
  ['brexit', 'Residencia por el Acuerdo de Retirada (Brexit)'], ['other', 'Otra autorización'],
]);
export const relationships = choices([
  ['spouse', 'Cónyuge: estamos casados'], ['partner', 'Pareja: no estamos casados'],
  ['child', 'Hijo o hija'], ['parent', 'Madre o padre'], ['sibling', 'Hermano o hermana'], ['other', 'Otro familiar'],
]);
export const nationalityTies = choices([
  ['born', 'Nací en España'], ['spouse', 'Estoy casado/a con una persona española'],
  ['parent', 'Mi madre o mi padre es o fue español'], ['grandparent', 'Alguno de mis abuelos es o fue español'],
  ['refugee', 'Tengo reconocida la condición de refugiado/a'], ['former', 'Tuve nacionalidad española y la perdí'],
  ['other', 'Otro vínculo que quiero revisar'], ['none', 'Ninguna de estas situaciones'],
]);
