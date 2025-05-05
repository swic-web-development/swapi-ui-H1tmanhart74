import { createJumpToTopButton, displayData } from './components/button.js'
import { createInput } from './components/input.js'
import { createLabel } from './components/label.js'
import { createTextarea } from './components/textarea.js'
import './styles.css'

// Add the Top button
createJumpToTopButton()

let allData = [] // Store all fetched data globally

async function fetchAllData(endpoint) {
  const planetInfo = document.getElementById('SWAPI-info')
  planetInfo.textContent = 'Loading...'

  allData = [] // Reset the data
  let nextUrl = `https://www.swapi.tech/api/${endpoint}`

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl)
      const data = await response.json()

      // Collect results
      allData = allData.concat(data.results)

      // Check if there's a next page
      nextUrl = data.next
    }

    // Clear loading text
    planetInfo.textContent = ''

    // Display the fetched data
    displayData(allData, handleItemClick) // Pass the click handler to displayData
  } catch (error) {
    planetInfo.textContent = 'Error fetching data.'
    console.error('Error fetching data:', error)
  }
}

// Handle item click to export data to the textarea
async function handleItemClick(item) {
  const textarea = document.getElementById('export-textarea')
  textarea.value = 'Loading detailed information...' // Show loading message

  try {
    // Check if the item has a URL for detailed data
    if (item.url) {
      const response = await fetch(item.url)
      const detailedData = await response.json()

      // Extract and format relevant fields
      const { properties } = detailedData.result
      const formattedData = `
Name: ${properties.name}
Description: ${properties.description}
Climate: ${properties.climate}
Terrain: ${properties.terrain}
Surface Water: ${properties.surface_water}
Population: ${properties.population}
Gravity: ${properties.gravity}
Diameter: ${properties.diameter}
Orbital Period: ${properties.orbital_period}
Rotation Period: ${properties.rotation_period}
      `.trim()

      // Display formatted data in the textarea
      textarea.value = formattedData
    } else {
      // Fallback to displaying the basic item data
      textarea.value = JSON.stringify(item, null, 2)
    }
  } catch (error) {
    textarea.value = 'Error fetching detailed information.'
    console.error('Error fetching detailed information:', error)
  }
}

// Add input field and label to the DOM
const header = document.querySelector('h1') // Select the header element

// Create a label for the search bar
const searchLabel = createLabel('Search for a planet:', 'search-input')

// Create the search input field
const searchInput = createInput('Search SWAPI...', (value) => {
  // Filter the data based on the search input
  const filteredData = allData.filter((item) =>
    (item.name || '').toLowerCase().includes(value.toLowerCase()),
  )
  displayData(filteredData, handleItemClick) // Display the filtered data
})
searchInput.id = 'search-input' // Set the ID to match the label's htmlFor

// Create the textarea for exporting data
const exportTextarea = createTextarea('Click on an item to export its data...')
exportTextarea.id = 'export-textarea' // Set an ID for the textarea

// Insert the label, input, and textarea below the header
header.insertAdjacentElement('afterend', exportTextarea)
header.insertAdjacentElement('afterend', searchInput)
header.insertAdjacentElement('afterend', searchLabel)

// Fetch all planets as an example
fetchAllData('planets')
