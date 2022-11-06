# Nx

This monorepo is set up with Nx build system. See their [official documentation](https://nx.dev/getting-started) to learn more.

## Running tasks

Each project withing this repository has it's own `project.json` file, which defines all targets that can be run on this project.

### Single tasks

To run a single target on a given project run:

```sh
npx nx <target> <project>
# e.g. npx nx e2e cli
```

### Multiple tasks

To run a given target on all projects that define it, run:

```sh
npx nx run-many --target=<target>
# e.g. npx nx run-many --target=e2e
```

### Run tasks affected by your changes

```sh
npx nx affected --target=<target>
# e.g. npx nx affected --target=e2e
```

### Linting and formatting

Each project should have a `lint` target defined, so to lint the code in it you can run:

```sh
npx nx lint <project>
# npx nx lint cli
```

You can also lint the whole workspace (repository) by running:

```sh
npx nx workspace-lint
```

To check code formatting in the workspace:

```sh
npx nx format:check
```

To check and fix formatting in the workspace:

```sh
npx nx format
```
