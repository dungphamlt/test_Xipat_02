import Link from "next/link";

export type Post = {
  id: number;
  title: string;
  description: string;
  body_markdown: string;
  url: string;
  cover_image: string;
  readable_publish_date: string;
  user: {
    name: string;
    profile_image: string;
  };
};

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-xl col-span-12 sm:col-span-6 lg:col-span-4 shadow-sm overflow-hidden hover:shadow-lg transition">
      <div
        className="bg-center bg-no-repeat bg-cover pb-[45%] "
        style={{ backgroundImage: `url(${post.cover_image})` }}
      ></div>
      <div className="p-4 bg-gray-100">
        <h3 className="text-xl text-black font-bold mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-black mb-4 line-clamp-2">{post.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">
            {post.readable_publish_date}
          </span>
          <span className="font-medium text-black">{post.user.name}</span>
        </div>
        <div className="flex gap-3 mt-4">
          <Link
            href={`/posts/${post.id}`}
            className="block py-1 px-4 rounded-lg bg-[#031f39] text-white hover:text-orange-500 transition"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
