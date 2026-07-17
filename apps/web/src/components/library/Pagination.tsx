type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`rounded-lg px-4 py-2 ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}