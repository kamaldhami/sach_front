import React, { useState } from 'react';
import BackgroundImage from '../assets/bg.png'
import '../App.css'
import api from '../api';
import { useNavigate } from "react-router-dom";
import { getUser } from '../action';
import { useDispatch } from 'react-redux';

export default function LandingPage(props) {
    const dispatch = useDispatch();
    const [field, setField] = useState('login')
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: ''
    })
    let navigate = useNavigate();



    const handleChange = (e) => {
        let newUser = { ...user }
        newUser[e.target.name] = e.target.value;
        setUser(newUser)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (field == 'signup') {
            api.user.create(user)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        } else {
            api.user.login(user)
                .then((res) => {
                    if (res.status == 200) {
                        dispatch(getUser(res.data.data.record))
                        localStorage.setItem('token', res.data.data.token)
                        navigate("/home");
                    }
                }
                )
                .catch((err) => console.log(err))
        }
    }

    const changeTab = (data) => {
        setField(data)
        setUser({
            email: '',
            password: '',
            name: ''
        })
    }

    return (
        <div className='container-fluid p-0 main-contain' style={HeaderStyle}>
            <div className="main-title pt-5 text-center">login / register page</div>

            <div className='row m-0 w-100 justify-content-around'>
                {field == 'login' ?

                    <div className='col-lg-7 col-xl-5 col-xxl-4 col-12'>
                        <div className="text-center">
                            <h2 className='pt-2'>Sign in to us</h2>
                            <form onSubmit={handleSubmit} className='w-100'>
                                <p>
                                    <label>Email address</label><br />
                                    <input type="email" name="email" onChange={handleChange} value={user?.email} required className='w-100' />
                                </p>
                                <p>
                                    <label>Password</label>

                                    <br />
                                    <input type="password" name="password" onChange={handleChange} value={user?.password} required className='w-100' />
                                </p>
                                <p>
                                    <button id="sub_btn" type="submit">Login</button>
                                </p>
                                <footer className='text-dark' style={{ cursor: 'pointer' }} onClick={() => changeTab('signup')}>
                                    <p>Create an account</p>
                                </footer>

                            </form>

                        </div>
                    </div>
                    :
                    <div className='col-lg-7 col-xl-4 col-xxl-4 col-12'>

                        <div className="text-center">
                            <h2 className='pt-2'>Join us</h2>
                            <h5>Create your personal account</h5>
                            <form onSubmit={handleSubmit} className='w-100'>
                                <p>
                                    <label>Username</label><br />
                                    <input type="text" value={user?.name} name='name' onChange={handleChange} required className='w-100' />
                                </p>
                                <p>
                                    <label>Email address</label><br />
                                    <input type="email" name="email" value={user?.email} onChange={handleChange} required className='w-100' />
                                </p>
                                <p>
                                    <label>Password</label><br />
                                    <input type="password" name="password" value={user?.password} onChange={handleChange} requiredc className='w-100' />
                                </p>
                                <p>
                                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                                </p>
                                <p>
                                    <button id="sub_btn" type="submit">Register</button>
                                </p>
                                <footer className='text-dark' style={{ cursor: 'pointer' }} onClick={() => changeTab('login')}>
                                    <p>Login ?</p>
                                </footer>
                            </form>
                        </div>

                    </div>


                }
            </div>


        </div>
    );
};


const HeaderStyle = {
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}
