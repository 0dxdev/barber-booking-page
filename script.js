let selectedTime = null;
let selectedDate = null;

/* ----------------------
   TIME SELECTION
---------------------- */
const timeButtons = document.querySelectorAll(".time-btn");

timeButtons.forEach(button => {
  button.addEventListener("click", () => {

    timeButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    selectedTime = button.textContent;

    document.getElementById("selected-time").textContent =
      "Selected Time: " + selectedTime;
  });
});


/* ----------------------
   CALENDAR
---------------------- */
const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("month-title");

const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

let currentDate = new Date();

function loadCalendar(date) {
  calendar.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // show month name
  if (monthTitle) {
    monthTitle.textContent = `${monthNames[month]} ${year}`;
  }

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // empty spaces for alignment
  for (let i = 0; i < firstDayIndex; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  // create days
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = i;

    day.addEventListener("click", () => {

      document.querySelectorAll(".day")
        .forEach(d => d.classList.remove("active"));

      day.classList.add("active");

      selectedDate = `${month + 1}/${i}/${year}`;

      document.getElementById("selected-date").textContent =
        "Selected Date: " + selectedDate;
    });

    calendar.appendChild(day);
  }
}


/* ----------------------
   MONTH BUTTONS
---------------------- */
if (prevBtn && nextBtn) {

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar(currentDate);
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar(currentDate);
  });
}


/* ----------------------
   FORM SUBMIT
---------------------- */
const form = document.getElementById("booking-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;

    if (!selectedDate) return alert("Select a date");
    if (!selectedTime) return alert("Select a time");
    if (!name || !phone) return alert("Fill in your details");

    const booking = {
      name,
      phone,
      service,
      date: selectedDate,
      time: selectedTime
    };

    localStorage.setItem("booking", JSON.stringify(booking));

    alert(
      "BOOKING CONFIRMED\n\n" +
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "Service: " + service + "\n" +
      "Date: " + selectedDate + "\n" +
      "Time: " + selectedTime
    );
  });
}


/* ----------------------
   INIT
---------------------- */
loadCalendar(currentDate);