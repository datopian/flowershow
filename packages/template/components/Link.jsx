import Link from "next/link";
import { Tooltip } from "./Tooltip";
import { siteConfig } from "../config/siteConfig";

export function CustomLink(props) {
  const { href } = props;
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <>
        {siteConfig.linkPreviews ? (
          <Tooltip
            {...props}
            render={(tooltipTriggerProps) => <Link {...tooltipTriggerProps} />}
          />
        ) : (
          <Link {...props} />
        )}
      </>
    );
  }

  if (isAnchorLink) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
