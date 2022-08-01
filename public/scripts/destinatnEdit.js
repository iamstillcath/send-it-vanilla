const id = localStorage.getItem("orderId");


const url = "https://backfiles.herokuapp.com";
const changeDestination = (e) => {
  e.preventDefault();

  fetch(`${url}/parcels/${id}/destination`, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      destination: document.getElementById("destination").value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message) {
        alert("Destination changed successfully!");
        window.location.href = "./user.html";
      } else {
        alert(res.error);
      }
    })
    .catch();
};

document
  .getElementById("edit-form")
  .addEventListener("submit", changeDestination);
