export const filterToToday = () => "{date}=TODAY()";

export const filterByEmail = (email: string) => `{email}="${email}"`;

export const filterByEmails = (emails: string[]) => {
    let commaDelimitedEmails = '';
    emails.forEach((e, i) => {
        commaDelimitedEmails += `{email}="${e}"`;
        if (i < emails.length - 1) {
            commaDelimitedEmails += ", ";
        }
    });
    return `OR(${commaDelimitedEmails})`
};

export const filterToDate = (date: Date) => {
    const formatted = date.toISOString().split('T')[0];
    return `DATESTR({date})="${formatted}"`
};

export const filterToDateRange = (start: Date, end: Date) => {
    return `AND(
        IS_AFTER({date}, DATEADD("${start}", -1, "days")),
        IS_BEFORE({date}, DATEADD("${end}", -1, "days")),
    )`
};

export const filterToDateRangeEmail = (start: Date, end: Date, email: string) => {
    return `AND(
        IS_AFTER({date}, DATEADD("${start}", -1, "days")),
        IS_BEFORE({date}, DATEADD("${end}", -1, "days")),
        {email}="${email}"
    )`
};