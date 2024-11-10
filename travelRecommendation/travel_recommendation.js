// Function to fetch and display recommendations based on user input
async function fetchAndDisplayRecommendations() {
    try {
        // Fetch data from the JSON file
        const response = await fetch('./travel_recommendation_api.json');
        const data = await response.json();

        // Get the user's input from the search field and normalize it
        const searchInput = document.getElementById('searchField').value.toLowerCase();

        // Define acceptable keyword variations
        const keywordCategories = {
            'beach': ['beach', 'beaches'],
            'temple': ['temple', 'temples'],
            'country': ['country', 'countries']
        };

        // Determine the category based on the input
        let category = null;
        for (const [key, keywords] of Object.entries(keywordCategories)) {
            if (keywords.includes(searchInput)) {
                category = key;
                break;
            }
        }

        // Get the container where recommendations will be displayed
        const recommendationsContainer = document.getElementById('recommendations');
        recommendationsContainer.innerHTML = ''; // Clear previous results

        // Filter and display recommendations based on the category
        if (category) {
            const recommendations = data.filter(item => item.category === category);

            recommendations.forEach(recommendation => {
                const recommendationElement = document.createElement('div');
                recommendationElement.className = 'recommendation';

                const nameElement = document.createElement('h3');
                nameElement.textContent = recommendation.name;

                const imageElement = document.createElement('img');
                imageElement.src = recommendation.imageUrl;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = recommendation.description;

                recommendationElement.appendChild(nameElement);
                recommendationElement.appendChild(imageElement);
                recommendationElement.appendChild(descriptionElement);

                recommendationsContainer.appendChild(recommendationElement);
            });
        } else {
            console.log('No matching category found for:', searchInput);
        }
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
}

// Add event listener to the search button
document.getElementById('searchButton').addEventListener('click', fetchAndDisplayRecommendations);

// Function to clear the displayed results
function clearResults() {
    // Get the container where results are displayed
    const recommendationsContainer = document.getElementById('recommendations');
    // Clear the content of the container
    recommendationsContainer.innerHTML = '';
}

// Add event listener to the clear button
document.getElementById('clearButton').addEventListener('click', clearResults);
