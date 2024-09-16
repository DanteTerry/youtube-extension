import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Workspace } from "../types/type";

// Workspace type

const WorkspaceList = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<
    Workspace | undefined
  >(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieving all workspaces from Chrome storage
    chrome.storage.local.get(["workspaces"], (result) => {
      if (result.workspaces && result.workspaces.length > 0) {
        setWorkspaces(result.workspaces);
      } else {
        setWorkspaces([]);
      }
    });

    // Retrieve the selected workspace from Chrome storage
    chrome.storage.local.get(["selectedWorkspace"], (result) => {
      if (result.selectedWorkspace) {
        setSelectedWorkspace(result.selectedWorkspace);
      } else {
        setSelectedWorkspace(undefined);
      }
    });
  }, []);

  // Selecting a particular workspace
  const handleSelect = (workspaceId: string) => {
    const selected = workspaces.find(
      (workspace) => workspace.id === workspaceId
    );
    if (selected) {
      chrome.storage.local.set({ selectedWorkspace: selected }, () => {
        setSelectedWorkspace(selected);
      });
    }
  };

  // Removing the selected workspace
  const handleRemoveSelection = () => {
    chrome.storage.local.remove("selectedWorkspace", () => {
      setSelectedWorkspace(undefined);
    });
  };

  // Navigating to the Create Workspace page
  const handleAddWorkspace = () => {
    navigate("/create-workspace");
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-4 border-b-2 border-red-600 pb-2">
        Welcome To Youtube Filter
      </h1>
      <div className="p-4 bg-gray-900 text-white shadow-md w-full">
        <h1 className="text-2xl font-bold text-white mb-4">Your Workspaces</h1>

        {/* Display Workspaces */}
        {workspaces.length > 0 ? (
          workspaces.map((workspace) => (
            <div
              key={workspace.id}
              onClick={() => navigate(`workspace/${workspace.id}`)}
              className="bg-gray-800 cursor-pointer p-4 rounded-lg shadow-md flex justify-between items-center mb-2"
            >
              <div>
                <h2 className="text-lg capitalize font-bold">
                  {workspace.name}
                </h2>
                <p className="text-sm text-gray-400">
                  Keywords: {workspace.keywords.join(", ")}
                </p>
              </div>
              <div className="space-x-2">
                {selectedWorkspace && selectedWorkspace.id === workspace.id ? (
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSelection();
                    }}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(workspace.id);
                    }}
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">
            No workspaces available. Add one!
          </p>
        )}

        {/* Add Workspace Button */}
        <button
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleAddWorkspace}
        >
          Add New Workspace
        </button>
      </div>
    </>
  );
};

export default WorkspaceList;
