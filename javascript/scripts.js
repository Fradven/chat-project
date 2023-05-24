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
            $("body").append(`
                    <div id="myModal" class="modal-component">
                        <div class="modal-content bg-dark">
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
    console.log("enter user ::>"+data)
    $("#content-container").html('');
    data.users.map(user => {
        $("#content-container").append(`
            <button>${user.user}</button>
        `);
    })
  }, "json")
}