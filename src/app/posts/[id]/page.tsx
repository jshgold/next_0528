"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import type { PostWithContentDto } from "@/app/type/post";
import { apiFetch } from "@/app/lib/backend/client";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const router = useRouter();

  const { id: idStr } = useParams<{ id: string }>();
  const id = Number(idStr);
  const [post, setPost] = useState<PostWithContentDto | null>(null);

  const deletePost = (id: number) => {
    apiFetch(`/api/v1/posts/${id}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);

      router.replace("/posts");
    });
  };
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
      <div className="flex gap-2">
        <button
          className="p-2 rounded border cursor-pointer"
          onClick={() => confirm(`${post.id}번 글을 정말로 삭제하시겠습니까?`) && deletePost(post.id)}
        >
          삭제
        </button>
        <Link className="p-2 rounded border" href={`/posts/${post.id}/edit`}>
          수정
        </Link>
      </div>
    </>
  );
}

