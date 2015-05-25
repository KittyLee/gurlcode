window.addEventListener("load", function() {

  jQuery(document).ready(function($) {
    
    var resultsDiv = $("#clinic-search-results");

    clinicSearchAjax = function(ajaxParams) {

      /*      api calls uses one of the two options
       http://bedsider.org/clinics/search?zip=90210&limit=10&within=4
       http://bedsider.org/clinics/search?lat=37.0625&lng=-95.6770&limit=10&within=2
       */

      ajaxParams.limit = 7;
      ajaxParams.action = 'get_bedsider_json';
      
      /* @todo: HELP! change the html code of var resultsDiv to "loading".
          $.mobile.loading( 'show', {
          text: 'foo',
          textVisible: true,
          theme: 'z',
          html: ""
          });
      */
   

      // @todo: try scrollspy OR scroll to bottom of page.
      //$('[data-spy-"scroll"]').each(function () {
        //  var $spy = $(this).scrollspy('refresh')
      //})
      //$('#div').scroll();
      //$("#div").animate({ scrollTop: $(".middle").offset().top
       // }, 2000);

      $.ajax({
        url : ajaxUrl,
        method : "POST",
        data : ajaxParams,
        dataType : "json",
      }).done(function(jsonFromBedsider) {

        // @todo check that jsonFromBedsider.clinics exists and has at least 1 element;
        //var clinicDetails = {}; // Empty Object
        // if(isEmpty(clinicDetails)) {  // Object is empty (Would return true in this example)
        //  } else  alert ("Nothing found. Try another search."); // Object is NOT empty
        //}        
        // use if statement then change resultsDiv to "no matches, search again"; else proceed with following (i.e. next loop);
        // to make sure bedsider is returning clinic objects - not just that no clinics were found.
        // see if jquery way to check if something is an object and that object has a property.
        /*$.each(jsonFromBedsider.clinics, function() ){*/
        
          console.log(this); // this is where the object "names" are defined.
        
          var clinicDetails = "";
        
          clinicDetails += "<div class='bedsider-search-result- item'>"; 
          clinicDetails += "<h2 class='bedsider-search-result-item- title'>"+this.formatted_name+"</h2><br />"; 
          // @todo who do I get the title name to link to src=this.formatted_url?

          clinicDetails += "<divonclick="window.location.href"='tel:';">+this .formatted_phone+"</div><br />";           
          clinicDetails += "<p>";
          clinicDetails += "<a href='tel:'"+this.formatted_phone+" class='bedsider-search-result-item-tel'>"+this.formatted_phone+"</a><br />";
          clinicDetails += "<a href='address:'"+this.full_address+" class='bedsider-search-result-item-address'>"+this.full_address+"</a><br />";
          /*clinicDetails += "<a href='address:'"+this.full_address+" <src=https://maps.google.it/maps?q=<?php echo $this.full_address; ?>&output=embed>
            class='bedsider-search-result-item-address'>"+this.full_address+"</a><br />";*/
/*clinicDetails += "<a href=https://maps.google.it/maps?q=<?php echo $this.full_address; ?>&output=embed" class
='bedsider-search-result- item- address'>"+this.full_address+" </a><br />"; /*clinicDetails += "<iframe width="640"
height="480" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.it/maps?q=<?php
echo $+this.full_address; ?>&output=embed">"</iframe></br>"; /*clinicDetails += "<link rel="stylesheet"
href='url:'"+this.full_address+" class='bedsider- search-result-item-address'>"+this.full_address+" </a><br / >";*/


           /*// @todo fix the link  - possibly use link rel=
          //clinicDetails += "<link rel="stylesheet" href='url:'"+this.full_address+" class='bedsider-search-result-item-address'>"+this.full_address+" </a><br / >";
          clinicDetails += "<a href='url:'"+this.formatted_url+" link rel="external" class='bedsider-search-result-item-url'>"+this.formatted_url+"</a><br />";
          //@todo address;  url;*/
          clinicDetails += "</p>";
          
          // clinic features listed here;
          clinicDetails += "<ul>";
          
          $.each(this.features, function() {
		    clinicDetails += "<li>"+this+"</li>";
          });
          
          clinicDetails += "<ul>";
          clinicDetails += "</div>";
        
          $(resultsDiv).empty().append(clinicDetails);//replace and clear before append (with clinicDetails)

          
        });
        
      }).fail (function (XHR, status, error) {
        //console.log(error);
         // @todo change resultsDiv to say there was an error 
      //});

    };


    $("#zip-code-form").submit(function(e) {
      //  when the form is submitted, this function will run
      //console.log(e);  //  uncommment to see details of the event object created by the form submission
      e.preventDefault();
      // this keeps the form from loading a new page
      var zipVal = $("#zipcodeinput").val();
      var radiusVal = $("input[name=radius]:checked").val(); 
      // @todo check that both have something - if not there, give popup saying "Yo! I need both a zipcode and a radius to do your search."
      // @todo if zipVal and radiusVal= number else proceed with the code.
      if ( zipVal && radiusVal ) {
      // @ todo - may want to confirm these are numeric vallues greater than 0 and 5 digits;
        var urlparams = {
          zip : zipVal,
          within : radiusVal
        };
        clinicSearchAjax(urlparams);
      } else {
        alert("Yo! I need both a zipcode and a radius to do your search");
      }
    });

    $("#find-nearby-button").click(function(e) {
      //console.log(e);  //  uncommment to see details of the event object created by the form submission
      e.preventDefault();
      //  and this keeps the form from loading a new page
      //console.log("clicked!");

      if ("geolocation" in navigator) {
        /* geolocation is available */
        var options = {
          timeout : 5000,
          maximumAge : 0
        };

        function success(pos) {
          // var crd = pos.coords;
          // var latVal = crd.latitude;
          // var lngVal = crd.longitude;
          // var locparams = {
          // lat : latVal,
          // lng : lngVal,
          // within : 2
          // };
          //  above code does the same, just broken into smaller steps
          clinicSearchAjax({
            lat : pos.coords.latitude,
            lng : pos.coords.longitude,
            within : 2
          });
          //http://bedsider.org/clinics/search?lat=37.0625&lng=-95.6770&limit=10&within=2;
        };

        function error(err) {
          alert("I can't figure out your location. Please type in your own zip code.");
        };

        navigator.geolocation.getCurrentPosition(success, error, options);

      } else {
        alert("I can't figure out your location. Please type in your own zip code.");
        /* geolocation IS NOT available */
      }
    

    });
  });
}, false);

