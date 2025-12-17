'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import TechnicianAgenda from '@/components/admin/crm/TechnicianAgenda';

export default function AgendaPage() {
  return (
    <AdminLayout title="Planning Technicien">
      <TechnicianAgenda />
    </AdminLayout>
  );
}
