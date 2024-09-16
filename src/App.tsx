import { HashRouter as Router, Routes, Route } from "react-router-dom";
import WorkspaceList from "./components/WorkspaceList";
import CreateWorkspace from "./components/CreateWorkspace";
import Workspace from "./components/Workspace";
import EditWorkspace from "./components/EditWorkspace";

function App() {
  return (
    <Router>
      <div className="p-6 bg-gray-900 text-white shadow-md w-96">
        <Routes>
          <Route path="/" element={<WorkspaceList />} />
          <Route path="/create-workspace" element={<CreateWorkspace />} />
          <Route path="/workspace/:id" element={<Workspace />} />
          <Route path="/edit-workspace/:id" element={<EditWorkspace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
