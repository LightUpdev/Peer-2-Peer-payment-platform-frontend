import { format } from "date-fns";

export const dateFormatter = (date, syntax) => {
  // Format the date as 'MM/dd/yyyy'
  const formattedDate = format(date, syntax);
  return formattedDate;
};
