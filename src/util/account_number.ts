export function generateEgyptianIBAN(): string {
  const countryCode: string = "EG"; // Egypt's country code
  const checkDigits: string = "00"; // Placeholder check digits (to be calculated in real systems)
  const bankCode: string = "1234"; // Example: 4-digit bank identifier
  const branchCode: string = "5678"; // Example: 4-digit branch code

  // Generate a 17-digit account number
  const accountNumber: string = Math.floor(Math.random() * 100000000000000000)
    .toString()
    .padStart(17, '0');

  // Combine to create the IBAN
  return `${countryCode}${checkDigits}${bankCode}${branchCode}${accountNumber}`;
}

console.log(generateEgyptianIBAN());
