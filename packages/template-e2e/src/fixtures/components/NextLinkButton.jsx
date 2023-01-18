import Link from "next/link";

export function NextLinkButton({ children, href }) {
  return (
    <div
      style={{
        padding: 10,
        backgroundColor: "#333",
        color: "#fff",
        display: "inline-block",
        borderRadius: 4,
      }}
      onClick={() => alert("Hi")}
    >
      <Link
        href={href}
        className="text-blue-700 hover:text-blue-900"
        legacyBehavior
      >
        {children}
      </Link>
    </div>
  );
}
