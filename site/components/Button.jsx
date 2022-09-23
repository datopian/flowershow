import Link from "next/link";

export function Button({ className, href }) {
  return href ? (
    <Link href={href}>
      <a className={className} />
    </Link>
  ) : (
    <button type="button" aria-label="Some button" className={className} />
  );
}
