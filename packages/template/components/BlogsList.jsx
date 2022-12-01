import { BlogItem } from "@/components/BlogItem.jsx";
import { useState, useRef, useCallback } from "react";

const BLOGS_LOAD_COUNT = 10;

export function BlogsList({ blogs }) {
  const [blogsCount, setBlogsCount] = useState(BLOGS_LOAD_COUNT);

  const observer = useRef();
  const lastPostElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setBlogsCount((prevBlogsCount) => prevBlogsCount + BLOGS_LOAD_COUNT);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="flex flex-col space-y-16">
        {blogs.slice(0, blogsCount).map((blog, index) => {
          if (blogsCount === index + 1) {
            return (
              <BlogItem
                ref={lastPostElementRef}
                key={blog.url_path}
                blog={blog}
              />
            );
          } else {
            return <BlogItem key={blog.url_path} blog={blog} />;
          }
        })}
      </div>
    </div>
  );
}
