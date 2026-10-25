# SuperSamba Scorekeeper

Offline scorekeeper for a family's SuperSamba card game, used on an iPad as a home-screen web app via GitHub Pages (https://0x54c3.github.io/SuperSamba_Scorekeeper/).

## Files

- `index.html`: the entire app (HTML, CSS and JS in one file, no build step, no external requests).
- `sw.js`: service worker that caches the app for offline use. Network-first, falls back to cache. **Bump `CACHE` (e.g. `supersamba-v21` → `v22`) whenever any file changes.**
- `manifest.webmanifest`, `icon-180/192/512.png`: home-screen name and icons.

The service worker only registers when `window.SAMBA_PWA` is true (set in a `<script>` in `<head>`) and the page is served over http(s).

## Data

- Saved in `localStorage` key `samba-scorekeeper-v1` as `{games:[...], currentId, defaults, howto}`. Keep this key so existing devices keep their games.
- A game: `{id, created, players:[[name,name]|[name]...], teamNames, names (derived), rules, rounds:[{teams:[T,...]}], sample?}`.
- A side `T`: `{canastas:[{type,...,at}], red3, red3At[], draw30, draw30At[], out, outAt, table, hand, tableAt}`. `at` fields are timestamps for the Summary timeline.
- Canasta types: `samba {range:'4-A'|'8-A'|..., suit:'S'|'H'|'D'|'C'}`, `wild {jokers}`, `sevens`, `red {rank}`, `black {rank, twos, jokers}`.
- `migrate(g)` fills in fields that older saved games lack. Extend it whenever the data shape changes, or older games will break (this has happened before with `teamNames`).

## Scoring (house rules, all editable on the Rules tab)

- Card values: 3–7 = 5, 8–K = 10, A = 20, 2 = 20, joker = 50.
- Canasta = card points + bonus. Super Samba (4–A) 3000, Samba 2000, wild 2000, first 7s 2000, each extra 7s 500, red (natural) 500, black (mixed) 300.
- Wild canasta = (7 − jokers) × 20 + jokers × 50. Black canasta = 2s × 20 + jokers × 50 + naturals × rank value; at most 3 wilds (naturals must outnumber wilds).
- Red 3s 100 each. Drew exactly 30: 100 per player. Going out 2000. Points on table minus cards left in hand (including an unpicked Foot).
- Needed to go out: 1 Super Samba, 1 Samba, 1 wild, 1 7s, 3 red, 1 black.
- First meld 60 in round 1, +30 each round. 3 rounds. Draw 3 cards per turn. Black 3s when going out: exactly 3 (option: 3 or more).

## Modes

2 teams of 2, 3 players, or 2 players (solo). Side colors: blue, red, purple (`--team-a/b/c`).

## Checks after changes

The built-in example game (Rosa & Miguel vs June & Walt, from a real game) must total:
- Round 1: 20,975 / 21,220
- Round 2: 14,990 / 12,550
- Round 3: 21,775 / 14,895
- Game: **57,740 / 48,665**

Also check: no horizontal scroll at 390px wide, light and dark themes, and that a game saved by an older version still opens on every tab.

## How to play tab

Editable sections live in the `HOWTO` array in `index.html`. `{tokens}` like `{red3}` and `{meldList}` are filled from the current rules. User edits made on a device are stored in `store.howto` and override the defaults on that device only.
