// components/appointments/AppointmentCalendar.tsx
import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import api from '../../services/api';
import { Appointment } from '../../types/types';

const locales = { fr };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AppointmentCalendar = () => {
  const [events, setEvents] = useState<Appointment[]>([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await api.get('/appointments', {
        params: {
          start: dateFns.startOfMonth(date),
          end: dateFns.endOfMonth(date),
        },
      });
      setEvents(response.data);
    };
    fetchAppointments();
  }, [date]);

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    // Gérer la sélection de créneau
  };

  return (
    <div className="h-[600px] p-4 bg-white rounded-lg shadow">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        culture="fr"
        messages={{
          today: "Aujourd'hui",
          previous: 'Précédent',
          next: 'Suivant',
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
        }}
        selectable
        onSelectSlot={handleSelectSlot}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.status === 'confirmed' ? '#4CAF50' : '#FFC107',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
          },
        })}
      />
    </div>
  );
};