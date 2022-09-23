export function Section({ children, id }) {
  return (
    <div className="py-10 sm:px-2 lg:relative lg:px-0" id={id}>
      <div className="prose dark:prose-invert mx-auto max-w-6xl px-4 lg:max-w-6xl lg:px-8 xl:px-12">
        {children}
      </div>
    </div>
  );
}
