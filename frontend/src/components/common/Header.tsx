import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { getRole } from "../../utils/auth";

type Props = {
  title: string;
  role?: string;
};

export default function Header({ title, role : roleName }: Props) {
  const role = getRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const handleHome = () => {
    navigate("/"); 
    localStorage.clear();
  };

  const isAdmin = role === "SUPER_ADMIN" || role === "ORG_ADMIN";

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      <div className="flex items-center gap-5">
        {role && (
          <span className="text-sm text-gray-500 font-semibold">{roleName}</span>
        )}

        <Button
          label="Home"
          onClick={handleHome}
          className="bg-blue-300 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        />

        {isAdmin && (
          <Button
            label="Logout"
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          />
        )}
      </div>
    </div>
  );
}