(function() {
	'use strict';

	var $audio = $('#audio');
	var $player = $('#player');
	var $playlist = $('nav.tracks');
	var $tracks = $playlist.find('a');
	var $player = $audio.find('audio');
	var currentTrack = 1;
	var progressCounter = 0;
	var playerInterval = null;
	var player	 = null;

	$audio.volume = 0.5;

	$tracks.on('click', function(e) {
		e.preventDefault();
		$audio.find('h1').html( jQuery(this).text() );


		if ( $audio.find('a').attr('href') == jQuery(this).attr('href')) {

			$audio.removeClass('active');
			$audio.find('a').attr('href', "#");

			$('.fa-pause').trigger('click');
			clearInterval( playerInterval );

		} else {

			console.log("new");

			$audio.addClass('active');
			$audio.find('a').attr('href', jQuery(this).attr('href'));


			jQuery.ajax({
				xhr: function(){
					var xhr = new window.XMLHttpRequest();
					jQuery('#audio hr').removeClass('hide').css('width', '0%');
					xhr.addEventListener("progress", function(evt){
						if (evt.lengthComputable) {
							var percentComplete = parseInt((evt.loaded / evt.total) * 100);
							//var r = $circle.attr('r');
							//var c = Math.PI*(r*2);
							//pct = ((100-percentComplete)/100)*c;

							///$circle.css({ strokeDashoffset: pct });

							//if ( parseInt() )
							console.log(jQuery('#audio hr').css('width'));
							jQuery('#audio hr').css('width', percentComplete+"%");
							if (percentComplete === 100)
								jQuery('#audio hr').addClass('hide');
						}
					}, false);

					return xhr;
				},
				type: 'GET',
				url: jQuery(this).attr('href'),
				data: {},
				complete : function () {}
			});

			$player.attr("src", jQuery(this).attr('href'));
			player = document.getElementsByTagName("audio")[0];
			player.play();

			//$player.attr("src", jQuery(this).attr('href'));


			jQuery('span#control').attr('class', 'fa fa-pause');
			playerInterval = setInterval(playerCheck, 1000);
		}

	});

//	jQuery($tracks[0]).trigger('click');

	function playerCheck(){
		player = document.getElementsByTagName("audio")[0];


		if (player.ended !== false){
			$('#player .icon-pause').removeClass('icon-pause').addClass('icon-play');
			clearInterval(playerInterval);
		}

		if (player.ended == false && !player.paused && player.duration > 0){
			$('span#control').removeClass('fa-play').addClass('fa-pause')
		} else if (player.ended == false && player.paused && player.duration > 0){
			$('span#control').removeClass('fa-pause').addClass('fa-play');
		}

	}

	$(document).on('click', '#audio .fa-play', function(e){
		e.preventDefault();
		jQuery(this).removeClass('fa-play').addClass('fa-pause');

		player = document.getElementsByTagName("audio")[0];
		player.play();

		playerInterval = setInterval(playerCheck, 1000);
	});

	$(document).on('click', '#audio .fa-pause', function(e){
		e.preventDefault();
		jQuery(this).removeClass('fa-pause').addClass('fa-play');

		player = document.getElementsByTagName("audio")[0];
		player.pause();

		clearInterval(playerInterval);
	});




})();
