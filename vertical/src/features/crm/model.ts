export const initialCases = [
  { id: 'AS-0142', name: 'Lucía Martínez', type: 'Residencia inicial', stage: 'Documentación', owner: 'Marta Pérez', date: 'Hoy', priority: 'Alta', progress: 25, color: 0 },
  { id: 'AS-0187', name: 'Omar Benali', type: 'Residencia inicial', stage: 'Revisión jurídica', owner: 'Carlos Vidal', date: '21 sep.', priority: 'Media', progress: 60, color: 1 },
  { id: 'AS-0203', name: 'Valentina Rojas', type: 'Nacionalidad', stage: 'Presentación', owner: 'Marta Pérez', date: 'Hoy', priority: 'Alta', progress: 80, color: 2 },
  { id: 'AS-0216', name: 'Andrés Molina', type: 'Renovación', stage: 'Entrevista', owner: 'Laura Costa', date: '22 sep.', priority: 'Media', progress: 10, color: 3 },
  { id: 'AS-0224', name: 'Sofía Torres', type: 'Nacionalidad', stage: 'Resolución', owner: 'Carlos Vidal', date: '24 sep.', priority: 'Baja', progress: 90, color: 0 },
  { id: 'AS-0231', name: 'Daniel Oliveira', type: 'Reagrupación familiar', stage: 'Documentación', owner: 'Laura Costa', date: '21 sep.', priority: 'Media', progress: 30, color: 1 },
];
export type Case = typeof initialCases[number] & { opened?: string };
export const initialTasks = [
  { id: 1, title: 'Revisar la documentación de Lucía', caseId: 'AS-0142', owner: 'Marta Pérez', time: '09:30', priority: 'Alta', done: false },
  { id: 2, title: 'Preparar la presentación de Valentina', caseId: 'AS-0203', owner: 'Marta Pérez', time: '11:00', priority: 'Alta', done: false },
  { id: 3, title: 'Validar las nuevas instrucciones de residencia', caseId: 'Ruta · versión 2', owner: 'Carlos Vidal', time: '12:30', priority: 'Media', done: false },
  { id: 4, title: 'Confirmar la entrevista con Andrés', caseId: 'AS-0216', owner: 'Laura Costa', time: '15:00', priority: 'Media', done: false },
  { id: 5, title: 'Comprobar el resguardo de presentación', caseId: 'AS-0224', owner: 'Carlos Vidal', time: 'Ayer', priority: 'Baja', done: true },
];
export const initialDocuments = [
  { id: 1, name: 'Pasaporte · todas las páginas.pdf', person: 'Lucía Martínez', caseId: 'AS-0142', date: 'Hoy, 09:14', size: '2,4 MB', state: 'Pendiente' },
  { id: 2, name: 'Certificado de empadronamiento.pdf', person: 'Lucía Martínez', caseId: 'AS-0142', date: 'Hoy, 09:12', size: '840 KB', state: 'Pendiente' },
  { id: 3, name: 'Certificado de nacimiento.pdf', person: 'Valentina Rojas', caseId: 'AS-0203', date: 'Ayer, 16:40', size: '1,1 MB', state: 'Validado' },
  { id: 4, name: 'Justificante de presentación.pdf', person: 'Sofía Torres', caseId: 'AS-0224', date: 'Ayer, 12:05', size: '420 KB', state: 'Validado' },
  { id: 5, name: 'Documento de identidad.pdf', person: 'Daniel Oliveira', caseId: 'AS-0231', date: '17 sep., 10:32', size: '1,8 MB', state: 'Subsanación' },
];
export const routeNames = ['Residencia inicial', 'Nacionalidad por residencia', 'Renovación de residencia', 'Reagrupación familiar'];
