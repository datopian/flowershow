import Link from "next/link.js";
import { Tooltip } from "../Tooltip";
import TwitterEmbed from "./TwitterEmbed";

// TODO it's a mess, move twitter embeds support to remark-embed
const TWITTER_REGEX =
  /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;

interface Props {
  href: string;
  data: any;
  usehook: any;
  preview: boolean;
  children: React.ReactNode;
  className?: string;
  [x: string]: unknown;
}

export const CustomLink: React.FC<Props> = ({
  data,
  usehook,
  preview,
  children,
  ...props
}) => {
  const { href, className } = props; // keep href in props to render tooltip content
  const isInternalLink = className?.includes("internal");
  // eslint-disable-next-line no-useless-escape
  const isHeadingLink = /#[\w\-]* $/.test(href);
  const isTwitterLink = TWITTER_REGEX.test(href);

  // Use next link for pages within app and <a> for external links.
  // https://nextjs.org/learn/basics/navigate-between-pages/client-side
  if (isInternalLink) {
    return preview ? (
      <Tooltip
        {...props}
        data={data} // TODO again, why do we pass all documents here?!
        usehook={usehook}
        render={(tooltipTriggerProps) => <Link {...tooltipTriggerProps} />}
      />
    ) : (
      <Link {...props}>{children}</Link>
    );
  }

  if (isHeadingLink) {
    return <Link {...props}>{children}</Link>;
  }

  if (isTwitterLink) {
    return <TwitterEmbed url={href} {...props} />;
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {" "}
      {children}
    </a>
  );
};
