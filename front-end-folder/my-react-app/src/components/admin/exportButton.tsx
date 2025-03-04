// components/admin/ExportButton.tsx
import { exportAppointmentsCSV } from '../../services/exportService';

const ExportButton = () => (
  <button
    onClick={exportAppointmentsCSV}
    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
  >
    Exporter en CSV
  </button>
);