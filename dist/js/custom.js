function dataAno() {
  var data = new Date();
  $('#dataAno').html(data.getFullYear());
}
$(document).ready(function () {
  // hide #back-top first
  $("#scroll-top").hide();
  // fade in #back-top
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('#scroll-top').fadeIn();
      } else {
        $('#scroll-top').fadeOut();
      }
    });
    // scroll body to 0px on click
    $('#scroll-top button').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
    });
  });

});
 
// nav-link indo pro lugar certo no celular e no desktop
$(".nav-link").click(function() {
  var offsetTop = 100;
  
    if ($(window).width() <= 576) {
      offsetTop -= 15;
    }
  
    var aid = $(this).attr("href");
    $('html,body').animate({scrollTop: $(aid).offset().top - offsetTop },'slow');
  });

// Collapse responsive navbar when toggler is visible
const navbarToggler = document.body.querySelector('.navbar-toggler');
const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarNav .nav-item')
);
responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
            navbarToggler.click();
        }
    });
});