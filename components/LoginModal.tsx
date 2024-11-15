import React, { useState } from "react";

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold">Welcome</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-around mt-4">
          <button
            className={`w-1/2 text-center py-2 ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Log In
          </button>
          <button
            className={`w-1/2 text-center py-2 ${
              activeTab === "signup"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "login" && (
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Log In
              </button>
            </form>
          )}

          {activeTab === "signup" && (
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
