import React, { useState } from "react";
import LoginModal from "@/component/login-modal/LoginModal";

const Ui = () => {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (selectedMode: "signup" | "login") => {
    setMode(selectedMode);
    setIsOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">NotesApp</h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => openModal("login")}
              className="px-5 py-2 text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => openModal("signup")}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-2xl p-12 backdrop-blur-sm border border-gray-100">

            <div className="text-center mb-8">
              <div className="inline-block mb-6 p-3 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>

              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                Welcome to Notes App
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Create an account to start saving, organizing, and managing your notes effortlessly.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-10 py-8 border-y border-gray-100">
              <div className="text-center">
                <div className="text-2xl mb-2">📝</div>
                <p className="text-sm font-medium text-gray-700">Quick Notes</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🏷️</div>
                <p className="text-sm font-medium text-gray-700">Organize</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">☁️</div>
                <p className="text-sm font-medium text-gray-700">Access Anywhere</p>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => openModal("login")}
                className="px-6 py-3 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                Sign In
              </button>

              <button
                onClick={() => openModal("signup")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <LoginModal mode={mode} close={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Ui;
