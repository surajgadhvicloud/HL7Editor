# HL7 Editor and Inspector

A browser-based tool for parsing, inspecting, editing, and regenerating HL7 v2.x messages. No backend, no installation beyond Node — just paste or load a message and work with it field by field.

## Features

- **Parse** any HL7 v2.x message pasted into the input box or opened from a `.hl7` file
- **Sample messages** — pick from a dropdown of pre-built lab and radiology messages; drop a new `.hl7` file into `src/HL7/` and it appears automatically
- **Segment list** — clickable list of all parsed segments with a live field preview
- **Field inspector** — table view of every field in the selected segment with position labels and metadata tooltips
- **Inline editing** — edit any field value; the regenerated HL7 output updates instantly
- **Add segments** — append OBR or OBX segments (always positioned after PID / PV1 / ORC)
- **Remove segments** — delete any OBR or OBX segment via the × button in the segment list
- **Copy / Save** — copy the regenerated message to clipboard or download it as a `.hl7` file

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production bundle → /dist
npm run preview    # preview the production build locally
```

## Adding Sample Messages

Place any `.hl7` file in `src/HL7/`. It will appear in the **Load Sample** dropdown automatically after the next dev server save or build — no code changes needed.

## Project Structure

```
src/
├── HL7/                           # Sample .hl7 files
├── components/
│   ├── Hl7InputPanel.jsx          # Raw text input, file open, sample dropdown
│   ├── SegmentListPanel.jsx       # Segment list with add/remove controls
│   ├── SegmentInspectorPanel.jsx  # Field-level editing table
│   ├── FieldRow.jsx               # Single field row (label, input, info)
│   └── RegeneratedOutputPanel.jsx # Read-only output with copy/save
├── pages/
│   └── Hl7EditorPage.jsx          # All state and handlers
├── utils/
│   ├── hl7Parser.js               # parse, inspect, update field
│   ├── hl7Serializer.js           # serialize segments back to HL7 text
│   ├── hl7Metadata.js             # segment/field descriptions and tooltips
│   └── samples.js                 # auto-discovers src/HL7/*.hl7 via import.meta.glob
└── styles.css
```

## How Field Positions Are Preserved

The parser splits lines by `|` and retains empty tokens as empty strings — so field positions are never lost. Serialization simply rejoins with `|` and segments with `\r`, preserving `||` placeholders exactly as they appeared in the original message.

MSH is handled specially: `MSH-1` (field separator) and `MSH-2` (encoding characters) are extracted and stored separately, then reconstructed correctly on serialization.

## Tech Stack

- React 18
- Vite 8
- Plain CSS (no UI library)
