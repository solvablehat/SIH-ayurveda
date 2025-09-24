import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { listAppointments, deleteAppointment, Appointment } from '@/lib/appointments';
import { TopAppBar } from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Calendar, Clock } from 'lucide-react';

export default function Appointments() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data } = useQuery<Appointment[]>({ queryKey: ['appointments'], queryFn: () => listAppointments() });

  const items = data ?? [];

  const handleDelete = (id: string) => {
    if (!confirm('Delete appointment?')) return;
    deleteAppointment(id);
  qc.invalidateQueries({ queryKey: ['appointments'] });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopAppBar title="Appointments" rightAction={<Button onClick={() => navigate('/appointments/new')}><Plus className="h-4 w-4"/></Button>} />

      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-playfair font-semibold">Appointments</h2>
          <p className="text-sm text-muted-foreground">Manage scheduled appointments</p>
        </div>

        <div className="space-y-3">
          {items.length === 0 && (
            <div className="text-center p-6 bg-card rounded-lg">No appointments yet</div>
          )}

          {items.map((a: Appointment) => (
            <div key={a.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div>
                <div className="font-poppins font-medium">{a.patientName}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-3">
                  <Calendar className="h-4 w-4" /> {new Date(a.date).toLocaleDateString()}
                  <Clock className="h-4 w-4" /> {a.time}
                  <span className="px-2 py-0.5 rounded bg-muted text-xs">{a.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate(`/appointments/${a.id}/edit`)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(a.id)}><Trash className="h-4 w-4"/></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
