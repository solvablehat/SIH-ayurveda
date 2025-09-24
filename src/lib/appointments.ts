import { v4 as uuidv4 } from 'uuid';

export interface Appointment {
  id: string;
  patientName: string;
  date: string; // ISO
  time: string; // HH:MM
  type: string;
  notes?: string;
}

const STORAGE_KEY = 'Vitarva:appointments';

function readAll(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Appointment[];
  } catch (e) {
    console.error('failed to read appointments', e);
    return [];
  }
}

function writeAll(items: Appointment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function listAppointments(): Appointment[] {
  return readAll().sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
}

export function getAppointment(id: string): Appointment | undefined {
  return readAll().find((a) => a.id === id);
}

export function createAppointment(data: Omit<Appointment, 'id'>): Appointment {
  const appt: Appointment = { id: uuidv4(), ...data } as Appointment;
  const all = readAll();
  all.push(appt);
  writeAll(all);
  return appt;
}

export function updateAppointment(id: string, patch: Partial<Appointment>): Appointment | undefined {
  const all = readAll();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) return undefined;
  all[idx] = { ...all[idx], ...patch };
  writeAll(all);
  return all[idx];
}

export function deleteAppointment(id: string): boolean {
  const all = readAll();
  const next = all.filter((a) => a.id !== id);
  if (next.length === all.length) return false;
  writeAll(next);
  return true;
}
