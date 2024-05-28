export interface IUser {
    email: string,
    firstName: string,
    lastName: string,
    phone?: string,
    address?: string,
    city?: string,
    country?: string,
    role?: string,
    id?: string,
    requestedDoctorStatus?: 'NOT_SENT' | 'SENT',
    doctorId?:string
}
