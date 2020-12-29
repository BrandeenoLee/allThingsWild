import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

const volunteersTable = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME_VOLUNTEERS);
const shiftsTable = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME_SHIFTS);


const getMinifiedData = volunteers => {
return volunteers.map(v => minify(v));
};

// gets the data we want and puts it into variables
const minify = data => data.fields;
// {
//     return {
//         id: volunteer.id,
//         fields: volunteer.fields,
//     };
// };

export default async function getData(table: 'volunteers' | 'shifts', options = {}) {
    if (table === 'volunteers') {
        const volunteers =  await getVolunteers(options);
        return volunteers;
    }
    return getShifts(options);
    // return shifts;
}

const getVolunteers = async (options = {}) => {
  const volunteers = await volunteersTable.select(options).all();
  return getMinifiedData(volunteers)
//   console.log('vol result', minifiedVolunteerData.map(d => d.fields))
//   return minifiedVolunteerData.map(d => d.fields);
}

const getShifts = async (options = {}) => { // { email: string; from: Date; to: Date; }
    const shifts = await shiftsTable.select(options).all();
    // ({ view: options.email, filterByFormula: `IS_BEFORE([date1], [date2])` }).all();
    return getMinifiedData(shifts);
}
