import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { patientService, Patient } from '@/services/patientService';
import { Upload, FileText } from 'lucide-react';

interface AddPatientFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddPatientForm({ onSuccess, onCancel }: AddPatientFormProps) {
  const [formData, setFormData] = useState<Partial<Patient>>({
    name: '',
    phone: '',
    age: undefined,
    gender: '',
    email: '',
    address: '',
    pastDiseases: '',
    currentDiet: '',
    reports: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);

  const handleInputChange = (field: keyof Patient, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPdfFiles(files);
    
    // Parse PDFs and extract text
    const reports = await Promise.all(
      files.map(async (file) => {
        try {
          // For now, we'll just store file name and a placeholder
          // In production, you'd use a PDF parsing library like pdf-parse
          const text = `PDF Report: ${file.name} - Content would be extracted here`;
          return {
            name: file.name,
            data: text
          };
        } catch (error) {
          console.error('Error parsing PDF:', error);
          return {
            name: file.name,
            data: `Error parsing ${file.name}`
          };
        }
      })
    );
    
    setFormData(prev => ({ ...prev, reports }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('Name and phone are required');
      return;
    }

    setIsLoading(true);
    
    try {
      await patientService.createOrUpdatePatient(formData as Patient);
      onSuccess();
    } catch (error) {
      console.error('Error creating patient:', error);
      alert('Failed to create patient. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Add New Patient</h2>
      
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={formData.age || ''}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || undefined)}
          />
        </div>
        
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select onValueChange={(value) => handleInputChange('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="pastDiseases">Past Diseases</Label>
        <Textarea
          id="pastDiseases"
          value={formData.pastDiseases}
          onChange={(e) => handleInputChange('pastDiseases', e.target.value)}
          rows={3}
          placeholder="Describe any past medical conditions or diseases"
        />
      </div>
      
      <div>
        <Label htmlFor="currentDiet">Current Diet</Label>
        <Textarea
          id="currentDiet"
          value={formData.currentDiet}
          onChange={(e) => handleInputChange('currentDiet', e.target.value)}
          rows={3}
          placeholder="Describe current dietary habits and restrictions"
        />
      </div>
      
      {/* PDF Reports Upload */}
      <div>
        <Label htmlFor="reports">Medical Reports (PDF)</Label>
        <div className="mt-2">
          <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Upload PDF reports</span>
            </div>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handlePdfUpload}
              className="hidden"
            />
          </label>
        </div>
        
        {pdfFiles.length > 0 && (
          <div className="mt-2 space-y-1">
            {pdfFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <FileText className="h-4 w-4" />
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex space-x-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Patient'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}