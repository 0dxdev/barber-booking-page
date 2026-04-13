let selectedTime = null;
let selectedDate = null;

function selectTime(button) {
  document.querySelectorAll(".time-btn")
    .forEach(btn => btn.classList.remove("active"));

  button.classList.add("active");
  selectedTime = button.innerText;

  document.getElementById("selected-time").innerText =
    "Selected Time: " + selectedTime;
}

function selectDate(element, date) {
  document.querySelectorAll(".day")
    .forEach(d => d.classList.remove("active"));

  element.classList.add("active");
  selectedDate = date;

  document.getElementById("selected-date").innerText =
    "Selected Date: " + date;
}

function loadCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const day = document.createElement("div");
    day.classList.add("day");

    const formatted = date.toDateString();

    day.innerText = formatted.split(" ").slice(0, 3).join(" ");

    day.onclick = () => selectDate(day, formatted);

    calendar.appendChild(day);
  }
}

function submitBooking() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;

  if (!selectedDate) return alert("Select a date");
  if (!selectedTime) return alert("Select a time");
  if (!name || !phone) return alert("Fill in your details");

  alert(
    "BOOKING CONFIRMED\n\n" +
    "Name: " + name + "\n" +
    "Phone: " + phone + "\n" +
    "Service: " + service + "\n" +
    "Date: " + selectedDate + "\n" +
    "Time: " + selectedTime
  );
}

window.onload = loadCalendar;