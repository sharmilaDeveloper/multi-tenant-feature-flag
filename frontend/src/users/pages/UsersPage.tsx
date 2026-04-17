import { useState } from "react";
import api from "../../api/axios";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header"; // ✅ ADD THIS
import toast from "react-hot-toast";

export default function UserPage() {
  const [orgCode, setOrgCode] = useState("");
  const [featureKey, setFeatureKey] = useState("");
  const [result, setResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkFeature = async () => {
    if (!orgCode || !featureKey) {
      setError("All fields are required");
      return;
    }
    const orgRegex = /^[A-Z0-9]{3,10}$/;
    if (!orgRegex.test(orgCode)) {
      setError("Invalid organization Id");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get(
        `/features/check?orgId=${orgCode}&featureKey=${featureKey}`,
      );

      setResult(res.data.isEnabled);
      setError("");
    } catch (err:any) {
      console.error(err);
      setResult(null);
      setError("");
      toast.error(err.response?.data?.message || "Error in checking feature");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setOrgCode("");
    setFeatureKey("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <Header title="Feature Checker" role="USER" />

      <div className="flex items-center justify-center mt-10">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Feature Checker
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Check if a feature is enabled for your organization
            </p>
          </div>

          <Input
            value={orgCode}
            onChange={(e) => setOrgCode(e.target.value)}
            placeholder="Organization ID (e.g., ABC123)"
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <Input
            value={featureKey}
            onChange={(e) => setFeatureKey(e.target.value)}
            placeholder="Feature Key (e.g., dark_mode)"
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleClear}
              label="Clear"
              className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
            />

            <Button
              onClick={checkFeature}
              label={loading ? "Checking..." : "Check Feature"}
              className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            />
          </div>

          {result !== null && (
            <div className="mt-6 text-center">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  result
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {result ? "Feature Enabled" : "Feature Disabled"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
