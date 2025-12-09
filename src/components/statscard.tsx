interface StatsCardProps {
  title: string;
  value: string;
  gradient: string; // "from-indigo-500/70 to-sky-500/70" dll
}

export default function StatsCard({ title, value, gradient }: StatsCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl p-6 text-slate-50
        bg-gradient-to-br ${gradient}
        border border-white/30
        backdrop-blur-2xl
        shadow-[0_8px_20px_rgba(15,23,42,0.12),0_20px_45px_rgba(15,23,42,0.10)]
        hover:shadow-[0_10px_24px_rgba(15,23,42,0.16),0_22px_50px_rgba(15,23,42,0.14)]
        transition-shadow duration-300
      `}
    >
      <div className="relative z-10">
        <p className="text-sm font-medium text-slate-100/90 mb-3">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>

      {/* highlight lembut */}
      <div className="absolute -right-8 -bottom-10 w-32 h-32 bg-white/18 rounded-full blur-3xl" />
      <div className="absolute -left-10 -top-10 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
    </div>
  );
}
