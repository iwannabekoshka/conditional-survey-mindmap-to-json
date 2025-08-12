export default function downloadFile(fileName, content) {
  const file = new Blob([content], {type: "text/plain"});

  const url = URL.createObjectURL(file);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}