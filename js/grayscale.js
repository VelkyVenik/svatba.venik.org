/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */


// jQuery to collapse the navbar on scroll
function collapseNavBar() {
    //var top = $(".navbar").offset().top;
    var top = window.scrollY;


    if (top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}


//$(window).scroll(function() {
//collapseNavBar();
//});

//var scrollInterval = null;

//$(window).bind("touchmove", function(e) {
//scrollInterval = window.setInterval("collapseNavBar", 100);
//});

//$(window).on('touchend', function() {
//clearInterval(scrollInterval);
//});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});


// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(function() {
    $('#countdown').countdown("2015/09/19 14:00:00", {elapse: true})
    .on('update.countdown', function(event) {
        var $this = $(this);
        var format;

        if (event.elapsed)
            format = 'Už jsme spolu ';
        else
            format = 'Zbývá ';

        /* Years */
        if (event.offset.years > 4)
            format += '%-Y let ';
        else if (event.offset.years > 1)
            format += '%-Y roky ';
        else if (event.offset.years > 0)
            format += '%-Y rok ';

        var months = event.offset.months - event.offset.years*12;
        /* Months */
        if (months > 4)
            format += months + ' měsíců ';
        else if (months > 1)
            format += months + ' měsíce ';
        else if (months > 0)
            format += months + ' měsíc ';

        /* Days */
        if (event.offset.daysToMonth > 4)
            format += '%-n dní ';
        else if (event.offset.daysToMonth > 1)
            format += '%-n dni ';
        else if (event.offset.daysToMonth > 0)
            format += '%-n den ';

        /* Hours */
        if (event.offset.hours > 4)
            format += '%-H hodin ';
        else if (event.offset.hours > 1)
            format += '%-H hodiny ';
        else if (event.offset.hours > 0)
            format += '%-H hodina ';

        $this.html(event.strftime(format));
    });
});

$(document).ready(function() {
    $(".navbar-fixed-top").addClass("top-nav-collapse");

    // validate form on keyup and submit
    $("#contact-form").validate({
        debug: true,
        rules: {
            contact_name: "required",
            contact_street: "required",
            contact_city: "required",
            contact_psc: "required",
            contact_email: {
                required: true,
                email: true
            }
        },
        messages: {
            contact_name: "Prosím zadejte své jméno",
            contact_street: "Prosím zadejte název ulice",
            contact_city: "Prosím zadejte název města",
            contact_psc: "Prosím zadejte PSČ",
            contact_email: "Prosím zadejte svůj email"
        },
        submitHandler: function(e) {
            //$('#contact_form').on('submit', function(e) {
            //e.preventDefault();

            $("#contact_submit").html("<i class='fa fa-cog fa-spin fa-2x'></i>");
            $("#contact_submit").attr("disabled", "disabled");

            var name = $('#contact_name').val();
            var street = $('#contact_street').val();
            var city = $('#contact_city').val();
            var psc = $('#contact_psc').val();
            var email = $('#contact_email').val();

            console.log(name, street, city, psc, email);

            $.ajax({
                url: "https://docs.google.com/forms/d/1qFo_Sda67VM5jKv3koQ4ZY3O5cFS3qiWOm0dC8F-_d8/formResponse",
                data: {
                    "entry.1528302845": name,
                    "entry.789827823": street,
                    "entry.993063381": city,
                    "entry.1860572910": psc,
                    "entry.127017350": email
                },
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: function() {
                        //Success message
                        contactSaved();
                    },
                    200: function() {
                        //Success Message
                        contactSaved();
                    }
                }
            });

        }
    });
});

function contactSaved() {
    $("#contact-show").attr('disabled', 'disabled');
    $("#contact-show").text("Počítáme s tebou")
    $('#modal-contact').modal('toggle');
    $('#modal-success').modal('toggle');
}

// Google Maps Scripts
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', googleMapsInit);

function googleMapsInit() {
    // Basic options for a simple Google Map
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 16,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(49.1920633, 16.5622809),

        // Disables the default Google Maps UI components
        //disableDefaultUI: true,
        scrollwheel: false,
        //draggable: false,

        styles: [{
            "featureType": "all",
            "elementType": "all",
            "stylers": [{
                "invert_lightness": true
            }, {
                "saturation": 10
            }, {
                "lightness": 30
            }, {
                "gamma": 0.5
            }, {
                "hue": "#435158"
            }]
        }],

    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon
    var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(49.1922771, 16.5638355),
        map: map,
        title: "Hotel Stantander"
    });

    var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(49.19361, 16.5654486),
        map: map,
        title: "Penzion Jupiter",
    });

}
