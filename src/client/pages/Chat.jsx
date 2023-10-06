import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getChats from '@wasp/queries/getChats';
import createChat from '@wasp/actions/createChat';

export function Chat() {
  const { chatId } = useParams();
  const { data: chats, isLoading, error } = useQuery(getChats);
  const createChatFn = useAction(createChat);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const chat = chats.find((c) => c.id === chatId);

  if (!chat) return 'Chat not found';

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Chat with {chat.doctor.username}</h2>
      <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        <div>{chat.content}</div>
      </div>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Message'
          className='px-1 py-2 border rounded text-lg'
        />
        <button
          onClick={() => createChatFn({
            doctorId: chat.doctorId,
            patientId: chat.patientId,
            content: 'New message'
          })}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Send
        </button>
      </div>
      <div>
        <Link to={`/appointment/${chat.appointmentId}`}>Go to Appointment</Link>
      </div>
    </div>
  );
}