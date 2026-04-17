type Props = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  label,
  onClick,
  type = "button",
  disabled,
  className = "",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
}