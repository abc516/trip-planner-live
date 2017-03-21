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
  drawMarker('hotel', coord)
})

$(restaurantBtn).on('click', function(){
  var $resItineraryItem = $('<div class="itinerary-item"><span class="title">'+ restaurantSelect.val()+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
  var restaurantGroup = $('#itinerary .list-group:eq(1)')
  restaurantGroup.append($resItineraryItem)
  var coord = $('#restaurant-choices :selected').attr('class').split(',')
  drawMarker('restaurant', coord)
})

$(activityBtn).on('click', function(){
  var $activityItineraryItem = $('<div class="itinerary-item"><span class="title">'+ activitySelect.val()+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>')
  var activityGroup = $('#itinerary .list-group:eq(2)')
  activityGroup.append($activityItineraryItem)
  var coord = $('#activity-choices :selected').attr('class').split(',')
  drawMarker('activity', coord)
})
