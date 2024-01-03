import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col items-center gap-4 max-w-lg'>
        <img
          src={currentUser.profilePicture}
          alt='profile'
          className='w-32 h-32 rounded-full mx-auto object-cover cursor-pointer mt-2'
        />
        <input type="text" id='username'
          placeholder='Username'
          className='bg-slate-100 p-3 rounded-lg max-w-lg'
          defaultValue={currentUser.username}
        />
        <input type="email" id='email'
          placeholder='Email'
          className='bg-slate-100 p-3 rounded-lg'
          defaultValue={currentUser.email}
        />
        <input type="password" id='password'
          placeholder='Password'
          className='bg-slate-100 p-3 rounded-lg'
          defaultValue={currentUser.password}
        />
        <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='felx justify-between mt-5 text-center'>
        <span className='text-red-700 cursor-pointer mx-5'>
          Delete Account
        </span>
        <span className='text-red-700 cursor-pointer mx-5'>
          Sign out
        </span>
      </div>
    </div>
  )
}
