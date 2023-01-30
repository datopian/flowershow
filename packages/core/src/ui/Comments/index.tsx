import dynamic from "next/dynamic.js";
import { GiscusReactComponent, GiscusConfig, GiscusProps } from "./Giscus";
import { Utterances, UtterancesConfig, UtterancesProps } from "./Utterances";

// TODO: add disqus support
// declare global {
//   interface Window {
//     disqus_config?: (...args: any[]) => void;
//     DISQUS?: (...args: any[]) => void;
//     page?: any;
//   }
// }

export type CommentsConfig = GiscusConfig | UtterancesConfig;

export interface CommentsProps {
  commentsConfig: CommentsConfig;
  slug?: string;
}

const GiscusComponent = dynamic<GiscusProps>(
  () => {
    return import("./Giscus").then((mod) => mod.GiscusReactComponent);
  },
  { ssr: false }
);

const UtterancesComponent = dynamic<UtterancesProps>(
  () => {
    return import("./Utterances").then((mod) => mod.Utterances);
  },
  { ssr: false }
);

/**
 * Supports Giscus, Utterances
 * If you want to use a comments provider you have to add it to the
 * content security policy in the `next.config.js` file.
 * slug is used in disqus to identify the page
 *
 * @param {CommentsProps} { comments, slug }
 * @return {*}
 */
export const Comments = ({ commentsConfig, slug }: CommentsProps) => {
  switch (commentsConfig.provider) {
    case "giscus":
      return <GiscusComponent {...commentsConfig.config} />;
    case "utterances":
      return <UtterancesComponent {...commentsConfig.config} />;
  }
};

export { GiscusReactComponent, Utterances };
export type { GiscusConfig, GiscusProps, UtterancesConfig, UtterancesProps };
