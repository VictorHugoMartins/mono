export const priorities = [
  { id: 476, name: 'Alta', backgroundColor: '#FF3129', color: '#F9F9F9' },
  { id: 475, name: 'Média', backgroundColor: '#FFCA82', color: '#333333' },
  { id: 474, name: 'Baixa', backgroundColor: '#70CC6B', color: '#333333' }
];

export const status = [
  { id: 1, name: 'Atrasado', backgroundColor: '#FF3129', color: '#F9F9F9' },
  { id: 1, name: 'Atrasada', backgroundColor: '#FF3129', color: '#F9F9F9' },
  { id: 2, name: 'A fazer', backgroundColor: '#FFCA82', color: '#333333' }, // a fazer 
  { id: 2, name: 'Em progresso', backgroundColor: '#FFCA82', color: '#333333' }, // a fazer 
  { id: 2, name: 'Iniciada', backgroundColor: '#FFCA82', color: '#333333' }, // a fazer 
  { id: 0, name: 'Não iniciado', backgroundColor: '#92C1D9', color: '#333333' },
  { id: 0, name: 'Não iniciada', backgroundColor: '#92C1D9', color: '#333333' },
  { id: 4, name: 'Feito', backgroundColor: '#70CC6B', color: '#333333' }, // feito
  { id: 4, name: 'Concluído', backgroundColor: '#70CC6B', color: '#333333' }, // feito
  { id: 5, name: 'Concluído com atraso', backgroundColor: '#EC6A10', color: '#F9F9F9' }
];

export function getStylesByField(field: string, value: string | number, type: number) {
  let array = type === 0 ? priorities : status;
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    if (item[field] === value) {
      return { backgroundColor: item.backgroundColor, color: item.color };
    }
  }
  return { backgroundColor: undefined, color: undefined }
}

export function getObjectByField(field: string, value: string | number, type: number) {
  let array = type === 0 ? priorities : status;
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    // console.log(item[field], value);
    if (item[field] === value) {
      return item;
    }
  }
  return { name: "", backgroundColor: undefined, color: undefined }
}