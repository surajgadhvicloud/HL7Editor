# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Build production bundle to /dist
npm run preview    # Preview production build locally
```

No test or lint tooling is currently configured.

## Architecture

This is a **frontend-only React SPA** for parsing, inspecting, editing, and regenerating HL7 v2.x medical messages. No backend, no database, no authentication.

### Data Flow

```
Raw HL7 text (Textarea)
  → parseHl7Message()         [utils/hl7Parser.js]
  → parsedSegments[]          [state in Hl7EditorPage.jsx]
  → SegmentListPanel           (pick a segment)
  → SegmentInspectorPanel / FieldRow  (edit field values)
  → updateSegmentField()      [utils/hl7Parser.js]
  → serializeHl7Message()     [utils/hl7Serializer.js]  (memoized)
  → Regenerated HL7 output (readonly Textarea)
```

### State Management

All state lives in [src/pages/Hl7EditorPage.jsx](src/pages/Hl7EditorPage.jsx) via React hooks — no Redux or Context. Key state:

- `hl7Text` — raw input string
- `parsedSegments` — array of `{ code, fieldSeparator, fields[], rawLine }` objects
- `selectedSegmentIndex` — which segment is shown in the inspector
- `regeneratedHl7` — memoized (`useMemo`) serialized output

### Key Modules

| File | Purpose |
|------|---------|
| [src/utils/hl7Parser.js](src/utils/hl7Parser.js) | `parseHl7Message()`, `getRenderableFields()`, `updateSegmentField()` |
| [src/utils/hl7Serializer.js](src/utils/hl7Serializer.js) | `serializeHl7Message()`, `getMessageFieldSeparator()` |
| [src/utils/hl7Metadata.js](src/utils/hl7Metadata.js) | Segment descriptions and per-field metadata/tooltips |
| [src/utils/sampleHl7.js](src/utils/sampleHl7.js) | Pre-built sample message (MSH, PID, OBR, 2× OBX) |

### HL7 Parsing Rules

- Lines are split on `\r\n`, `\n`, or `\r`; segments split on `|`
- **Empty fields are preserved as empty strings** to maintain field position indices — this is intentional and critical for correct serialization
- **MSH is special**: field separator (position 1) and encoding characters (position 2) are extracted separately from the normal fields array
- Serialization rejoins fields with `|` and segments with `\r`

### Layout

3-column responsive grid (CSS Grid in [src/styles.css](src/styles.css)):
- **Left**: `Hl7InputPanel` — raw text input + Parse / Load Sample / Clear actions
- **Middle**: `SegmentListPanel` — clickable list of parsed segments with count badge
- **Right**: `SegmentInspectorPanel` + `FieldRow` — field-level editing table with metadata tooltips

Collapses to single column below 1200 px. Monospace fonts (Cascadia Code, Fira Code, Consolas) used for all HL7 data.
