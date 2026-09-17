export type IconName = 'home' | 'documents' | 'practice' | 'consultations' | 'profile' | 'arrow' | 'check';
export function Icon({ name }: { name: IconName }) {
  return <span className={`ui-icon ui-icon--${name}`} aria-hidden="true"><i /></span>;
}
