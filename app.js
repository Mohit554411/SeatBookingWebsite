document.addEventListener("DOMContentLoaded", function () {
    const moviesList = [
      { movieName: "Flash", price: 7 },
      { movieName: "Spiderman", price: 5 },
      { movieName: "Batman", price: 4 },
    ];
  
    const selectMovie = document.getElementById("selectMovie");
    const movieNameElement = document.getElementById("movieName");
    const moviePriceElement = document.getElementById("moviePrice");
    const totalPriceElement = document.getElementById("totalPrice");
    const seatContainer = document.querySelectorAll("#seatCont .seat");
    const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
    const continueButton = document.getElementById("proceedBtn");
    const cancelButton = document.getElementById("cancelBtn");
  
    // Populate movie options in the dropdown
    moviesList.forEach((movie) => {
      const option = document.createElement("option");
      option.value = movie.movieName;
      option.text = movie.movieName;
      selectMovie.appendChild(option);
    });
  
    // Set default movie details
    let selectedMovie = moviesList[0];
    updateMovieDetails();
  
    // Event listener for movie selection
    selectMovie.addEventListener("change", function () {
      selectedMovie = moviesList.find(
        (movie) => movie.movieName === selectMovie.value
      );
      updateMovieDetails();
      updateTotalPrice();
    });
  
    // Event listener for seat selection
    const selectedSeats = [];
    seatContainer.forEach((seat) => {
      if (!seat.classList.contains("occupied")) {
        seat.addEventListener("click", function () {
          toggleSeatSelection(seat);
          updateTotalPrice();
          updateSelectedSeats();
        });
      }
    });
  
    // Event listener for continue button
    continueButton.addEventListener("click", function () {
      if (selectedSeats.length === 0) {
        alert("Oops, no seat selected!");
      } else {
        alert("Yayy! Your seats have been booked.");
        bookSelectedSeats();
        updateTotalPrice();
        updateSelectedSeats();
      }
    });
  
    // Event listener for cancel button
    cancelButton.addEventListener("click", function () {
      clearSelectedSeats();
      updateTotalPrice();
      updateSelectedSeats();
    });
  
    // Function to update movie details
    function updateMovieDetails() {
      movieNameElement.textContent = selectedMovie.movieName;
      moviePriceElement.textContent = `$ ${selectedMovie.price}`;
    }
  
    // Function to toggle seat selection
    function toggleSeatSelection(seat) {
      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        const index = selectedSeats.indexOf(seat);
        if (index !== -1) {
          selectedSeats.splice(index, 1);
        }
      } else {
        seat.classList.add("selected");
        selectedSeats.push(seat);
      }
    }
  
    // Function to update total price
    function updateTotalPrice() {
      const totalPrice = selectedSeats.length * selectedMovie.price;
      totalPriceElement.textContent = `$ ${totalPrice}`;
    }
  
    // Function to update selected seats section
    function updateSelectedSeats() {
      selectedSeatsHolder.innerHTML = "";
      if (selectedSeats.length === 0) {
        const noSelected = document.createElement("span");
        noSelected.classList.add("noSelected");
        noSelected.textContent = "No seat selected";
        selectedSeatsHolder.appendChild(noSelected);
      } else {
        selectedSeats.forEach((seat) => {
          const selectedSeat = document.createElement("span");
          selectedSeat.classList.add("selectedSeat");
          selectedSeat.textContent = seat.textContent;
          selectedSeatsHolder.appendChild(selectedSeat);
        });
      }
    }
  
    // Function to book selected seats
    function bookSelectedSeats() {
      selectedSeats.forEach((seat) => {
        seat.classList.remove("selected");
        seat.classList.add("occupied");
      });
      clearSelectedSeats();
    }
  
    // Function to clear selected seats
    function clearSelectedSeats() {
      selectedSeats.forEach((seat) => {
        seat.classList.remove("selected");
      });
      selectedSeats.length = 0;
    }
  });
  