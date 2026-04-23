import FieldRow from './FieldRow'
import {
  getSegmentDescription,
  getFieldTooltip,
  FIELD_METADATA,
} from '../utils/hl7Metadata'
import { getRenderableFields } from '../utils/hl7Parser'

function SegmentInspectorPanel({ segment, selectedSegmentIndex, onFieldChange, onAddField }) {
  if (!segment) {
    return (
      <section className="panel">
        <div className="panel-header">
          <h2>Inspector</h2>
        </div>
        <p className="muted-text">Select a segment to inspect fields.</p>
      </section>
    )
  }

  const fields = getRenderableFields(segment)

  return (
    <section className="panel">
      <div className="panel-header stacked">
        <h2>Inspector</h2>
        <p className="segment-title">
          {segment.code} - {getSegmentDescription(segment.code)}
        </p>
      </div>

      <div className="table-wrap">
        <table className="field-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Edit</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => {
              const label = getFieldLabel(segment.code, field.position)

              return (
                <FieldRow
                  key={`${segment.code}-${field.position}`}
                  label={label}
                  value={field.value}
                  onValueChange={(newValue) =>
                    onFieldChange(selectedSegmentIndex, field.position, newValue)
                  }
                  tooltip={getFieldTooltip(segment.code, field.position)}
                />
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="action-row">
        <button type="button" onClick={() => onAddField(selectedSegmentIndex)}>
          + Add Field
        </button>
      </div>
    </section>
  )
}

function getFieldLabel(segmentCode, fieldPosition) {
  const metaName = FIELD_METADATA[segmentCode]?.[fieldPosition]
  if (segmentCode === 'MSH' && fieldPosition === 1) {
    return 'MSH-1 (Field Separator)'
  }

  if (segmentCode === 'MSH' && fieldPosition === 2) {
    return 'MSH-2 (Encoding Characters)'
  }

  if (!metaName) {
    return `${segmentCode}-${fieldPosition}`
  }

  return `${segmentCode}-${fieldPosition}`
}

export default SegmentInspectorPanel
