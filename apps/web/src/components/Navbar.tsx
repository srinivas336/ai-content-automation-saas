export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
      <h1 className="text-xl font-bold text-white">
        AI Content Automation
      </h1>

      <nav>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Sign In
        </button>
      </nav>
    </header>
  );
}