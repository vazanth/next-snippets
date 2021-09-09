import { Fragment, useState } from 'react';

const Modal = ({ onCancel, onSendEmail }) => {
  const [email, setEmail] = useState('');
  return (
    <Fragment>
      <div className='modal fixed w-full h-full top-0 left-0 flex items-center justify-center'>
        <div className='modal-overlay absolute w-full h-full bg-gray-900 opacity-50'></div>

        <div className='modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto'>
          <div className='modal-content py-4 text-left px-6'>
            <div className='flex justify-between items-center pb-3'>
              <p className='text-2xl font-bold'>Enter Your Email!</p>
              <div
                className='modal-close cursor-pointer z-50'
                onClick={onCancel}
              >
                <svg
                  className='fill-current text-black'
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                >
                  <path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'></path>
                </svg>
              </div>
            </div>

            <div className='mb-4'>
              <label
                className='block text-red-100 text-sm font-bold mb-1'
                htmlFor='Your Email'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                name='email'
                className='w-full border bg-white rounded px-3 py-2 outline-none text-gray-700'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='flex justify-center pt-2'>
              <button
                className='modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400'
                onClick={() => onSendEmail(email)}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
