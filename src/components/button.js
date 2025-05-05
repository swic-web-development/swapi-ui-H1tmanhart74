export function displayData(data) {
  const planetInfo = document.getElementById('planet-info')

  // Clear previous content
  planetInfo.innerHTML = ''

  // Create a styled list of items
  const infoList = document.createElement('ul')
  infoList.className = 'space-y-4'

  data.forEach((item) => {
    const listItem = document.createElement('li')
    listItem.className = 'p-4 bg-gray-700 rounded-md shadow-md'

    const link = document.createElement('a')
    link.className = 'text-xl font-bold text-blue-400 hover:underline'
    link.textContent = item.name || 'Unnamed Item'
    link.href = `https://www.swapi.tech/api/planets/${item.uid}` // Use the planet's unique ID for the link
    link.target = '_blank' // Open the link in a new tab

    listItem.appendChild(link)
    infoList.appendChild(listItem)
  })

  planetInfo.appendChild(infoList)
}
