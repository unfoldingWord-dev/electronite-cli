# Electronite CLI

This is a drop-in replacement for [electron](https://www.npmjs.com/package/electron)
that provides an enhanced font rendering system.

## Why?
[Electronite](https://github.com/unfoldingWord-dev/electronite) is a fork of electron that has been compiled with [Graphite](https://graphite.sil.org/).

> Graphite is a "smart font" system developed specifically to handle the complexities of lesser-known languages of the world.

## Installation

```
npm i electronite
```

## Usage

In your package.json
```josn
{
    "scripts": {
        "start": "electronite ."
    }
}
```

In your javascript
```js
const {...} = require("electronite");
```

### A Note About Importing
It's important to note that when you use `require("electron")`,
you aren't importing code from your dependencies but from the electron runtime.
So, even when you have only installed electronite you can still use `require("electron")`.
However, since electron isn't installed you won't have the typings, so your IDE's auto-complete won't work.

Using `require("electronite")` provides the proper typings so auto-complete will work.
It also makes more sense from a developer perspective.
However, in order for the application to work,
electronite automatically returns the real electron package when available from the runtime.

All of this is to say that `electronite` **must** be installed as a dependency, not a dev-dependency.
The downside is that now there's potentially a large binary in your production code (depending on your build process).
If you are using webpack to build your application before compiling the electronite application,
this won't be a problem because webpack should automatically exclude the binary.

## Development

When a new version of this package is released, the corresponding version of `electron.d.ts`
needs to be copied from https://github.com/electron/electron/releases.
E.g. for version `6.0.7` of this package we downloaded `electron.d.ts` from https://github.com/electron/electron/releases/tag/v6.0.7.

Then you must edit `electron.d.ts` to declare the `electronite` module.

```typescript
// line 17536
declare module 'electronite' {
    export = Electron.CrossProcessExports;
}

declare module 'electronite/main' {
    export = Electron.Main
}

declare module 'electronite/common' {
    export = Electron.Common
}

declare module 'electronite/renderer' {
    export = Electron.Renderer
}

interface NodeRequireFunction {
    (moduleName: 'electronite'): typeof Electron.CrossProcessExports;
    (moduleName: 'electronite/main'): typeof Electron.Main;
    (moduleName: 'electronite/common'): typeof Electron.Common;
    (moduleName: 'electronite/renderer'): typeof Electron.Renderer;
}

interface NodeRequire {
    (moduleName: 'electronite'): typeof Electron.CrossProcessExports;
    (moduleName: 'electronite/main'): typeof Electron.Main;
    (moduleName: 'electronite/common'): typeof Electron.Common;
    (moduleName: 'electronite/renderer'): typeof Electron.Renderer;
}
```
Then you need to update the version of this package in `package.json` to match the version of electronite that you are supporting.
It is important that the version matches exactly.
An easy way to make sure you are setting the correct version is to look inside `electron.d.ts` and make sure the version indicated at the top of that file
is the same as the one in `package.json`.
