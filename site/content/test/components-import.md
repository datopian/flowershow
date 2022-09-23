---
title: Testing component import
---

### What works:

Example:

```md
import { MyComponent } from "../components/custom/MyComponent.jsx"

<MyComponent list={[1, 2, 3]}/>
```

Renders as:

import { MyComponent } from "../components/custom/MyComponent.jsx"

<MyComponent list={[1, 2, 3]}/>

### What doesn't work:

Example with a Button component, which includes a Next's `Link`:

```md
import { Button } from "../components/custom/Button.jsx"

<Button>Button component</Button>
```

Throws an error:

```
Unhandled Runtime Error
ReferenceError: process is not defined
```

{/** import { Button } from "../components/custom/Button.jsx" **/}

{/** <Button>Button component</Button> **/}

### Importing a custom component that uses a 3rd party package

{/** import { LibTest } from "../components/custom/LibTest.jsx" **/}

{/** <LibTest/> **/}

```md
import { LibTest } from "../components/custom/LibTest.jsx"

<LibTest/>
```

Throws an error:

```bash
 > ../components/LibTest.jsx:1:23: error: Could not resolve "date-fns" (mark it as external to exclude it from the bundle)
    1 │ import { format } from 'date-fns'
      ╵                        ~~~~~~~~~~

Error: Found 1 problems in 1 documents.

 └── Encountered unexpected errors while processing of 1 documents. This is possibly a bug in Contentlayer. Please open an issue.

     • "test/components-import.md": UnexpectedMDXError: Error: Build failed with 1 error:
     ../components/LibTest.jsx:1:23: error: Could not resolve "date-fns" (mark it as external to exclude it from the bundle)

```

### Importing and using external package directly in MDX

This works though:

```md
import { compareAsc, format } from 'date-fns'

export function LibTest() {
return <p>{format(new Date(2014, 1, 11), 'yyyy-MM-dd')}</p>
}
```

import { format } from 'date-fns'

export function LibTest() {
return <p>{format(new Date(2014, 1, 11), 'yyyy-MM-dd')}</p>
}

<LibTest/>
