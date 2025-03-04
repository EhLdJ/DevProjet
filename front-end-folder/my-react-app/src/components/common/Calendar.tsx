// components/common/Calendar.tsx
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  doctor: string;
  status: 'confirmed' | 'pending';
}

const AppointmentCalendar = ({ events }: { events: Event[] }) => {
  const eventStyleGetter = (event: Event) => {
    const backgroundColor = event.status === 'confirmed' ? '#4CAF50' : '#FFC107';
    return { style: { backgroundColor } };
  };

  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      eventPropGetter={eventStyleGetter}
    />
  );
};