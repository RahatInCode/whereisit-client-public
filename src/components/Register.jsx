import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import registerLottie from '../assets/registerLottie.json';
import Lottie from 'lottie-react';
import { NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    // Client-side password validation
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must include at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must include at least one lowercase letter");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });
      toast.success("Registered successfully!");
      console.log("User registered:", result.user);
      form.reset();
      navigate('/');
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: '400px' }} animationData={registerLottie} loop />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <h1 className="text-4xl font-bold mb-4">Register Now</h1>

                <label className="label">Name</label>
                <input name="name" type="text" className="input" placeholder="Your Name" required />

                <label className="label">Photo URL</label>
                <input name="photoURL" type="text" className="input" placeholder="Photo URL" required />

                <label className="label">Email</label>
                <input name="email" type="email" className="input" placeholder="Email" required />

                <label className="label">Password</label>
                <input name="password" type="password" className="input" placeholder="Password" required />

                <div className="mt-2">
                  <NavLink to="/forgot-password" className="link link-hover text-sm">
                    Forgot password?
                  </NavLink>
                </div>

                <button type="submit" className="btn btn-neutral mt-4 w-full">
                  Register
                </button>

                <p className="mt-2 text-sm text-center">
                  Already have an account?{' '}
                  <NavLink className="link text-blue-500" to="/signin">
                    Login here
                  </NavLink>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

