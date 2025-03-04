// services/exportService.ts
import api from './api';
import { saveAs } from 'file-saver';

export const exportAppointmentsCSV = async () => {
  try {
    const response = await api.get('/appointments/export', {
      responseType: 'blob',
    });
    saveAs(response.data, 'rendezvous.csv');
  } catch (error) {
    console.error('Export failed:', error);
  }
};