$(document).ready(function () {
    let amenityIds = {};
  
    $('input[type=checkbox]').change(function () {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');
      if (this.checked) {
        amenityIds[amenityId] = amenityName;
      } else {
        delete amenityIds[amenityId];
      }
      const amenitiesList = Object.values(amenityIds).join(', ');
      $('.amenities h4').text(amenitiesList);
    });

    const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Check if status is "OK"
        if (data.status === 'OK') {
          // Add "available" class to api_status element
          const apiStatusDiv = document.querySelector('#api_status');
          apiStatusDiv.classList.add('available');
        } else {
          // Remove "available" class from api_status element
          const apiStatusDiv = document.querySelector('#api_status');
          apiStatusDiv.classList.remove('available');
        }
      })
      .catch(error => console.error('Error:', error));
    });
  