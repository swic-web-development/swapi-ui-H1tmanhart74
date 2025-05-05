import { displayData } from './components/button.js'
import { createInput } from './components/input.js'
import { createLabel } from './components/label.js' // Import the createLabel function
import './styles.css'

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
    displayData(allData)
  } catch (error) {
    planetInfo.textContent = 'Error fetching data.'
    console.error('Error fetching data:', error)
  }
}

// Add input field and label to the DOM
const header = document.querySelector('h1') // Select the header element

// Create a label for the search bar
const searchLabel = createLabel('Search for information:', 'search-input')

// Create the search input field
const searchInput = createInput('Search SWAPI...', (value) => {
  // Filter the data based on the search input
  const filteredData = allData.filter((item) =>
    (item.name || '').toLowerCase().includes(value.toLowerCase()),
  )
  displayData(filteredData) // Display the filtered data
})
searchInput.id = 'search-input' // Set the ID to match the label's htmlFor

// Insert the label and input below the header
header.insertAdjacentElement('afterend', searchInput)
header.insertAdjacentElement('afterend', searchLabel)

// Fetch all planets as an example
fetchAllData('planets')
