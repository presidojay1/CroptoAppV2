import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";
import { FaSearch } from "react-icons/fa";
import emailjs from "emailjs-com";
import Modal from "react-modal";

// Loader Component
const Loader = () => <div className="loader">Loading...</div>;

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loader
  const [inputStyle, setInputStyle] = useState({
    backgroundColor: "black",
    color: "white",
  });

  const history = useNavigate();
  const data = [
    { name: "ProfessorETH", code: "ETH123" },
    { name: "ProfessorBTC", code: "BTC123" },
    { name: "ProfessorADam", code: "ADA123" },
    { name: "ProfessorRTA", code: "RTA123" },
  ];

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError("Please enter a valid email address");
      setShowSearch(false);
    } else {
      setError("");
      setShowSearch(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      setResults(data);
    } else {
      setResults([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader
    if (!error && email && selectedCode) {
      try {
        await emailjs.send(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          {
            to_email: email,
            message: selectedCode,
          },
          "YOUR_USER_ID"
        );
        setModalIsOpen(true);
      } catch (err) {
        console.error("Failed to send email:", err);
      } finally {
        setIsLoading(false); // Hide loader
      }
    } else {
      console.log("Invalid email or no selection made");
      setIsLoading(false); // Hide loader in case of error
    }
  };

  const handleResultClick = (result) => {
    setQuery(result.name);
    setSelectedCode(result.code);
    setResults([]);
  };

  const handleActivationCodeChange = (e) => {
    setActivationCode(e.target.value);
  };

  const handleActivationSubmit = (e) => {
    e.preventDefault();
    if (activationCode === selectedCode) {
      history.push("/dashboard");
    } else {
      alert("Invalid activation code");
    }
  };

  return (
    <div className="min-h-screen bg-background-default flex items-center justify-center">
      <Fade duration={3000}>
        <div className="bg-card-paper rounded-lg shadow-xl p-8 max-w-md w-full min-h-24">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Get Started
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
                placeholder="Enter your email to get started"
                className={`w-full bg-black px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-500 ring-red-500"
                    : "border-primary focus:ring-primary bg-black"
                } bg-black text-white rounded-md shadow-md`}
              />
              {error && <p className="text-red text-sm mt-2">{error}</p>}
            </div>

            {showSearch && (
              <div className="relative w-13 mx-auto mt-2 mb-10">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full py-2 pl-10 h-12 pr-4 bg-blue-500 bg-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md shadow-md"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                </div>
                {results.length > 0 && (
                  <ul className="absolute w-full bg-black  shadow-md rounded-md mt-2  max-h-60 overflow-y-auto">
                    {results.map((result, index) => (
                      <li
                        key={index}
                        className="py-2 px-4 text-gray-300 hover:bg-blue hover:text-white cursor-pointer"
                        onClick={() => handleResultClick(result)}
                      >
                        {result.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {selectedCode && (
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition duration-300"
              >
                {isLoading ? <Loader /> : "Get Started"}
              </button>
            )}
          </form>
        </div>
      </Fade>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Activation Code Modal"
        className="flex items-center justify-center bg-black backdrop-blur-md"
        overlayClassName="fixed w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        style={{
          content: {
            width: "400px",
            height: "400px",
            minWidth: "300px",
            backgroundColor: "black",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
          },
        }}
      >
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">
            Enter Activation Code
          </h2>
          <form onSubmit={handleActivationSubmit}>
            <div className="mb-6">
              <label
                htmlFor="activationCode"
                className="block text-gray-400 mb-2"
              >
                Activation Code
              </label>
              <input
                type="text"
                id="activationCode"
                value={activationCode}
                onChange={handleActivationCodeChange}
                placeholder="Enter the activation code"
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 border-primary focus:ring-primary bg-black text-white shadow-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SignInPage;
