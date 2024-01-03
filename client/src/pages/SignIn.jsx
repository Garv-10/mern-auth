import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      // setLoading(true);
      // setError(false);
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      // setLoading(false);
      if (data.success === false) {
        // setError(true);
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (err) {
      console.log(err);
      // setLoading(false);
      // setError(true);
      dispatch(signInFailure(err));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In
      </h1>
      <form onSubmit={handleSubmit}
        className='flex flex-col'>
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
          {loading ? 'Loading' : 'Sign In'}
        </button>
      </form>
      <div className='flex justify-center items-center flex-col gap-2 mt-5 text-gray-500 text-sm'>
        <p>Dont have an account?</p>
        <Link to='/sign-up' className='inline-block'>
          <span className='text-blue-500 hover:underline'>
            Sign up
          </span>
        </Link>
      </div>
      <p className='text-red-700 text-center mt-5'>
        {error ? error.message || 'Something went wrong!' : ''}
        Something went wrong!
      </p>
    </div>
  )
}
