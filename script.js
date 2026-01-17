// Ambil data dari LocalStorage
function getGuests() {
  return JSON.parse(localStorage.getItem("guests")) || [];
}

// Simpan data ke LocalStorage
function saveGuests(guests) {
  localStorage.setItem("guests", JSON.stringify(guests));
}

// Render daftar tamu
function renderGuests() {
  const guestList = document.getElementById("guestList");
  guestList.innerHTML = "";

  getGuests().forEach((guest, index) => {
    guestList.innerHTML += `
      <tr>
        <td>${guest.name}</td>
        <td>${guest.email}</td>
        <td>${guest.status}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editGuest(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteGuest(${index})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

// Tambah tamu
document.getElementById("invitationForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("guestName").value;
  const email = document.getElementById("guestEmail").value;
  const status = document.getElementById("guestStatus").value;

  const guests = getGuests();
  guests.push({ name, email, status });
  saveGuests(guests);

  renderGuests();
  this.reset();
});

// Edit tamu
function editGuest(index) {
  const guests = getGuests();
  const guest = guests[index];

  document.getElementById("guestName").value = guest.name;
  document.getElementById("guestEmail").value = guest.email;
  document.getElementById("guestStatus").value = guest.status;

  // Hapus dulu data lama
  deleteGuest(index);
}

// Hapus tamu
function deleteGuest(index) {
  const guests = getGuests();
  guests.splice(index, 1);
  saveGuests(guests);
  renderGuests();
}

// Render awal
renderGuests();
