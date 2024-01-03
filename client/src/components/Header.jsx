import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function Header() {
    const { currentUser } = useSelector(state => state.user);
    return (
        <div className='bg-slate-200'>
            <div className='flex  items-center justify-between max-w-4xl mx-auto p-4 md:p-8'>
                <Link to='/'>
                    <h1 className='font-bold'>
                        Auth App
                    </h1>
                </Link>
                <ul className='flex space-x-4'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        {currentUser ? (
                            <Link to='/profile'>
                                <img src={currentUser.profilePicture} alt={'profile'} className='w-7 h-7 rounded-full object-cover' />
                            </Link>
                        ) : (
                            <Link to='/sign-in'>Sign In</Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}
