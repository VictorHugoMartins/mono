export function maskCEP(value: string) {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  return value;
}

export function maskCPF(value: string) {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1-$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return value;
}

export function maskPhone(value: string) {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}

export function maskCurrency(value: string) {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return value;
}