import Link from "next/link";

interface Props {
  title: string;
  logo?: string;
  version?: string;
}

export const NavTitle: React.FC<Props> = ({ title, logo, version }) => {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="flex items-center font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white"
    >
      {logo && (
        <img src={logo} alt={title} className="w-9 h-9 mr-1 fill-white" />
      )}
      <span>{title}</span>
      {version && (
        <div className="mx-2 rounded-full border border-slate-500 py-1 px-3 text-xs text-slate-500">
          {version}
        </div>
      )}
    </Link>
  );
};
