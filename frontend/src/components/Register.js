import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [department, setDepartment] = useState("");
  const [classInfo, setClassInfo] = useState(""); // For students
  const [registerNumber, setRegisterNumber] = useState(""); // For students
  const [clubName, setClubName] = useState(""); // For coordinators
  const [phoneNumber, setPhoneNumber] = useState(""); // For coordinators
  const [success, setSuccess] = useState(false); // To manage success popup
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    department: "",
    classInfo: "",
    registerNumber: "",
    clubName: "",
  });

  // Validation checks
  const validateName = (value) => value.trim().length >= 3;
  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      value
    ); // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const validatePhoneNumber = (value) =>
    /^[0-9]{10}$/.test(value); // Must be 10 digits
  const validateField = (field, value) => {
    switch (field) {
      case "name":
        return validateName(value) ? "" : "Name must be at least 3 characters.";
      case "email":
        return validateEmail(value) ? "" : "Invalid email format.";
      case "password":
        return validatePassword(value)
          ? ""
          : "Password must be at least 8 characters, with uppercase, lowercase, number, and special character.";
      case "phoneNumber":
        return validatePhoneNumber(value)
          ? ""
          : "Phone number must be exactly 10 digits.";
      case "department":
        return value.trim() ? "" : "Department is required.";
      case "classInfo":
        return role === "student" && !value.trim()
          ? "Class information is required."
          : "";
      case "registerNumber":
        return role === "student" && !value.trim()
          ? "Register number is required."
          : "";
      case "clubName":
        return role === "coordinator" && !value.trim()
          ? "Club name is required."
          : "";
      default:
        return "";
    }
  };

  const handleChange = (field, value) => {
    const validationMessage = validateField(field, value);
    setErrors({ ...errors, [field]: validationMessage });

    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "department":
        setDepartment(value);
        break;
      case "classInfo":
        setClassInfo(value);
        break;
      case "registerNumber":
        setRegisterNumber(value);
        break;
      case "clubName":
        setClubName(value);
        break;
      default:
        break;
    }
  };

  const isFormValid = () =>
    !Object.values(errors).some((error) => error) &&
    name &&
    email &&
    password &&
    phoneNumber &&
    department &&
    (role === "student"
      ? classInfo && registerNumber
      : role === "coordinator"
      ? clubName
      : true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        email,
        password,
        role,
        department,
        phoneNumber,
      };

      if (role === "student") {
        data.class = classInfo;
        data.registerNumber = registerNumber;
      } else if (role === "coordinator") {
        data.clubName = clubName;
      }

      console.log("Submitting data:", data);
      const response = await axios.post(
        "http://localhost:8000/api/users/register",
        data
      );
      console.log("Response from server:", response.data);
      setSuccess(true);
      setError("");
      setTimeout(() => {
        setSuccess(false);
        window.location.href = "/login";
      }, 3000);
    } catch (err) {
      setSuccess(false);
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const closeSuccessPopup = () => {
    setSuccess(false);
    window.location.href = "/login";
  };

  const closeErrorPopup = () => {
    setError("");
  };

  const navigateToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          required
        />
        {errors.phoneNumber && (
          <p className="field-error">{errors.phoneNumber}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />
        {errors.password && <p className="field-error">{errors.password}</p>}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="coordinator">Coordinator</option>
        </select>
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => handleChange("department", e.target.value)}
          required
        />
        {errors.department && (
          <p className="field-error">{errors.department}</p>
        )}
        {role === "student" && (
          <>
            <input
              type="text"
              placeholder="Class"
              value={classInfo}
              onChange={(e) => handleChange("classInfo", e.target.value)}
            />
            {errors.classInfo && (
              <p className="field-error">{errors.classInfo}</p>
            )}
            <input
              type="text"
              placeholder="Register Number"
              value={registerNumber}
              onChange={(e) => handleChange("registerNumber", e.target.value)}
            />
            {errors.registerNumber && (
              <p className="field-error">{errors.registerNumber}</p>
            )}
          </>
        )}
        {role === "coordinator" && (
          <>
            <input
              type="text"
              placeholder="Club Name"
              value={clubName}
              onChange={(e) => handleChange("clubName", e.target.value)}
            />
            {errors.clubName && (
              <p className="field-error">{errors.clubName}</p>
            )}
          </>
        )}
        <button type="submit" disabled={!isFormValid()}>
          Register
        </button>
        <button
          type="button"
          className="login-button"
          onClick={navigateToLogin}
        >
          Login
        </button>
      </form>

      {/* Success Popup */}
      {success && (
        <div className="popup">
          <div className="popup-content">
            <h3>Registration Successful!</h3>
            <p>You have been successfully registered. You can now log in.</p>
            <button onClick={closeSuccessPopup}>OK</button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {error && (
        <div className="popup">
          <div className="popup-content">
            <h3>Registration Failed</h3>
            <p>{error}</p>
            <button onClick={closeErrorPopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
