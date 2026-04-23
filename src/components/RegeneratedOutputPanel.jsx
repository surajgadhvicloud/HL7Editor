function RegeneratedOutputPanel({ regeneratedHl7, onCopy, onSave, copyState }) {
  return (
    <section className="panel output-panel">
      <div className="panel-header">
        <h2>Regenerated HL7</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" onClick={onCopy} className="primary-btn" disabled={!regeneratedHl7}>
            Copy HL7
          </button>
          <button type="button" onClick={onSave} className="secondary-btn" disabled={!regeneratedHl7}>
            Save
          </button>
        </div>
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
