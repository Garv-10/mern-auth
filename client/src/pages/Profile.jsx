import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);

  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  // console.log(formData);

  const { currentUser } = useSelector(state => state.user);
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
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col items-center gap-4 max-w-lg'>
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
    </div >
  )
}
