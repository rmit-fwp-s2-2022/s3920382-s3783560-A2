import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Update(props) {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({ });

    const [fields, setFields] = useState({
        username: "", firstname: "", lastname: "",  password: "", 
      });

     // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Navigate to the home page.
    navigate("/");
  };


    return (
        <div className="d-flex justify-content-center">
        <div className="custom-input custom-subheading">
          <h1 className="custom-subheading">Edit Profile</h1>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group custom-input">
                  <label htmlFor="firstname" className="control-label">First name</label>
                  <input name="firstname" id="firstname" className="form-control"
                    value={fields.firstname} onChange={handleInputChange} />
                  {errors.firstname &&
                    <div className="text-danger">{errors.firstname}</div>
                  }
                </div>
                <div className="form-group custom-input">
                  <label htmlFor="lastname" className="control-label">Last name</label>
                  <input name="lastname" id="firstname" className="form-control"
                    value={fields.lastname} onChange={handleInputChange} />
                  {errors.lastname &&
                    <div className="text-danger">{errors.lastname}</div>
                  }
                </div>
                <div className = 'container d-flex justify-content-between w-50'>
                    <button type= 'button' className ='btn btn-lg btn-secondary btn-rounded  m-3'
                    onClick = {() => {
                        navigate("/profile", {replace: true,})
                    }}>
                        Cancel
                    </button>
                    <button type = 'submit'  className = 'btn btn-lg btn-info btn-rounded  m-3'
                    >
                        Save changes
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
    )
}