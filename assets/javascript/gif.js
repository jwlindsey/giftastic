//The public beta key is "dc6zaTOxFJmzC”
//"http://api.giphy.com/v1/gifs/search?q="+ funny+cat +"&api_key=dc6zaTOxFJmzC"
//divs made in the html are as follows
//<div class="gifButtons">
//<input id="searchBox">
//<div class="results">

//inital search array
var gifsArray = ["dogs", "cats", "mice", "salamanders", "aliens", "humans"];
//display search function - renders the search parameters into html
function searchGifs (){

  var animal = $(this).attr("data-animal");
  var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
//create Ajax call for specific gifs
$.ajax({
  url: queryURL,
  method: "GET",
  datatype: "json"})
  .done(function(response) {
  console.log(response);
});
}

//generates buttons for anything in the array
function renderButtons(){
//deletes gifs prior to adding a new gifs to cut down on repeat buttons
  $(".gifButtons").empty();
//loops through array of gifs
  for (var i = 0; i < gifsArray.length; i++) {
//generate buttons for each gif in the array
  var a = $("<button>");
  a.addClass("gifsArray");
  a.attr("data-animal", gifsArray[i]);
  a.html(gifsArray[i]);
  $(".gifButtons").append(a);
}
}

//function for search click
$("#form").on("submit", function(event){
  event.preventDefault();
//grab input from search box
  var gifSearch = $("#search-box").val().trim();
//push from search box into the array
  gifsArray.push(gifSearch);
//run our renderbuttons function to process through our array
  renderButtons();

});
//display gif information
$(document).on("click", ".gifsArray", searchGifs);

renderButtons();
