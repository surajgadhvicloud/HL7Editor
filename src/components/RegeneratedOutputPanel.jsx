function RegeneratedOutputPanel({ regeneratedHl7, onCopy, copyState }) {
  return (
    <section className="panel output-panel">
      <div className="panel-header">
        <h2>Regenerated HL7</h2>
        <button type="button" onClick={onCopy} className="primary-btn" disabled={!regeneratedHl7}>
          Copy HL7
        </button>
      </div>

      <textarea
        className="hl7-textarea output-area"
        value={regeneratedHl7}
        readOnly
        spellCheck="false"
      />

      {copyState ? <p className="copy-feedback">{copyState}</p> : null}
    </section>
  )
}

export default RegeneratedOutputPanel
