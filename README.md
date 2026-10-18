# Daylight Todo

A small, calm desktop task list built with Electron. Tasks are stored locally in the app, so they remain on this device and do not require an account.

## Try it in your browser

The interactive web demo is published at [kapustaltd.github.io/daylight-todo](https://kapustaltd.github.io/daylight-todo/). Tasks are saved in this browser's local storage.

## Download

Download the Linux AppImage or `.deb`, or the installers for Windows and macOS, from the [latest GitHub Release](https://github.com/kapustaltd/daylight-todo/releases/latest). The first release will appear after pushing a version tag such as `v1.0.0`.

Every push to `main` also builds all three platforms. Those files are available under **Actions → Build desktop app → Artifacts** for 30 days.

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
npm run dist:win   # NSIS installer and portable .exe
npm run dist:mac   # .dmg and .zip
```

The packaged files are written to `dist/`.

## CI and releases

GitHub Actions builds Linux, Windows, and macOS on pushes to `main`/`master`, pull requests, and manual runs. A push to the default branch also deploys the web demo to GitHub Pages. To publish a release, push a tag beginning with `v`:

```sh
git tag v1.0.0
git push origin v1.0.0
```

The workflow attaches all platform builds to the resulting GitHub Release. macOS builds are unsigned, so macOS may ask the user to allow the app in Security & Privacy settings on first launch.
