"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { PostWithContentDto } from "@/app/type/post";
import { apiFetch } from "@/app/lib/backend/client";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostWithContentDto | null>(null);
  const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`).then(setPost);
  }, []);

  if (post == null) return <div>로딩중...</div>;
  return (
    <>
      <h1>글 상세페이지</h1>
      <div>번호 : {post.id}</div>
      <div>제목: {post.title}</div>
      <div style={{ whiteSpace: "pre-line" }}>{post.content}</div>
    </>
  );
}

