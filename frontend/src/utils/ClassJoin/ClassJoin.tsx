export default function ClassJoin(classList: string[]) {
  return classList.filter(Boolean).join(' ');
}