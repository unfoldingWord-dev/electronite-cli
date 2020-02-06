# Electronite CLI

This is a drop-in replacement for [electron](https://www.npmjs.com/package/electron)
that provides an enhanced font rendering system.

## Why?
[Electronite](https://github.com/unfoldingWord-dev/electronite) is a fork of electron that has been compiled with [Graphite](https://graphite.sil.org/).

> Graphite is a "smart font" system developed specifically to handle the complexities of lesser-known languages of the world.

## Development

When a new version of this package is released, the corresponding version of `electron.d.ts`
needs to be copied from https://github.com/electron/electron/releases.
E.g. for version `6.0.7` of this package we downloaded `electron.d.ts` from https://github.com/electron/electron/releases/tag/v6.0.7.

