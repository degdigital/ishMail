(function($){
  $(document).ready(function() {
    //Navigation toggle
    $('#file-manager-trigger').click(function(e) {
        e.preventDefault();
        $('#file-manager').toggleClass('active');
        $('body').toggleClass('menu-active');
    });  

  });
})(jQuery);