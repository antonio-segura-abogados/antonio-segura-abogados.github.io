// Entrevista de contexto, sin decisión automática de elegibilidad. Fuentes y auditoría en diseno/entrevista.
import { citizenshipOf, countries, nationalities, provinces, type SelectOption } from './catalogos';
import { choices, nationalityTies, options, permits, relationships, yesNo } from './opciones-cuestionario';
export const goals = [
  { id: 'nacionalidad', label: 'Solicitar la nacionalidad' },
  { id: 'residencia', label: 'Gestionar mi residencia' },
  { id: 'regularizar', label: 'Regularizar mi situación' },
  { id: 'familia', label: 'Reunirme con mi familia' },
] as const;
export type Goal = typeof goals[number]['id'];
export type Answers = Record<string, string>;
export type Question = {
  id: string; section: string; title: string; help: string; summary: string;
  type: 'choice' | 'multi' | 'text' | 'date' | 'select'; options?: SelectOption[];
  placeholder?: string; past?: boolean; multiple?: boolean;
};
const has = (value: string | undefined, item: string) => value?.split(',').includes(item) ?? false;
const known = (value: string | undefined) => !!value && value !== 'unknown';
const residence = (a: Answers) => ['residence', 'longterm'].includes(a.status);
const temporaryPermit = (a: Answers) => ['residence', 'studies', 'expiredPermit'].includes(a.status);

export function getQuestions(goal: Goal, a: Answers): Question[] {
  const result: Question[] = [];
  const choice = (id: string, section: string, title: string, help: string, summary: string, opts: SelectOption[]) => result.push({ id, section, title, help, summary, type: 'choice', options: opts });
  const multi = (id: string, section: string, title: string, help: string, summary: string, opts: SelectOption[]) => result.push({ id, section, title, help, summary, type: 'multi', options: opts, multiple: true });
  const text = (id: string, section: string, title: string, help: string, summary: string, placeholder: string) => result.push({ id, section, title, help, summary, type: 'text', placeholder });
  const date = (id: string, title: string, help: string, summary: string, past = true) => result.push({ id, section: 'Fechas y documentos', title, help, summary, type: 'date', past });
  const select = (id: string, section: string, title: string, help: string, summary: string, opts: SelectOption[], multiple = false) => result.push({ id, section, title, help, summary, type: 'select', options: opts, multiple, placeholder: 'Selecciona o escribe para buscar' });
  const country = (id: string, title: string, summary: string) => {
    select(id, 'Ubicación', title, 'Puedes buscar por el nombre del país.', summary, [...countries.filter(item => item.value !== '108'), { value: 'unlisted', label: 'El país o territorio no aparece' }]);
    if (a[id] === 'unlisted') text(`${id}Details`, 'Ubicación', '¿Qué país o territorio falta?', 'Lo dejaremos indicado para la revisión.', `${summary}: otro`, 'Nombre del país o territorio');
  };
  const inSpain = a.location === 'spain';
  const citizenship = citizenshipOf(a.nationality);
  const national = citizenship === 'spanish';
  const european = citizenship === 'eu';
  const thirdCountry = citizenship === 'other';
  const adult = a.age === 'adult';

  choice('location', 'Sobre ti', '¿Estás ahora en España?', 'Si ayudas a otra persona, responde con sus datos. En la consulta familiar, empezamos por ti y después preguntamos por el familiar.', 'Ubicación actual', choices([['spain', 'Sí, estoy en España'], ['abroad', 'No, estoy en otro país']]));
  if (inSpain) select('place', 'Sobre ti', '¿En qué provincia estás?', 'Elige tu provincia o ciudad autónoma. Puedes escribir para buscarla.', 'Provincia', provinces);
  if (a.location === 'abroad') country('country', '¿En qué país te encuentras ahora?', 'País actual');
  select('nationality', 'Sobre ti', '¿Qué nacionalidad o nacionalidades tienes?', 'Selecciona el país de cada nacionalidad actual. Puedes añadir más de una.', 'Nacionalidades', nationalities.filter(item => goal !== 'nacionalidad' || item.value !== '108'), true);
  if (has(a.nationality, 'unlisted')) text('nationalityDetails', 'Sobre ti', '¿Qué nacionalidad falta en la lista?', 'La dejaremos indicada para que el equipo pueda revisarla.', 'Nacionalidad por revisar', 'Nombre de la nacionalidad');
  choice('age', 'Sobre ti', '¿La consulta es para una persona mayor de edad?', 'Usa la edad de la persona sobre la que estamos recogiendo los datos.', 'Edad y representación', choices([['adult', 'Sí, tiene 18 años o más'], ['minor', 'No, es para una persona menor de edad']]));
  if (a.age === 'minor') choice('guardian', 'Representación', '¿Quién acompaña o representa al menor?', 'La situación del menor y su representación se revisan de forma específica.', 'Representación del menor', choices([['parents', 'Su madre, padre o ambos'], ['guardian', 'Otra persona con tutela o guarda'], ['unaccompanied', 'Está sin progenitores ni tutor'], ['review', 'Necesitamos aclarar su representación']]));

  // Detectar plazos antes de una entrevista extensa, sin calcularlos automáticamente.
  choice('notice', 'Lo primero', '¿Tienes una notificación o un plazo que debamos revisar?', 'Por ejemplo, una denegación, un requerimiento o una orden de salida. Así podemos priorizar la revisión.', 'Notificaciones y plazos', choices([['yes', 'Sí, tengo una notificación o un plazo'], ['no', 'No'], ['private', 'Prefiero comentarlo con el equipo']]));
  if (a.notice === 'yes') {
    choice('noticeType', 'Lo primero', '¿Qué tipo de comunicación has recibido?', 'Elige lo que figure en el documento. No hace falta copiarlo entero.', 'Tipo de notificación', choices([['request', 'Me piden documentos o aclaraciones'], ['denial', 'Han denegado o archivado una solicitud'], ['departure', 'Una orden de salida, expulsión o devolución'], ['appointment', 'Una citación o comparecencia'], ['other', 'Otra comunicación']]));
    if (a.noticeType === 'other') text('noticeDetails', 'Lo primero', '¿De qué trata la comunicación?', 'Una descripción breve es suficiente; no incluyas datos identificativos.', 'Detalle de la notificación', 'Motivo de la comunicación');
    date('noticeDate', '¿En qué fecha recibiste la notificación?', 'La fecha de recepción puede ser distinta de la fecha impresa en el documento.', 'Fecha de notificación');
  }

  if (thirdCountry && inSpain) {
    choice('entry', 'Entrada', '¿Cómo llegaste a España para esta estancia?', 'Elige la situación de esta llegada. Si naciste aquí pero luego viviste fuera, indica cómo fue tu regreso.', 'Forma de entrada', choices([
      ['visa', 'Con visado de turismo o visita'], ['exempt', 'Como visitante, sin necesitar visado'],
      ['permit', 'Con visado o autorización de residencia o estudios'], ['schengen', 'Desde otro país del espacio Schengen'],
      ['irregular', 'Sin pasar el control de entrada o sin la documentación exigida'], ['always', 'He vivido siempre en España'],
    ]));
    if (a.entry === 'schengen') choice('entryDocument', 'Entrada', '¿Con qué documento o condición viajabas?', 'Pasar por otro país de Schengen no explica por sí solo la autorización que tenías.', 'Documento al entrar', choices([['visa', 'Visado de corta estancia'], ['exempt', 'Visita sin necesitar visado'], ['permit', 'Permiso de residencia o estancia de un país Schengen'], ['none', 'Sin la documentación exigida']]));
    if (a.entry && a.entry !== 'always') date('arrival', '¿Cuándo llegaste a España para esta estancia?', 'Indica la fecha de esta llegada, no el inicio de una residencia legal anterior.', 'Llegada para esta estancia');
  }
  // Un menor también puede tener permiso; estar fuera no significa no tener residencia española.
  if (thirdCountry && known(a.location)) {
    choice('status', 'Situación actual', inSpain ? '¿Cuál es tu situación ahora en España?' : '¿Tienes alguna autorización de estancia o residencia en España?', 'Indica la situación que conoces. Una solicitud pendiente y el vencimiento de la tarjeta física se preguntan por separado.', 'Situación en España', choices([
      ...(inSpain ? [['visitor', 'Estoy de visita dentro del tiempo autorizado'], ['visitExpired', 'Ha terminado mi estancia de turismo o visita']] as [string, string][] : []),
      ['residence', 'Tengo una autorización de residencia temporal'], ['longterm', 'Tengo residencia de larga duración o permanente'],
      ['studies', 'Tengo una estancia por estudios'], ['expiredPermit', 'Ha vencido mi autorización de residencia o estudios'],
      ['none', 'No tengo autorización de estancia ni de residencia'], ['asylum', 'He solicitado asilo o tengo protección'],
    ]));
    if (['visitor', 'visitExpired'].includes(a.status)) {
      date('stayEnd', a.status === 'visitor' ? '¿Hasta cuándo tienes autorizada la estancia?' : '¿Cuándo terminó tu estancia autorizada?', 'Si no sabes la fecha, la revisaremos con tu visado, cuando exista, y las entradas y salidas.', 'Fin de estancia indicado', a.status === 'visitExpired');
      choice('schengenTrips', 'Situación actual', '¿Has hecho otras visitas a Schengen en los últimos seis meses?', 'La última entrada por sí sola no permite comprobar el tiempo disponible.', 'Otras visitas a Schengen', yesNo);
    }
    if (temporaryPermit(a)) {
      if (a.status !== 'studies') {
        select('permitType', 'Situación actual', '¿Qué autorización tienes o tenías?', 'Busca el nombre que aparezca en la resolución o tarjeta. El NIE por sí solo no identifica la autorización.', 'Autorización declarada', [...permits, ...(a.status === 'expiredPermit' ? options([['studies', 'Estancia por estudios']]) : [])]);
        if (a.permitType === 'other') text('permitDetails', 'Situación actual', '¿Cómo se llama esa autorización?', 'Puedes copiar solo el nombre que figura en la resolución.', 'Otra autorización', 'Nombre de la autorización');
      }
      date('expiry', '¿Qué fecha de vencimiento tiene esa autorización?', 'Consulta la resolución si la tienes. Después distinguimos si hay una renovación en trámite.', 'Vencimiento de la autorización', a.status === 'expiredPermit');
      choice('renewal', 'Situación actual', a.status === 'studies' ? '¿Has solicitado una prórroga de tu estancia?' : '¿Has solicitado su renovación o prórroga?', 'Una autorización vencida con renovación pendiente necesita una revisión distinta de otra que no se renovó.', 'Renovación o prórroga', choices([['pending', 'Sí, está pendiente'], ['approved', 'Sí, ya se ha aprobado'], ['denied', 'Sí, pero se ha denegado'], ['no', 'No la he presentado']]));
    }
    if (a.status === 'longterm') date('cardExpiry', '¿Cuándo vence tu tarjeta física (TIE)?', 'La tarjeta y la autorización de larga duración son cosas distintas. Su fecha no se tratará como pérdida del derecho de residencia.', 'Vencimiento de la tarjeta', false);
    if (known(a.status) && a.status !== 'asylum') {
      choice('application', 'Solicitudes', '¿Tienes alguna otra solicitud en trámite?', 'Además de una renovación o prórroga ya indicada. Si hay varias, elige la que motiva esta consulta; el equipo revisará las demás contigo.', 'Otra solicitud pendiente', choices([
        ['no', 'No tengo otra solicitud pendiente'], ['residence', 'Residencia inicial o cambio de autorización'], ['family', 'Residencia por un vínculo familiar'],
        ['studies', 'Estancia por estudios'], ['nationality', 'Nacionalidad española'], ['protection', 'Asilo o protección'], ['other', 'Otro trámite'],
      ]));
      if (known(a.application) && a.application !== 'no') {
        if (a.application === 'other') text('applicationDetails', 'Solicitudes', '¿Qué trámite está pendiente?', 'Basta con el nombre o una descripción breve.', 'Otro trámite pendiente', 'Nombre del trámite');
        date('applicationDate', '¿Cuándo presentaste esa solicitud?', 'Indica la fecha del justificante de presentación, si la tienes.', 'Presentación de la solicitud');
      }
    }
    if (a.status === 'asylum' || a.application === 'protection' || ['none', 'visitExpired', 'expiredPermit'].includes(a.status)) {
      choice('protection', 'Protección', '¿Cuál es tu situación respecto al asilo o la protección?', 'No necesitamos el relato de los motivos en esta primera entrevista.', 'Protección internacional', choices([
        ...(!(a.status === 'asylum' || a.application === 'protection') ? [['no', 'No he presentado una solicitud']] as [string, string][] : []),
        ['pending', 'La solicitud está pendiente'], ['granted', 'Tengo protección internacional concedida'],
        ['closed', 'El procedimiento terminó sin protección'], ['temporary', 'Tengo protección temporal'],
      ]));
    }
  }
  if (european && inSpain) {
    choice('euRegistration', 'Situación actual', '¿Tienes el certificado de registro de ciudadano de la Unión?', 'También recogemos esta información si la consulta es para un menor.', 'Registro de ciudadano de la Unión', choices([['yes', 'Sí, lo tengo'], ['pending', 'Lo estoy tramitando'], ['no', 'Todavía no']]));
    if (['no', 'pending'].includes(a.euRegistration)) date('euArrival', '¿Desde cuándo vives en España?', 'Esta fecha sitúa tu llegada. No se usará por sí sola como inicio de residencia legal.', 'Inicio de vida en España');
  }
  const potentialRegularization = thirdCountry && inSpain && ['no', 'closed'].includes(a.protection)
    && (['none', 'visitExpired'].includes(a.status) || (a.status === 'expiredPermit' && ['no', 'denied'].includes(a.renewal)))
    && a.application === 'no';
  const confirmedResidence = thirdCountry && residence(a) || european && inSpain && a.euRegistration === 'yes';
  if (goal === 'nacionalidad' && confirmedResidence) date('legalStart', '¿Desde cuándo tienes residencia legal en España?', 'Indica el inicio de residencia que puedas acreditar. Puede ser anterior a tu última entrada; no es la fecha de expedición de la última tarjeta.', 'Inicio de residencia legal');
  if (inSpain && (potentialRegularization || goal === 'nacionalidad' && confirmedResidence)) {
    choice('absences', 'Permanencia', '¿Has pasado temporadas fuera de España durante ese periodo?', 'Las salidas y su duración ayudan a revisar la continuidad, sin deducirla solo de la primera llegada.', 'Ausencias de España', yesNo);
    if (a.absences === 'yes') text('absenceDetails', 'Permanencia', '¿Cuándo saliste y durante cuánto tiempo?', 'Indica las salidas que recuerdes. Se admiten fechas aproximadas y varias estancias.', 'Detalle de ausencias', 'Ej.: tres semanas en agosto de 2025');
  }
  if (potentialRegularization) {
    choice('evidence', 'Permanencia', '¿Tienes documentos de tu permanencia en España?', 'Por ejemplo, padrón histórico o documentos de atención sanitaria. No tienes que subirlos ahora.', 'Pruebas de permanencia', choices([['yes', 'Sí, de distintas fechas'], ['some', 'Algunos, pero hay periodos sin documentar'], ['no', 'Todavía no los he reunido']]));
    if (!['expiredPermit'].includes(a.status)) {
      choice('previousPermit', 'Permanencia', '¿Tuviste antes una autorización de residencia?', 'La autorización anterior puede ser relevante para revisar tu situación.', 'Residencia anterior', yesNo);
      if (a.previousPermit === 'yes') {
        select('previousType', 'Permanencia', '¿Qué autorización de residencia tenías?', 'Busca el nombre en tu resolución, si la conservas.', 'Autorización anterior', [...permits, ...options([['longterm', 'Larga duración o permanente']])]);
        if (a.previousType === 'other') text('previousDetails', 'Permanencia', '¿Cómo se llamaba la autorización anterior?', 'Indica solo el nombre o una descripción breve.', 'Otra autorización anterior', 'Nombre de la autorización');
        if (a.previousType === 'longterm') date('previousCardExpiry', '¿Cuándo vencía la tarjeta de esa residencia?', 'El equipo revisará si la autorización de residencia sigue vigente, aunque la tarjeta haya caducado.', 'Vencimiento de la tarjeta anterior', false);
        else if (known(a.previousType)) date('previousEnd', '¿Cuándo terminó esa autorización?', 'Si no sabes si terminó, deja la fecha pendiente para revisarla con el equipo.', 'Fin de autorización anterior');
      }
    }
  }

  if (national && goal !== 'familia') choice('spanishNeed', 'Tu objetivo', '¿Qué necesitas que revisemos como ciudadano español?', 'La nacionalidad española cambia el enfoque de la consulta. Puedes cambiar el objetivo si la gestión es para un familiar.', 'Consulta como ciudadano español', choices([['documents', 'Documentación, retorno o trámites personales'], ['family', 'Una gestión para un familiar'], ['other', 'Otra cuestión']]));
  if (goal === 'residencia' && !national) {
    const hasPermit = residence(a) || temporaryPermit(a);
    choice('residenceNeed', 'Tu objetivo', '¿Qué gestión quieres hacer?', 'Elige el motivo principal. Después el equipo comprobará qué trámite corresponde.', 'Gestión de residencia', choices([
      ...(!hasPermit ? [['initial', european ? 'Establecerme o registrarme en España' : 'Solicitar una primera autorización']] as [string, string][] : []),
      ...(temporaryPermit(a) ? [['renew', 'Renovar o prorrogar mi autorización'], ['change', 'Cambiar de autorización']] as [string, string][] : []),
      ...(hasPermit && a.status !== 'longterm' ? [['longterm', 'Consultar el acceso a larga duración']] as [string, string][] : []),
      ...(hasPermit || european ? [['card', 'Gestionar mi tarjeta o certificado']] as [string, string][] : []),
      ['review', 'Revisar una solicitud, resolución u otra situación'],
    ]));
  }
  if (goal === 'familia') {
    choice('relative', 'Tu familia', '¿Con qué familiar quieres reunirte?', 'Empezamos por un familiar principal. Al final de este bloque podrás indicar si hay más personas.', 'Familiar principal', relationships);
    if (a.relative === 'other') text('relativeDetails', 'Tu familia', '¿Qué parentesco tenéis?', 'Indica el vínculo con esa persona.', 'Otro parentesco', 'Ej.: abuela, nieto');
    if (known(a.relative)) {
      choice('relativeLocation', 'Tu familia', '¿Dónde está ese familiar ahora?', 'Respondemos sobre su ubicación, que puede ser distinta de la tuya.', 'Ubicación del familiar', choices([['spain', 'En España'], ['abroad', 'En otro país']]));
      if (a.relativeLocation === 'abroad') country('relativeCountry', '¿En qué país se encuentra ese familiar?', 'País del familiar');
      select('relativeNationality', 'Tu familia', '¿Qué nacionalidad o nacionalidades tiene ese familiar?', 'Selecciona sus nacionalidades actuales, no las tuyas.', 'Nacionalidades del familiar', nationalities, true);
      if (has(a.relativeNationality, 'unlisted')) text('relativeNationalityDetails', 'Tu familia', '¿Qué nacionalidad de tu familiar falta en la lista?', 'La revisaremos con el resto de su situación.', 'Otra nacionalidad del familiar', 'Nombre de la nacionalidad');
      choice('relativeAge', 'Tu familia', '¿Ese familiar tiene 18 años o más?', 'La edad puede cambiar el enfoque del caso.', 'Edad del familiar', choices([['adult', 'Sí, es mayor de edad'], ['minor', 'No, es menor de edad']]));
      if (a.relativeLocation === 'spain' && citizenshipOf(a.relativeNationality) === 'other') choice('relativeStatus', 'Tu familia', '¿Cuál es su situación en España?', 'Si no la sabes, el equipo la confirmará con tu familiar.', 'Situación del familiar', choices([['residence', 'Tiene residencia'], ['studies', 'Tiene estancia por estudios'], ['visitor', 'Está de turismo o visita'], ['protection', 'Tiene asilo o protección en trámite o concedida'], ['none', 'No tiene autorización'], ['pending', 'Su autorización ha vencido o está en renovación']]));
      if (a.relativeAge === 'adult') choice('dependency', 'Tu familia', '¿Hay dependencia económica o necesidad de cuidados entre vosotros?', 'Indica si alguna de las dos personas depende de la otra.', 'Dependencia o cuidados', yesNo);
      if (inSpain && adult && thirdCountry && residence(a) && a.relativeLocation === 'abroad') {
        choice('housing', 'Tu familia', '¿Con qué vivienda contaríais en España?', 'Solo recogemos una primera descripción. No se exige un documento ahora.', 'Vivienda prevista', choices([['rent', 'Vivienda alquilada'], ['owned', 'Vivienda en propiedad'], ['hosted', 'Vivienda de familiares u otras personas'], ['none', 'Aún no tenemos vivienda prevista']]));
        multi('familyIncome', 'Tu familia', '¿Con qué medios contaríais?', 'Puedes marcar varios. Los importes y requisitos se revisarían después.', 'Medios familiares', choices([['work', 'Ingresos por trabajo'], ['self', 'Actividad por cuenta propia'], ['savings', 'Ahorros, pensión u otros ingresos'], ['support', 'Apoyo económico de familiares'], ['none', 'Todavía no contamos con medios']]));
      }
    }
    choice('moreRelatives', 'Tu familia', '¿Quieres incluir a más familiares en la consulta?', 'Sus situaciones se revisarían por separado para no mezclar sus datos.', 'Más familiares', yesNo);
    if (a.moreRelatives === 'yes') text('moreRelativesDetails', 'Tu familia', '¿Qué otros familiares quieres incluir?', 'Indica parentesco, edad aproximada y dónde están. No incluyas nombres ni números de documento.', 'Otros familiares', 'Ej.: dos hijos menores que viven en Colombia');
  } else if (!national && goal !== 'nacionalidad') {
    multi('family', 'Vínculos', '¿Tienes familiares españoles o que vivan en España?', 'Puedes marcar varios grupos si tienes distintos vínculos.', 'Vínculos familiares', choices([['spanish', 'Familiares españoles'], ['eu', 'Familiares de la UE, EEE o Suiza en España'], ['resident', 'Otros familiares que viven en España'], ['none', 'No tengo esos vínculos']]));
    if (known(a.family) && a.family !== 'none') multi('familyRelation', 'Vínculos', '¿Qué vínculo tienes con ellos?', 'Marca los parentescos que correspondan.', 'Parentescos', relationships);
    if (has(a.familyRelation, 'other')) text('familyRelationDetails', 'Vínculos', '¿Qué otro parentesco quieres indicar?', 'No hace falta incluir nombres ni datos identificativos.', 'Otro parentesco en España', 'Ej.: abuela, nieto');
  }
  // Trabajo no es una pregunta de nacionalidad ni de un trámite puramente documental.
  if (adult && !national && ['residencia', 'regularizar'].includes(goal) && a.residenceNeed !== 'card') {
    choice('activity', 'Tu contexto', a.location === 'abroad' ? '¿Qué actividad tienes prevista en España?' : '¿Qué situación de trabajo o estudios quieres que revisemos?', 'Recogemos contexto; una oferta o matrícula no confirma por sí sola una autorización.', 'Trabajo o estudios', choices([...(inSpain ? [['employed', 'Trabajo actualmente en España']] as [string, string][] : []), ['job', 'Tengo una oferta de trabajo en España'], ['self', 'Quiero trabajar por cuenta propia'], ['study', 'Quiero estudiar o seguir estudiando'], ['income', 'Cuento con medios propios'], ['none', 'Todavía no tengo una opción concreta']]));
  }
  if (goal === 'nacionalidad' && !national) {
    multi('nationalityContext', 'Tu objetivo', '¿Te encuentras en alguna de estas situaciones?', 'Marca las que correspondan. Sirven para orientar la revisión de posibles vías de nacionalidad.', 'Contexto de nacionalidad', nationalityTies);
    if (has(a.nationalityContext, 'other')) text('nationalityDetailsContext', 'Tu objetivo', '¿Qué otro vínculo con España quieres revisar?', 'Puedes describirlo brevemente.', 'Otro vínculo con España', 'Describe el vínculo');
    if (has(a.nationalityContext, 'spouse')) date('marriageDate', '¿En qué fecha os casasteis?', 'Preguntamos por matrimonio, no por pareja de hecho. El equipo revisará también la convivencia y la situación actual.', 'Fecha de matrimonio');
  }
  return result;
}

export function toggleMultiple(value: string, option: string): string {
  const selected = value ? value.split(',') : [];
  if (selected.includes(option)) return selected.filter(item => item !== option).join(',');
  if (['none', 'unknown'].includes(option)) return option;
  return [...selected.filter(item => !['none', 'unknown'].includes(item)), option].join(',');
}

function validSelection(question: Question, value: string): boolean {
  if (!question.options) return true;
  if (value === 'unknown') return true;
  const selected = value.split(',');
  return (question.multiple || selected.length === 1) && new Set(selected).size === selected.length
    && !(['none', 'stateless', 'unknown'].some(item => selected.includes(item)) && selected.length > 1)
    && selected.every(item => question.options!.some(option => option.value === item));
}

export function updateAnswer(goal: Goal, answers: Answers, id: string, value: string): Answers {
  if (answers[id] === value) return answers;
  let next = { ...answers, [id]: value };
  // Quitar preguntas y opciones de ramas que desaparecen; conservar datos comunes.
  for (;;) {
    const questions = new Map(getQuestions(goal, next).map(question => [question.id, question]));
    const retained = Object.fromEntries(Object.entries(next).filter(([key, answer]) => questions.has(key) && (!answer || validSelection(questions.get(key)!, answer))));
    if (Object.keys(retained).length === Object.keys(next).length) return retained;
    next = retained;
  }
}

export function answerError(question: Question, value: string | undefined, today: string, answers: Answers = {}): string | undefined {
  if (!value?.trim()) return undefined;
  if (value === 'unknown') return undefined;
  if (!validSelection(question, value)) return 'Selecciona una opción de la lista.';
  if (question.type === 'date') {
    const parsed = new Date(`${value}T12:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value || value < '1900-01-01') return 'Indica una fecha válida.';
    if (question.past && value > today) return 'Esta fecha no puede estar en el futuro.';
    if (question.id === 'stayEnd') {
      if (answers.status === 'visitor' && value < today) return 'La fecha ya ha pasado. Revisa la fecha o indica que tu visita ha terminado.';
      if (known(answers.arrival) && value < answers.arrival) return 'El fin de esta estancia no puede ser anterior a tu llegada.';
    }
  }
  return undefined;
}
export function isAnswered(question: Question, value: string | undefined, today: string, answers: Answers = {}): boolean {
  return !!value?.trim() && !answerError(question, value, today, answers);
}
export function answerLabel(question: Question, value?: string): string {
  if (!value) return 'Pendiente de responder';
  if (value === 'unknown') return 'Pendiente de confirmar';
  if (question.options) return value.split(',').map(item => question.options!.find(option => option.value === item)?.label || item).join(', ');
  if (question.type === 'date') {
    const parsed = new Date(`${value}T12:00:00Z`);
    return Number.isNaN(parsed.getTime()) ? value : new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(parsed);
  }
  return value;
}
export function reviewNotes(goal: Goal, a: Answers): string[] {
  const notes: string[] = [];
  const citizenship = citizenshipOf(a.nationality);
  if (a.location === 'abroad') notes.push('Confirmar el país de residencia habitual y la posible tramitación consular; estar fuera ahora no significa haber perdido una residencia en España.');
  if (citizenship === 'unknown') notes.push('Aclarar las nacionalidades antes de encuadrar la situación migratoria.');
  if (citizenship === 'spanish') notes.push('Revisar la gestión personal o familiar que necesitas como ciudadano español.');
  if (citizenship === 'eu') notes.push('Revisar el régimen de ciudadanía de la Unión y la documentación de residencia.');
  if (a.age === 'minor' || a.relativeAge === 'minor') notes.push('Revisión específica de minoría de edad y representación.');
  if (['visitor', 'visitExpired'].includes(a.status)) notes.push('Comprobar el tiempo de visita autorizado, incluidas otras entradas y salidas de Schengen.');
  if (a.status === 'longterm' || a.previousType === 'longterm') notes.push('Distinguir la renovación de la tarjeta física de la autorización de larga duración o permanente.');
  if (a.status === 'expiredPermit' || a.renewal === 'pending') notes.push('Revisar vencimiento, renovación y resolución antes de concluir cuál es la situación actual.');
  if (goal === 'nacionalidad' && !getQuestions(goal, a).some(question => question.id === 'legalStart')) notes.push('Aclarar la vía de nacionalidad y, si corresponde, la residencia legal. La llegada, los estudios y una solicitud pendiente no la acreditan por sí solos.');
  if (known(a.application) && a.application !== 'no') notes.push('Revisar la solicitud pendiente junto con la situación actual, sin confundir una con la otra.');
  if (known(a.protection) && a.protection !== 'no') notes.push('Revisar el expediente de protección y sus efectos antes de valorar otra vía.');
  if (getQuestions(goal, a).some(question => question.id === 'evidence')) notes.push('Estudiar posibles vías con la permanencia, autorizaciones anteriores y contexto, sin asignar automáticamente un arraigo.');
  if (a.notice === 'yes' || a.notice === 'private') notes.unshift('Revisar primero la notificación o el asunto que quieres comentar con el equipo.');
  if (getQuestions(goal, a).some(question => !a[question.id] || a[question.id] === 'unknown')) notes.push('Aclarar las respuestas que han quedado pendientes.');
  return notes.length ? notes : ['Revisar tus respuestas y la documentación antes de proponer un trámite.'];
}
