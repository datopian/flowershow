import Link from "next/link.js";
import { Tooltip } from "../Tooltip";

type Config = {
  showLinkPreviews: boolean;
};

interface Props {
  href?: string;
  data: any;
  usehook: any;
  config: Config;
  [x: string]: unknown;
}

export const CustomLink: React.FC<Props> = ({
  config,
  data,
  usehook,
  ...props
}) => {
  const { href } = props;
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  // TODO why are we doing this?
  // Use next link for pages within app and <a> for external links.
  // https://nextjs.org/learn/basics/navigate-between-pages/client-side
  if (isInternalLink) {
    return config.showLinkPreviews ? (
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
