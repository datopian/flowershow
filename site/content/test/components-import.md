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

{/* import { Button } from "../components/custom/Button.jsx" */}

{/* <Button>Button component</Button> */}


### Importing a custom component from `site/components`

`/templates/default/components/custom` is symlinked to `/site/components` where custom (user-defined) components should go for now for the sake of flowershow template upgradeability

```md
import { Test } from "../components/custom/Test.jsx"
```

import { Test } from "../components/custom/Test.jsx"

<Test>
adsf
</Test>
