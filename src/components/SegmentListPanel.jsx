function SegmentListPanel({ segments, selectedSegmentIndex, onSelectSegment }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Segments</h2>
        <span className="badge">{segments.length}</span>
      </div>

      <div className="segment-list" role="list">
        {segments.length === 0 ? (
          <p className="muted-text">No parsed segments yet.</p>
        ) : (
          segments.map((segment, index) => {
            const preview = segment.fields.join('|').slice(0, 48)

            return (
              <button
                type="button"
                key={`${segment.code}-${index}`}
                className={`segment-row ${index === selectedSegmentIndex ? 'active' : ''}`}
                onClick={() => onSelectSegment(index)}
                title={`Select ${segment.code} segment`}
              >
                <span className="segment-code">{segment.code}</span>
                <span className="segment-preview">{preview}</span>
              </button>
            )
          })
        )}
      </div>
    </section>
  )
}

export default SegmentListPanel
