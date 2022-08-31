export function FlowershowPublish() {
  return (
    <div className="py-10 sm:px-2 lg:relative lg:px-0" id="how">
      <div className="prose dark:prose-invert mx-auto max-w-6xl px-4 lg:max-w-6xl lg:px-8 xl:px-12">
        <h2 className="text-center">
          How Flowershow works?
        </h2>
        <p className="text-center">
          🚧 Coming soon! 🚧
        </p>
        <p>
          We are actively trialling Flowershow before wide release. If you'd like to help us test or be first on the list to use it please sign up using the form at the top of this page.
        </p>

        <div className="relative grid grid-cols-1 gap-6 my-4 lg:my-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-xl text-sky-600 ring-2 ring-white dark:border-sky-900 dark:bg-[#163C57] dark:text-sky-500 dark:ring-gray-950">
                1
              </div>
              <h3 className="m-0">
                You have a folder with your Markdown files and you want to publish it.
              </h3>
            </div>
          </div>
          <div>
            <img src="/assets/images/content_folder.png" alt="" className="lg:max-h-[20rem] m-0"/>
          </div>
          <img src="/assets/images/arrow.png" alt="" className="hidden lg:block h-[10rem] absolute bottom-0 left-[38%] rotate-[45deg] translate-y-1/2" />
        </div>

        <div className="relative grid grid-cols-1 gap-6 my-4 lg-my-16 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block">
            <img src="/assets/images/npx.png" alt="" className="m-0 lg:max-h-[20rem]"/>
          </div>
          <div>
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-xl text-sky-600 ring-2 ring-white dark:border-sky-900 dark:bg-[#163C57] dark:text-sky-500 dark:ring-gray-950">
                2
              </div>
              <h3 className="m-0">
                Run `npx flowershow publish` in this folder...
              </h3>
            </div>
            <p>
            After running this command, you'll be shown some basic configuration prompts. At the end you'll get a response: `Live at https://xyz.flowershow.sites/...`
            </p>
          </div>
          <div className="lg:hidden">
            <img src="/assets/images/npx.png" alt="" className="m-0 lg:max-h-[20rem]"/>
          </div>
          <img src="/assets/images/arrow.png" alt="" className="hidden lg:block h-[10rem] absolute left-[38%]  -rotate-[45deg] bottom-0 translate-y-[9rem]"/>
        </div>

        <div className="relative grid grid-cols-1 gap-6 my-4 lg:my-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-xl text-sky-600 ring-2 ring-white dark:border-sky-900 dark:bg-[#163C57] dark:text-sky-500 dark:ring-gray-950">
                3
              </div>
              <h3 className="m-0">... and see your website online! 🎊</h3>
            </div>
          </div>
          <div>
            <img src="/assets/images/result_mac_dark.png" alt="" className="rounded-lg shadow-xl m-0" />
          </div>
        </div>

      </div>
    </div>
  )
}
