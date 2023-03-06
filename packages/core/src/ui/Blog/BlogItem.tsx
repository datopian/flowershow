import { Card } from "../Card";
import { formatDate } from "../../utils/formatDate";
import { Blog } from "../types";

interface Props {
  blog: Blog;
}

export const BlogItem: React.FC<Props> = ({ blog }) => {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`${blog.url_path}`}>{blog.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={blog.date}
          className="md:hidden"
          decorate
        >
          {formatDate(blog.date)}
        </Card.Eyebrow>
        {blog.description && (
          <Card.Description>{blog.description}</Card.Description>
        )}
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={blog.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(blog.date)}
      </Card.Eyebrow>
    </article>
  );
};
