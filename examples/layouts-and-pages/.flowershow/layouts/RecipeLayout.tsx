export function RecipeLayout({ children, ...frontMatter }) {
  const {
    created,
    title,
    authors,
    difficulty,
    serves,
    time,
    ingredients,
    image,
  } = frontMatter;
  return (
    <article className="docs prose prose-a:text-primary dark:prose-a:text-primary-dark prose-strong:text-primary dark:prose-strong:text-primary-dark prose-code:text-primary dark:prose-code:text-primary-dark prose-headings:text-primary dark:prose-headings:text-primary-dark text-primary dark:text-primary-dark prose-headings:font-headings dark:prose-invert prose-a:break-words mx-auto p-6">
      <header>
        <div className="container mx-auto">
          <h1 className="text-center text-4xl">{title}</h1>
          <p className="text-center text-gray-800 mb-3">
            Created {new Date(created).toLocaleDateString()}
          </p>
          <p className="text-center text-gray-800 mb-3">
            Written by{" "}
            <a
              className="underline hover:no-underline"
              href="#"
              target="_blank"
            >
              {authors[0]}
            </a>
          </p>
          {/* recipe card grid*/}
          <div className="grid gap-2 gap-y-2 mb-6">
            {/* card */}
            <div className="overflow-hidden relative">
              <div>
                <img className="w-full" src={image} alt="Recipe Title" />
              </div>
              <div className="p-2">
                <div className="flex justify-between mt-4 mb-4 text-gray-500">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="ml-1 lg:text-xl">{time}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-1 lg:text-xl">
                      {ingredients.length}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span className="ml-1 lg:text-xl">{serves}</span>
                  </div>
                </div>
                <h2>Ingredients</h2>
                <div className="flex justify-center bg-yellow-100">
                  <ul className="w-full">
                    {ingredients.map((ingredient) => (
                      <li className="w-full border-b-2 border-neutral-100 border-opacity-100 py-2">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="absolute top-0 right-0 mt-4 mr-4 bg-green-400 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase">
                <span>{difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section>{children}</section>
    </article>
  );
}
