import { forwardRef } from 'react';
import Link from 'next/link';

const BaseLink = forwardRef((props, ref) => {
    let { href, children, ...rest } = props;
    return (
      <Link href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  });

BaseLink.displayName = 'BaseLink';

export { BaseLink };
