// types/types.ts
export interface User {
    id: string;
    email: string;
    role: 'patient' | 'doctor' | 'admin';
    firstName: string;
    lastName: string;
  }
  
  export interface Doctor {
    id: string;
    specialty: string;
    userId: string;
    availability: AvailabilitySlot[];
}
  
  export interface Appointment {
    id: string;
    date: Date;
    status: 'pending' | 'confirmed' | 'canceled';
    patientId: string;
    doctorId: string;
}