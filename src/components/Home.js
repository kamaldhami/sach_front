import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Home = (props) => {
    const user = useSelector((state) => state.user);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') == null ){
            navigate("/");
        }
    }, [])

   const logout =() => {
    Swal.fire({
        title: 'Do you want to Logout?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Logout',
        denyButtonText: `Remain login`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('logout!', '', 'success')
          localStorage.clear()
          navigate('/')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
   }

    return (
        <div className="container">
            <div className="row justify-content-evenly py-5">
                <div className='col-12 col-lg-4 col-xl-4 col-xxl-4'>
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..."></img>
                </div>
                <div class="col-12 col-lg-6 px-xl-5 col-xl-6 col-xxl-6">
                    <div class="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                        <h3 class="h2 text-white mb-0">{user?.name}</h3>
                    </div>
                    <ul class="list-unstyled mb-1-9">
                        <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">Email:</span> {user?.email}</li>
                        <li class="display-28"><span class="display-26 text-secondary me-2 font-weight-600">Phone:</span>{user.mobile}</li>
                    </ul>

                    <div className='btn btn-primary' onClick={() => logout()}>Logout</div>
                </div>
            </div>
        </div>
    );
};

export default Home;