import React, { useState, useEffect, createContext, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, UserCheck, Activity, FileText } from 'lucide-react';
import { patientService, Patient } from '@/services/patientService';

// Create a context to store current patient
interface PatientContextType {
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
}

const PatientContext = createContext<PatientContextType>({
  currentPatient: null,
  setCurrentPatient: () => {}
});

export const usePatientContext = () => useContext(PatientContext);

export default function PatientProfile() {
  const { id } = useParams<{ id: string }>(); // Changed from patientId to id
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('PatientProfile mounted, id:', id); // Changed from patientId to id
    if (id) {
      loadPatient(id);
    } else {
      setError('No patient ID provided');
      setLoading(false);
    }
  }, [id]); // Changed from patientId to id

  const loadPatient = async (patientId: string) => { // Keep parameter name as patientId for clarity
    try {
      console.log('Loading patient with ID:', patientId);
      setLoading(true);
      setError(null);
      
      const data = await patientService.getPatientById(patientId);
      console.log('Loaded patient data:', data);
      
      setPatient(data);
      
      // Store patient in localStorage for access across pages
      localStorage.setItem('currentPatient', JSON.stringify(data));
      localStorage.setItem('currentPatientId', patientId);
      
    } catch (error) {
      console.error('Error loading patient:', error);
      setError('Failed to load patient details. Please check if the patient exists.');
    } finally {
      setLoading(false);
    }
  };

  const getDominantDosha = (dosha: { vata: number; pitta: number; kapha: number }) => {
    const entries = Object.entries(dosha);
    const dominant = entries.reduce((max, current) => 
      current[1] > max[1] ? current : max
    );
    return {
      name: dominant[0].charAt(0).toUpperCase() + dominant[0].slice(1),
      percentage: dominant[1]
    };
  };

  const getDoshaColor = (doshaName: string) => {
    switch (doshaName.toLowerCase()) {
      case 'vata': return 'bg-purple-100 text-purple-800';
      case 'pitta': return 'bg-red-100 text-red-800';
      case 'kapha': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerateDosha = () => {
    console.log('Navigating to dosha assessment for patient:', id);
    navigate(`/patients/${id}/dosha-assessment`);
  };

  const handleGenerateDietPlan = () => {
    console.log('Navigating to diet plan generator for patient:', id);
    navigate(`/diet-plan/generator`, {
      state: { selectedPatientId: id, selectedPatient: patient }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p>Loading patient details...</p>
        <p className="text-sm text-gray-500">Patient ID: {id}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-sm text-gray-500 mb-4">Patient ID: {id}</p>
        <div className="space-x-2">
          <Button onClick={() => loadPatient(id!)}>Retry</Button>
          <Button variant="outline" onClick={() => navigate('/patients')}>Back to Patients</Button>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 mb-4">Patient not found</p>
        <Button onClick={() => navigate('/patients')}>Back to Patients</Button>
      </div>
    );
  }

  const dominantDosha = patient.dosha ? getDominantDosha(patient.dosha) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/patients')}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-primary" />
                <h1 className="text-2xl font-bold">Patient Profile</h1>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button 
                onClick={handleGenerateDosha}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Activity className="h-4 w-4" />
                <span>Generate Dosha</span>
              </Button>
              
              {patient.dosha && (
                <Button 
                  onClick={handleGenerateDietPlan}
                  className="flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Generate Diet Plan</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Patient Basic Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={patient.photo} alt={patient.name} />
                  <AvatarFallback className="text-lg">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{patient.name}</CardTitle>
                  <p className="text-muted-foreground">
                    {patient.age} years • {patient.gender}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Contact Information</h4>
                    <p className="font-medium">{patient.phone}</p>
                    {patient.email && <p className="text-sm text-muted-foreground">{patient.email}</p>}
                  </div>
                  
                  {patient.address && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Address</h4>
                      <p className="text-sm">{patient.address}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {dominantDosha ? (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Dosha Profile</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getDoshaColor(dominantDosha.name)}>
                          {dominantDosha.name} {dominantDosha.percentage}%
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Vata: {patient.dosha!.vata}%</span>
                          <span>Pitta: {patient.dosha!.pitta}%</span>
                          <span>Kapha: {patient.dosha!.kapha}%</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Dosha Profile</h4>
                      <p className="text-sm text-gray-500">No dosha assessment completed yet</p>
                      <Button 
                        onClick={handleGenerateDosha}
                        size="sm"
                        variant="outline"
                        className="mt-2"
                      >
                        Take Assessment
                      </Button>
                    </div>
                  )}
                  
                  {patient.compliance && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Compliance Rate</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${patient.compliance}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{patient.compliance}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Conditions */}
            {patient.conditions && patient.conditions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medical Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {patient.conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Medications */}
            {patient.medications && patient.medications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {patient.medications.map((medication, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{medication}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Medical History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patient.pastDiseases && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Past Diseases</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{patient.pastDiseases}</p>
                </CardContent>
              </Card>
            )}

            {patient.currentDiet && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Diet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{patient.currentDiet}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patient.lastVisit && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Last Visit</h4>
                    <p className="font-medium">{new Date(patient.lastVisit).toLocaleDateString()}</p>
                  </div>
                )}
                
                {patient.nextAppointment && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Next Appointment</h4>
                    <p className="font-medium">{new Date(patient.nextAppointment).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {patient.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Clinical Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{patient.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}