(function($, w) {

    var viewport = $("#sg-viewport");

    viewport.on('load', function() {
        var html = viewport.contents().find("body");
        var editableAreas = html.find('[data-editable]');
        var dropdown = $('#file-editor');

        editableAreas.each(function() {
            var element = $(this);
            var type = element.data('editable');
            var title = element.data('title');

            element.on('mouseover', function() {
                $(this).css({
                    "box-shadow": "0 0 1px #1982c4",
                    "cursor": "pointer"
                });
            }).on('mouseout', function() {
                $(this).css({
                    "box-shadow": "",
                    "cursor": ""
                });                
            }).on('click', function() {
                $('#file-editor').toggleClass('active');
            });

        });

    });

})(jQuery, this);