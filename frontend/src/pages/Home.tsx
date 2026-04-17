import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
      
      <div className="max-w-5xl w-full">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Multi-tenant Feature Flag Platform
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and check features across organizations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Organization Admin</h2>
            <p className="text-gray-500 text-sm mb-4">
              Manage feature flags for your organization
            </p>

            <div className="flex gap-2">
              <Button
                label="Login"
                onClick={() => navigate("/login")}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              />
              <Button
                label="Sign Up"
                onClick={() => navigate("/signup")}
                className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
              />
                
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">End User</h2>
            <p className="text-gray-500 text-sm mb-4">
              Check if a feature is enabled
            </p>

            <Button
                label="Check Feature"
              onClick={() => navigate("/user")}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            />
              
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Super Admin</h2>
            <p className="text-gray-500 text-sm mb-4">
              Manage organizations
            </p>

            <Button
                label="Login"
              onClick={() => navigate("/login")}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            />
            
          </div>

        </div>
      </div>
    </div>
  );
}