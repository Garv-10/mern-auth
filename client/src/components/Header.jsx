import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
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
                        <Link to='/sign-in'>Sign In</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
