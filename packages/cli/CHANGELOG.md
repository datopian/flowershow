# flowershow

## 0.1.8

### Patch Changes

- Adjust the CLI Installer after migrating Flowershow template to datopian/flowershow-template.

## 0.1.7

### Patch Changes

- Rename [...slug].tsx to [[...slug]].tsx at installation, so that user can still define their own home pages using MD files.

## 0.1.6

### Patch Changes

- f136048: Remove `pages/index.tsx` file from the copied Flowershow template, to allow users to set their own home page with MD file.

## 0.1.5

### Patch Changes

- Replace config.js with config.mjs

## 0.1.4

### Patch Changes

- Fix: incorrect `config.js` file created by the CLI

## 0.1.3

### Patch Changes

- Remove unneeded dev files from cloned template.

## 0.1.0

### Minor Changes

- 93b7911: Switch from JS to TS.

## 0.0.11

### Patch Changes

- Basic anonymous telemetry (OS, Flowershow version and command being run).

## 0.0.10

### Patch Changes

- Rename `flowershow build-static` to `flowershow export`.

## 0.0.9

### Patch Changes

- CLI support for Windows. Symlink files removed from the template.
- Add information about missing index.md and/or config.js files that the CLI will automatically create for the user.

## 0.0.8

### Patch Changes

- Disallow installing the template inside the content folder.
