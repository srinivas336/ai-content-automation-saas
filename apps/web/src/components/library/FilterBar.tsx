type FilterBarProps = {
  platform: string;
  setPlatform: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
};

export default function FilterBar({
  platform,
  setPlatform,
  sort,
  setSort,
}: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row">
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
      >
        <option value="All">All Platforms</option>
        <option value="Instagram">Instagram</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="X (Twitter)">X (Twitter)</option>
        <option value="Facebook">Facebook</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
      >
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
      </select>
    </div>
  );
}