import { useEffect, useRef } from "react";
import Typed from "typed.js";

/* eslint jsx-a11y/label-has-associated-control: off */
export default function Hero() {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "markdown notes, easily.",
        "digital garden, beautifully.",
        "second brain, elegantly.",
      ],
      typeSpeed: 60,
      backSpeed: 60,
      backDelay: 1000,
      loop: true,
    };

    typed.current = new Typed(el.current, options);
    return () => {
      typed.current.destroy();
    };
  }, []);

  return (
    <div className="overflow-hidden -mb-32 mt-[-4.5rem] pb-32 pt-[4.5rem] lg:mt-[-4.75rem] lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative mb-10 lg:mb-0 md:text-center lg:text-left">
            <div role="heading" className="h-44 md:h-32 lg:h-44 xl:h-32">
              <h1 className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-6xl tracking-tight text-transparent">
                Publish your
                <br />
                <span
                  className="md:whitespace-pre lg:whitespace-normal xl:whitespace-pre"
                  ref={el}
                />
              </h1>
            </div>
            <p className="mt-4 text-3xl text-primary dark:text-primary-dark tracking-tight">
              For free, no coding.
            </p>
            <p className="mt-4 text-xl tracking-tight text-slate-400">
              Turn your markdown notes into an elegant website and tailor it to
              your needs. Flowershow is easy to use, fully-featured, Obsidian
              compatible and open-source.
            </p>
            <div className="mt-8 sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <p className="text-base font-medium text-slate-400 dark:text-slate-300">
                Sign up to get notified about updates
              </p>
              <form
                method="POST"
                name="get-updates"
                data-netlify="true"
                action="/subscribed"
                className="mt-3 sm:flex"
              >
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required={true}
                  placeholder="Your name"
                  className="block w-full sm:flex-auto sm:w-32 px-2 py-3 text-base rounded-md bg-slate-200 dark:bg-slate-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                />
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  required={true}
                  placeholder="Your email"
                  className="block w-full mt-3 sm:flex-auto sm:w-64 sm:mt-0 sm:ml-3 px-2 py-3 text-base rounded-md bg-slate-200 dark:bg-slate-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                />
                <input type="hidden" name="form-name" value="get-updates" />
                <button
                  type="submit"
                  className="flex-none mt-3 px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-sky-300 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500 sm:mt-0 sm:ml-3"
                >
                  Notify me
                </button>
              </form>
              <p className="mt-3 text-sm text-slate-400 dark:text-slate-300 sm:mt-4">
                We are actively trialling and developing Flowershow. If you'd
                like to get notified about our progress and important updates,
                please sign up.
              </p>
            </div>
            <p className="my-10 text-l tracking-wide">
              <span>A project of</span>
              <a
                href="https://lifeitself.us/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/life-itself-logo.svg"
                  alt="Life Itself"
                  className="mx-2 mb-1 h-6 inline"
                />
                <span>Life Itself</span>
              </a>
              <a
                href="https://www.datopian.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/datopian_logo.png"
                  alt="Datopian"
                  className="mx-2 mb-1 h-6 inline bg-black rounded-full"
                />
                <span>Datopian</span>
              </a>
            </p>
          </div>
          <div className="relative">
            <img
              src="/assets/images/obsidian_dark_new.png"
              alt=""
              className="relative -top-14 w-3/4 rounded-lg hidden dark:block"
            />
            <img
              src="/assets/images/flowershow_dark.png"
              alt=""
              className=" absolute top-10 left-1/3 w-3/4 rounded-lg hidden dark:block"
            />
            <img
              src="/assets/images/obsidian_light_new.png"
              alt=""
              className="relative -top-14 w-3/4 rounded-lg dark:hidden"
            />
            <img
              src="/assets/images/flowershow_light.png"
              alt=""
              className=" absolute top-10 left-1/3 w-3/4 rounded-lg dark:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
