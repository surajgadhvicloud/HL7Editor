const rawFiles = import.meta.glob('../HL7/*.hl7', { eager: true, query: '?raw', import: 'default' })

export const samples = Object.entries(rawFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, content]) => ({
    label: path.split('/').pop().replace('.hl7', ''),
    content,
  }))
