export function displayData(data, onItemClick) {
  const planetInfo = document.getElementById('SWAPI-info')

  // Clear previous content
  planetInfo.innerHTML = ''

  // Create a styled list of items
  const infoList = document.createElement('ul')
  infoList.className = 'space-y-4'

  data.forEach((item) => {
    const listItem = document.createElement('li')
    listItem.className = 'p-4 bg-gray-700 rounded-md shadow-md cursor-pointer'

    const link = document.createElement('a')
    link.className = 'text-xl font-bold text-blue-400 hover:underline'
    link.textContent = item.name || 'Unnamed Item'
    link.href = '#' // Prevent navigation
    link.addEventListener('click', (event) => {
      event.preventDefault() // Prevent default link behavior
      onItemClick(item) // Call the click handler with the item's data
    })

    listItem.appendChild(link)
    infoList.appendChild(listItem)
  })

  planetInfo.appendChild(infoList)
}

// Create a "Jump to the Top" button
export function createJumpToTopButton() {
  const button = document.createElement('button')
  button.id = 'jump-to-top'
  button.textContent = '↑ Top'
  button.className =
    'fixed bottom-4 right-4 rounded-full bg-yellow-500 px-4 py-2 text-black shadow-lg hover:bg-yellow-600'
  button.style.display = 'none' // Initially hidden

  // Add scroll-to-top functionality
  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  // Show or hide the button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      button.style.display = 'block'
    } else {
      button.style.display = 'none'
    }
  })

  document.body.appendChild(button)
}
