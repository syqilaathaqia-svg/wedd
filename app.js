// INIT STORAGE
let events = JSON.parse(localStorage.getItem("events")) || [];
let guests = JSON.parse(localStorage.getItem("guests")) || [];

// SAVE EVENT
function saveEvent() {
  const id = document.getElementById("eventId").value || Date.now();
  const event = {
    id,
    name: eventName.value,
    date: eventDate.value,
    location: eventLocation.value
  };

  events = events.filter(e => e.id != id);
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));

  eventName.value = eventDate.value = eventLocation.value = "";
  renderEvents();
}

// RENDER EVENTS
function renderEvents() {
  eventList.innerHTML = "";
  guestEvent.innerHTML = "";

  events.forEach(e => {
    eventList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${e.name} - ${e.date}
        <button class="btn btn-sm btn-danger" onclick="deleteEvent(${e.id})">Hapus</button>
      </li>`;
    guestEvent.innerHTML += `<option value="${e.id}">${e.name}</option>`;
  });
}

// DELETE EVENT
function deleteEvent(id) {
  events = events.filter(e => e.id !== id);
  guests = guests.filter(g => g.eventId !== id);
  localStorage.setItem("events", JSON.stringify(events));
  localStorage.setItem("guests", JSON.stringify(guests));
  renderEvents();
  renderGuests();
}

// ADD GUEST
function addGuest() {
  const guest = {
    id: Date.now(),
    eventId: guestEvent.value,
    name: guestName.value,
    phone: guestPhone.value,
    hadir: false
  };
  guests.push(guest);
  localStorage.setItem("guests", JSON.stringify(guests));
  guestName.value = guestPhone.value = "";
  renderGuests();
}

// RENDER GUESTS
function renderGuests() {
  guestList.innerHTML = "";
  guests.forEach(g => {
    const event = events.find(e => e.id == g.eventId);
    guestList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${g.name} (${event?.name})
        <div>
          <button class="btn btn-sm btn-success" onclick="checkin(${g.id})">Check-in</button>
          <button class="btn btn-sm btn-danger" onclick="deleteGuest(${g.id})">Hapus</button>
        </div>
      </li>`;
  });
}

// CHECK-IN
function checkin(id) {
  guests = guests.map(g => g.id === id ? {...g, hadir:true} : g);
  localStorage.setItem("guests", JSON.stringify(guests));
  renderGuests();
}

// DELETE GUEST
function deleteGuest(id) {
  guests = guests.filter(g => g.id !== id);
  localStorage.setItem("guests", JSON.stringify(guests));
  renderGuests();
}

// INIT
renderEvents();
renderGuests();
