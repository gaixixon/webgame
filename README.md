# webgame

Small games that run in the browser: no install, no server, no tracking. They work **offline** too.

Play: **https://gaixixon.github.io/webgame/**

## Offline / on a plane

Open the site once while online: a service worker ([`sw.js`](sw.js)) stores every game on the device. After that the games open and play in airplane mode. On iPhone, Safari → Share → **Add to Home Screen** makes it a full-screen app ("Games") with its own icon. Pages are served from the stored copy and refreshed in the background, so an update shows on the next visit.

## Lines 98

The classic Color Lines / Lines 98 (Vietnamese interface).

- 9×9 board, 7 colours. Tap a ball, then an empty square: it moves there if there is a free path (up, down, left, right).
- 5 or more of one colour in a row (horizontal, vertical or diagonal) disappear. Points per line: 5 = 10, 6 = 12, 7 = 18, 8 = 28, 9 = 42.
- A move that clears nothing brings 3 new balls; they are shown in advance, at the top and as small dots where they will land. Clearing a line skips the new balls for that turn.
- The game ends when the board is full.
- Undo one move, sound on/off, light and dark themes, phone and desktop.

Everything is kept in the browser only (`localStorage`): the game in progress (resumes when you come back), one manual save slot, the top 10 scores on that device and the sound setting.

## Sudoku

- Fill 1–9 so that every row, column and 3×3 box holds each digit once. Every puzzle is generated in the browser and has exactly one solution.
- No difficulty to pick: you start at level 1 (42 numbers given) and each solved puzzle moves you up a level with one number fewer, down to 24 (level 19 on).
- Pencil notes (placing a number clears it from the notes around it), highlights of the row, column, box and same numbers, undo, erase, hint, restart, a different puzzle at the same level.
- No checking while you play: when the board is full the game says whether it is right, not where it is wrong.
- Keyboard: digits, arrows, Delete, N for notes, Ctrl+Z.
- The game in progress and your progress (level, puzzles solved, highest level) are kept in `localStorage`.

## Xếp khối (block puzzle)

- Drag one of 3 pieces onto the 9×9 board (pieces don't rotate). A full row, column or 3×3 box clears.
- Points: 1 per square placed, plus 10 × (1 + 2 + … + n) for n rows/columns/boxes cleared at once, times the combo (moves in a row that clear).
- When all 3 are placed, 3 new ones come (always at least one that fits, when possible). The game ends when no piece left fits; pieces that fit nowhere are dimmed.
- On a phone the piece floats above your finger, with a preview of where it lands and which lines it clears. Undo one move.

## 2048

- Swipe (or arrow keys / WASD) to slide all tiles; two equal tiles that meet merge into their sum. A 2 (sometimes a 4) appears after each move.
- Reach 2048 to win, then keep playing for a higher score. Undo one move, best score kept.

Each game is one file in its folder (`lines98/`, `sudoku/`, `blocks/`, `2048/`) plus the shared ☰ game menu, [`menu.js`](menu.js), which also registers the offline service worker: plain HTML, CSS and JavaScript, no libraries. A new game needs an entry in `menu.js` (GAMES) and in `sw.js` (FILES).

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## License

MIT
