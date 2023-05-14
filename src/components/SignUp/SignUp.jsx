import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const SignUp = () => {
    const [error,setError] =useState('');
    const {createUser} =useContext(AuthContext)
    const handelSignUp = event =>{
        event.preventDefault();

        const form =event.target;
        const email =form.email.value;
        const password =form.password.value;
        const confirm =form.Confirm.value;
        console.log(email,password,confirm)

        setError('')
        if(password !== confirm){
            setError('Your Password did not match')
            return
        }
        else if(password.length <6){
            setError('password must be 6 characters of longer')
            return
        }
        createUser(email,password)
        .then(result =>{
            const loggedUser =result.user;
            console.log(loggedUser)
        })
        .catch(error=>{
            console.error(error)
            setError(error.message)
        })
    }

    return (
        <div className='form-container'>
        <h2 className='form-title'>Sign Up</h2>
        <form onSubmit={handelSignUp}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" required />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" required />
            </div>
            <div className="form-control">
                <label htmlFor="Confirm">Confirm Password</label>
                <input type="password" name="Confirm" id="" required />
            </div>
            <input className='btn-submit' type="submit" value="Sign Up" />
        </form>
        <p className='create'><small>Already have an account?<Link to="/login">Login</Link></small></p>
        <p className='text-error'>{error}</p>
    </div>
    );
};

export default SignUp;