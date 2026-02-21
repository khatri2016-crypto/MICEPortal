$(document).ready(function () {
  $("#btnGoogleLogin")
    .off("click")
    .on("click", () => {
      $("#informativeModal").modal("show");
      $("#informativeModal .modal-title").text("google login");
      $("#informativeModal .modal-body p").text(
        "Page is still under construction.",
      );
    });

  $("#linkForgotPassword")
    .off("click")
    .on("click", () => {
      $("#informativeModal").modal("show");
      $("#informativeModal .modal-title").text("forgot password");
      $("#informativeModal .modal-body p").text(
        "Page is still under construction.",
      );
    });

  $(".btn-password-toggle")
    .off("click")
    .on("click", () => {
      const toggleState = $("#password").attr("type");
      if (toggleState == "password") {
        $("#password").attr("type", "text");
        $(".btn-password-toggle i")
          .removeClass("fa-eye")
          .addClass("fa-eye-slash");
      } else {
        $("#password").attr("type", "password");
        $(".btn-password-toggle i")
          .removeClass("fa-eye-slash")
          .addClass("fa-eye");
      }
    });

  $("#btnSignIn")
    .off("click")
    .on("click", () => {
      const username = $("#username").val();
      const password = $("#password").val();
      if (
        !username ||
        username.length < 1 ||
        !password ||
        password.length < 1
      ) {
        if (!username || username.length < 1) {
          $("#username").focus();
          toggleToast("danger", "Invalid username");
        }
        if (!password || password.length < 1) {
          $("#password").focus();
          toggleToast("danger", "Invalid password");
        }
      } else {
        if (
          (username == "admin" && password != "admin") ||
          (username == "mice" && password != "mice") ||
          (username == "owner" && password != "owner") ||
          (username == "venue" && password != "venue")
        ) {
          $("#password").val("");
          $("#password").focus();
          toggleToast("danger", "Invalid credentials");
        } else {
          if (username == "admin" && password == "admin") {
            window.location.href = "/admin/dashboard.html";
          } else if (username == "mice" && password == "mice") {
            window.location.href = "/mice/dashboard.html";
          } else if (username == "owner" && password == "owner") {
            window.location.href = "/corporate/dashboard.html";
          } else if (username == "venue" && password == "venue") {
            window.location.href = "/venue/dashboard.html";
          } else {
            toggleToast("danger", "User does not exist");
            $("#password").val("");
            $("#password").focus();
            return;
          }
        }
      }
    });

  $("#hamburger")
    .off("click")
    .on("click", () => {
      $("#informativeModal .modal-title").text("Login Credentials");
      $("#informativeModal .modal-body").html($(".login-notes .notes-grid").html());
      $("#informativeModal").modal("show");
    });
});
