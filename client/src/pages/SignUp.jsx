import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder="Username" id="username" className="block mx-auto my-3 p-2 border-2 border-gray-300 rounded-md" />
        <input type="email" placeholder="Email" id="email" className="block mx-auto my-3 p-2 border-2 border-gray-300 rounded-md" />
        <input type="password" placeholder="Password" id="password" className="block mx-auto my-3 p-2 border-2 border-gray-300 rounded-md" />
        <button type="submit" className="mx-auto my-3 p-2 px-5 border-2 rounded-md bg-slate-700 text-white font-semibold hover:opacity-90 disabled:opacity-80">Sign Up</button>
      </form>
      <div className='flex justify-center items-center flex-col gap-2 mt-5 text-gray-500 text-sm'>
        <p>Already have an account?</p>
        <Link to='/sign-in' className='inline-block'>
          <span className='text-blue-500 hover:underline'>Sign in</span>
        </Link>
      </div>


    </div>

  )
}
