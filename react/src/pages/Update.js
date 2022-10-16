import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, findUser } from "../data/repository";


export default function Update(props) {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({ });
    const [fields, setFields] = useState({
         firstname: "", lastname: "", password: "",
      });

     // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { trimmedFields, isValid } = await handleValidation();
    if(!isValid)
      return;

    let finalFields = {...trimmedFields, 'username': props.user.username}
    // Create user.
<<<<<<< HEAD
    await updateUser(trimmedFields);
=======
    const user = await updateUser(finalFields);
>>>>>>> e4abae31bed832b168762678ed4e4aa348d25d67

    props.setUser(user)

    // Navigate to the home page.
    navigate("/profile");
  };

  const handleValidation = async () => {
    const trimmedFields = trimFields();
    const currentErrors = { };

    let key = "first_name";
    let field = trimmedFields[key];
  

    key = "firstname";
    field = trimmedFields[key];
    if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "lastname";
    field = trimmedFields[key];
    if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";
    
    key = "password";
    field = trimmedFields[key];
    if((field.length > 1)  && (field.length < 6)) { {/* If password has been entered but is not long enough */}
      currentErrors[key] = "Password must contain at least 6 characters.";
    }
    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  const trimFields = () => {
    const trimmedFields = { };
    Object.keys(fields).map(key => trimmedFields[key] = fields[key].trim());
    setFields(trimmedFields);

    return trimmedFields;
  };


    return (
        <div className="d-flex justify-content-center">
        <div className="custom-input custom-subheading">
          <h1 style={{paddingTop: 30}} className="custom-subheading text-center">Edit Profile</h1>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group custom-input">
                  <label htmlFor="email" className="control-label">Email</label>
                  <input name="email" disabled={true} value={props.user.username} id="email" className="form-control text-muted"/>
                  <small id="emailHelp" className="form-text text-muted">To change your email, please contact IT services</small>
                </div>
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
                  <input name="lastname" id="lastname" className="form-control"
                    value={fields.lastname} onChange={handleInputChange} />
                  {errors.lastname &&
                    <div className="text-danger">{errors.lastname}</div>
                  }
                </div>
                <div className="form-group custom-input">
                  <label htmlFor="password" className="control-label">Password</label>
                  <input type = "password" name="password" id="password" className="form-control"
                    value={fields.password} onChange={handleInputChange} />
                  {errors.password &&
                    <div className="text-danger">{errors.password}</div>
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