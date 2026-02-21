$(document).ready(function () {
  $("#btnGoogleSignUp")
    .off("click")
    .on("click", () => {
      $("#informativeModal").modal("show");
      $("#informativeModal .modal-title").text("google sign up");
      $("#informativeModal .modal-body p").text(
        "Page is still under construction.",
      );
    });

  $("#btnPasswordToggle")
    .off("click")
    .on("click", () => {
      const toggleState = $("#password").attr("type");
      if (toggleState == "password") {
        $("#password").attr("type", "text");
        $("#btnPasswordToggle i")
          .removeClass("fa-eye")
          .addClass("fa-eye-slash");
        $("#confirmPassword").attr("type", "text");
        $("#btnConfirmPasswordToggle i")
          .removeClass("fa-eye")
          .addClass("fa-eye-slash");
      } else {
        $("#password").attr("type", "password");
        $("#btnPasswordToggle i")
          .removeClass("fa-eye-slash")
          .addClass("fa-eye");
        $("#confirmPassword").attr("type", "password");
        $("#btnConfirmPasswordToggle i")
          .removeClass("fa-eye-slash")
          .addClass("fa-eye");
      }
    });

  $("#btnConfirmPasswordToggle")
    .off("click")
    .on("click", () => {
      const toggleState = $("#confirmPassword").attr("type");
      if (toggleState == "password") {
        $("#password").attr("type", "text");
        $("#btnPasswordToggle i")
          .removeClass("fa-eye")
          .addClass("fa-eye-slash");
        $("#confirmPassword").attr("type", "text");
        $("#btnConfirmPasswordToggle i")
          .removeClass("fa-eye")
          .addClass("fa-eye-slash");
      } else {
        $("#password").attr("type", "password");
        $("#btnPasswordToggle i")
          .removeClass("fa-eye-slash")
          .addClass("fa-eye");
        $("#confirmPassword").attr("type", "password");
        $("#btnConfirmPasswordToggle i")
          .removeClass("fa-eye-slash")
          .addClass("fa-eye");
      }
    });

  $("#btnRegisterUser")
    .off("click")
    .on("click", () => {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    });
});
