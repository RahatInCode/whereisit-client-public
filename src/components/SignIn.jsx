import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import loginLottie from '../assets/loginLottie.json';
import { AuthContext } from '../contexts/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';
import toast, { Toaster } from 'react-hot-toast';

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/' ;
  const { signInUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [ setUser] = useState(null);

  const handleSignIn = async (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  setLoading(true);

  try {
    await signInUser(email, password);
    toast.success('Logged in successfully! 🎉');
    form.reset();
    setTimeout(() => {
      navigate(from);
    }, 3000); 

  } catch (err) {
    console.error('Login error:', err.message);
    toast.error('Login failed 😓. Check your credentials.');
  } 
};


  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unSub();
  }, [setUser]);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: '400px' }} animationData={loginLottie} loop />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSignIn}>
              <fieldset className="fieldset">
                <h1 className="text-5xl font-bold mb-4">Log in now!</h1>

                <label className="label">Email</label>
                <input name="email" type="email" className="input input-bordered w-full" placeholder="Email" required />

                <label className="label mt-2">Password</label>
                <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" required />

                <div className="mt-2">
                  <a className="link link-hover text-sm">Forgot password?</a>
                </div>

                <button type="submit" className={`btn btn-neutral mt-4 w-full ${loading ? 'btn-disabled opacity-70' : ''}`}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
