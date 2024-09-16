import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateWorkspace = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [keywords, setKeywords] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    // Created a new workspace data
    const newWorkspace = {
      id: uuidv4().slice(0, 8),
      name: workspaceName,
      keywords: keywords.split(","),
    };

    // Getting existing workspaces and add the new one
    chrome.storage.local.get(["workspaces"], (result) => {
      const existingWorkspaces = result.workspaces || [];
      const updatedWorkspaces = [...existingWorkspaces, newWorkspace];

      // Save the updated workspace array back to storage
      chrome.storage.local.set({ workspaces: updatedWorkspaces }, function () {
        console.log("Workspace saved");
      });

      navigate("/");
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4 border-b-2 border-red-600 pb-2">
        Create Workspace
      </h1>

      <div className="mt-4">
        <label className="block text-sm">Workspace Name</label>
        <input
          type="text"
          className="mt-1 p-2 bg-gray-700 w-full rounded"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm">Keywords (comma separated)</label>
        <input
          type="text"
          className="mt-1 p-2 bg-gray-700 w-full rounded"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save Workspace
      </button>
    </div>
  );
};

export default CreateWorkspace;
