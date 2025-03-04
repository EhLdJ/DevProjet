// components/admin/DoctorCRUD.tsx
import { useForm } from 'react-hook-form';
import { Doctor } from '../../types/types';
import api from '../../services/api';

const DoctorCRUD = () => {
  const { register, handleSubmit, reset } = useForm<Doctor>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await api.get('/doctors');
      setDoctors(response.data);
    };
    fetchDoctors();
  }, []);

  const onSubmit = async (data: Doctor) => {
    try {
      if (data.id) {
        await api.put(`/doctors/${data.id}`, data);
      } else {
        await api.post('/doctors', data);
      }
      reset();
    } catch (error) {
      console.error('Error saving doctor:', error);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <input type="hidden" {...register('id')} />
        <div className="grid grid-cols-2 gap-4">
          <input
            {...register('firstName')}
            placeholder="Prénom"
            className="p-2 border rounded"
          />
          <input
            {...register('lastName')}
            placeholder="Nom"
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sauvegarder
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Spécialité
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {doctor.firstName} {doctor.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {doctor.specialty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};