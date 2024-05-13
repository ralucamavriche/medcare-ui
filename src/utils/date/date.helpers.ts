import moment from "moment";

const APPOINTMENT_DURATION_IN_MINUTES = 30;

export const isValidDuration = (startDate: moment.Moment, endDate: moment.Moment, duration: number = APPOINTMENT_DURATION_IN_MINUTES): boolean => {
    const diff = moment.duration(endDate.diff(startDate));
    return !(diff.asMinutes() !== duration)
}