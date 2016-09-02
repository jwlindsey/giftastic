//The public beta key is "dc6zaTOxFJmzC”
//"http://api.giphy.com/v1/gifs/search?q="+ funny+cat +"&api_key=dc6zaTOxFJmzC"
//divs made in the html are as follows
//<div class="gifButtons">
//<input id="searchBox">
//<div class="results">

//inital search array
var gifsArray = ["dogs", "mice", "salamanders", "aliens", "humans"];
//display search function - renders the search parameters into html
function searchGifs (){

  $(".results").empty();
  var animal = $(this).attr("data-animal");
  var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
//create Ajax call for specific gifs
$.ajax({
  url: queryURL,
  method: "GET",
  datatype: "json"})
  .done(function(response) {
  //console.log(response);

  for (var a=0; a<response.data.length; a++){
    //console.log(response.data);
    //grab responses from giphy and append to results element in html
    var p = $("<p>").text("Rating: " + response.data[a].rating);
    var gifImage = $("<img>")
      .attr("src", response.data[a].images.fixed_height_still.url)
      .attr("data-still", response.data[a].images.fixed_height_still.url)
      .attr("data-animate", response.data[a].images.fixed_height.url)
      .attr("data-state", "still")
      .addClass("gifResult");

    gifImage.append(p);
    $(".results").prepend(gifImage);
  }
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
  event.preventDefault();//same as return false at the end of the function
//grab input from search box
  var gifSearch = $("#search-box").val().trim();
//push from search box into the array
  gifsArray.push(gifSearch);
//run our renderbuttons function to process through our array
  renderButtons();
  $("#search-box").val("");
});

//function for pause and play of gifs
function pausePlay(){
  var state = $(this).attr("data-state");
//if else statement to control pause and play
  if (state == "still") {
    console.log("still");
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    console.log("animate");
  }
  $(document).on("click", ".gifsArray", searchGifs);
}
//display gif information
$(document).on("click", ".gifsArray", searchGifs);
$(document).on("click", ".gifResult", pausePlay);

renderButtons();
