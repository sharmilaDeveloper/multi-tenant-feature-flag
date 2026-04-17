export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className || "bg-white shadow-md rounded-xl p-6 w-full max-w-md"}>
      {children}
    </div>
  );
}

