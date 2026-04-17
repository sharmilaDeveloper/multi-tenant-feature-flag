import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="font-sans text-gray-800">
            <Toaster position="top-right" />

      <AppRoutes />
    </div>
  );
}

export default App;