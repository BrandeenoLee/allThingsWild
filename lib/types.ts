export type Volunteer = {
    email: string;
    name: string;
    phone?: string;
    emergencyName?: string;
    emergencyPhone?: string;
}

export type Shift = {
    email: string;
    date: Date;
    shift: 1 | 2 | 3 | 4;
    checkedin?: Date;
    checkedout?: Date;
}