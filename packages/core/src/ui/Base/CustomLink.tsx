import Link from "next/link.js";

interface Props {
  href?: string;
  [x: string]: unknown;
}

export const CustomLink: React.FC<Props> = ({ href, ...rest }) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  // TODO why are we doing this?
  if (isInternalLink) {
    return <Link href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};
