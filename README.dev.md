# Developer docs

## Package manager

To ensure correct dependencies installation across the projects (and for other benefits like much faster installs), please use `pnpm` package manager.

You can install it using npm:

```
npm i -g pnpm
```

Then you can run `pnpm install` (or `pnpm i`) anywhere in this repository to install all the dependencies for all the projects within the workspace.

To install offline from the local pnpm store:

```
pnpm i --offline
```

To install a dependency of the workspace:

```
pnpm add <pkg>
```

To install a dev dependency of the workspace:

```
pnpm add -D <pkg>
```

You to restrict commands to specific subsets of packages by using `--filter` (or `-F`) flag:

```
pnpm --filter cli install
```

See [the offical pnpm docs](https://pnpm.io/) to learn more.

## Nx

This monorepo is set up with Nx build system. See their [official documentation](https://nx.dev/getting-started) to learn more.

### Tasks

Each project withing this repository has a `project.json` file, which defines all targets that can be run on this project.

A target is an action that can be taken on a project.
A task is a single target run on a given project.

#### Running single tasks

To run a single target on a given project run:

```sh
npx nx <target> <project>
# e.g. npx nx e2e cli
```

#### Running multiple tasks

To run a given target on all projects that define it, run:

```sh
npx nx run-many --target=<target>
# e.g. npx nx run-many --target=e2e
```

#### Running tasks affected by your changes

When you run `nx affected --target=<some-target>`, Nx looks at the files you changed (compares current HEAD vs base), and it uses this to figure the list of projects in the workspace that can be affected by this change. It then runs the run-many command with that list.

```sh
npx nx affected --target=<target>
# e.g. npx nx affected --target=e2e

# or
# npx nx affected:<target>
# e.g. npx nx affected:e2e
```

> To learn more about how Affected works, read [this Nx docs page](https://nx.dev/concepts/affected#how-affected-works).

### Linting and formatting

Nx uses eslint for code linting and prettier for code formatting. There is a base `eslintrc.json` file in the root of this repository that defines global eslint configs. Each project can have its own `eslintrc.json` for project-specific eslint confiurations.

To lint the code in a single project:

```sh
npx nx lint <project>
# npx nx lint cli
```

To lint all projects:

```
npx nx run-many --target=lint
```

To check code formatting in selected projects:

```sh
npx nx format:check --projects=<array projects>
# npx nx format:check --projects=cli,template
```

To check code formatting in all projects:

```sh
npx nx format:check --all
# or
# npx nx format
```

To fix code formatting in selected projects:

```sh
npx nx format:write --projects=<array projects>
# npx nx format:write --projects=cli,template
```

To fix formatting in all projects:

```sh
npx nx format --all
# or
# npx nx format:write --all
```

> To learn more about all the available options for the format command, see [format:check](https://nx.dev/nx/format-check) and [format:write](https://nx.dev/nx/format-write) docs pages.

### Creating a library

To create a new publishable js library:

```sh
nx g @nrwl/node:lib --js --publishable --importPath @flowershow/<library-name>
```

### Dependency graph

To see the graph of dependencies between the projects within this repository, run:

```sh
npx nx graph
```

### Caching

Nx by default uses local computation cache to store results of the tasks it has run.

This repository is also configured with Nx Cloud, which means you can read from the results cached in it.

You need to have an access token to be able to also write to this cache. It can be set in `nx-cloud.env` (see `nx-cloud.env.example` for reference).

### Configuration

The entry point of Nx's confiuration is the `nx.json` file in the root of this repository. It defines global configurations as well default configurations for projects targets.

To learn more see this [offical docs page](https://nx.dev/reference/nx-json).

Each project also has it's own configuration file - `project.json`, where you can define and configure it's targets (and more).

To learn more see this [offical docs page](https://nx.dev/reference/project-configuration).

## Changesets

> This monorepo is set up with changesets versioning tool. See their [github repository](https://github.com/changesets/changesets) to learn more.

### What are Changesets?

Changesets are files that describe the intention of a contributor to change a version of the package according to their changes, and provide a description of those changes, which will be added to the package changelog in the time of release creation.

### Workflow

1. Contributors add changesets along with the changes they make.

- not every change requires a changelog, e.g. some minor changes to docs or (atm) any changes to `/site`

2. After reviewing the changesets and at an agreed time the version command is run.

3. The publish command is run afterwards.

### Adding changesets

In the root directory of the repo, run:

```
npx changeset
```

The description of the changes related to the changelog you're adding should be written with end users and other developers in mind. Please make sure to add the most accurate but also concise information.

To learn about semantic versioning standards see [this semver doc page](https://semver.org/).

### Versioning and publishing

> This should only be done after all the files in the `.changeset` folder are reviewed by a designated person and at a pre-agreed time.

```
npx changeset version
```

This command will consume all the files in the `.changeset` folder, update packages to the most appropriate semver version based on them and will write changelog entires in respective `CHANGELOG.md` files.

After doing that both all the version bumps and changelog entries of the changed packages should be reviewed. If needed, changelog entires should be manually adjusted to provide the most accurate description of the changes included in the new release. If everything is correct, packages can be published by running:

```
npx changeset publish
```

This command will run npm publish in each package which version is different from the currently published one.
