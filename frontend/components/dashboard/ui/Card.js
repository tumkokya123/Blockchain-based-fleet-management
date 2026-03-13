export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#141a22] border border-white/5 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}