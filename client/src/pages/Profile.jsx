import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOut } from '../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // console.log(formData);

  const { currentUser, loading, error } = useSelector(state => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + image.name;
    const storageRef = ref(storage, 'profile/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    }
    catch (error) {
      dispatch(deleteUserFailure(error));
    }

  };

  const handleSignout = async () => {
    try {
      await fetch('/api/user/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 max-w-lg'>
        <input type="file" id='file'
          ref={fileRef} hidden accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile'
          className='w-32 h-32 rounded-full mx-auto object-cover cursor-pointer mt-2'
          onClick={() => fileRef.current.click()}
        />
        <p>
          {imageError ? (
            <span className='text-red-700 text-center'>
              <p>Error uploading image.</p>
              <p>Maybe size is greater than 2MB or it is not an image</p>
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>
              {`Uploading ${imagePercent}%`}
            </span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>
              Uploaded successfully
            </span>
          ) : (
            ""
          )}
        </p>
        <input type="text" id='username'
          placeholder='Username'
          className='bg-slate-100 p-3 rounded-lg max-w-lg'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input type="email" id='email'
          placeholder='Email'
          className='bg-slate-100 p-3 rounded-lg'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input type="password" id='password'
          placeholder='Password'
          className='bg-slate-100 p-3 rounded-lg'
          defaultValue={currentUser.password}
          onChange={handleChange}
        />
        <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='felx justify-between mt-5 text-center'>
        <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer mx-5'>
          Delete Account
        </span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer mx-5'>
          Sign out
        </span>
      </div>
      <p className='text-red-700 mt-5'>
        {error && 'Something went wrong'}
      </p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User updated successfully!'}
      </p>
    </div >
  )
}
