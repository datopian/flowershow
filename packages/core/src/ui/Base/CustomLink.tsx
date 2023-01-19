import Link from "next/link.js";
import { Tooltip } from "../Tooltip";

interface Props {
  href?: string;
  data: any;
  usehook: any;
  preview: boolean;
  [x: string]: unknown;
}

export const CustomLink: React.FC<Props> = ({
  data,
  usehook,
  preview,
  ...props
}) => {
  const { href } = props;
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  // Use next link for pages within app and <a> for external links.
  // https://nextjs.org/learn/basics/navigate-between-pages/client-side
  if (isInternalLink) {
    return preview ? (
      <Tooltip
        {...props}
        data={data}
        usehook={usehook}
        render={(tooltipTriggerProps) => <Link {...tooltipTriggerProps} />}
      />
    ) : (
      <Link href={href} {...props} />
    );
  }

  if (isAnchorLink) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};
