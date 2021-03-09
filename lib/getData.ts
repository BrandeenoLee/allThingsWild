import Airtable from 'airtable';
import { Shift, Volunteer } from './types';

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

const volunteersTable = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME_VOLUNTEERS);
const shiftsTable = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME_SHIFTS);

const getIdWithFields = data => {
  return data.map(d => {
    return {
      id: d.id,
      ...d.fields
    }
  });
};

export default async function getData(table: 'volunteers' | 'shifts', options = {}) {
    if (table === 'volunteers') {
        return getVolunteers(options);
    }
    return getShifts(options);
};

export const getVolunteers = async (options = {}) => {
  const volunteers = await volunteersTable.select(options).all();
  return getIdWithFields(volunteers)
};

const getShifts = async (options = {}) => {
  const shifts = await shiftsTable.select(options).all();
  return getIdWithFields(shifts);
};

export const newVolunteer = (volunteer: Volunteer): Promise<void> => {
  return new Promise((resolve, reject) => {
    base('Volunteers').create([
      {
        "fields": volunteer
      }
    ], function(err, records) {
      if (err) {
        reject();
        return;
      }
      resolve();
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

export const clockInDB = (id: string) => {
  base('Shifts').update(id, {
    "checkedin": new Date(),
  }, function(err, record) {
    if (err) {
      console.error("error", err);
      return;
    }
    console.log("successful check in");
  });
  
}

export const clockOutDB = (id: string) => {
  base('Shifts').update(id, {
    "checkedout": new Date(),
  }, function(err, record) {
    if (err) {
      console.error("error", err);
      return;
    }
    console.log("successful check out");
  });
  
}