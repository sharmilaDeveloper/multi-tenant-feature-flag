import { useEffect, useState } from "react";
import api from "../../api/axios";
import FeatureForm from "../components/FeatureForm";
import toast from "react-hot-toast";
import Header from "../../components/common/Header";
import ConfirmModal from "../../components/common/ConfirmationModal";
import Button from "../../components/common/Button";

type Feature = {
  id: string;
  featureKey: string;
  isEnabled: boolean;
};

export default function AdminDashboard() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Fetch
  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const res = await api.get("/features");
      setFeatures(res.data);
    } catch {
      toast.error("Failed to load features");
    } finally {
      setLoading(false);
    }
  };

  // Toggle
  const toggleFeature = async (id: string, current: boolean) => {
    try {
      await api.put(`/features/${id}`, {
        isEnabled: !current,
      });
      toast.success("Feature updated");
      fetchFeatures();
    } catch {
      toast.error("Update failed");
    }
  };

  // Open modal
  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedId) return;

    try {
      await api.delete(`/features/${selectedId}`);
      toast.success("Feature deleted");
      fetchFeatures();
    } catch {
      toast.error("Delete failed");
    } finally {
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <Header title="Feature Management" role="ORG ADMIN" />

      <FeatureForm onCreated={fetchFeatures} />

      <div className="bg-white mt-6 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Feature Flags</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : features.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg font-medium">No features found</p>
            <p className="text-sm">Create your first feature</p>
          </div>
        ) : (
          features.map((f) => (
            <div
              key={f.id}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-lg mb-3"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {f.featureKey}
                </p>
                <p className="text-xs text-gray-500">
                  Feature Key
                </p>
              </div>

              <div className="flex items-center gap-4">
                
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    f.isEnabled
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {f.isEnabled ? "Enabled" : "Disabled"}
                </span>

                <button
                  onClick={() => toggleFeature(f.id, f.isEnabled)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                    f.isEnabled ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                      f.isEnabled ? "translate-x-6" : ""
                    }`}
                  />
                </button>

                <Button
                  label="Delete"
                  onClick={() => openDeleteModal(f.id)}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-200"
                />

              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Feature"
        message="Are you sure you want to delete this feature? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}