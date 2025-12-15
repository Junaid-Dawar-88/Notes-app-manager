import React, { useEffect, useState } from "react";
import axios from "axios";
import NotesModal from "../notes-modal/NotesModal";
import { useAuth } from "@/context/AuthContext";
import { Trash2, Edit2 } from "lucide-react";

const NotesData = () => {
  const { token , logout } = useAuth();
  const [notes, setNotes] = useState<any[]>([]);
 const [update, setUpdate] = useState< any | null>(null);

//  { ======================== USEEFFECT HOOKS FOR GETING DATA ========================== }
  useEffect(() => {
    const fetchNotes = async () => {
      if (!token) return;
      try {
        const res = await axios.get("/api/notes", { headers: { Authorization: `Bearer ${token}` } });
        setNotes(res.data);
      } catch (err: any) {
        console.error(err);
        if (err?.response?.status === 401) {
          logout();
        }
      }
    };

    fetchNotes();
  }, [token]);

  // { ================================= DELETE DATA Fn ================================== }
 const handleDelete = async (id: number) => {
  if (!token) return alert("You must be logged in");

  try {
    await axios.delete(`/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotes(prev => prev.filter(n => n.id !== id.toString()));
  } catch (err: any) {
    console.error("DELETE error:", err);
    alert(err?.response?.data?.error || err.message || "Error deleting note");
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* { ======================================= HEADER ============================================ } */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
          <div className="flex items-center gap-3">
            <NotesModal update={update} setUpdate={setUpdate} notes={notes} setNotes={setNotes} />
            <button onClick={logout} className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </header>
      {/* { ====================================== MAIN CONTENT ================================ } */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length === 0 && <p className="text-gray-500">No notes yet — create one.</p>}
          {notes.map((n) => (
            <div key={n.id} className="bg-white rounded-lg shadow p-6 flex flex-col hover:shadow-lg transition-shadow">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3 w-fit">
                {n.category}
              </span>
              <h2 className="text-xl font-bold mb-2">{n.title}</h2>
              <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{n.content}</p>
              <p className="text-gray-400 text-xs mb-4">{new Date(n.createdAt).toLocaleString()}</p>
              <div className="flex gap-2">
                <button
                onClick={() => setUpdate(n)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  <Edit2 size={16} />
                  Edit
                </button>
                <button 
                onClick={() => handleDelete(Number(n.id))}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotesData;