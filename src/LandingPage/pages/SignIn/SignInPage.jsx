import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && email) {
      console.log("Email Submitted:", email);
      // Redirect to /main page
      history.push("/main");
    } else {
      console.log("Invalid email");
    }
  };

  return (
    <div className="min-h-screen bg-background-default flex items-center justify-center">
      <Fade duration={3000}>
        <div className="bg-card-paper rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Sign In
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-500 ring-red-500"
                    : "border-primary focus:ring-primary"
                } bg-gradient-to-r from-black via-purple-800 to-purple-900 text-white`}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </Fade>
    </div>
  );
};

export default SignInPage;
