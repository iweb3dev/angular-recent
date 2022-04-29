export function convertToCSV(csvContent: string, fileName: string): void {
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);

  link.click();
}
