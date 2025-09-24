import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { patientService, Patient } from '@/services/patientService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Search } from 'lucide-react';

export default function PatientList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setTimeout(() => {
        alert(location.state.message);
      }, 100);
    }
  }, [location.state]);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getAllPatients();
      console.log('Loaded patients:', data); // Debug log
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Failed to load patients');
      console.error('Error loading patients:', err);
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

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={loadPatients}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Button onClick={() => navigate('/patients/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.filter(patient => patient._id).map((patient) => {
          const dominantDosha = patient.dosha ? getDominantDosha(patient.dosha) : null;
          const patientId = patient._id;

          console.log('Patient ID:', patientId); // Debug log

          return (
            <Card 
              key={patientId} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => {
                console.log('Navigating to patient:', patientId); // Debug log
                navigate(`/patients/${patientId}`);
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={patient.photo} alt={patient.name} />
                    <AvatarFallback>
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {patient.age} years, {patient.gender}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> {patient.phone}
                  </p>
                  
                  {patient.email && (
                    <p className="text-sm">
                      <span className="font-medium">Email:</span> {patient.email}
                    </p>
                  )}
                  
                  {dominantDosha && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Dosha:</span>
                      <Badge className={getDoshaColor(dominantDosha.name)}>
                        {dominantDosha.name} {dominantDosha.percentage}%
                      </Badge>
                    </div>
                  )}
                  
                  {patient.conditions && patient.conditions.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Conditions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {patient.conditions.slice(0, 2).map((condition, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                        {patient.conditions.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{patient.conditions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {patient.compliance && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Compliance:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${patient.compliance}%` }}
                        />
                      </div>
                      <span className="text-sm">{patient.compliance}%</span>
                    </div>
                  )}
                  
                  {patient.lastVisit && (
                    <p className="text-sm text-gray-500">
                      Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No patients found</p>
        </div>
      )}
    </div>
  );
}