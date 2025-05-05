export function createTextarea(placeholder) {
  const textarea = document.createElement('textarea')
  textarea.placeholder = placeholder
  textarea.className =
    'w-full p-2 mb-2 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
  textarea.rows = 5 // Set default rows
  textarea.readOnly = true // Make it read-only since it's for exporting data

  return textarea
}
