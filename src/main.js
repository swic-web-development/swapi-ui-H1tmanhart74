import './styles.css'

fetch('https://www.swapi.tech/api/planets/1')
  .then((res) => res.json())
  .then((data) => {
    const planetInfo = document.getElementById('planet-info')
    const { properties } = data.result

    // Clear loading text
    planetInfo.textContent = ''

    // Create a styled list of planet properties
    const infoList = document.createElement('ul')
    infoList.className = 'space-y-2'

    for (const [key, value] of Object.entries(properties)) {
      const listItem = document.createElement('li')
      listItem.className = 'flex justify-between bg-gray-700 p-2 rounded-md'

      const keySpan = document.createElement('span')
      keySpan.className = 'font-semibold text-gray-300'
      keySpan.textContent = key.replace('_', ' ').toUpperCase()

      const valueSpan = document.createElement('span')
      valueSpan.className = 'text-gray-100'
      valueSpan.textContent = value

      listItem.appendChild(keySpan)
      listItem.appendChild(valueSpan)
      infoList.appendChild(listItem)
    }

    planetInfo.appendChild(infoList)
  })
  .catch((error) => {
    const planetInfo = document.getElementById('planet-info')
    planetInfo.textContent = 'Error fetching data.'
    console.error('Error fetching data:', error)
  })
