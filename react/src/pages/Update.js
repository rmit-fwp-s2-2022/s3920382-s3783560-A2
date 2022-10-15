import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, findUser } from "../data/repository";


export default function Update(props) {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({ });
    const [fields, setFields] = useState({
         firstname: "", lastname: "", 
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

    // Create user.
    const user = await updateUser(trimmedFields);


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
    if(field.length === 0)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "lastname";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

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