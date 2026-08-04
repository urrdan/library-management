export function nameJoiner(person: { firstName: string; lastName: string }) {
  return `${person.firstName} ${person.lastName}`.trim();
}
