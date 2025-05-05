export function createLabel(text, htmlFor) {
  const label = document.createElement('label')
  label.textContent = text
  label.htmlFor = htmlFor // Associates the label with an input element by its ID
  label.className = 'block text-sm font-medium text-yellow-500 mb-2'

  return label
}
