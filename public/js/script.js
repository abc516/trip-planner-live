// var hotels = {{ hotels | dump | safe }};
// var restaurants = {{ restaurants | dump | safe }};
// var activities = {{ activities | dump | safe }};
var hotelSelect = $('#hotel-choices');
var restaurantSelect = $('#restaurant-choices');
var activitySelect = $('#activity-choices');

// populate our options
for(var i = 0; i < hotels.length; i++){
  hotelSelect.append('<option class='+ hotels[i].place.location+ '>' + hotels[i].name + '</option>');
}
for(var i = 0; i < restaurants.length; i++){
  restaurantSelect.append('<option class='+ restaurants[i].place.location+ '>' + restaurants[i].name + '</option>');
}
for(var i = 0; i < activities.length; i++){
  activitySelect.append('<option class='+ activities[i].place.location+ '>' + activities[i].name + '</option>');
}

// add item buttons
var buttons = $('#options-panel').find('button');
var hotelBtn = buttons[0];
var restaurantBtn = buttons[1];
var activityBtn = buttons[2];

// an array that holds the itinerary for each day in the form of an object that holds an array for each type of item
var itineraryArr = [];
itineraryArr['1'] = { hotels: [], restaurants: [], activities: [] }

/*****  DOM AND MAP POPULATOR FUNCTIONS   *****/

// when we add an itinerary, we need to add to the dom and the map
var addHotel = function(name, marker){
  var hotelItineraryItem = $('<div class="itinerary-item"><span class="title">' +
    name +'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
  var hotelGroup = $('#itinerary .list-group:eq(0)')
  hotelGroup.append(hotelItineraryItem)
  hotelItineraryItem.data("marker", marker)
  marker.setMap(currentMap);
}

var addRestaurant = function(name, marker){
  var $resItineraryItem = $('<div class="itinerary-item"><span class="title">' +
    name +'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
  var restaurantGroup = $('#itinerary .list-group:eq(1)')
  restaurantGroup.append($resItineraryItem)
  $resItineraryItem.data("marker", marker)
  marker.setMap(currentMap);
}

var addActivity = function(name, marker){
  var $activityItineraryItem = $('<div class="itinerary-item"><span class="title">' +
    name +'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
  var activityGroup = $('#itinerary .list-group:eq(2)')
  activityGroup.append($activityItineraryItem)
  $activityItineraryItem.data("marker", marker)
  marker.setMap(currentMap);
}

/*****  DOM AND MAP POPULATOR FUNCTIONS END  *****/


/*****  ADD BUTTONS   *****/

$(hotelBtn).on('click', function(){
  // build the marker
  var coord = $('#hotel-choices :selected').attr('class').split(',');     // coord is stored in the class of the option
  var currMarker = drawMarker('hotel', coord);
  // add the hotel to our DOM and 
  addHotel(hotelSelect.val(), currMarker);
  // adds an item to our array at the proper day
  itineraryArr[currDay()].hotels.push({name: hotelSelect.val(), marker: currMarker});
})

$(restaurantBtn).on('click', function(){
  var coord = $('#restaurant-choices :selected').attr('class').split(',');
  var currMarker = drawMarker('restaurant', coord);
  addRestaurant(restaurantSelect.val(), currMarker);
  itineraryArr[currDay()].restaurants.push({name: restaurantSelect.val(), marker: currMarker});
})

$(activityBtn).on('click', function(){
  var coord = $('#activity-choices :selected').attr('class').split(',');
  var currMarker = drawMarker('activity', coord);
  addActivity(activitySelect.val(), currMarker);
  itineraryArr[currDay()].activities.push({name: activitySelect.val(), marker: currMarker});
})

/***** ADD BUTTONS END  *****/

// REMOTE ITEM BUTTON
$('#itinerary').on('click', '.remove', function(){
  var tempMarker = $(this).parent().data().marker;
  tempMarker.setMap(null);
  var intineraryType = $(this).parent().parent().prev().text();
  var arr1;
  if(intineraryType === "My Hotel"){
    arr1 = itineraryArr[currDay()].hotels
  } else if(intineraryType === "My Restaurants"){
    arr1 = itineraryArr[currDay()].restaurants
  } else {
    arr1 = itineraryArr[currDay()].activities
  }
  for(var i = 0; i < arr1.length; i++){
    if(arr1[i].marker === tempMarker){
      arr1.splice(i, 1);
    }
  }
  $(this).parent().remove();
})

/*****  DAY FUNCTIONS AND BUTTONS   *****/

var currDay = function(){
  return $('.day-buttons .current-day').text();
}

// function to clear the DOM and markers
var clearDay = function(dayStr){
  var arr1 = itineraryArr[dayStr].hotels;
  for(var i = 0; i < arr1.length; i++){
    arr1[i].marker.setMap(null);
  }
  arr1 = itineraryArr[dayStr].restaurants;
  for(var i = 0; i < arr1.length; i++){
    arr1[i].marker.setMap(null);
  }
  arr1 = itineraryArr[dayStr].activities;
  for(var i = 0; i < arr1.length; i++){
    arr1[i].marker.setMap(null);
  }
  $('.list-group').empty();   // empty removes all child nodes
}

// adding days
$('#day-add').on('click', function(){
  $('<button class="btn btn-circle day-btn num-day">' + (parseInt($(this).prev().text()) + 1) + '</button>').insertBefore(this);
  itineraryArr[$(this).prev().text()] = { hotels: [], restaurants: [], activities: [] };
});

// switch days
$('.day-buttons').on('click', '.num-day', function(){
  // clear the day
  clearDay(currDay());
  // update the dom element to have the new current day have the right class
  $('.day-buttons .current-day').removeClass('current-day');
  $(this).addClass('current-day');
  // repopulate based on what's in the new day's itinerary
  populateList($(this).text());
  // change the current day title
  $('#day-title span').text("Day " + $(this).text());
})

/*****  DAY FUNCTIONS AND BUTTONS END  *****/


var populateList = function(dayStr){
  var arr1 = itineraryArr[dayStr].hotels
  for(var i = 0; i < arr1.length; i++){
    addHotel(arr1[i].name, arr1[i].marker);
  }
  arr1 = itineraryArr[dayStr].restaurants
  for(var i = 0; i < arr1.length; i++){
    addRestaurant(arr1[i].name, arr1[i].marker);

  }
  arr1 = itineraryArr[dayStr].activities
  for(var i = 0; i < arr1.length; i++){
    addActivity(arr1[i].name, arr1[i].marker);
  }
}
