import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Workspace } from "../types/type";

const EditWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");

  // Fetching the workspace data by ID when component mounts
  useEffect(() => {
    chrome.storage.local.get(["workspaces"], (result) => {
      if (result.workspaces && result.workspaces.length > 0) {
        // Finding the specific workspace by ID
        const workspace = result.workspaces.find(
          (workspace: Workspace) => workspace.id === id
        );
        if (workspace) {
          setWorkspaceName(workspace.name);
          setKeywords(workspace.keywords.join(", "));
        }
      }
    });
  }, [id]);

  // Handling  saving updated workspace
  const handleSave = () => {
    chrome.storage.local.get(["workspaces"], (result) => {
      if (result.workspaces && result.workspaces.length > 0) {
        // Find the index of the workspace to update
        const workspaces = result.workspaces.map((workspace: Workspace) => {
          if (workspace.id === id) {
            // Updating the workspace's name and keywords
            return {
              ...workspace,
              name: workspaceName,
              keywords: keywords.split(",").map((keyword) => keyword.trim()),
            };
          }
          return workspace;
        });

        // Saving the updated workspaces back to Chrome storage
        chrome.storage.local.set({ workspaces }, () => {
          console.log("Workspace updated");
          navigate("/");
        });
      }
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-4 border-b-2 border-red-600 pb-2">
        Edit Workspace
      </h1>
      <div className="mt-4 bg-gray-900">
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
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </>
  );
};

export default EditWorkspace;
