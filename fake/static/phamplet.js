	$("document").ready()function{

    
    
    /*Scroll to selected anchor (or div?)*/
    $('a[href^="#"]').on('click', function(event) {
    
    var target = $(this.href);
    
	    if( target.length ) {
    	event.preventDefault();
    	$('html, body').animate({
    	scrollTop: target.offset().top
    		}, 1000);
    	}
    });
    
    /*Useful websites
    animate: https://api.jquery.com/animate/
    http://stackoverflow.com/questions/6677035/jquery-scroll-to-element
    http://stackoverflow.com/questions/832860/how-to-scroll-the-window-using-jquery-scrollto-function
    
    */