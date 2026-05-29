"use client";

import { useEffect, useState } from "react";
import { PostDto } from "@/app/type/post";

import Link from "next/link";

export default function Page() {
  const [posts, setPosts] = useState<PostDto[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/posts")
      .then((res) => res.json())
      // .then((data) => setPosts(data));
      .then(setPosts);
  }, []);

  return (
    <>
      <h1>글 목록</h1>

      {posts.length == 0 && <div>로딩중...</div>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

 