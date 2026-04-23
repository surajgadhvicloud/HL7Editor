import { useRef } from 'react'
import { samples } from '../utils/samples'

function Hl7InputPanel({ hl7Text, onHl7TextChange, onParse, onLoadSample, onClear }) {
  const fileInputRef = useRef(null)

  function handleFileChange(event) {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => onHl7TextChange(e.target.result)
    reader.readAsText(file)
    event.target.value = ''
  }

  function handleSampleSelect(e) {
    const idx = e.target.value
    if (idx !== '') onLoadSample(samples[idx].content)
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>HL7 Input</h2>
      </div>

      <textarea
        className="hl7-textarea"
        value={hl7Text}
        onChange={(event) => onHl7TextChange(event.target.value)}
        placeholder="Paste HL7 message here..."
        spellCheck="false"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".hl7"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div className="action-row">
        <button type="button" onClick={() => fileInputRef.current.click()}>
          Open File
        </button>
        <select className="sample-select" value="" onChange={handleSampleSelect}>
          <option value="" disabled>Load Sample…</option>
          {samples.map((s, i) => (
            <option key={i} value={i}>{s.label}</option>
          ))}
        </select>
        <button type="button" onClick={onClear} className="secondary-btn">
          Clear
        </button>
        <button type="button" onClick={onParse} className="primary-btn">
          Parse
        </button>
      </div>
    </section>
  )
}

export default Hl7InputPanel
