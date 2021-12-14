export const getNumber: (str: string | number) => number = str =>
  Number(String(str).replace(/[^\d.]/g, "")) || 0;
