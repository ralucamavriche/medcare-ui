export interface Appointment {
  id: string;
  userId: string;
  title: string;
  description: string;
  startDate: DateInput;
  endDate: DateInput;
  author: string;
  status: string;
}

export interface RequestAppointment extends Partial<Appointment> {
  title: string;
  description: string;
  startDate: DateInput;
  endDate: DateInput;
  status?: string;
  userId?: string;
  doctorId?: string;
}
