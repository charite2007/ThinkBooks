import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

export default function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching notes", error);
        toast.error("Failed to fetch error");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted");
      navigate("/");
    } catch (error) {
      console.log(`Error deleting the error`, error);
      toast.error("Failed to delete note");
    }
  };
  const handleSaving = async () => {
    // if(!note.title.trim() || !note.content.trim()) return 
    // toast.error("Title and content are required");
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, { title: note.title, content: note.content });
      toast.success("Note saved successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving note", error);
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-4" />
              Back to notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>
        </div>
        <div className="card bg-base-100 ">
          <div className="card-body">
            <div className="form-control mb-4  flex flex-col gap-5">
              <label className="label m-4">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Note title"
                className="input input-border w-full "
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>
            <div className="form-control mb-4  flex flex-col gap-5">
              <label className="label m-4">
                <span className="label-text">Content</span>
              </label>
              <textarea
                placeholder="Note title"
                className="textarea textarea-border w-full h-40 "
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>

            <div className="card-actions justify-end ">
              <button
                className="btn btn-primary"
                disabled={saving}
                onClick={handleSaving}
              >
                {saving ? "saving...." : "save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
