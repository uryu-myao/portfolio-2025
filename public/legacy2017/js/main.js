//loading
$(function() {
  $('#loader').delay(2800).fadeOut(1600);
  $('#loader-bg').delay(3600).fadeOut(2000);
});


//toggle profile
$(function() {

  let $body = $('body'),
      $close = $('.nav_close > img'),
      $open = $('.nav_icon');

  $open.on('click', function() {
    $body.addClass('nav-is-open', 2000);
    $(this).hide();
  });

  $close.on('click', function() {
    $body.removeClass('nav-is-open');
    $open.show();
  })
});


//back to top
$(function() {

  let offset = 3500,
      offset_opacity = 3800,
      scroll_top_duration = 700;

  $back_to_top = $('.btn_top');

  $(window).scroll(function(){
    ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('btn-is-visible') : $back_to_top.removeClass('btn-is-visible btn-fade-out');
    if( $(this).scrollTop() > offset_opacity ) {
      $back_to_top.addClass('btn-fade-out');
    }
  });
  $back_to_top.on('click', function(event){
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0,
      }
    )
  })
});


//scrollin fadein
$(function(){

  $(window).scroll(function () {
    $('.animate-this').each(function(){

      let elemPos = $(this).offset().top,
          scroll = $(window).scrollTop(),
          windowHeight = $(window).height();

      if (scroll > elemPos - windowHeight + 170) {
          $(this).addClass('scrollin');
      }
    });
    $('.animate-this2').each(function() {

      let elemPos = $(this).offset().top,
          scroll = $(window).scrollTop(),
          windowHeight = $(window).height();

      if (scroll > elemPos - windowHeight + 200) {
          $(this).addClass('scrollin');
      }
    })
  })
});
