const API_BASE_URL = 'https://ayurveda-be.onrender.com';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log('API Request:', url, config); // Debug log
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Patient Services
  async getPatients() {
    return this.request<{patients: any[]}>('/patients');
  }

  async getPatient(id: string) {
    return this.request<{patient: any}>(`/patient/${id}`);
  }

  async addOrUpdatePatient(patientData: any) {
    return this.request('/add_patient', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  }

  async updatePatientDosha(id: string, dosha: { vata: number; pitta: number; kapha: number }) {
    const response = await fetch(`${API_BASE_URL}/patients/${id}/dosha`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dosha }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update patient dosha: ${response.statusText}`);
    }

    return response.json();
  }

  async getPatientNotes(id: string) {
    return this.request<{notes: any[]}>(`/patients/${id}/notes`);
  }

  async addPatientNote(id: string, note: any) {
    return this.request(`/patients/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify(note),
    });
  }
}

export const apiService = new ApiService();