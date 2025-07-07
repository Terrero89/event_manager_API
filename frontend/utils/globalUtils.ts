export function getInitials(name: string) {
  if (!name) return '';

  return name
    .split(' ')
    .filter(part => part.length > 0)
    .map(part => part[0].toUpperCase())
    .join('');
}