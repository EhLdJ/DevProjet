// pages/Dashboard/DoctorDashboard.tsx
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { AppointmentCalendar } from '../../components/appointments/AppointmentCalendar';

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    confirmed: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await api.get('/appointments/stats');
      setStats(response.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Rendez-vous total</h3>
          <p className="text-3xl">{stats.totalAppointments}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Confirmés</h3>
          <p className="text-3xl">{stats.confirmed}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">En attente</h3>
          <p className="text-3xl">{stats.pending}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Calendrier des rendez-vous</h2>
        <AppointmentCalendar />
      </div>
    </div>
  );
};