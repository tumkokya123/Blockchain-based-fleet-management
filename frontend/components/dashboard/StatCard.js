export default function StatCard({ title, value, change }) {
  return (
    <div className="relative bg-[#141a22] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]">
      
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h2 className="text-2xl font-semibold text-white mt-2">
        {value}
      </h2>

      {change && (
        <p className="text-xs text-gray-500 mt-2">
          {change}
        </p>
      )}
      
    </div>
  );
}