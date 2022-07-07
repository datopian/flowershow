# Tailwind Support

Flowershow comes with built-in [tailwind](https://tailwindcss.com) support on any markdown page for styling your content.

That means you can do things like:

```hmtl

<div className="text-xl text-red-600">

# Hello World

</div
```

>[!Note] className rather than class
>
> You may have noticed we used `className` rather than `class` attribute in our html. That's because we are using [[docs/mdx|MDX]] (markdown extended) rather than pure markdown and so we follow react conventions and use `className` 

And it means you have access to the full ecosystem of tailwind features and components.