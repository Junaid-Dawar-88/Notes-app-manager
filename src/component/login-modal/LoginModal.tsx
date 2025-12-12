import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

interface LoginModalProps {
  mode: "signup" | "login";
  close: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ mode: initialMode, close }) => {
  const { setAuth } = useAuth();
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setMode(initialMode);
    setName("");
    setEmail("");
    setPassword("");
  }, [initialMode]);

  const handleSubmit = async () => {
    try {
      if (mode === "signup") {
        const res = await axios.post("/api/user/signup", { name, email, password });
        setAuth(res.data.user, res.data.token);
      } else {
        const res = await axios.post("/api/user/login", { email, password });
        setAuth(res.data.user, res.data.token);
      }
      close();
    } catch (err: any) {
      alert(err?.response?.data?.error || err.message || "Error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black/40" onClick={close} />
      <div className="bg-white rounded p-6 w-96 shadow z-50">
        <h2 className="text-xl font-bold mb-4 text-center">
          {mode === "signup" ? "Create Account" : "Login"}
        </h2>

        {mode === "signup" && (
          <div className="mb-3">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
            />
          </div>
        )}

        <div className="mb-3">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            {mode === "signup" ? "Signup" : "Login"}
          </button>
          <button
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="flex-1 border py-2 rounded"
          >
            {mode === "signup" ? "Switch to Login" : "Switch to Signup"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
