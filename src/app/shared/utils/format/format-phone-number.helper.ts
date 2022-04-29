export function formatPhoneNumber(phoneNumber: string): string {
  const cleanedString = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleanedString.match(/^(\d{3})(\d{3})(\d{4})$/);

  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : null;
}
