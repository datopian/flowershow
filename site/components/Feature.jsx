export function Feature({ feature, index }) {
  if (index % 2 == 0) {
    return (
      <div className="overflow-hidden sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:mt-12 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              {feature.title}
            </h2>
            <p className="hidden text-gray-500 dark:text-gray-400 md:mt-6 md:block">
              {feature.description}
            </p>
            <div className="mt-4 md:mt-10">
              <a
                href={feature.link}
                className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <img
          alt={feature.title}
          src={feature.imageSrc}
          className="h-full w-full object-cover self-end"
        />
      </div>
    );
  } else {
    return (
      <div className="overflow-hidden sm:grid sm:grid-cols-2 sm:items-center">
        <div className="order-2 p-8 md:p-12 lg:px-16 lg:py-12">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              {feature.title}
            </h2>
            <p className="hidden text-gray-500 dark:text-gray-400 md:mt-4 md:block">
              {feature.description}
            </p>
            <div className="mt-4 md:mt-8">
              <a
                href={feature.link}
                className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <img
          alt={feature.title}
          src={feature.imageSrc}
          className="order-1 h-full w-full object-cover self-end "
        />
      </div>
    );
  }
}
