import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import loginLottie from '../assets/loginLottie.json';
import { AuthContext } from '../contexts/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';
import toast, { Toaster } from 'react-hot-toast';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

const handleGoogleSignIn = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await signInWithGoogle();
    toast.success('Logged in with Google! 🎉');
    navigate(from, { replace: true });
  } catch (err) {
    console.error('Google sign-in error:', err.message);
    toast.error('Google sign-in failed 😓');
  } finally {
    setLoading(false);
  }
};
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.pathname || '/';
  const { signInUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [, setUser] = useState(null); 
 useEffect(() => {
  const redirectPath = localStorage.getItem("redirectAfterLogin");
  if (redirectPath) {
    navigate(redirectPath);
    localStorage.removeItem("redirectAfterLogin");
  }
}, [navigate]);



  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const result = await signInUser(email, password);
      
      console.log("User logged in:", result.user);
      toast.success('Logged in successfully! 🎉');
      form.reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err.message);
      toast.error('Login failed 😓 Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unSub();
  }, []);

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
                <h1 className="text-4xl font-bold mb-4">Log in Now</h1>

                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                  required
                />

                <label className="label mt-2">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                  required
                />

                <div className="divider">OR</div>
<button
  onClick={handleGoogleSignIn}
  className="btn btn-outline btn-accent w-full"
>
  <img src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw" alt="google" className="w-5 h-5 mr-2" />
  Sign in with Google
</button>


                <div className="mt-2">
                  <a className="link link-hover text-sm">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className={`btn btn-neutral mt-4 w-full ${loading ? 'btn-disabled opacity-70' : ''}`}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>

                <p className="text-sm text-center mt-3">
                  Don’t have an account?{' '}
                  <a href="/register" className="link text-blue-600">
                    Register here
                  </a>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
