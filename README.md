# Daylight Todo

A small, calm desktop task list built with Electron. Tasks are stored locally in the app, so they remain on this device and do not require an account.

## Try it in your browser

The interactive web demo is published at [kapustaltd.github.io/daylight-todo](https://kapustaltd.github.io/daylight-todo/). Tasks are saved in this browser's local storage.

## Download

Download the Linux AppImage or `.deb` from the [latest GitHub Release](https://github.com/kapustaltd/daylight-todo/releases/latest). The first release will appear after pushing a version tag such as `v1.0.0`.

Every push to `main` builds the Linux AppImage and `.deb`. Those files are available under **Actions → Build desktop app → Artifacts** for 30 days.

## Run from source

Requires Node.js 22 or newer.

```sh
npm ci
npm start
```

## Build locally

Build on the operating system you want to package:

```sh
npm run dist:linux # AppImage and .deb
```

The packaged files are written to `dist/`.

## CI and releases

GitHub Actions builds Linux on pushes to `main`/`master`, pull requests, and manual runs. A push to the default branch also deploys the web demo to GitHub Pages. To publish a release, push a tag beginning with `v`:

```sh
git tag v1.0.0
git push origin v1.0.0
```

The workflow attaches the Linux AppImage and `.deb` to the resulting GitHub Release.
