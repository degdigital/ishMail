(function(w){
    var sw = 900, //Viewport Width
        minViewportWidth = 320, //Minimum Size for Viewport
        maxViewportWidth = 900, //Maxiumum Size for Viewport
        viewportResizeHandleWidth = 14, //Width of the viewport drag-to-resize handle
        $sgWrapper = $('#sg-gen-container'), //Wrapper around viewport
        $sgViewport = $('#sg-viewport'), //Viewport element
        $sizePx = $('.sg-size-px'), //Px size input element in toolbar
        $sizeEms = $('.sg-size-em'), //Em size input element in toolbar
        $bodySize = 16, //Body size of the document
        fullMode = true,
        hash = window.location.hash.replace(/^.*?#/,'');
    
    $(w).resize(function(){ //Update dimensions on resize
        sw = maxViewportWidth; // document.body.clientWidth; 
        
        if(fullMode == true) {
            sizeFull();
        }
    });

    /* Nav Active State */
    function changeActiveState(link) {
        var $activeLink = link;
        $('.sg-size-options a').removeClass('active');

        if(link) {
            $activeLink.addClass('active');
        }
    }

    /* Pattern Lab accordion dropdown */
    $('.sg-acc-handle').on("click", function(e){
        var $this = $(this),
            $panel = $this.next('.sg-acc-panel');
        e.preventDefault();
        $this.toggleClass('active');
        $panel.toggleClass('active');
    });

    //Size Trigger
    $('#sg-size-toggle').on("click", function(e){
        e.preventDefault();
        $(this).parents('ul').toggleClass('active');
    });
    
    //Size View Events

    //Click Size Small Button
    $('#sg-size-s').on("click", function(e){
        e.preventDefault();
        fullMode = false;
        window.location.hash = 's';
        changeActiveState($(this));
        sizeSmall();
    });
    
    //Click Size Medium Button
    $('#sg-size-m').on("click", function(e){
        e.preventDefault();
        fullMode = false;
        window.location.hash = 'm';
        changeActiveState($(this));
        sizeMedium();
    });
    
    //Click Size Large Button
    $('#sg-size-l').on("click", function(e){
        e.preventDefault();
        fullMode = false;
        window.location.hash = 'l';
        changeActiveState($(this));
        sizeLarge();
    });

    //Click Full Width Button
    $('#sg-size-full').on("click", function(e){ //Resets 
        e.preventDefault();
        changeActiveState($(this));
        fullMode = true;
        window.location.hash = '';
        sizeiframe(sw);
    });

    //Size Small
    function sizeSmall() {
        sizeiframe(getRandom(minViewportWidth,420));
    }
    
    //Size Medium
    function sizeMedium() {
        sizeiframe(getRandom(420,620));
    }
    
    //Size Large
    function sizeLarge() {
        sizeiframe(getRandom(620,900));
    }

    //Size Random Size
    function sizeRandom() {
        fullMode = false;
        changeActiveState($('#sg-size-random'));
        sizeiframe(getRandom(minViewportWidth,sw));
    }
    
    //Size Full
    function sizeFull() {
        sizeiframe(sw, false);
        updateSizeReading(sw);
    }

    //Pixel input
    $sizePx.on('keydown', function(e){
        var val = Math.floor($(this).val());

        if(e.keyCode === 38) { //If the up arrow key is hit
            val++;
            sizeiframe(val,false);
            window.location.hash = val;
        } else if(e.keyCode === 40) { //If the down arrow key is hit
            val--;
            sizeiframe(val,false);
            window.location.hash = val;
        } else if(e.keyCode === 13) { //If the Enter key is hit
            e.preventDefault();
            sizeiframe(val); //Size Iframe to value of text box
            window.location.hash = val;
            $(this).blur();
        }
        changeActiveState();
    });

    $sizePx.on('keyup', function(){
        var val = Math.floor($(this).val());
        updateSizeReading(val,'px','updateEmInput');
    });

    //Em input
    $sizeEms.on('keydown', function(e){
        var val = parseFloat($(this).val());

        if(e.keyCode === 38) { //If the up arrow key is hit
            val++;
            sizeiframe(Math.floor(val*$bodySize),false);
        } else if(e.keyCode === 40) { //If the down arrow key is hit
            val--;
            sizeiframe(Math.floor(val*$bodySize),false);
        } else if(e.keyCode === 13) { //If the Enter key is hit
            e.preventDefault();
            sizeiframe(Math.floor(val*$bodySize)); //Size Iframe to value of text box
        }
        changeActiveState();
        
        window.location.hash = parseInt(val*$bodySize);
    });

    $sizeEms.on('keyup', function(){
        var val = parseFloat($(this).val());
        updateSizeReading(val,'em','updatePxInput');
    });
    
    // handle the MQ click
    $('#sg-mq a').on("click", function(e){
        e.preventDefault();
        var val = $(this).html();
        var type = (val.indexOf("px") !== -1) ? "px" : "em";
        val = val.replace(type,"");
        var width = (type === "px") ? val*1 : val*$bodySize;
        sizeiframe(width,true);
    });
    
    //Resize the viewport
    //'size' is the target size of the viewport
    //'animate' is a boolean for switching the CSS animation on or off. 'animate' is true by default, but can be set to false for things like nudging and dragging
    function sizeiframe(size,animate) {
        var theSize;

        if(size>maxViewportWidth) { //If the entered size is larger than the max allowed viewport size, cap value at max vp size
            theSize = maxViewportWidth;
        } else if(size<minViewportWidth) { //If the entered size is less than the minimum allowed viewport size, cap value at min vp size
            theSize = minViewportWidth;
        } else {
            theSize = size;
        }

        //Conditionally remove CSS animation class from viewport
        if(animate===false) {
            $sgWrapper.removeClass("vp-animate");
            $sgViewport.removeClass("vp-animate"); //If aninate is set to false, remove animate class from viewport
        } else {
            $sgWrapper.addClass("vp-animate");
            $sgViewport.addClass("vp-animate");
        }

        $sgWrapper.width(theSize+viewportResizeHandleWidth); //Resize viewport wrapper to desired size + size of drag resize handler
        $sgViewport.width(theSize); //Resize viewport to desired size

        updateSizeReading(theSize); //Update values in toolbar
    }
    

    
    
    //Update Pixel and Em inputs
    //'size' is the input number
    //'unit' is the type of unit: either px or em. Default is px. Accepted values are 'px' and 'em'
    //'target' is what inputs to update. Defaults to both
    function updateSizeReading(size,unit,target) {
        
        if(unit=='em') { //If size value is in em units
            emSize = size;
            pxSize = Math.floor(size*$bodySize);
        } else { //If value is px or absent
            pxSize = size;
            emSize = size/$bodySize;
        }
        if (target == 'updatePxInput') {
            $sizePx.val(pxSize);
        } else if (target == 'updateEmInput') {
            $sizeEms.val(emSize.toFixed(2));
        } else {
            $sizeEms.val(emSize.toFixed(2));
            $sizePx.val(pxSize);
        }
    }
    
    /* Returns a random number between min and max */
    function getRandom (min, max) {
        var num = Math.random() * (max - min) + min;
        
        return parseInt(num);
    }
    
    function updateViewportWidth(size) {
        $sgViewport.width(size);
        $sgWrapper.width(size*1 + 14);
        
        updateSizeReading(size);
    }

    // handles widening the "viewport"
    //   1. on "mousedown" store the click location
    //   2. make a hidden div visible so that it can track mouse movements and make sure the pointer doesn't get lost in the iframe
    //   3. on "mousemove" calculate the math, save the results to a cookie, and update the viewport
    $('#sg-rightpull').mousedown(function(event) {
        
        // capture default data
        var origClientX = event.clientX;
        var origViewportWidth = $sgViewport.width();
        
        fullMode = false;
        
        // show the cover
        $("#sg-cover").css("display","block");
        
        // add the mouse move event and capture data. also update the viewport width
        $('#sg-cover').mousemove(function(event) {
            
            viewportWidth = (origClientX > event.clientX) ? origViewportWidth - ((origClientX - event.clientX)*1) : origViewportWidth + ((event.clientX - origClientX)*1);
            
            if (viewportWidth > minViewportWidth && viewportWidth < maxViewportWidth) {
                
                
                window.location.hash = viewportWidth;
                sizeiframe(viewportWidth,false);
            }
        });
    });

    // on "mouseup" we unbind the "mousemove" event and hide the cover again
    $('body').mouseup(function(event) {
        $('#sg-cover').unbind('mousemove');
        $('#sg-cover').css("display","none");
    });

    // capture the viewport width that was loaded and modify it so it fits with the pull bar
    var origViewportWidth = $sgViewport.width();
    $sgWrapper.width(origViewportWidth);
    $sgViewport.width(origViewportWidth - 14);
    updateSizeReading($sgViewport.width());



    //Read Hash In URL
    if(hash === 'hay') { 
        startHay(); ///Start Hay mode if hash says 'hay'
    } else if(hash === 'disco') {
        startDisco(); //Start disco mode if hash says 'disco'
    } else if(hash === 'random') {
        sizeRandom(); ///Random screen size if hash says 'random'
    } else if(hash === 'l') {
        sizeLarge();
    } else if(hash === 'm') {
        sizeMedium();
    } else if(hash === 's') {
        sizeSmall();
    } else if(!isNaN(hash) && hash !== '') { //if screen size is a number
        sizeiframe(parseInt(hash));
    } else {
        sizeFull();
    }

})(this);