import React from "react";
import Feature from "./Feature";

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
    imageSrc: "/assets/images/blog.png",
  },
  {
    title: "Markdown, MDX syntax support",
    description:
      "Flowershow was designed with Obsidian users in mind, so it aims to fully support Obsidian syntax, including CommonMark, GitHub Flavoured Markdown and Obsidian extensions, like Wiki links. All of your Markdown files are parsed as MDX. This means you not only can write your content using good old Markdown, but also enrich it with dynamic visualizations, immersive user interactions and much more!",
    link: "/docs/syntax",
    imageSrc: "/assets/images/obs_dark.png",
  },
  {
    title: "Tailwind support",
    description:
      "Flowershow comes with built-in tailwind support on any markdown page for styling your content.",
    link: "/docs/tailwind",
    imageSrc: "/assets/images/tw.png",
  },
  {
    title: "Mermaid and MathJax support",
    description:
      "Display Mermaid diagrams within your notes as well as math exaptions, where you can use LaTeX notations to denote formulas.",
    link: "/docs/mermaid",
    imageSrc: "/assets/images/mermaid.png",
  },
  {
    title: "Full-text search",
    description:
      "Flowershow supports search functionality to deliver realtime results for content available on all your pages. Clicking the result will lead the user to the relevant page.",
    link: "/docs/search",
    imageSrc: "/assets/images/search.png",
  },
];

export default function Features() {
  return (
    <>
      <div className="prose dark:prose-invert mx-auto max-w-screen-xl px-4 py-6 lg:items-center text-center">
        <h2>Features</h2>
        <p>
          Here are some of the cool features that are currently supported by
          Flowershow
        </p>
      </div>

      {features.map((feature, index) => (
        <Feature key={feature.title} feature={feature} index={index} />
      ))}
    </>
  );
}
