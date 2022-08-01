const token = localStorage.getItem("token");
const tokens = JSON.parse(atob(token.split(".")[1]));
localStorage.setItem("role", tokens.role);

  if (token) {
    const role = localStorage.getItem("role");
    if (role === "user") {
      window.location.href = "./order.html";
    } else {
      window.location.href = "./admin.html";
    }
  }