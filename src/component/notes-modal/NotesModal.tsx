import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  userId: number;
  createdAt: string;
}

interface Props {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  update: Note | null;
  setUpdate: React.Dispatch<React.SetStateAction<Note | null>>;
}

const NotesModal = ({ notes, setNotes, update, setUpdate }: Props) => {
  const { user, token } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

//  { ======================= CLEAR INPUT FEILD Fn ================================ }
  const clearForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };
  // { ======================== USEEFFECT HOOK FOR UPDATA DATA ======================== }
  useEffect(() => {
    if (update) {
      setTitle(update.title);
      setContent(update.content);
      setCategory(update.category);
      setIsOpen(true);
    }
  }, [update]);

  //  { ============================ GET ALL DATA Fn ======================================= }
  const fetchNotes = async () => {
    if (!token) return;
    try {
      const res = await axios.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err: any) {
      console.error("Error fetching notes:", err);
    }
  };
 // { ======================== USEEFFECT HOOK FOR GET DATA ======================== }
  useEffect(() => {
    fetchNotes();
  }, [token]);

   // { ======================== ADD DATA Fn ======================================== }
  const handleSubmit = async () => {
    if (!title || !content || !category) return alert("Fill all fields");
    if (!token) return alert("Login required");
    try {
      const notesObj = { title, content, category }
      const res = await axios.post(
        "/api/notes",
          notesObj ,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes( [...notes , res.data]);
      clearForm();
      setIsOpen(false);
    } catch (err: any) {
      alert(err?.response?.data?.error || "Error creating note");
    }
  };
  
  // { ============================= UPDATE DATA Fn ==================================== }
  const handleUpdate = async () => {
    if (!update) return;
    if (!token) return alert("Login required");
    const updateData = { title, content, category }
    try {
      await axios.put(
        `/api/notes/${update.id}`,
          updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prev) =>
        prev.map((n) =>
          n.id === update.id ? { ...n, title, content, category } : n
        )
      );
      clearForm();
      setUpdate(null);
      setIsOpen(false);
    } catch (err: any) {
      alert(err?.response?.data?.error || "Error updating note");
    }
  };

  return (
    <>
     {/* { =========================================== ADD NOTES BUTTON ============================ } */}
      <button
        onClick={() => setIsOpen(true)}
        disabled={!user}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        Add Note
      </button>
      {/* { ========================================= INPUT FEILDS ============================= } */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-96 shadow">
            <h3 className="text-lg font-bold mb-3">
              {update ? "Update Note" : "New Note"}
            </h3>

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
              rows={4}
            ></textarea>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3"
            >
              <option value="">Select category</option>
              <option value="work">Work</option>
              <option value="family">Family</option>
              <option value="friend">Friend</option>
            </select>

           {/* { =================================== UPDATE AND SAVE BUTTONS ============================== } */}
            <div className="flex gap-2">
              {update ? (
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-blue-500 text-white py-2 rounded"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                >
                  Save
                </button>
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                  clearForm();
                  setUpdate(null);
                }}
                className="flex-1 border py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotesModal;
