export default function EmptyState() {
  return (
    <div className="mt-16 rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">
      <div className="text-6xl">📂</div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        No Content Found
      </h2>

      <p className="mt-3 text-slate-400">
        Generate your first AI content and it will appear here.
      </p>
    </div>
  );
}