import { BlogItem } from "@/components/BlogItem.jsx";

export function BlogsList({ blogs }) {
  return (
    <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="flex flex-col space-y-16">
        {blogs.map((blog) => (
          <BlogItem key={blog.url_path} blog={blog} />
        ))}
      </div>
    </div>
  );
}
