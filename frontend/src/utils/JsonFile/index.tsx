export function JSONtoCSV(json?: any): string {
  let csv = '';

  // adiciona os cabeçalhos
  for (let key in json[0]) {
    csv += key + ',';
  }
  csv += '\n';

  // adiciona os dados
  json.forEach(item => {
    for (let key in item) {
      csv += item[key] + ',';
    }
    csv += '\n';
  });

  return csv as string;
}

export function downloadCSV(csv: string, ss_id: number) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dados_pesquisa_${ss_id}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}