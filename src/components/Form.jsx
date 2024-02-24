import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from 'react-router-dom';

const Forms = () => {
    // State for form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    // State for form errors
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    // Access the navigation function from React Router DOM
    const navigate = useNavigate();

    // Handle input changes in the form fields
    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Validate the input field based on its name
        validateField(name, value);
    };

    // Validate individual form fields based on their names
    const validateField = (fieldName, value) => {
        let errorMessage = "";

        switch (fieldName) {
            case "name":
                errorMessage = validateName(value);
                break;
            case "email":
                errorMessage = validateEmail(value);
                break;
            case "password":
                errorMessage = validatePassword(value);
                break;
            case "repeatPassword":
                errorMessage = validateRepeatPassword(value);
                break;
            default:
                break;
        }

        // Set the error message for the specific field
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: errorMessage,
        }));
    };

    // Helper functions for field validations
    const validateName = (value) => {
        return (value.trim().length < 3 || value.trim().length > 30) ?
            "Name should be between 3 and 30 characters" : "";
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value.trim()) ?
            "Please enter a valid email address" : "";
    };

    const validatePassword = (value) => {
        return (value.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(value)) ?
            "Password should be at least 10 characters with at least one special character" : "";
    };

    const validateRepeatPassword = (value) => {
        return (value !== formData.password) ?
            "Passwords do not match" : "";
    };

    // Check if the entire form is valid
    const isFormValid = () => {
        return Object.values(formErrors).every((error) => error === "") &&
            formData.name.trim().length >= 3 &&
            formData.name.trim().length <= 30 &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
            formData.password.length >= 10 &&
            formData.repeatPassword === formData.password;
    };

    // Handle form submission
    const formSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            // If form is valid, show success message and navigate to the home page
            alert("Registration Successful");
            navigate('/');
        } else {
            // If form is not valid, show error message
            alert("Please fix the errors in the form");
        }
    };

    // Render the form component
    return (
        <div className="parent">
            <form onSubmit={formSubmit}>
                <h1>Registration Form</h1>

                {/* Display a generic error message if any field has an error */}
                <div>
                    {Object.values(formErrors).some((error) => error !== "") && (
                        <p className="error">Please fix the errors in the form</p>
                    )}
                </div>

                {/* Form fields for name, email, password, and repeat password */}
                {renderInputField("name", "Name", "text")}
                {renderInputField("email", "Email", "email")}
                {renderInputField("password", "Password", "password")}
                {renderInputField("repeatPassword", "Repeat Password", "password")}

                {/* Submit button for the form, disabled if the form is not valid */}
                <input type="submit" value={"Register"} disabled={!isFormValid()} />
            </form>
        </div>
    );
};

// Helper function to render input fields with labels and error messages
const renderInputField = (name, label, type) => (
    <>
        <label htmlFor={name}>{label}</label>
        <input type={type} name={name} onChange={handleInputValue} />
        {formErrors[name] && <p className="error">{formErrors[name]}</p>}
    </>
);

export default Forms;
