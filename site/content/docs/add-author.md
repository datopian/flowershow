---
title: Add Author
---

In your blog posts, it is required to specify the author/s of the post in the frontmatter:

```
---
authors: [Philippe du Preez, Aleksandra Rubaj]
---
```

You can add new author documents with the author's details in `content/authors/authorfullname`:

```
---
name: Philippe du Preez
avatar: /assets/images/phil.jpg
type: Author
---
```

The name of the author will be looked up. If the document exist with the same name, the author's avatar will also be displayed in posts written by them.
