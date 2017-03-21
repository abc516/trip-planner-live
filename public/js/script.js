// var hotels = {{ hotels | dump | safe }};
// var restaurants = {{ restaurants | dump | safe }};
// var activities = {{ activities | dump | safe }};
var hotelSelect = $('#hotel-choices') //.append('<option>' + )
for(var i = 0; i < hotels.length; i++){
  hotelSelect.append('<option class='+ hotels[i].place.location+ '>' + hotels[i].name + '</option>')
}
var restaurantSelect = $('#restaurant-choices')
for(var i = 0; i < restaurants.length; i++){
  restaurantSelect.append('<option class='+ restaurants[i].place.location+ '>' + restaurants[i].name + '</option>')
}
var activitySelect = $('#activity-choices')
for(var i = 0; i < activities.length; i++){
  activitySelect.append('<option class='+ activities[i].place.location+ '>' + activities[i].name + '</option>')
}
var buttons = $('#options-panel').find('button')
var hotelBtn = buttons[0]
var restaurantBtn = buttons[1]
var activityBtn = buttons[2]

$(hotelBtn).on('click', function(){
  var $hotelItineraryItem = $('<div class="itinerary-item"><span class="title">'+ hotelSelect.val()+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
  var hotelGroup = $('#itinerary .list-group:eq(0)')
  hotelGroup.append($hotelItineraryItem)
  var coord = $('#hotel-choices :selected').attr('class').split(',')
  var currMarker = drawMarker('hotel', coord)
  $hotelItineraryItem.data("marker", currMarker);
  // adds an item to our array at the proper day
  itineraryArr[$('.day-buttons .current-day').text()].hotels.push({name: hotelSelect.val(), marker: currMarker});

})

$(restaurantBtn).on('click', function(){
  var $resItineraryItem = $('<div class="itinerary-item"><span class="title">'+ restaurantSelect.val()+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
  var restaurantGroup = $('#itinerary .list-group:eq(1)')
  restaurantGroup.append($resItineraryItem)
  var coord = $('#restaurant-choices :selected').attr('class').split(',')
  var currMarker = drawMarker('restaurant', coord)
  $resItineraryItem.data("marker", currMarker);
  itineraryArr[$('.day-buttons .current-day').text()].restaurants.push({name: restaurantSelect.val(), marker: currMarker});
})

$(activityBtn).on('click', function(){
  var $activityItineraryItem = $('<div class="itinerary-item"><span class="title">'+ activitySelect.val()+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
  var activityGroup = $('#itinerary .list-group:eq(2)')
  activityGroup.append($activityItineraryItem)
  var coord = $('#activity-choices :selected').attr('class').split(',')
  var currMarker = drawMarker('activity', coord)
  $activityItineraryItem.data("marker", currMarker);
  itineraryArr[$('.day-buttons .current-day').text()].activities.push({name: activitySelect.val(), marker: currMarker});
})

$('#itinerary').on('click', '.remove', function(){
  var tempMarker = $(this).parent().data().marker;
  tempMarker.setMap(null);
  var intineraryType = $(this).parent().parent().prev().text();
  var arr1;
  if(intineraryType === "My Hotel"){
    arr1 = itineraryArr[$('.day-buttons .current-day').text()].hotels
  } else if(intineraryType === "My Restaurants"){
    arr1 = itineraryArr[$('.day-buttons .current-day').text()].restaurants
  } else {
    arr1 = itineraryArr[$('.day-buttons .current-day').text()].activities
  }
  for(var i = 0; i < arr1.length; i++){
    if(arr1[i].marker === tempMarker){
      arr1.splice(i, 1);
    }
  }
  $(this).parent().remove();
})

$('#day-add').on('click', function(){
  $('<button class="btn btn-circle day-btn num-day">' + (parseInt($(this).prev().text()) + 1) + '</button>').insertBefore(this);
  itineraryArr[$(this).prev().text()] = { hotels: [], restaurants: [], activities: [] }
});

$('.day-buttons').on('click', '.num-day', function(){
  clearDay($('.day-buttons .current-day').text());
  $('.day-buttons .current-day').removeClass('current-day');
  $(this).addClass('current-day');
  populateList($(this).text());
  $('#day-title span').text("Day " + $(this).text())
})

var clearDay = function(dayStr){
  var arr1 = itineraryArr[dayStr].hotels
  console.log(arr1);
  for(var i = 0; i < arr1.length; i++){
    arr1[i].marker.setMap(null);
  }
  arr1 = itineraryArr[dayStr].restaurants
  for(var i = 0; i < arr1.length; i++){
    arr1[i].marker.setMap(null);
  }
  arr1 = itineraryArr[dayStr].activities
  for(var i = 0; i < arr1.length; i++){
    arr1[i].marker.setMap(null);
  }

  $('.list-group').empty();
}

var populateList = function(dayStr){
  var arr1 = itineraryArr[dayStr].hotels
  console.log(arr1);
  for(var i = 0; i < arr1.length; i++){
    var $hotelItineraryItem = $('<div class="itinerary-item"><span class="title">'+ arr1[i].name +'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
    var hotelGroup = $('#itinerary .list-group:eq(0)')
    hotelGroup.append($hotelItineraryItem)
    $hotelItineraryItem.data("marker", arr1[i].marker)
    arr1[i].marker.setMap(currentMap);
  }
  arr1 = itineraryArr[dayStr].restaurants
  for(var i = 0; i < arr1.length; i++){
    var $resItineraryItem = $('<div class="itinerary-item"><span class="title">'+ arr1[i].name +'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
    var restaurantGroup = $('#itinerary .list-group:eq(1)')
    restaurantGroup.append($resItineraryItem)
    $resItineraryItem.data("marker", arr1[i].marker)
    arr1[i].marker.setMap(currentMap);
  }
  arr1 = itineraryArr[dayStr].activities
  for(var i = 0; i < arr1.length; i++){
    var $activityItineraryItem = $('<div class="itinerary-item"><span class="title">'+ arr1[i].name +'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
    var activityGroup = $('#itinerary .list-group:eq(2)')
    activityGroup.append($activityItineraryItem)
    $activityItineraryItem.data("marker", arr1[i].marker)
    arr1[i].marker.setMap(currentMap);
  }
}

var itineraryArr = [];

itineraryArr['1'] = { hotels: [], restaurants: [], activities: [] }

// {name: hotel_name, marker: hotel_marker}



