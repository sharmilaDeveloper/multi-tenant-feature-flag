import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgId, setOrgId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    orgCode: "",
  });
  const navigate = useNavigate();

  const handleSignup = async () => {
    const newErrors = {
      email: "",
      password: "",
      orgCode: "",
    };

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Minimum 8 characters required";

    if (!orgId) newErrors.orgCode = "Organization code is required";

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) return;

    try {
      await api.post("/auth/signup", { email, password, organizationId:orgId });
      toast.success("Signup successful");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <Card className="w-96 p-8 shadow-2xl rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join your organization and start using features
        </p>
        <div className="space-y-4">
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="py-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm py-1">{errors.email}</p>
          )}

          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="py-1"
          />

          {errors.password && (
            <p className="text-red-500 text-sm py-1">{errors.password}</p>
          )}

          <Input
            placeholder="Organization ID"
            onChange={(e) => setOrgId(e.target.value)}
            className="py-1"
          />
          {errors.orgCode && (
            <p className="text-red-500 text-sm py-1">{errors.orgCode}</p>
          )}
          <Button
            label={loading ? "Creating account..." : "Sign Up"}
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition"
          />
        </div>
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </Card>
    </div>
  );
}
