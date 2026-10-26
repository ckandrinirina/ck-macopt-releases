# ck-macopt releases

Downloads for [ck-macopt](https://github.com/ckandrinirina/ck-macopt), a menu bar utility that keeps an Intel MacBook Pro fast: fan control before the CPU throttles, background hog alerts, and what is using your disk.

Get the latest build from the [Releases](../../releases/latest) page: `ck-macopt-macOS.zip`. Installed copies update themselves from `latest.json` on this repo's GitHub Pages site.

The app is signed with a self-signed certificate, not notarized: the first open is right-click, Open (see `INSTALL.txt` in the zip).

## How a release is built

The source stays in a private repo. `Release` (`.github/workflows/release.yml`) is started by `scripts/release/release.sh X.Y.Z` over there. It checks the source out at the tag, runs the tests, builds a universal app, signs it, opens it once, zips it, publishes the release and then `latest.json`.

This repo holds only that workflow and this file; both are copied here by `scripts/release/sync_public.py`. Do not edit them here.

Secrets (set once by `scripts/release/setup_public.sh`): `SOURCE_DEPLOY_KEY` (a read-only deploy key of the private repo), `SIGNING_P12`, `SIGNING_P12_PASSWORD`.
