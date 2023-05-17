import html2canvas from 'html2canvas';
import React from 'react';

export const handlePrintPage = async (printRef:React.MutableRefObject<undefined>) => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    return data.toString();
};