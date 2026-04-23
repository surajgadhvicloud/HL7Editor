import { useMemo, useState } from 'react'
import Hl7InputPanel from '../components/Hl7InputPanel'
import SegmentListPanel from '../components/SegmentListPanel'
import SegmentInspectorPanel from '../components/SegmentInspectorPanel'
import RegeneratedOutputPanel from '../components/RegeneratedOutputPanel'
import { parseHl7Message, updateSegmentField } from '../utils/hl7Parser'
import { serializeHl7Message } from '../utils/hl7Serializer'
import { sampleHl7Message } from '../utils/sampleHl7'

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

  function handleLoadSample() {
    setHl7Text(sampleHl7Message)
    const segments = parseHl7Message(sampleHl7Message)
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
            copyState={copyState}
          />
        </div>

        <div className="layout-column">
          <SegmentListPanel
            segments={parsedSegments}
            selectedSegmentIndex={selectedSegmentIndex}
            onSelectSegment={setSelectedSegmentIndex}
          />
        </div>

        <div className="layout-column">
          <SegmentInspectorPanel
            segment={selectedSegment}
            selectedSegmentIndex={selectedSegmentIndex}
            onFieldChange={handleFieldChange}
          />
        </div>
      </section>
    </main>
  )
}

export default Hl7EditorPage
