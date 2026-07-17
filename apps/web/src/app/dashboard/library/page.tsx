"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import LoadingSpinner from "@/components/library/LoadingSpinner";
import EmptyState from "@/components/library/EmptyState";
import Toast from "@/components/library/Toast";
import SearchBar from "@/components/library/SearchBar";
import FilterBar from "@/components/library/FilterBar";
import ContentCard from "@/components/library/ContentCard";
import Pagination from "@/components/library/Pagination";

type Content = {
  id: string;
  platform: string;
  topic: string;
  tone: string;
  content: string;
  created_at: string;
};

export default function LibraryPage() {
  const [posts, setPosts] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [sort, setSort] = useState("Newest");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const [toast, setToast] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, platform, sort]);

  async function loadPosts() {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) return;

      const response = await fetch("/api/library", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function copyContent(text: string) {
    await navigator.clipboard.writeText(text);
    setToast("Copied!");
    setTimeout(() => setToast(""), 2000);
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this content?")) return;

    const response = await fetch("/api/library", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      setToast("Delete failed");
      return;
    }

    setPosts((prev) => prev.filter((p) => p.id !== id));
    setToast("Deleted!");
    setTimeout(() => setToast(""), 2000);
  }

  function startEditing(post: Content) {
    setEditingId(post.id);
    setEditedContent(post.content);
  }

  async function saveEdit(id: string) {
    const response = await fetch("/api/library", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        content: editedContent,
      }),
    });

    if (!response.ok) {
      setToast("Update failed");
      return;
    }

    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, content: editedContent } : p
      )
    );

    setEditingId(null);
    setEditedContent("");
    setToast("Saved!");

    setTimeout(() => setToast(""), 2000);
  }

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) =>
        platform === "All" ? true : post.platform === platform
      )
      .filter((post) => {
        const q = search.toLowerCase();
        return (
          post.platform.toLowerCase().includes(q) ||
          post.topic.toLowerCase().includes(q) ||
          post.tone.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const x = new Date(a.created_at).getTime();
        const y = new Date(b.created_at).getTime();
        return sort === "Newest" ? y - x : x - y;
      });
  }, [posts, search, platform, sort]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <Toast message={toast} />

      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">
          Content Library
        </h1>

        <div className="mt-8">
          <SearchBar value={search} onChange={setSearch} />

          <FilterBar
            platform={platform}
            setPlatform={setPlatform}
            sort={sort}
            setSort={setSort}
          />
        </div>

        {visiblePosts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {visiblePosts.map((post) => (
              <ContentCard
                key={post.id}
                post={post}
                editingId={editingId}
                editedContent={editedContent}
                setEditedContent={setEditedContent}
                startEditing={startEditing}
                saveEdit={saveEdit}
                deletePost={deletePost}
                copyContent={copyContent}
              />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
}
