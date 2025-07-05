import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Board from "../components/Board";
import Toolbar from "../components/Toolbar";
import Toolbox from "../components/Toolbox";
import BoardProvider from "../store/BoardProvider";
import ToolboxProvider from "../store/ToolboxProvider";
import { restoreBrushPaths } from "../utils/restoreBrushPaths";


function Canvas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [canvasData, setCanvasData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCanvas = async () => {
      if (!token) return navigate("/login");

      try {
        const res = await fetch(`http://localhost:3030/canvas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch canvas");

        const data = await res.json();



const restoredElements = restoreBrushPaths(data.elements);
setCanvasData({ ...data, elements: restoredElements });




        setLoading(false);
      } catch (error) {
        console.error("Error fetching canvas:", error);
        navigate("/profile");
      }
    };

    fetchCanvas();
  }, [id, token, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-600">Loading Canvas...</p>
      </div>
    );
  }

  return (
    <BoardProvider initialElements={canvasData.elements}>
      <ToolboxProvider>
        {/* Canvas Metadata */}
        <div className="p-4 bg-white shadow-md border-b border-gray-200 flex items-center justify-between">
          {/* Canvas Info */}
          <div>
            <h2 className="text-2xl font-semibold">{canvasData.name}</h2>
            <p className="text-gray-500 text-sm">
              Created: {new Date(canvasData.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm">
              Updated: {new Date(canvasData.updatedAt).toLocaleString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 ml-auto">
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Back
            </button>
            <button
              onClick={() => alert("Save logic not implemented yet")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </div>

        {/* Canvas Layout */}
        <div className="flex flex-col md:flex-row">
          <Toolbar />
          <Board id={id} />
          <Toolbox />
        </div>
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default Canvas;
