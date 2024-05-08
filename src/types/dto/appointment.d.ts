export interface IAppointment {
    id?: string,
    title?: string,
    description: string,
    startDate: DateInput,
    endDate: DateInput,
    author: string,
    status?: string

}