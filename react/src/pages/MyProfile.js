import React from "react";

export default function MyProfile(props) {
  return (
    <div>
    <h1 className= 'text-center' style={{paddingTop: 30}}>My profile</h1>
        <div className = 'container py-5 h-100 w-50'>
            <div className='row d-flex justify-content-center align-items-center h-100'>
                <div className='card w-50' style = {{borderRadius:'15px'}}>
                    <div className='card-body text-center'>
                      {/*start of profile picture*/}
                      <div className='mt-3 mb-4'>
                        <img src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" className='rounded-circle img-fluid' alt = 'profile' style = {{width: '100px'}}/>
                      </div>
                      {/* Display of user info */}
                      <h4 className="mb-2"> Username: {props.user.username}</h4>
                      <p className=" text-muted mb-4"> First Name : {props.user.first_name} </p>
                      <p className=" text-muted mb-4"> Last Name : {props.user.last_name} </p>
                    </div>
                    <div className = ' container d-flex justify-content-between'>
                        <button type = 'button' className='btn btn-lg btn-info btn-rounded w-50 m-3'
                        
                        >
                            Edit
                        </button>
                        <br/>
                        <br/>
                        <button type = 'button' className='btn btn-lg btn-danger btn-rounded w-50 m-3'
                        data-bs-toggle = 'modal' 
                        data-bs-target = '#exampleModal'
                        >
                            Delete
                        </button>
                        <br/>
                        <br/>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
}
