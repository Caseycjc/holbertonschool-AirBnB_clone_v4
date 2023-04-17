#!/usr/bin/node
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
  });
  