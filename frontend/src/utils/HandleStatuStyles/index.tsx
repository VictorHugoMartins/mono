export function HandleStatusStyles(progress: string, status: number) {
  let backgroundColor = "#333333"; // black900
  let progressColor = "#333333"; // black900

  // console.log(progress, status);

  if (progress) {
    let _progress = parseInt(progress);
    if (_progress === 100) { // concluido 
      progressColor = "#70CC6B"; // green300
    } else {
      if (status === 1) progressColor = "#FF3129"; //red500; // atrasado
      else if (status === 2) progressColor = "#FFCA82" // orange200; // em progresso
      else if (status === 3) progressColor = "#70CC6B"; // green300 // concluido
      else if (status === 4) progressColor = "#92C1D9" // indigo200; // nao iniciado
      else if (status === 5) progressColor = "#EC6A10"; // orange800; // concluído com atraso
      // else if (status === 6) progressColor = "#D6C48C"; // orange800; // indefinido
    }
  }
  return {
    backgroundColor,
    progressColor,
    progressSelectedColor: progressColor,
    backgroundSelectedColor: backgroundColor
  };
}