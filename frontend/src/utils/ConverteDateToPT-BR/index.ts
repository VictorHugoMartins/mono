export const ConvertDateToPTBR = (date: string | undefined) => {
    if (date) {
        let dateForm = `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
        return dateForm;
    } else {
        return '';
    }
} 