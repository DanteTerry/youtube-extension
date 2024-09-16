import { Trash2, Edit3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Workspace = {
  id: string;
  name: string;
  keywords: string[];
};

function Workspace() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState<Workspace | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    chrome.storage.local.get(["workspaces"], (result) => {
      if (result.workspaces && result.workspaces.length > 0) {
        const workspaceData = result.workspaces.find(
          (workspace: Workspace) => workspace.id === id
        );
        setWorkspace(workspaceData);
      } else {
        setWorkspace(undefined);
      }
    });
  }, [id]);

  // Handle delete workspace
  const handleDeleteWorkspace = () => {
    if (workspace) {
      chrome.storage.local.get(["workspaces"], (result) => {
        const updatedWorkspaces = result.workspaces.filter(
          (w: Workspace) => w.id !== workspace.id
        );
        chrome.storage.local.set({ workspaces: updatedWorkspaces }, () => {
          console.log(`Workspace with id ${workspace.id} deleted`);
          navigate("/");
        });
      });
    }
  };

  // Handle edit workspace
  const handleEditWorkspace = () => {
    navigate(`/edit-workspace/${workspace?.id}`);
  };

  return (
    <div className=" bg-gray-900 text-white">
      {workspace ? (
        <>
          <h1 className="text-2xl capitalize font-bold text-white mb-4 border-b-2 border-red-600 pb-2">
            Workspace Details
          </h1>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Name:</span>
                <span className="text-sm capitalize text-gray-300">
                  {workspace.name}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-lg font-medium">Keywords:</span>
                <div className="flex flex-wrap justify-end max-w-xs ml-4">
                  <span className="text-sm text-gray-300">
                    {workspace.keywords.join(", ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={handleEditWorkspace}
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
              >
                <Edit3 size={16} />
                <span>Edit</span>
              </button>

              <button
                onClick={handleDeleteWorkspace}
                className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-4xl font-bold text-gray-400">
          Workspace not found
        </h1>
      )}
    </div>
  );
}

export default Workspace;
