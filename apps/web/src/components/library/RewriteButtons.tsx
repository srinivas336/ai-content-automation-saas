type Props = {
  onAction: (action: string) => void;
  loading: boolean;
};

export default function RewriteButtons({
  onAction,
  loading,
}: Props) {
  const actions = [
    "Rewrite",
    "Improve",
    "Shorten",
    "Expand",
    "Make Friendly",
    "Make Professional",
    "Make Funny",
    "Make Persuasive",
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action}
          disabled={loading}
          onClick={() => onAction(action)}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "AI..." : action}
        </button>
      ))}
    </div>
  );
}