import React from "react";
import { GetStaticProps, GetStaticPropsResult } from "next";

import Hero from "../components/Hero";
import WhatIsFlowershow from "../components/WhatIsFlowershow";
import Features from "../components/Features";
import SelfPublishSteps from "../components/SelfPublishSteps";
import CloudPublishSteps from "../components/CloudPublishSteps";
import type { CustomAppProps } from "./_app";

type HomePageProps = CustomAppProps;

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIsFlowershow />

      {/** Tutorial video **/}
      {/* <div className="mx-auto lg:max-w-3xl">https://www.youtube.com/watch?v=HxD6NWYCea0</div> */}

      <SelfPublishSteps />
      <CloudPublishSteps />
      <Features />

      {/** Why the name? **/}
      <div className="py-10 sm:px-2 lg:relative lg:px-0">
        <div className="prose dark:prose-invert mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-8 xl:px-12">
          <h2 className="text-center">Why the name?</h2>
          <p>
            Flowershow is about sharing your digital garden -- putting it "on
            show" to the world. And what do you have in your garden? Flowers!
            Hence "Flowershow": it shows off your digital garden to the world!
          </p>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<HomePageProps>
> => {
  return {
    props: {
      meta: {
        urlPath: "/",
        showToc: false,
        showEditLink: false,
        showSidebar: false,
        showComments: false,
      },
    },
  };
};
