import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getNotes from '@wasp/queries/getNotes';

export function Note() {
  const { noteId } = useParams();
  const { data: note, isLoading, error } = useQuery(getNotes, { variables: { noteId } });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{note.id}</h1>
      <p>{note.content}</p>
      <Link to={`/note/${note.id}/edit`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Edit Note</Link>
      <Link to={`/note/${note.id}/delete`} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4'>Delete Note</Link>
    </div>
  );
}