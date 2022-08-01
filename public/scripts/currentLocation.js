const id = localStorage.getItem("orderId");

const url = "https://backfiles.herokuapp.com";
const currentLocation = (e) => {
  e.preventDefault();

  fetch(`${url}/parcels/${id}/currentLocation`, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      orderId: id,
      currentLocation: document.getElementById("destination").value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message) {
        alert("Current Location changed successfully!");
        window.location.href = "./admin.html";
      } else {
        alert(res.error);
      }
    })
    .catch();
};

document
  .getElementById("edit-form")
  .addEventListener("submit", currentLocation);
