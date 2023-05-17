export function downloadFileByURL(base64Data: string, fileName: string) {
  const linkSource = base64Data;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.target = "_blank";
  downloadLink.download = fileName;
  downloadLink.click();
}
