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
- Only clear mistakes are shown: a number repeated in its row, column or 3×3 box turns red (both squares). A legal but wrong number is not shown; when the board is full the game says whether it is right.
- Keyboard: digits, arrows, Delete, N for notes, Ctrl+Z.
- The game in progress and your progress (level, puzzles solved, highest level) are kept in `localStorage`.

## Xếp khối (block puzzle)

- Drag one of 3 pieces onto the 9×9 board (pieces don't rotate). A full row, column or 3×3 box clears.
- Points: 1 per square placed, plus 10 × (1 + 2 + … + n) for n rows/columns/boxes cleared at once, times the combo (moves in a row that clear).
- When all 3 are placed, 3 new ones come (always at least one that fits, when possible). The game ends when no piece left fits; pieces that fit nowhere are dimmed.
- On a phone the piece floats above your finger, with a preview of where it lands and which lines it clears. Undo one move.
- **Gợi ý** (hint, key H): rings the piece to place and pulses its spot. It plans all the pieces left together (every order and position, beam search, plus an exhaustive check so it never misses a way to place them all), scoring points made and the board left (open space, no lone holes, room for big shapes). Following it, test games survived 360 pieces (~3,200 points) where random play lasted ~20.

## Tank 1990 (Battle City)

- Drive the yellow tank, guard the base (the star at the bottom) and destroy the 20 enemy tanks of each stage. The game ends when the base is hit or the 3 lives are gone.
- Your tank always fires at full power: fast shots, 2 at a time, each one smashing a whole tile (2 squares deep), steel included. Enemy shots only break brick. Water stops tanks but not shots, trees hide tanks. Stages 1–4 are drawn by hand; later stages are built from the stage number, so each always looks the same.
- Enemies: basic (100), fast (200), fast-shooting (300) and armoured (400, 4 hits). Later stages bring more of the tough ones and they shoot more often.
- The 4th, 11th and 18th enemy flash red: hit one and a bonus appears — helmet (shield), shovel (steel around the base), clock (enemies freeze), grenade (all enemies explode), tank (extra life).
- **Thành đá** (emergency, once per stage): the brick ring round the base turns to stone for 20 seconds; nothing breaks it, not even your own shots.
- Phone: direction pad, **Thành đá** and **Bắn** (fire) buttons under the field; tap the field to pause. Computer: arrows or WASD, Space to fire, B for Thành đá, P to pause.
- The game is kept at the start of the stage reached, plus the best score and the sound setting (`localStorage`).

Each game is one file in its folder (`lines98/`, `sudoku/`, `blocks/`, `tank/`) plus the shared ☰ game menu, [`menu.js`](menu.js), which also registers the offline service worker: plain HTML, CSS and JavaScript, no libraries. A new game needs an entry in `menu.js` (GAMES) and in `sw.js` (FILES).

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## License

MIT
