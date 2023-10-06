import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getAppointments from '@wasp/queries/getAppointments';
import cancelAppointment from '@wasp/actions/cancelAppointment';
import createAppointment from '@wasp/actions/createAppointment';

export function AppointmentPage() {
  const { appointmentId } = useParams();

  const { data: appointment, isLoading, error } = useQuery(getAppointments, { appointmentId });
  const cancelAppointmentFn = useAction(cancelAppointment);

  useEffect(() => {
    // Fetch the appointment data
  }, [appointmentId]);

  const handleCancelAppointment = () => {
    cancelAppointmentFn({ appointmentId });
    // Show success message or redirect to dashboard
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
      {/* Display the appointment details here */}
      <button onClick={handleCancelAppointment}>Cancel Appointment</button>
    </div>
  );
}