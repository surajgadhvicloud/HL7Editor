function Hl7InputPanel({ hl7Text, onHl7TextChange, onParse, onLoadSample, onClear }) {
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

      <div className="action-row">
        <button type="button" onClick={onLoadSample}>
          Load Sample
        </button>
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
