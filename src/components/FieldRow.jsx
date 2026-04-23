function FieldRow({ label, value, onValueChange, tooltip }) {
  return (
    <tr>
      <td className="cell-label">{label}</td>
      <td>
        <input
          className="field-input"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder=""
          spellCheck="false"
        />
      </td>
      <td className="cell-info">
        <button type="button" className="info-btn" title={tooltip} aria-label={tooltip}>
          i
        </button>
      </td>
    </tr>
  )
}

export default FieldRow
