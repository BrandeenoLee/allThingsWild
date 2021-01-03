import { filterByEmails, filterByEmail } from "./airtableFormulas";
import getData from "./getData";

export const getShiftText = (shift: 1 | 2 | 3 | 4): string => {
  let str = "";
  switch (shift) {
    case 1:
      str = "8AM - 11AM";
      break;
    case 2:
      str = "11AM - 2PM";
      break;
    case 3:
      str = "2PM - 5PM";
      break;
    case 4:
      str = "5PM - 8PM";
      break;
    default:
      str = "Unknown";
  }
  return str;
};

export const getShiftID = (shift: number | string): 1 | 2 | 3 | 4 => {
  let id: 1 | 2 | 3 | 4 = 1;
  shift = Number(shift);
  switch (shift) {
    case 2:
      id = 2;
      break;
    case 3:
      id = 3;
      break;
    case 4:
      id = 4;
      break;
    default:
      id = 1
  }
  return id;
};


  export const getVolunteerNameMap = async (emails: string[]) => {
    const filterByFormula =
    emails.length > 1 ? filterByEmails(emails) : filterByEmail(emails[0]);
    const volunteers = await getData("volunteers", { filterByFormula, fields: ["email", "name"] });
    const map = {};
    volunteers.forEach((volunteer) => {
        map[volunteer.email] = volunteer.name;
    });
    return map;
  }