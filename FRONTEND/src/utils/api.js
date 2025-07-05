
const updateCanvas = async (id, elements, navigate) => {
  const token = localStorage.getItem("token");

  try {
    if (!token) {
      return navigate("/login");
    }
    const response = await fetch(
      `http://localhost:3030/canvas/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ elements }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "Failed to update Canvas");
    }
    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to update Canvas");
  }
};

export default updateCanvas;

