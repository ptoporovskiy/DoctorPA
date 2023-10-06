import HttpError from '@wasp/core/HttpError.js'

export const getAppointments = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const appointments = await context.entities.Appointment.findMany({
    where: {
      patient: { id: args.userId }
    }
  });

  return appointments;
}

export const getChats = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Chat.findMany({
    where: {
      OR: [
        { doctorId: context.user.id },
        { patientId: context.user.id }
      ]
    },
    include: {
      patient: true,
      doctor: true
    }
  });
}

export const getNotes = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const notes = await context.entities.Note.findMany({
    where: {
      doctor: { id: context.user.id },
      appointment: { patient: { id: userId } }
    }
  })

  return notes
}