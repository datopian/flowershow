import Link from "next/link";
/* interface NavTitleProps {
 *     text: string;
 *     logo?: string;
 *     version?: string;
 * } */

// TODO fix the API, this is a mess

export const NavTitle: React.FC<any> = ({ siteConfig }) => {
  const chunk = (
    <>
      {siteConfig.navbarTitle?.logo && (
        <img
          src={siteConfig.navbarTitle.logo}
          alt={siteConfig.navbarTitle.text}
          className="w-9 h-9 mr-1 fill-white"
        />
      )}
      {siteConfig.navbarTitle?.text}
      {siteConfig.navbarTitle?.version && (
        <div className="mx-2 rounded-full border border-slate-500 py-1 px-3 text-xs text-slate-500">
          {siteConfig.navbarTitle?.version}
        </div>
      )}
    </>
  );

  return (
    <Link
      href="/"
      aria-label="Home page"
      className="flex items-center font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white"
    >
      {siteConfig.navbarTitle && chunk}
      {!siteConfig.navbarTitle && siteConfig.title}
    </Link>
  );
};
