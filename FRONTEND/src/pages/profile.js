import { useEffect, useState, useCallback } from "react"; // ✅ Added useCallback
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);
  const [canvases, setCanvases] = useState([]);
  const [canvasName, setCanvasName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ✅ FIX 1: Wrapped fetchData in useCallback to fix ESLint and make it reusable
  const fetchData = useCallback(async () => {
    if (!token) return navigate("/login");

    try {
      const userRes = await fetch("http://localhost:3030/user/userProfile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();
      setUser(userData);

      const canvasRes = await fetch("http://localhost:3030/canvas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const canvasData = await canvasRes.json();
      setCanvases(canvasData);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      navigate("/login");
    }
  }, [token, navigate]); // ✅ Included dependencies to ensure stability

  // ✅ FIX 2: Used fetchData in useEffect and added it to dependencies
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ FIX 3: Call fetchData after delete to refresh canvas list
  const handleDelete = async (id, name) => {
    try {
      const response = await fetch(
        `http://localhost:3030/canvas/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete canvas");
      }
      alert(`${name} deleted successfully!`);

      fetchData(); // ✅ Refresh list after delete
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  // ✅ FIX 4: Call fetchData after creating new canvas to refresh list
  const handleCreateCanvas = async (e) => {
    e.preventDefault();
    if (!canvasName.trim()) return;

    try {
      const res = await fetch("http://localhost:3030/canvas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: canvasName }),
      });

      if (res.ok) {
        setCanvasName("");
        fetchData(); // ✅ Refresh list after creating new canvas
      } else {
        console.error("Canvas creation failed");
      }
    } catch (err) {
      console.error("Error creating canvas:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Top Right Profile Info */}
      <div className="absolute top-4 right-4 flex items-center space-x-3 bg-white shadow-md rounded-full px-4 py-2">
        <FaUserCircle className="text-2xl text-gray-600" />
        <span className="text-gray-800 font-medium">
          {user?.user?.name || "User"}
        </span>
        <button
          onClick={handleLogout}
          className="ml-2 text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-24 px-4">
        {/* Create Canvas Form */}
        <form
          onSubmit={handleCreateCanvas}
          className="bg-white w-full max-w-xl p-4 mb-6 flex gap-4"
        >
          <input
            type="text"
            placeholder="Enter canvas name"
            value={canvasName}
            onChange={(e) => setCanvasName(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Create
          </button>
        </form>

        {/* Canvas List */}
        <div className="p-6 rounded-xl w-full max-w-7xl">
          <h3 className="text-3xl font-semibold mb-4">Your Canvases:</h3>
          {canvases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {canvases.map((canvas) => (
                <div
                  key={canvas._id}
                  className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <h4 className="text-lg font-medium text-gray-800 mb-1">
                    {canvas.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    <strong>ID:</strong> {canvas._id}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Created:</strong>{" "}
                    {new Date(canvas.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Elements:</strong>{" "}
                    {(canvas.elements || []).length}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Shared With:</strong>{" "}
                    {(canvas.sharedwith || []).length > 0
                      ? canvas.sharedwith.join(", ")
                      : "None"}
                  </p>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => navigate(`/canvas/${canvas._id}`)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow transition duration-200 text-sm"
                    >
                      Open
                    </button>

                    <button
                      onClick={() => handleDelete(canvas._id,canvas.name)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow transition duration-200 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No canvases found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
