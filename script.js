const selectSeat = document.querySelectorAll(".row");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const backGroundImage = document.querySelector("body")
const backGroundContainer = document.querySelector(".container")
const backGroundShowcase = document.querySelector(".showcase")
const filmName = document.querySelector("#film")

populateUI()


let ticketPrice = +movieSelect.value;
selectSeat.forEach((item)=>{

item.addEventListener("click", (e)=>{

    if( !e.target.classList.contains("occupied") && e.target.classList.contains("seat")){

        e.target.classList.toggle("selected")

        updateSelectedCount();
 
    }

    });

});

movieSelect.addEventListener("change", (e) => {

    ticketPrice = +e.target.value;
    
    
    if (e.target.value == 10) {

        backGroundImage.setAttribute("style", "background-image: url('./10.jpg'); background-repeat: no-repeat; background-size: cover");
        backGroundContainer.style.backgroundColor = "black"
        console.log(backGroundContainer);

    } 
    else if (e.target.value == 12) {
        backGroundImage.setAttribute("style", "background-image: url('./12.jpg'); background-repeat: no-repeat; background-size: cover");

    } 
    else if (e.target.value == 8) {
        backGroundImage.setAttribute("style", "background-image: url('./8.jpg'); background-repeat: no-repeat; background-size: cover; background-position-y: -180px");
        backGroundContainer.style.backgroundColor = "black"
        backGroundShowcase.style.backgroundColor = "black"
    }
    else if (e.target.value == 9) {
        backGroundImage.setAttribute("style", "background-image: url('./9.jpg'); background-repeat: no-repeat; background-size: cover; background-position-y: -110px");
        backGroundContainer.style.backgroundColor = ""
        backGroundShowcase.style.backgroundColor = ""
    }

    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();

  });

function setMovieData(movieIndex, moviePrice) {

    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {

    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    film.innerText = movieSelect.options[movieSelect.selectedIndex].innerText.split("(")[0];

    setMovieData(movieSelect.selectedIndex, movieSelect.value);

}

function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    console.log(selectedSeats);
  
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add("selected");
        }
      });
    }
  
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  
    if (selectedMovieIndex !== null) {

      movieSelect.selectedIndex = selectedMovieIndex;
      console.log(selectedMovieIndex)
    }
  }

  updateSelectedCount();