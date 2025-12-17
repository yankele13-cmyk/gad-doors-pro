'use client';

import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '@/services/business/appointmentStore';
import BookingModal from './BookingModal';

const locales = {
  'fr': fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function AdminCalendar() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Controlled State for Calendar Navigation
  const [view, setView] = useState('week');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      const calendarEvents = data.map(app => ({
          id: app.id,
          title: `${app.customer.name} - ${app.technical?.tags?.[0] || 'RDV'}`,
          start: app.start,
          end: app.end,
          allDay: false,
          resource: app
      }));
      setEvents(calendarEvents);
    } catch (err) {
      console.error("Failed to load calendar", err);
    }
  };

  const handleSelectSlot = (slotInfo) => {
      setSelectedEvent(null);
      setSelectedSlot({ start: slotInfo.start });
      setIsModalOpen(true);
  };

  const handleSelectEvent = (event) => {
      setSelectedEvent(event.resource);
      setSelectedSlot(null);
      setIsModalOpen(true);
  };

  const handleSaveAppointment = async (data, isDelete = false) => {
      if (isDelete && selectedEvent) {
          // Delete
          await deleteAppointment(selectedEvent.id);
      } else if (selectedEvent) {
          // Update
          await updateAppointment(selectedEvent.id, data);
      } else {
          // Create
          await createAppointment(data);
      }
      await loadAppointments();
  };

  const eventPropGetter = (event) => {
      const isConfirmed = event.resource.status === 'confirmed';
      return {
          style: {
              backgroundColor: isConfirmed ? '#00b894' : '#0984e3',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.85rem'
          }
      };
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', padding: '20px', background: 'white', borderRadius: '16px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        culture="fr"
        messages={{
            next: "Suivant",
            previous: "Précédent",
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine",
            day: "Jour",
            agenda: "Agenda",
            date: "Date",
            time: "Heure",
            event: "Événement",
            noEventsInRange: "Aucun RDV dans cette période."
        }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventPropGetter}
        
        // Controlled Props
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        views={['month', 'week', 'day', 'agenda']} // Explicitly enable views
      />

      {isModalOpen && (
          <BookingModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveAppointment}
            initialData={selectedEvent || (selectedSlot ? { start: selectedSlot.start } : null)}
          />
      )}
    </div>
  );
}
