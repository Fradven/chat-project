// fetch login form when the page loads
$(document).ready(() => {
	$.post(
        "php/api.php",
        { action: "session" },
        (data) => {
          if (data.session === "none") {
            $("#content-container").html(`
                <div class="col-3 m-auto pt-5 login-form">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" class="form-control" id="username" name="username"   aria-describedby="username" placeholder="Enter username">
                    </div>

                    <div class="form-group pt-1">
                      <label for="pwd">Password</label>
                      <input type="password" class="form-control" id="pwd" name="pwd" placeholder="Password">
                    </div>

                    <div class="container__login-btn">
                        <button type="submit" class="btn btn-gold submit" value="login" name="login">Login</button>
                    </div>
                </div>
            `)
          } else 
              userView();
        },
        "json"
      );
});

// login
$("#content-container").on("click", ".submit", () => {
	let username = $("#username").val().trim();
	let password = $("#pwd").val().trim();

	$.post(
        "php/api.php",
        {
          action: "login",
          username: username,
          pwd: password,
        },
        (data) => {
          if (data.error) {
            $("#content-container").append(`
                    <div id="myModal" class="modal-component">
                        <div class="modal-content bg-warning">
                            <p>${data.error}</p>
                        </div>
                    </div>
                `);
          } else {
            userView();
          }
        },
        "json"
      );
});

// fetch users
userView = () => {
  $.post("php/api.php", { action: "list-user" }, (data) => {
    $("#content-container").html('');
    $("#content-container").append(`
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Open chat
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="user-dropdown"></div>
      </div>
    `);

    data.users.forEach(user => {
      $("#user-dropdown").append(`<button class="dropdown-item dropdown-users" value="${user.user}">${user.user}</button>`);
    });

    // Update button text on user selection
    $(".dropdown-item").click(function() {
      const selectedUser = $(this).text();
      $("#dropdownMenuButton").text(selectedUser);
    });
  }, "json");
}

$("#logout").on("click", () => {
  $.post("php/api.php", { action: "logout" }, (data) => {
    console.log("kill")
  })
})