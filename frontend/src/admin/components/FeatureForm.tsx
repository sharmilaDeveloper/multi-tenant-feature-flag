import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

type Props = {
  onCreated: () => void;
};

export default function FeatureForm({ onCreated }: Props) {
  const [featureKey, setFeatureKey] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!featureKey.trim()) {
      setError("Feature key is required");
      return;
    }

    try {
      await api.post("/features", {
        featureKey,
        isEnabled,
      });

      toast.success("Feature created");
      setFeatureKey("");
      setIsEnabled(true);
      setError("");
      onCreated();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Create Feature</h2>

      <div className="flex flex-col md:flex-row md:items-end gap-4">
        
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700">
            Feature Key
          </label>

          <Input
            value={featureKey}
            onChange={(e) => {
              setFeatureKey(e.target.value);
              setError("");
            }}
            placeholder="e.g., dark_mode"
            className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />

          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-gray-700">
            Status
          </span>

          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              isEnabled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                isEnabled ? "translate-x-6" : ""
              }`}
            />
          </button>

          <span className="text-base">
            {isEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>

        <Button
          label = "Create"
          onClick={handleCreate}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
        </Button>
      </div>
    </div>
  );
}