import Airtable from 'airtable';
import { Shift, Volunteer } from './types';

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

const volunteersTable = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME_VOLUNTEERS);
const shiftsTable = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME_SHIFTS);

const getMinifiedData = data => {
  return data.map(d => d.fields);
};

export default async function getData(table: 'volunteers' | 'shifts', options = {}) {
    if (table === 'volunteers') {
        return getVolunteers(options);
    }
    return getShifts(options);
};

const getVolunteers = async (options = {}) => {
  const volunteers = await volunteersTable.select(options).all();
  return getMinifiedData(volunteers)
};

const getShifts = async (options = {}) => {
  const shifts = await shiftsTable.select(options).all();
  return getMinifiedData(shifts);
};

export const newVolunteer = (volunteer: Volunteer, callBack: (apiStatus: boolean) => void) => {
  base('Volunteers').create([
    {
      "fields": volunteer
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      callBack(false);
      return;
    }
    // success
    callBack(true);
    records.forEach(function (record) {
      console.log(record.getId());
    });
  });
};

export const addShifts = (values: Shift[]): Promise<void> => {
  const createArr = values.map(shift => {
    return {
      "fields": shift
    }
  })
  return new Promise((resolve, reject) => {
    base('Shifts').create(createArr, function(err, records) {
      if (err) {
        console.log('rejecting')
        reject();
        return;
      }
      console.log('resolving')
      resolve();
    });
  });
};