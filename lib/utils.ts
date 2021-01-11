import { filterByEmails, filterByEmail } from "./airtableFormulas";
import getData from "./getData";

export const getShiftText = (shift: number): string => {
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