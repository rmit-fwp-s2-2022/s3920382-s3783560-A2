import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { findUser, createUser } from "../data/repository";

export default function Register(props) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    username: "", firstname: "", lastname: "",  password: "", confirmPassword: ""
  });
  const [errors, setErrors] = useState({ });

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = await handleValidation();
    if(!isValid)
      return;

    // Create user.
    const user = await createUser(trimmedFields);

    // Set user state.
    props.loginUser(user);

    // Navigate to the home page.
    navigate("/");
  };

  const handleValidation = async () => {
    const trimmedFields = trimFields();
    const currentErrors = { };

    let key = "username";
    let field = trimmedFields[key];
    try {
      if(field.length === 0)
        currentErrors[key] = "Email is required.";
      else if(field.length > 32)
        currentErrors[key] = "Email length cannot be greater than 32.";
      else if(await findUser(trimmedFields.username) !== null)
        currentErrors[key] = "Email is already registered.";
    } catch (err) {
      setErrors({...errors, ['APIerror']: "Error reaching database, please try again later"})
      return
    }

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

    key = "password";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if(field.length < 6)
      currentErrors[key] = "Password must contain at least 6 characters.";

    key = "confirmPassword";
    field = trimmedFields[key];
    if(field !== trimmedFields.password)
      currentErrors[key] = "Passwords do not match.";

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
      <h1 className="custom-subheading">Register</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group custom-input">
              <label htmlFor="username" className="control-label">Email</label>
              <input name="username"  type="email" id="username" className="form-control"
                value={fields.username} onChange={handleInputChange}/>
              {errors.username &&
                <div className="text-danger">{errors.username}</div>
              }
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
              <label htmlFor="password" className="control-label">
                Password <small className="text-muted">must be at least 6 characters and contain a symbol</small>
              </label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} />
              {errors.password &&
                <div className="text-danger">{errors.password}</div>
              }
            </div>
            <div className="form-group custom-input">
              <label htmlFor="confirmPassword" className="control-label">Confirm password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" className="form-control"
                value={fields.confirmPassword} onChange={handleInputChange} />
              {errors.confirmPassword &&
                <div className="text-danger">{errors.confirmPassword}</div>
              }
            </div>
            <div className="form-group custom-input">
              <input type="submit" className="btn btn-primary mr-5" value="Register" />
            </div>
            {errors.APIerror !== null &&
              <div className="form-group">
                <span className="text-danger">{errors.APIerror}</span>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
