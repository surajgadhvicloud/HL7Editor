export function serializeHl7Message(segments) {
  if (!segments.length) {
    return ''
  }

  const messageSeparator = getMessageFieldSeparator(segments)

  const lines = segments.map((segment) => {
    if (segment.code === 'MSH') {
      const separator = segment.fieldSeparator || messageSeparator || '|'
      return [segment.code, ...segment.fields].join(separator)
    }

    return [segment.code, ...segment.fields].join(messageSeparator)
  })

  return lines.join('\r')
}

function getMessageFieldSeparator(segments) {
  const mshSegment = segments.find((segment) => segment.code === 'MSH')
  if (mshSegment && mshSegment.fieldSeparator) {
    return mshSegment.fieldSeparator
  }

  return '|'
}
