console.log("this is here");

const login = (e) => {
  e.preventDefault();

  const url = "https://backfiles.herokuapp.com";

  fetch(`${url}/user/login`, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.querySelector(".email").value,

      password: document.querySelector(".pass").value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);

        const token = localStorage.getItem("token");
        const tokens = JSON.parse(atob(token.split(".")[1]));
        localStorage.setItem("role", tokens.role);

        const role = localStorage.getItem("role");
        if (role === "user") {
          alert("login succesful!");
          window.location.href = "./order.html";
        } else {
          window.location.href = "./admin.html";
        }
      } else {
        alert(res.message);
      }
    })
    .catch();
};

const email = document.querySelector(".email");
const emailerr = document.querySelector(".errMsgs");
const texts = document.querySelector(".words");
function emailvalid() {
  const email = document.querySelector(".email").value;
  const emailerr = document.querySelector(".errMsgs");
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (email.match(pattern)) {
    emailerr.innerHTML = "";
    const btn = (document.querySelector(".loginBtn").disabled = false);
  
  } else {
    emailerr.innerHTML = "Enter a valid email address!";
    emailerr.style.color = "red";
  }

}
document.querySelector(".loginBtn").addEventListener("input", () => {
  if (emailerr.innerHTML === "") {
    // const btn = (document.querySelector(".loginBtn").disabled = false);
   
  } else {
    emailerr.innerHTML === "Enter a valid email address!";
    const btn = (document.querySelector(".loginBtn").disabled = true);
    console.log("click own==>",btn)
  }
});
email.addEventListener("input", function () {
  emailvalid();
  texts.innerHTML = "";
});

document.querySelector("#loginpage").addEventListener("submit", login);
