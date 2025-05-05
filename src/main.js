import './styles.css'
import { displayData } from './components/button.js'

async function fetchAllData(endpoint) {
  const planetInfo = document.getElementById('planet-info')
  planetInfo.textContent = 'Loading...'

  let allData = []
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

// Fetch all planets as an example
fetchAllData('planets')
