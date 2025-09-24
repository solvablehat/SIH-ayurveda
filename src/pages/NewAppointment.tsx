import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { createAppointment, getAppointment, updateAppointment } from '@/lib/appointments';
import { TopAppBar } from '@/components/ui/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function NewAppointment() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { id } = useParams();

  const existing = id ? getAppointment(id) : undefined;

  const [patientName, setPatientName] = useState(existing?.patientName ?? '');
  const [date, setDate] = useState(existing?.date ?? '');
  const [time, setTime] = useState(existing?.time ?? '09:00');
  const [type, setType] = useState(existing?.type ?? 'Consultation');
  const [notes, setNotes] = useState(existing?.notes ?? '');

  const save = () => {
    if (!patientName || !date || !time) {
      alert('Please fill required fields');
      return;
    }

    if (existing) {
      updateAppointment(existing.id, { patientName, date, time, type, notes });
    } else {
      createAppointment({ patientName, date, time, type, notes });
    }

    qc.invalidateQueries({ queryKey: ['appointments'] });
    navigate('/appointments');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopAppBar title={existing ? 'Edit Appointment' : 'New Appointment'} />

      <div className="p-6 max-w-xl">
        <div className="space-y-4">
          <label className="block">
            <div className="text-sm text-muted-foreground">Patient name</div>
            <Input value={patientName} onChange={(e) => setPatientName(e.target.value)} />
          </label>

          <label className="block">
            <div className="text-sm text-muted-foreground">Date</div>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>

          <label className="block">
            <div className="text-sm text-muted-foreground">Time</div>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </label>

          <label className="block">
            <div className="text-sm text-muted-foreground">Type</div>
            <Input value={type} onChange={(e) => setType(e.target.value)} />
          </label>

          <label className="block">
            <div className="text-sm text-muted-foreground">Notes</div>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>

          <div className="flex gap-2">
            <Button onClick={save}>{existing ? 'Save' : 'Create'}</Button>
            <Button variant="ghost" onClick={() => navigate('/appointments')}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
