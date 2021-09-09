import { useState, useCallback, Fragment } from 'react';
import Code from './Code';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import Modal from './Modal';

export default function Snippet({ snippet }) {
  const { user } = useUser();
  const [showModal, setShowModal] = useState('');
  const handleShowModal = useCallback(
    (code) => {
      setShowModal(code);
    },
    [showModal]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal('');
  }, []);

  const sendEmail = async (email) => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify({ to: email, code: showModal }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setShowModal('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      {showModal && (
        <Modal onCancel={handleCloseModal} onSendEmail={sendEmail} />
      )}
      <div className='bg-gray-100 p-4 rounded-md my-2 shadow-lg'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-xl text-gray-800 font-bold'>
            {snippet.data.name}
          </h2>
          <span className='font-bold text-xs text-blue-800 px-2 py-1 rounded-lg '>
            {snippet.data.language}
          </span>
        </div>
        <p className='text-gray-900 mb-4'>{snippet.data.description}</p>
        <Code code={snippet.data.code} />
        {user && user?.sub === snippet.data.userId && (
          <Link href={`/edit/${snippet.id}`}>
            <a className='text-gray-800 mr-2 hover:underline'>Edit</a>
          </Link>
        )}
        <button
          className='bg-blue-800 text-xs hover:bg-blue-900 text-white font-bold py-1 px-2 rounded 
          focus:outline-none focus:shadow-outline mb-2'
          type='button'
          onClick={() => handleShowModal(snippet.data.code)}
        >
          Send Code Via Email
        </button>
      </div>
    </Fragment>
  );
}
