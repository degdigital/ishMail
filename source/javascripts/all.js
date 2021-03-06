//= require plugins/url-handler
//= require plugins/ish
//= require plugins/editable

(function($){
  $(document).ready(function() {
    //Navigation toggle
    $('#file-manager-trigger').click(function(e) {
        e.preventDefault();
        $('#file-manager').toggleClass('active');
        $('body').toggleClass('menu-active');
    }); 

    $('#file-manager').find('a').on('click', function(e) {
        e.preventDefault();
        $('#sg-viewport').attr('src', $(this).attr('href'));
        $('#file-manager').find('.active').removeClass('active');
        $(this).parent().addClass('active');
    });
    $('#file-editor').find('button').on('click', function(e) {
        e.preventDefault();
        $('#file-editor').removeClass('active');
    });
  });
})(jQuery);