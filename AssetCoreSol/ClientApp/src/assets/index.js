jQuery(function ($) {

  $(".sidebar-dropdown > a").click(function () {
    $(".sidebar-submenu").slideUp(200);
    if ($(this).parent().hasClass("active")) {
      //if already opened, flip it
      $(".sidebar-dropdown").removeClass("active");
      $(this).parent().removeClass("active");
    }
    else {
      //if clicked and still closed, open it.
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");

    }
  });

  $("#close-sidebar").click(function () {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function () {
    $(".page-wrapper").addClass("toggled");
  });


  var baseURL = window.location.origin;
  var host = window.location.host;
  //navigation pages
  var dashboard = "/" + $("#dashboard").text().toLowerCase();
  var assets = "/" + $("#assets").text().toLowerCase();
  var components = "/" + $("#components").text().toLowerCase();
  var charts = "/" + $("#charts").text().toLowerCase();


  var pathArray = window.location.pathname;
  if (pathArray !== "/") {
    if (dashboard === pathArray) {
      $(".dashboard").addClass("active");
      $(".dashboard").children('div').attr("style", "display:block");
    }

    if (assets === pathArray) {
      $(".assets").addClass("active");
      $(".assets").children('div').attr("style", "display:block");
      }
    if (components === pathArray) {
      $(".components").addClass("active");
      $(".components").children('div').attr("style", "display:block");
    }

    if (charts === pathArray) {
      $(".charts").addClass("active");
      $(".charts").children('div').attr("style", "display:block");
      }

    
  }
  //if($(this).URL)

});

