'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import AdminCalendar from '@/components/admin/crm/AdminCalendar';

export default function AdminCalendarPage() {
  return (
    <AdminLayout title="Agenda & Rendez-vous">
      <AdminCalendar />
    </AdminLayout>
  );
}
