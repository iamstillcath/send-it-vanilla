const logout = document.getElementById("logout");
const showHeader = document.getElementById("table");

logout.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "./login.html";
});
const url = "https://backfiles.herokuapp.com";
const userId = localStorage.getItem("userId");
fetch(`${url}/parcels`, {
  method: "GET",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
})
  .then((res) => res.json())
  .then((data) => {
    const ordersTable = document.querySelector(".parcelDetails");
    if (!data.length) {
      document.querySelector("#error-msg").innerHTML =
        "You do not have any Parcel Delivery Order yet";
    } else {
      showHeader.className = "show";
      data.sort((a, b) => a.id - b.id);
      renderTableData(data, ordersTable);
    }
  });

const renderTableData = (data, ordersTable) => {
  data.forEach((output) => {
    let parcelRow = document.createElement("tr");
    parcelRow.innerHTML = `<th scope="row">${output._id}</th>
                        <td>${output.itemDescription}</td>
                        <td>${"₦" + output.price.toLocaleString() + ".00"}</td>
                        <td>${output.pickupLocation}</td>
                        <td class="remove-second">${output.destination}</td>
                        <td>${output.currentLocation}</td>
                        <td>${output.recipientName}</td>
                        <td>${output.recipientNumber}</td>
                        <td>${output.status}</td>
                           `;
    ordersTable.append(parcelRow);

    const dest = document.createElement("h2");
    const desti = document.createElement("td");
    dest.innerHTML = `<i class="fas fa-edit"></i>`;
    dest.className = "locat";
    parcelRow.append(dest);

    const status = document.createElement("h2");
    const statuss = document.createElement("td");
    status.className = "destinationh";
    status.innerHTML = `<a href="/status.html"><i class="far fa-compass"></i>`;
    statuss.append(status);
    const th = document.createElement("div");
 
    parcelRow.append(statuss);
    th.style.display = "flex";

 

    dest.addEventListener("click", function (e) {
      e.preventDefault();
      const status=e.target.closest("tr").children[8].innerHTML;
      if (status==="delivered"){
        return false
        // dest.disabled=true
      }
      window.location.href = "/currentLocation.html";
      const trId = e.target.closest("tr").children[0].innerHTML;
      localStorage.setItem("orderId", trId);
    
    });

    // dest.addEventListener("mouseover",function(e){
    //   const status=e.target.closest("tr").children[8].innerHTML;
    //   if (status==="delivered"){
    //     console.log("this is status",status)
    //     dest.disable=true;
    //     dest.style.visibility = "hidden";
    //     alert("This parcel has been delivered")
      
    //   }
    // })

    status.addEventListener("click", function (e) {
      e.preventDefault();
    
      const trId = e.target.closest("tr").children[0].innerHTML;
      localStorage.setItem("orderId", trId);
      window.location.href = "/status.html";
    });
  });
};
