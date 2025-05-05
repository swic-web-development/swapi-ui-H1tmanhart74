export function createInput(placeholder, onInputChange) {
  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = placeholder
  input.className =
    'w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'

  // Add an event listener for input changes
  input.addEventListener('input', (event) => {
    onInputChange(event.target.value)
  })

  return input
}
