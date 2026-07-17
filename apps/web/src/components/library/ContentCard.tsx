type Content = {
  id: string;
  platform: string;
  topic: string;
  tone: string;
  content: string;
  created_at: string;
};

type Props = {
  post: Content;
  editingId: string | null;
  editedContent: string;
  setEditedContent: (value: string) => void;
  startEditing: (post: Content) => void;
  saveEdit: (id: string) => void;
  deletePost: (id: string) => void;
  copyContent: (text: string) => void;
};

export default function ContentCard({
  post,
  editingId,
  editedContent,
  setEditedContent,
  startEditing,
  saveEdit,
  deletePost,
  copyContent,
}: Props) {
  const characterCount =
    editingId === post.id
      ? editedContent.length
      : post.content.length;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {post.platform}
          </h2>

          <p className="mt-1 text-slate-400">
            {post.topic}
          </p>

          <span className="mt-2 inline-block rounded-full bg-blue-600 px-3 py-1 text-sm">
            {post.tone}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => copyContent(post.content)}
            className="rounded-lg bg-green-600 px-4 py-2 transition hover:bg-green-700"
          >
            Copy
          </button>

          <button
            onClick={() => startEditing(post)}
            className="rounded-lg bg-yellow-500 px-4 py-2 text-black transition hover:bg-yellow-400"
          >
            Edit
          </button>

          <button
            onClick={() => deletePost(post.id)}
            className="rounded-lg bg-red-600 px-4 py-2 transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {editingId === post.id ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) =>
              setEditedContent(e.target.value)
            }
            className="mt-6 h-56 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-blue-500"
          />

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Characters: {characterCount}
            </p>

            <button
              onClick={() => saveEdit(post.id)}
              className="rounded-lg bg-blue-600 px-6 py-2 transition hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </>
      ) : (
        <>
          <pre className="mt-6 whitespace-pre-wrap font-sans text-slate-200">
            {post.content}
          </pre>

          <p className="mt-4 text-right text-sm text-slate-500">
            Characters: {characterCount}
          </p>
        </>
      )}
    </div>
  );
}