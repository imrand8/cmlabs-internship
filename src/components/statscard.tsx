interface StatsCardProps {
  title: string;
  value: string;
  gradient: string;
}

export default function StatsCard({ title, value, gradient }: StatsCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-6 text-white shadow-lg
        bg-gradient-to-br ${gradient}
        hover:shadow-xl transition-shadow duration-300
      `}
    >
      <div className="relative z-10">
        <p className="text-sm font-medium opacity-90 mb-3">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      
      {/* Decorative circle */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
    </div>
  );
}
