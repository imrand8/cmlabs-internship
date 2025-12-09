interface EmptyStateCardProps {
  pageTitle: string;
  onAddField?: () => void;
}

export default function EmptyStateCard({ pageTitle, onAddField }: EmptyStateCardProps) {
  return (
    <div className="w-full max-w-5xl rounded-2xl bg-gradient-to-r from-[#1E88E5] to-[#1976D2] text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] px-10 py-9 mb-16">
      <h2 className="text-2xl font-semibold mb-3">Content Builder</h2>

      <p className="flex items-center gap-2 text-sm mb-3">
        <span className="text-lg">📄</span>
        <span>No Content Structure Yet</span>
      </p>

      <p className="text-sm mb-2">
        Start building your content structure to make this page meaningful and
        functional for <span className="font-semibold">{pageTitle}</span>.
      </p>

      <p className="text-sm mb-3">
        Add field groups and custom fields as your own, based on your specific
        needs and preferences.
      </p>

      <ul className="text-sm space-y-1 mb-4">
        <li>＋ Create a Field Group to organize your content.</li>
        <li>＋ Add Fields like text, image, numbering, or others.</li>
      </ul>

      <p className="text-sm">
        💡 Tip: Use <span className="font-semibold">"Create Field Group"</span>{" "}
        to group related fields for better structure.
      </p>
    </div>
  );
}
