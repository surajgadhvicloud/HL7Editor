# HL7 Editor and Inspector (MVP)

Frontend-only React app to parse, inspect, edit, and regenerate HL7 messages.

## Tech Stack

- React (JavaScript)
- Vite
- Plain CSS

## Features

- Paste HL7 message and parse by clicking **Parse**.
- Load a realistic sample with MSH, PID, OBR, and multiple OBX segments.
- View parsed segments in original order.
- Select any segment (MSH, PID, OBR, OBX, etc.).
- Inspect fields with position labels and metadata tooltips.
- Edit field values inline.
- Regenerate HL7 output and copy to clipboard.

## Run

```bash
npm install
npm run dev
```

Build production bundle:

```bash
npm run build
```

## How Field Positions Are Preserved

The parser uses simple string splitting and keeps empty tokens:

1. Segment split: uses `/\r\n|\n|\r/`.
2. Field split: each segment line is split by `|`.
3. Empty field tokens are never filtered out.
4. Field indices are position-based (`SEG-1`, `SEG-2`, ...), even when values are blank.
5. Serialization rejoins fields with the field separator and segments with `\r`.

Because empty fields are retained as empty strings, placeholders remain in output, so separators (for example `||`) keep their original positional meaning.

## Notes

- Native `title` tooltips are used for field help text.
- MSH is rendered with HL7-aware labeling including `MSH-1 (Field Separator)` and `MSH-2 (Encoding Characters)`.
- This MVP intentionally avoids backend, authentication, and database concerns.
