# Nx

This monorepo is set up with Nx build system. See their [official documentation](https://nx.dev/getting-started) to learn more.

## Tasks

Each project withing this repository has a `project.json` file, which defines all targets that can be run on this project.

A target is an action that can be taken on a project.
A task is a single target run on a given project.

### Running single tasks

To run a single target on a given project run:

```sh
npx nx <target> <project>
# e.g. npx nx e2e cli
```

### Running multiple tasks

To run a given target on all projects that define it, run:

```sh
npx nx run-many --target=<target>
# e.g. npx nx run-many --target=e2e
```

### Running tasks affected by your changes

```sh
npx nx affected --target=<target>
# e.g. npx nx affected --target=e2e
```

## Linting and formatting

Nx uses eslint for code linting and prettier for code formatting. There is a base `eslintrc.json` file in the root of this repository that defines global eslint configs. Each project can have its own `eslintrc.json` for project-specific eslint confiurations.

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

## Creating a library

To create a new publishable js library:

```sh
nx g @nrwl/node:lib --js --publishable --importPath @flowershow/<library-name>
```

## Dependency graph

To see the graph of dependencies between the projects within this repository, run:

```sh
npx nx graph
```

## Caching

Nx by default uses local computation cache to store results of the tasks it has run.

This repository is also configured with Nx Cloud, which means you can read from the results cached in it.

You need to have an access token to be able to also write to this cache. It can be set in `nx-cloud.env` (see `nx-cloud.env.example` for reference).

## Configuration

The entry point of Nx's confiuration is the `nx.json` file in the root of this repository. It defines global configurations as well default configurations for projects targets.

To learn more see this [offical docs page](https://nx.dev/reference/nx-json).

Each project also has it's own configuration file - `project.json`, where you can define and configure it's targets (and more).

To learn more see this [offical docs page](https://nx.dev/reference/project-configuration).
