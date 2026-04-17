import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

type Org = {
  id: string;
  name: string;
  orgCode: string;
  isActive: boolean;
};

export default function SuperAdmin() {
  const [name, setName] = useState("");
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // 🔹 Fetch organizations
  const fetchOrgs = async () => {
    try {
      const res = await api.get("/organizations");
      setOrgs(res.data);
    } catch {
      toast.error("Failed to load organization");
    }
  };

  const toggleOrg = async (id: string, current: boolean) => {
    try {
      await api.put(`/organizations/${id}`, {
        isActive: !current,
      });

      toast.success("Status updated");
      fetchOrgs();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const createOrg = async () => {
    if (!name.trim()) {
      toast.error("Organization name required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/organizations", { name });
      toast.success("Organization created");

      setName("");
      fetchOrgs();
    } catch {
      toast.error("Failed to create organization");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header title="Dashboard" role="SUPER ADMIN" />
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Enter organization name"
        />
        <Button
          onClick={createOrg}
          className="bg-green-600 text-white px-4 py-2 rounded"
          label={loading ? "Creating..." : "Create"}
        />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Organization List</h2>

        {orgs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21h18M9 8h6M9 12h6M9 16h6M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              No organizations yet
            </h3>
            <p className="text-gray-500 mt-1">
              Create your first organization to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4 ">
            {orgs.map((org) => (
              <Card
                key={org.id}
                className="flex justify-between items-center hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 p-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                    {org.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold">{org.name}</p>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {org.orgCode}
                      </span>

                      <Button
                        label="Copy"
                        onClick={() =>
                          navigator.clipboard.writeText(org.orgCode)
                        }
                        className="text-xs text-black px-1 py-1 bg-gray-200 hover:bg-gray-500"
                      />
                    </div>

                    <span className="text-xs mt-1 inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {org.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <Button
                  label="Disable"
                  onClick={() => toggleOrg(org.id, org.isActive)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
