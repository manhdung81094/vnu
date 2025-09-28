import { useParams } from "react-router-dom";

export const useNumericParams = (keys: string[]) => {
  const params = useParams();

  const numericParams: Record<string, number> = {};
  keys.forEach((key) => {
    numericParams[key] = +(params[key] ?? 0);
  });

  return numericParams;
};
