import { PostCard, Post } from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { GetStaticProps } from "next";
import { useState } from "react";

type HomeProps = {
  initialPosts: Post[];
  totalPages: number;
};

export default function Home({ initialPosts, totalPages }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://dev.to/api/articles?top=30&per_page=9&page=${page}`
      );
      const newPosts = await res.json();
      setPosts(newPosts);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 sm:px-0 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 primary">Blog Posts</h1>

      <div className="grid grid-cols-12 gap-6 mb-8">
        {posts.map((post: Post) => (
          <div
            key={post.id}
            className="col-span-12 sm:col-span-6 lg:col-span-4"
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={fetchPosts}
        isLoading={isLoading}
      />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch("https://dev.to/api/articles");
    const resPage1 = await fetch(
      "https://dev.to/api/articles?top=30&per_page=9&page=1"
    );
    const allPosts = await res.json();
    const postPage1 = await resPage1.json();
    const totalPages = Math.ceil(allPosts.length / 9);

    // Chỉ lấy các thuộc tính cần thiết theo type Post
    const initialPosts = postPage1.map((post: Post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      readable_publish_date: post.readable_publish_date,
      url: post.url,
      user: {
        name: post.user.name,
        profile_image: post.user.profile_image,
      },
      cover_image: post.cover_image,
    }));

    return {
      props: {
        initialPosts,
        totalPages,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        initialPosts: [],
        totalPages: 0,
      },
      revalidate: 60,
    };
  }
};
