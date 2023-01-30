// import { useEffect, useCallback } from 'react'
import { DiscussionEmbed } from "disqus-react";

export interface DisqusConfig {
  provider: "disqus";
  pages?: Array<string>;
  config: {
    shortname: string;
  };
}

export type DisqusProps = DisqusConfig["config"] & {
  slug?: string;
};

export const Disqus = ({ shortname, slug }: DisqusProps) => {
  return (
    <DiscussionEmbed
      shortname={shortname}
      config={{
        url: window?.location?.href,
        identifier: slug,
      }}
    />
  );
  // const COMMENTS_ID = 'disqus_thread'

  // const LoadComments = useCallback(() => {
  //   window.disqus_config = function () {
  //     this.page.url = window.location.href
  //     this.page.identifier = slug
  //   }
  //   if (window.DISQUS === undefined) {
  //     const script = document.createElement('script')
  //     script.src = 'https://' + shortname + '.disqus.com/embed.js'
  //     // @ts-ignore
  //     script.setAttribute('data-timestamp', +new Date())
  //     script.setAttribute('crossorigin', 'anonymous')
  //     script.async = true
  //     document.body.appendChild(script)
  //   } else {
  //     //@ts-ignore
  //     window.DISQUS.reset({ reload: true })
  //   }
  // }, [])

  // useEffect(() => {
  //   LoadComments()
  // }, [LoadComments])

  // return <div className="disqus-frame" id={COMMENTS_ID} />
};
