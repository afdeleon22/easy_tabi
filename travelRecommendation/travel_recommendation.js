// Function to fetch and display recommendations
async function fetchRecommendations() {
    try {
      // Fetch the JSON data
      const response = await fetch('path/to/travel_recommendation_api.json');
      const data = await response.json();
  
      // Get the container where recommendations will be displayed
      const recommendationsContainer = document.getElementById('recommendations');
  
      // Clear any existing recommendations
      recommendationsContainer.innerHTML = '';
  
      // Loop through the data and create elements to display each recommendation
      data.forEach(recommendation => {
        const recommendationElement = document.createElement('div');
        recommendationElement.className = 'recommendation';
  
        const nameElement = document.createElement('h3');
        nameElement.textContent = recommendation.name;
  
        const imageElement = document.createElement('img');
        imageElement.src = recommendation.imageUrl; // Ensure these URLs are correct
  
        recommendationElement.appendChild(nameElement);
        recommendationElement.appendChild(imageElement);
  
        recommendationsContainer.appendChild(recommendationElement);
      });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  }
  
  // Call the function to fetch and display recommendations when the page loads
  window.onload = fetchRecommendations;