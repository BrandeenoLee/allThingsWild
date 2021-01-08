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
    shift: number;
    checkedin: Date;
    checkedout: Date;
}