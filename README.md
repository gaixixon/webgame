# webgame

Small games that run in the browser: no install, no server, no tracking.

Play: **https://gaixixon.github.io/webgame/**

## Lines 98

The classic Color Lines / Lines 98 (Vietnamese interface).

- 9×9 board, 7 colours. Tap a ball, then an empty square: it moves there if there is a free path (up, down, left, right).
- 5 or more of one colour in a row (horizontal, vertical or diagonal) disappear. Points per line: 5 = 10, 6 = 12, 7 = 18, 8 = 28, 9 = 42.
- A move that clears nothing brings 3 new balls; they are shown in advance, at the top and as small dots where they will land. Clearing a line skips the new balls for that turn.
- The game ends when the board is full.
- Undo one move, sound on/off, light and dark themes, phone and desktop.

Everything is kept in the browser only (`localStorage`): the game in progress (resumes when you come back), one manual save slot, the top 10 scores on that device and the sound setting.

The whole game is one file, [`lines98/index.html`](lines98/index.html): plain HTML, CSS and JavaScript, no libraries.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## License

MIT
