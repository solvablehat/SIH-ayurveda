import { apiService } from './api';

export interface Dosha {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface Report {
  name: string;
  data: string;
}

export interface Patient {
  _id?: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email?: string;
  address?: string;
  photo?: string;
  dosha?: Dosha;
  conditions?: string[];
  medications?: string[];
  lastVisit?: string;
  nextAppointment?: string;
  compliance?: number;
  notes?: string;
  reports?: Report[];
  pastDiseases?: string;
  currentDiet?: string;
}

export const patientService = {
  async getAllPatients(): Promise<Patient[]> {
    try {
      const response = await apiService.getPatients();
      return response.patients;
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      throw error;
    }
  },

  async getPatientById(id: string): Promise<Patient> {
    try {
      console.log('Fetching patient with ID:', id);
      const response = await apiService.getPatient(id);
      console.log('Patient service response:', response);
      return response.patient;
    } catch (error) {
      console.error('Failed to fetch patient:', error);
      throw error;
    }
  },

  async createOrUpdatePatient(patient: Patient): Promise<void> {
    try {
      await apiService.addOrUpdatePatient(patient);
    } catch (error) {
      console.error('Failed to create/update patient:', error);
      throw error;
    }
  },

  async updatePatientDosha(id: string, dosha: { vata: number; pitta: number; kapha: number }): Promise<void> {
    try {
      await apiService.updatePatientDosha(id, dosha);
    } catch (error) {
      console.error('Failed to update patient dosha:', error);
      throw error;
    }
  },

  async getPatientNotes(id: string) {
    try {
      const response = await apiService.getPatientNotes(id);
      return response.notes;
    } catch (error) {
      console.error('Failed to fetch patient notes:', error);
      throw error;
    }
  },

  async addPatientNote(id: string, note: string, author?: string) {
    try {
      await apiService.addPatientNote(id, { note, author });
    } catch (error) {
      console.error('Failed to add patient note:', error);
      throw error;
    }
  }
};