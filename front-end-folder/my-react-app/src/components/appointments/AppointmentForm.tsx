// components/appointments/AppointmentForm.tsx
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import api from '../../services/api';

type AppointmentFormData = {
  doctorId: string;
  date: Date;
  reason: string;
};

const AppointmentForm = () => {
  const { register, handleSubmit, watch } = useForm<AppointmentFormData>();
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const selectedDoctor = watch('doctorId');
  const selectedDate = watch('date');

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await api.get('/doctors');
      setDoctors(response.data);
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (selectedDoctor && selectedDate) {
        const response = await api.get(`/doctors/${selectedDoctor}/availability`, {
          params: { date: selectedDate },
        });
        setAvailableSlots(response.data);
      }
    };
    fetchAvailability();
  }, [selectedDoctor, selectedDate]);

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      await api.post('/appointments', data);
      alert('Rendez-vous demandé avec succès!');
    } catch (error) {
      alert("Erreur lors de la demande de rendez-vous");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Médecin</label>
          <select
            {...register('doctorId', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.firstName} {doctor.lastName} ({doctor.specialty})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            {...register('date', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Créneau horaire</label>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {availableSlots.map((slot) => (
              <button
                type="button"
                key={slot}
                className="text-sm p-2 bg-blue-100 rounded hover:bg-blue-200"
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Motif</label>
          <textarea
            {...register('reason')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Demander le rendez-vous
      </button>
    </form>
  );
};