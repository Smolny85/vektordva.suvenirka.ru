jQuery(document).ready(function($) {
    
    var marker_icon = '/wp-content/themes/petroweb/img/marker-blue.png';

    /*
    *  new_map
    *
    *  This function will render a Google Map onto the selected jQuery element
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	4.3.0
    *
    *  @param	$el (jQuery element)
    *  @return	n/a
    */
    
    function new_map( $el ) {
    	
    	// var
    	var $markers = $el.find('.marker');
    	
    	
    	// vars
    	var args = {
    		zoom		: 16,
    		center		: new google.maps.LatLng(0, 0),
            disableDefaultUI: true,
    		mapTypeId	: google.maps.MapTypeId.ROADMAP,
            // styles taken from https://snazzymaps.com/style/38/shades-of-grey
            //styles      : [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
            styles      : [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}]
    	};
    	
    	
    	// create map	        	
    	var map = new google.maps.Map( $el[0], args);
    	
    	
    	// add a markers reference
    	map.markers = [];
    	
    	
    	// add markers
    	$markers.each(function(){
    		
        	add_marker( $(this), map );
    		
    	});
    	
    	
    	// center map
    	center_map( map );
    	
    	
    	// return
    	return map;
    	
    }
    
    /*
    *  add_marker
    *
    *  This function will add a marker to the selected Google Map
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	4.3.0
    *
    *  @param	$marker (jQuery element)
    *  @param	map (Google Map object)
    *  @return	n/a
    */
    
    function add_marker( $marker, map ) {
    
    	// var
    	var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );
    
    	// create marker
    	var marker = new google.maps.Marker({
    		position	: latlng,
    		map			: map,
            icon        : marker_icon
    	});
    
    	// add to array
    	map.markers.push( marker );
    
    	// if marker contains HTML, add it to an infoWindow
    	if( $marker.html() )
    	{
    		// create info window
    		var infowindow = new google.maps.InfoWindow({
    			content		: $marker.html()
    		});
    
    		// show info window when marker is clicked
    		google.maps.event.addListener(marker, 'click', function() {
    
    			infowindow.open( map, marker );
    
    		});
    	}
    
    }
    
    /*
    *  center_map
    *
    *  This function will center the map, showing all markers attached to this map
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	4.3.0
    *
    *  @param	map (Google Map object)
    *  @return	n/a
    */
    
    function center_map( map ) {
    
    	// vars
    	var bounds = new google.maps.LatLngBounds();
    
    	// loop through all markers and create bounds
    	$.each( map.markers, function( i, marker ){
    
    		var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
    
    		bounds.extend( latlng );
    
    	});
    
    	// only 1 marker?
    	if( map.markers.length == 1 )
    	{
    		// set center of map
    	    map.setCenter( bounds.getCenter() );
    	    map.setZoom( 17 );
            
            // ?????????????? ?????????? ?????? ???????????????????? ??????????????????
            map.panBy(250,0);
    	}
    	else
    	{
    		// fit to bounds
    		map.fitBounds( bounds );
    	}
    
    }
    
    /*
    *  document ready
    *
    *  This function will render each map when the document is ready (page has loaded)
    *
    *  @type	function
    *  @date	8/11/2013
    *  @since	5.0.0
    *
    *  @param	n/a
    *  @return	n/a
    */
    // global var
    var map = null;
    
    $(document).ready(function(){
    
    	$('.contact-map').each(function(){
    
    		// create map
    		map = new_map( $(this) );
    
    	});
    
    });

});