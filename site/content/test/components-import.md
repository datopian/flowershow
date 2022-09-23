---
title: Testing component import
---

### Importing a Button component, which uses Next's `Link`:

```md
import { Button } from "components/custom/Button.jsx"

<Button>Button component</Button>
```

Throws an error:

```
Unhandled Runtime Error
ReferenceError: process is not defined
```

{/** import { Button } from "components/custom/Button.jsx" **/}

{/** <Button>Button component</Button> **/}

