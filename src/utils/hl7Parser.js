export function parseHl7Message(rawMessage) {
  if (!rawMessage || !rawMessage.trim()) {
    return []
  }

  const lines = rawMessage
    .split(/\r\n|\n|\r/)
    .filter((line) => line.length > 0)

  return lines.map((line) => {
    const rawFields = line.split('|')
    const code = rawFields[0] || ''
    const separator = line.charAt(code.length) || '|'

    return {
      code,
      fieldSeparator: separator,
      fields: rawFields.slice(1),
      rawLine: line,
    }
  })
}

export function getRenderableFields(segment) {
  if (!segment) {
    return []
  }

  if (segment.code === 'MSH') {
    const mshFields = [
      {
        position: 1,
        value: segment.fieldSeparator || '|',
      },
    ]

    segment.fields.forEach((value, index) => {
      mshFields.push({
        position: index + 2,
        value,
      })
    })

    return mshFields
  }

  return segment.fields.map((value, index) => ({
    position: index + 1,
    value,
  }))
}

export function updateSegmentField(segments, segmentIndex, fieldPosition, newValue) {
  return segments.map((segment, index) => {
    if (index !== segmentIndex) {
      return segment
    }

    if (segment.code === 'MSH' && fieldPosition === 1) {
      return {
        ...segment,
        fieldSeparator: newValue || '|',
      }
    }

    const nextFields = [...segment.fields]
    const fieldIndex = segment.code === 'MSH' ? fieldPosition - 2 : fieldPosition - 1

    if (fieldIndex < 0) {
      return segment
    }

    while (nextFields.length <= fieldIndex) {
      nextFields.push('')
    }

    nextFields[fieldIndex] = newValue

    return {
      ...segment,
      fields: nextFields,
    }
  })
}
