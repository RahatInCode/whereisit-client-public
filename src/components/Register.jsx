import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import registerLottie from '../assets/registerLottie.json'
import Lottie from 'lottie-react';
const Register = () => {
    const {createUser} = use(AuthContext)









   const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target; 
    const email = form.email.value;
    const password = form.password.value;

    // createUser call
    createUser(email, password)
      .then((result) => {
        console.log('User registered:', result);
        form.reset(); // optional: clear form after success
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };

    return (
         <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    <Lottie  style={{width:'400px'}}  animationData={registerLottie} loop={true}></Lottie>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleRegister}>
<fieldset className="fieldset">
             <h1 className="text-5xl font-bold">Register now!</h1>
          <label className="label">Email</label>
          <input name="email" type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input name="password" type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button  className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
    );
};

export default Register;