function SegmentListPanel({ segments, selectedSegmentIndex, onSelectSegment, onAddSegment, onRemoveSegment }) {
  const hasSegments = segments.length > 0
  const hasOBR = segments.some(s => s.code === 'OBR')
  const lastObrOrObx = segments.findLast(s => s.code === 'OBR' || s.code === 'OBX')

  // OBR allowed when segments exist AND (no OBR yet OR last OBR/OBX is OBX — no consecutive OBRs)
  const canAddOBR = hasSegments && (!hasOBR || lastObrOrObx?.code === 'OBX')
  const canAddOBX = hasSegments

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
            const isRemovable = segment.code === 'OBR' || segment.code === 'OBX'

            return (
              <div
                key={`${segment.code}-${index}`}
                className={`segment-row ${index === selectedSegmentIndex ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="segment-select-btn"
                  onClick={() => onSelectSegment(index)}
                  title={`Select ${segment.code} segment`}
                >
                  <span className="segment-code">{segment.code}</span>
                  <span className="segment-preview">{preview}</span>
                </button>
                {isRemovable && (
                  <button
                    type="button"
                    className="remove-segment-btn"
                    onClick={() => onRemoveSegment(index)}
                    title={`Remove ${segment.code} segment`}
                  >
                    ×
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>

      <div className="action-row add-segment-row">
        <button
          type="button"
          onClick={() => onAddSegment('OBR')}
          disabled={!canAddOBR}
          title={!hasSegments ? 'Parse a message first' : !canAddOBR ? 'OBR must follow an OBX, not another OBR' : undefined}
        >
          + Add OBR
        </button>
        <button
          type="button"
          onClick={() => onAddSegment('OBX')}
          disabled={!canAddOBX}
          title={!canAddOBX ? 'Parse a message first' : undefined}
        >
          + Add OBX
        </button>
      </div>
    </section>
  )
}

export default SegmentListPanel
