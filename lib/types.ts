export type Volunteer = {
    email: string;
    name: string;
    phone?: string;
    emergencyName?: string;
    emergencyPhone?: string;
}

export type Shift = {
    id?: string;
    email: string;
    date: string;
    shift: 1 | 2 | 3 | 4;
    checkedin?: Date;
    checkedout?: Date;
    hrsCompleted?: number;
}