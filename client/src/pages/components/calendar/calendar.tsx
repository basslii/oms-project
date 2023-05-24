
import { DATE_FORMAT } from '@/constants/input.constant';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function SharedCalendar() {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
    const [today, setToday] = useState<Date>(new Date());

    return (
        <div className='calendar-container'>
            <Calendar
                onChange={(event: any) => {
                    setSelectedDate(dayjs(event, DATE_FORMAT));
                }}
                showDoubleView={false}
                minDate={today}
                showNeighboringMonth={false}
                showFixedNumberOfWeeks={false}
            />
            <p>selected Date is {selectedDate.format(DATE_FORMAT)}</p>
        </div>
    )
}