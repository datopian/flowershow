import { Feature } from "./Feature";

const features = [
  {
    title: "Custom dark and light themes",
    description:
      "Change the fonts and colors used throughout your website as well as switch between dark and light modes.",
    link: "/docs/custom-theme",
    imageSrc: "/assets/images/theme.png",
  },
  {
    title: "Table of contents",
    description:
      "You can add a table of contents to your markdown pages as well as adding a site-wide table of contents in a LHS sidebar to allow your users to easily navigate to other pages on your website.",
    link: "/docs/site-wide-toc",
    imageSrc: "/assets/images/toc.png",
  },
  {
    title: "Blog Support",
    description:
      "Blog document type for your blog posts. This way you'll be able to fetch and display them on any of your pages by using our BlogsList component (or you can create a custom one).",
    link: "/docs/blog",
    imageSrc: "/assets/images/blogindex.png",
  },
  {
    title: "Markdown, MDX syntax support",
    description:
      "Flowershow was designed with Obsidian users in mind, so it aims to fully support Obsidian syntax, including CommonMark, GitHub Flavoured Markdown and Obsidian extensions, like Wiki links. All of your Markdown files are parsed as MDX. This means you not only can write your content using good old Markdown, but also enrich it with dynamic visualizations, immersive user interactions and much more!",
    link: "/docs/syntax",
    imageSrc: "/assets/images/obsidian_dark_new.png",
  },
  {
    title: "Tailwind support",
    description:
      "Flowershow comes with built-in tailwind support on any markdown page for styling your content.",
    link: "/docs/tailwind",
    imageSrc: "/assets/images/tw.png",
  },
];

export function Features() {
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-6 lg:flex lg:items-center text-black dark:text-white ">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Features
          </h1>
          <p className="mx-auto mt-6 max-w-xl sm:text-xl sm:leading-relaxed">
            Here are some of the cool features that are currently supported by
            Flowershow
          </p>
        </div>
      </div>

      {features.map((feature, index) => (
        <Feature key={feature.title} feature={feature} index={index} />
      ))}
    </>
  );
}
