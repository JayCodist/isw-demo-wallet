import { Option } from "../../components/select/Select";

export const getNumber: (str: string | number) => number = str =>
  Number(String(str).replace(/[^\d.]/g, "")) || 0;

export const getOptionsFromArray: (
  strArray: string[] | number[]
) => Option[] = strArray => {
  return strArray.map(str => ({ label: str, value: str }));
};
