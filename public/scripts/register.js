const emailError = document.querySelector(".errMsgs");
const compasserr = document.querySelector(".passMsg");
const errorMs = document.querySelector(".errMsg");

const register = (e) => {
  e.preventDefault();

  if (emailError.innerHTML === "" && compasserr.innerHTML === "" && errorMs.innerHTML === "") {
  

  const url = "https://backfiles.herokuapp.com";
  fetch(`${url}/user/signup`, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: document.querySelector(".name").value,
      email: document.querySelector(".email").value,
      password: document.querySelector(".pass").value,
      confirmPassword: document.querySelector(".compass").value,
      phoneNumber: document.querySelector(".phoneNumber").value,
      address: document.querySelector(".address").value,
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
        if (res.message === "Account already exist for this Email") {
          alert("Account already exist for this EmailAddress");
        }

        const emailError = document.querySelector(".errMsgs");
        emailError.innerHTML = res.errors.email;
        emailError.style.color = "red";

        if (emailError.innerHTML === "undefined") {
          emailError.innerHTML = "";
        }
      }
    })
    .catch();
  }
};
document.querySelector(".name").addEventListener("input", function (e) {
  e.preventDefault();
  e.target.value = e.target.value.trim();
});
document.querySelector(".email").addEventListener("input", function (e) {
  e.preventDefault();
  e.target.value = e.target.value.trim();
});

const passvalid = document.querySelector(".pass");
const compassvalid = document.querySelector(".compass");
const compasser = document.querySelector(".passMsg");

compassvalid.addEventListener("input", function (e) {
  e.preventDefault();

  if (compassvalid.value === passvalid.value) {
    compasserr.innerHTML = "";
    (document.querySelector(".signUp").disabled = false);
  } else {
    compasserr.innerHTML = "password does not match";
    compasserr.style.color = "red";
    (document.querySelector(".signUp").disabled = true);
  }
  if (compassvalid.value === "") {
    compasserr.innerHTML = "";
  }
});

const passlength = document.querySelector(".pass");
const compasserrr = document.querySelector("#passMsg");
passlength.addEventListener("input", function () {
  if (passlength.value.length <= 5) {
    compasserrr.innerHTML = "Password should be at least 6 characters long";
    compasserrr.style.color = "red";
  } else {
    compasserrr.innerHTML = "";
  }
});

const phone = document.querySelector(".phoneNumber");
const errorMsg = document.querySelector(".errMsg");
const text = document.querySelector(".text");
function phonevalid() {
  const phone = document.querySelector(".phoneNumber").value;
  const errorMsg = document.querySelector(".errMsg");
  const pattern = /^(\+|00)[0-9]{1,3}[0-9]{7,14}(?:x.+)?$/;

  if (phone.match(pattern)) {
    errorMsg.innerHTML = "";
  } else {
    errorMsg.innerHTML =
      "Phone number should be atleast (8)characters! & should contain a country code";
    errorMsg.style.color = "red";
  }
  if (phone === "") {
    errorMsg.innerHTML = "";
  }
}
phone.addEventListener("input", function () {
  phonevalid();
  text.innerHTML = "";
});
phone.addEventListener("click", () => {
  text.style.color = "red";
});

const email = document.querySelector(".email");
const emailerr = document.querySelector(".errMsgs");
const texts = document.querySelector(".words");
function emailvalid() {
  const email = document.querySelector(".email").value;
  const emailerr = document.querySelector(".errMsgs");
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (email.match(pattern)) {
    emailerr.innerHTML = "";
  } else {
    emailerr.innerHTML = "Enter a valid email address!";
    emailerr.style.color = "red";
  }
  if (email === "") {
    errorMsg.innerHTML = "";
  }
}
email.addEventListener("click", () => {
  emailvalid();
  text.style.color = "red";
});
email.addEventListener("input", function () {
  emailvalid();
  texts.innerHTML = "";
});
const confirms = document.querySelector(".compass");
confirms.addEventListener("mouseout", function () {
  if (confirms.value === "") {
    document.querySelector(".passMsg").innerHTML =
      "please fill the input field";
  }
});

document.querySelector("#registerpage").addEventListener("submit", register);
