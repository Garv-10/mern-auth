import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
      <form onSubmit={handleSubmit}
        className='flex flex-col'>
        <input type="text"
          placeholder="Username"
          id="username"
          className="block mx-auto my-3 p-2 border-2 border-gray-300 rounded-md"
          onChange={handleChange} />
        <input type="email"
          placeholder="Email"
          id="email"
          className="block mx-auto my-3 p-2 border-2 border-gray-300 rounded-md"
          onChange={handleChange} />
        <input type="password"
          placeholder="Password"
          id="password"
          className="block mx-auto my-3 p-2 border-2 border-gray-300 rounded-md"
          onChange={handleChange} />
        <button disabled={loading}
          type="submit"
          className="mx-auto my-3 p-2 px-5 border-2 rounded-md bg-slate-700 text-white font-semibold hover:opacity-90 disabled:opacity-80">
          {loading ? 'Loading' : 'Sign Up'}
        </button>
      </form>
      <div className='flex justify-center items-center flex-col gap-2 mt-5 text-gray-500 text-sm'>
        <p>Already have an account?</p>
        <Link to='/sign-in' className='inline-block'>
          <span className='text-blue-500 hover:underline'>
            Sign in
          </span>
        </Link>
      </div>
      {error && <p className='text-red-700 text-center mt-5'>
        Something went wrong!
      </p>}
    </div>
  )
}
