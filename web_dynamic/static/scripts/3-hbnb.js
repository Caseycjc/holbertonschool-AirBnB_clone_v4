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
        if (data.status === 'OK') {
          const apiStatusDiv = document.querySelector('#api_status');
          apiStatusDiv.classList.add('available');
  
          const placesUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
          fetch(placesUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: '{}'
          })
          .then(response => response.json())
          .then(data => {
            const placesSection = document.querySelector('section.places');
            for (const place of data) {
              const article = document.createElement('article');
              article.innerHTML = `
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">
                  ${place.description}
                </div>
              `;
              placesSection.appendChild(article);
            }
          })
          .catch(error => console.error('Error:', error));
        } else {
          const apiStatusDiv = document.querySelector('#api_status');
          apiStatusDiv.classList.remove('available');
        }
      })
      .catch(error => console.error('Error:', error));
  });
