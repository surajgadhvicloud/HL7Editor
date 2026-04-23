import { useMemo, useState } from 'react'
import Hl7InputPanel from '../components/Hl7InputPanel'
import SegmentListPanel from '../components/SegmentListPanel'
import SegmentInspectorPanel from '../components/SegmentInspectorPanel'
import RegeneratedOutputPanel from '../components/RegeneratedOutputPanel'
import { parseHl7Message, updateSegmentField } from '../utils/hl7Parser'
import { serializeHl7Message } from '../utils/hl7Serializer'

function Hl7EditorPage() {
  const [hl7Text, setHl7Text] = useState('')
  const [parsedSegments, setParsedSegments] = useState([])
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(null)
  const [copyState, setCopyState] = useState('')

  const regeneratedHl7 = useMemo(
    () => serializeHl7Message(parsedSegments),
    [parsedSegments],
  )

  function handleParse() {
    const segments = parseHl7Message(hl7Text)
    setParsedSegments(segments)
    setSelectedSegmentIndex(segments.length > 0 ? 0 : null)
  }

  function handleLoadSample(text) {
    setHl7Text(text)
    const segments = parseHl7Message(text)
    setParsedSegments(segments)
    setSelectedSegmentIndex(segments.length > 0 ? 0 : null)
    setCopyState('')
  }

  function handleClear() {
    setHl7Text('')
    setParsedSegments([])
    setSelectedSegmentIndex(null)
    setCopyState('')
  }

  function handleFieldChange(segmentIndex, fieldPosition, newValue) {
    setParsedSegments((currentSegments) =>
      updateSegmentField(currentSegments, segmentIndex, fieldPosition, newValue),
    )
  }

  function handleAddSegment(segmentCode) {
    const separator =
      parsedSegments.find((s) => s.code === 'MSH')?.fieldSeparator ?? '|'

    const fieldCount = segmentCode === 'OBX' ? 11 : 7
    const newSegment = {
      code: segmentCode,
      fieldSeparator: separator,
      fields: Array(fieldCount).fill(''),
      rawLine: `${segmentCode}${separator}`,
    }

    // OBR/OBX must always come after PID, PV1, ORC — find the last such anchor
    const anchorCodes = new Set(['PID', 'PV1', 'ORC', 'OBR', 'OBX'])
    let insertAt = parsedSegments.length
    for (let i = parsedSegments.length - 1; i >= 0; i--) {
      if (anchorCodes.has(parsedSegments[i].code)) {
        insertAt = i + 1
        break
      }
    }

    const nextSegments = [
      ...parsedSegments.slice(0, insertAt),
      newSegment,
      ...parsedSegments.slice(insertAt),
    ]

    setParsedSegments(nextSegments)
    setSelectedSegmentIndex(insertAt)
  }

  function handleAddField(segmentIndex) {
    setParsedSegments((prev) =>
      prev.map((seg, i) =>
        i === segmentIndex ? { ...seg, fields: [...seg.fields, ''] } : seg,
      ),
    )
  }

  function handleRemoveSegment(segmentIndex) {
    const nextSegments = parsedSegments.filter((_, i) => i !== segmentIndex)
    setParsedSegments(nextSegments)

    if (selectedSegmentIndex === segmentIndex) {
      setSelectedSegmentIndex(nextSegments.length > 0 ? Math.max(0, segmentIndex - 1) : null)
    } else if (selectedSegmentIndex !== null && selectedSegmentIndex > segmentIndex) {
      setSelectedSegmentIndex(selectedSegmentIndex - 1)
    }
  }

  function handleSave() {
    if (!regeneratedHl7) return
    const blob = new Blob([regeneratedHl7], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'message.hl7'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleCopy() {
    if (!regeneratedHl7) {
      return
    }

    try {
      await navigator.clipboard.writeText(regeneratedHl7)
      setCopyState('Copied to clipboard.')
    } catch {
      setCopyState('Copy failed. Your browser blocked clipboard access.')
    }
  }

  const selectedSegment =
    selectedSegmentIndex === null ? null : parsedSegments[selectedSegmentIndex]

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>HL7 Editor and Inspector</h1>
        <p>Parse, inspect, edit, and regenerate HL7 messages with field position accuracy.</p>
      </header>

      <section className="layout-grid">
        <div className="layout-column input-column">
          <Hl7InputPanel
            hl7Text={hl7Text}
            onHl7TextChange={setHl7Text}
            onParse={handleParse}
            onLoadSample={handleLoadSample}
            onClear={handleClear}
          />
          <RegeneratedOutputPanel
            regeneratedHl7={regeneratedHl7}
            onCopy={handleCopy}
            onSave={handleSave}
            copyState={copyState}
          />
        </div>

        <div className="layout-column">
          <SegmentListPanel
            segments={parsedSegments}
            selectedSegmentIndex={selectedSegmentIndex}
            onSelectSegment={setSelectedSegmentIndex}
            onAddSegment={handleAddSegment}
            onRemoveSegment={handleRemoveSegment}
          />
        </div>

        <div className="layout-column">
          <SegmentInspectorPanel
            segment={selectedSegment}
            selectedSegmentIndex={selectedSegmentIndex}
            onFieldChange={handleFieldChange}
            onAddField={handleAddField}
          />
        </div>
      </section>
    </main>
  )
}

export default Hl7EditorPage
