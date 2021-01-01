export const filterToToday = () => "{date}=TODAY()";

export const filterByEmail = (email: string) => `{email}="${email}"`;

export const filterToDate = (date: Date) => {
    const formatted = date.toISOString().split('T')[0];
    return `DATESTR({date})="${formatted}"`
};

export const filterToDateRange = (start: Date, end: Date) => {
    return `AND(
        IS_AFTER({date}, DATEADD("${start}", -1, "days")),
        IS_BEFORE({date}, DATEADD("${end}", -1, "days"))
    )`
};