import Link from "next/link";
import { forwardRef } from "react";

const BaseLink = forwardRef((props, ref) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href} ref={ref} {...rest}>
      {children}
    </Link>
  );
});

BaseLink.displayName = "BaseLink";

export { BaseLink };
