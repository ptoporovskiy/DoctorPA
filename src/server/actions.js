import HttpError from '@wasp/core/HttpError.js'

export const createAppointment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { doctorId, patientId, dateTime } = args;

  const doctor = await context.entities.User.findUnique({ where: { id: doctorId } });
  const patient = await context.entities.User.findUnique({ where: { id: patientId } });

  if (!doctor || !patient) { throw new HttpError(400, 'Invalid doctorId or patientId') }

  const appointment = await context.entities.Appointment.create({
    data: {
      doctorId,
      patientId,
      dateTime
    }
  });

  return appointment;
}

export const cancelAppointment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const appointment = await context.entities.Appointment.findUnique({
    where: { id: args.appointmentId }
  });
  if (!appointment) { throw new HttpError(404) };

  if (appointment.patientId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Appointment.delete({
    where: { id: args.appointmentId }
  });
}

export const createChat = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { doctorId, patientId, content } = args;

  const chat = await context.entities.Chat.create({
    data: {
      doctorId,
      patientId,
      content
    }
  });

  return chat;
}

export const createNote = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { doctorId, appointmentId, content } = args;

  const doctor = await context.entities.User.findUnique({
    where: { id: doctorId }
  });

  if (!doctor) { throw new HttpError(400, 'Doctor not found') };

  const appointment = await context.entities.Appointment.findUnique({
    where: { id: appointmentId }
  });

  if (!appointment) { throw new HttpError(400, 'Appointment not found') };

  if (appointment.doctorId !== doctorId) { throw new HttpError(403, 'Doctor is not associated with the appointment') };

  if (appointment.patientId !== context.user.id) { throw new HttpError(403, 'User is not associated with the appointment') };

  return context.entities.Note.create({
    data: {
      doctor: { connect: { id: doctorId } },
      appointment: { connect: { id: appointmentId } },
      content
    }
  });
}