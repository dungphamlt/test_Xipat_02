import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Post } from "@/components/PostCard";
import Link from "next/link";
import Image from "next/image";

export default function PostDetail({ post }: { post: Post }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Dev.to Blog</title>
        <meta name="description" content={post.description} />
        <meta
          property="og:image"
          content={post.cover_image || "/default-og.png"}
        />
      </Head>

      <div className="">
        {post.cover_image && (
          <div
            className="bg-center bg-no-repeat bg-cover pb-[36%] "
            style={{ backgroundImage: `url(${post.cover_image})` }}
          ></div>
        )}
        <div className="container px-4 sm:px-0 mx-auto py-8">
          <div className="flex text-2xl gap-2 mb-8 items-center">
            <Link
              href="/"
              className=" font-bold hover:text-blue-500 hover:underline"
            >
              Home
            </Link>
            <span className="font-bold">{">"}</span>
            <span className="text-blue-500 font-semibold">{post.title}</span>
          </div>
          <div className="flex items-center mb-6">
            <Image
              src={post.user.profile_image}
              alt={post.user.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-medium">{post.user.name}</p>
              <p className="text-gray-500 text-sm">
                {post.readable_publish_date}
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body_markdown }}
          />
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-render 5 popular posts at build time
  const res = await fetch("https://dev.to/api/articles?top=30&per_page=5");
  const posts = await res.json();

  const paths = posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: true, // Enable fallback for new posts
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const res = await fetch(`https://dev.to/api/articles/${params?.id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    const post = await res.json();

    return {
      props: {
        post,
      },
      revalidate: 60 * 10, // Re-generate every hour (ISR)
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      notFound: true,
    };
  }
};
