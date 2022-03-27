$(document).ready(function () {
	// console.log('Diwakar Prasad');

	var play = document.getElementById("play");
	var title = document.getElementById("title");
	var artistAlbum = document.getElementById("artistAlbum");
	var thumb = document.getElementById("thumb");
	var progress = document.getElementById("progress");
	var repeatIcon = document.getElementById("repeatId");
	var seeking = false;
	var index = 0;
	var repeat = false;
	var musicmetadatas = {
		title: "",
		album: "",
		artist: "",
		genre: "",
		picture: "",
		year: "",
	};
	// console.log(musicmetadatas);

	var counter = 0;
	var audio = new Audio();
	audio.volume = 0.5;

	// Show and Hide Loader..
	$(".loader").hide();

	console.log(audio.played);

	var playlist = [
		{
			title: "Naina re tu hi",
			thumb: "img/2.png",
			uri: "audio/NAINA RE TU HI.mp3",
		},
		{
			title: "Tere liye",
			thumb: "img/1.png",
			uri: "audio/TERE LIYE.mp3",
		},
		{
			title: "Yeh kasoor",
			thumb: "img/4.png",
			uri: "audio/YEH KASOOR.mp3",
		},
		{
			title: "Haal - E - Dil (Female)",
			thumb: "img/5.png",
			uri: "audio/06 Haal - E - Dil (Female).mp3",
		},
		{
			title: "Ek Number",
			thumb: "img/6.png",
			uri: "audio/07 Ek Number.mp3",
		},
		{
			title: "Kheech Meri Photo (Sanam Teri Kasam)",
			thumb: "img/4.png",
			uri: "audio/02 Kheech Meri Photo (Sanam Teri Kasam).mp3",
		},
		{
			title: "Akh Lad Jaave",
			thumb: "img/4.png",
			uri: "audio/Akh Lad Jaave.mp3",
		},
	];
	// Calling Playlist function....
	renderPlaylist();
	$(".playlist-item").hide(); // Initialy Hide the Playlist menu

	// Rendring the playlist...
	function renderPlaylist() {
		var plist = "";
		plist += "<ul>";
		for (let i = 0; i < playlist.length; i++) {
			plist +=
				'<li class="listItem" data-value="' +
				i +
				'"><i class="ion-ios-play"></i>&nbsp;' +
				playlist[i].title +
				"</li>";
		}
		plist += "</ul>";
		$(".playlist-item").html(plist);
	}

	// Calling Visusalizer./..
	visualizer();

	$(".listItem").click(function (e) {
		index = e.target.dataset.value;
		// console.log(index);
		// console.log(e);
		playA(parseInt(index));
		// console.log(index);
	});

	function playA(currentIndex) {
		index = (currentIndex + playlist.length) % playlist.length;
		// musicMetaData(index);

		// Showing Loader...
		$(".loader").show(200);
		document.getElementById("thumb").style.opacity = 0.5;
		var url = playlist[index].uri;
		var xml = new XMLHttpRequest();
		xml.responseType = "arraybuffer";
		xml.open("get", url, true);
		xml.onload = function (e) {
			musicmetadata(e.target.response, function (err, result) {
				// console.log(result);
				if (result.picture.length > 0) {
					var picture = result.picture[0];
					var url = URL.createObjectURL(
						new Blob([picture.data], {
							type: "image/" + picture.format,
						})
					);
				}
				musicmetadatas.title = result.title;
				musicmetadatas.album = result.album;
				musicmetadatas.artist = result.artist;
				musicmetadatas.genre = result.genre;
				musicmetadatas.year = result.year;
				musicmetadatas.picture = url;

				thumb.style.backgroundImage = "url(" + musicmetadatas.picture + ")"; // Setting the song thumb
				artistAlbum.innerHTML =
					musicmetadatas.artist + " - " + musicmetadatas.album;
				// document.getElementById("wrapper").style.background =
				// 	"url(" + musicmetadatas.picture + ") center no-repeat";
				// RGBaster.colors(musicmetadatas.picture, {
				// 	success: function (payload) {
				// 		// You now have the payload.
				// 		console.log(payload.dominant);
				// 		console.log(payload.secondary);
				// 		// console.log(payload.palette);
				// 		// title.style.color = payload.secondary;
				// 	},
				// });
			});
			$(".loader").hide(200);
			document.getElementById("thumb").style.opacity = 1;
		};
		xml.send();

		audio.src = playlist[index].uri;
		// thumb.style.backgroundImage = "url(" + musicmetadatas.picture + ")"; // Setting the song thumb
		title.innerHTML = playlist[index].title;
		// artistAlbum.innerHTML = musicmetadatas.artist + ' - ' + musicmetadatas.album;
		// Audio play
		$("#playId").attr("class", "ion-pause");
		audio.play();
	}

	$("#play").click(function () {
		console.log("Play ");
		if (audio.paused) {
			$("#playId").attr("class", "ion-pause");
			audio.play();
		} else {
			$("#playId").attr("class", "ion-ios-play");
			audio.pause();
		}
	});

	$("#next").click(function () {
		console.log("Next ");
		playA(index + 1);
	});

	$("#prev").click(function () {
		console.log("Prev ");
		playA(index - 1);
	});

	$("#repeat").click(function () {
		console.log("Repeat ");
		// repeat = true;
		if (repeat == true) {
			repeat = false;
			repeatIcon.style.fontWeight = "normal";
		} else {
			repeat = true;
			repeatIcon.style.textDecoration = "underline";
		}
	});

	// Methods for seek slider...
	progress.addEventListener("mousedown", function (e) {
		seeking = true;
		seek(e);
	});
	progress.addEventListener("mousemove", function (e) {
		seek(e);
	});
	progress.addEventListener("mouseup", function (e) {
		seeking = false;
	});

	function seek(event) {
		if (seeking) {
			progress.value = Math.round(
				((event.clientX - progress.offsetLeft + window.pageXOffset) * 100) /
					progress.parentNode.offsetWidth
			);
			var seekTo = audio.duration * (progress.value / 100);
			audio.currentTime = seekTo;
		}
	}

	// Audio seeking slider and time update functions.
	audio.addEventListener("timeupdate", function () {
		var nt = audio.currentTime * (100 / audio.duration);
		progress.value = nt;

		var currMin = Math.floor(audio.currentTime / 60);
		var currsec = Math.floor(audio.currentTime - currMin * 60);
		var durMins = Math.floor(audio.duration / 60);
		var durSec = Math.floor(audio.duration - durMins * 60);
		if (currsec < 10) {
			currsec = "0" + currsec;
		}
		if (durSec < 10) {
			durSec = "0" + durSec;
		}
		if (currMin < 10) {
			currMin = "0" + currMin;
		}
		if (durMins < 10) {
			durMins = "0" + durMins;
		}

		$(".currentTime").html(currMin + ":" + currsec);
		$(".totalTime").html((totalTime.innerHTML = durMins + ":" + durSec));
		if (repeat == true) {
			if (currMin == durMins && currsec == durSec) {
				playA(index + 1);
			}
		}
	});

	// Suffle Function...
	$("#suffle").click(function () {
		index = Math.round(Math.random() * playlist.length);
		playA(index);
	});

	// Volume methods
	$("#volume").click(function () {
		if (audio.muted) {
			audio.muted = false;
			$("#volumeId").attr("class", "ion-android-volume-up");
		} else {
			audio.muted = true;
			$("#volumeId").attr("class", "ion-android-volume-off");
		}
	});

	// Playlist Button...
	$("#playlist").click(function () {
		console.log("Playlist .");
		$(".playlist-item").toggle(200);
	});

	// musicMetaData();

	function musicMetaData(i) {
		var url = playlist[i].uri;
		var xml = new XMLHttpRequest();
		xml.responseType = "arraybuffer";
		xml.open("get", url, true);
		xml.onload = function (e) {
			musicmetadata(e.target.response, function (err, result) {
				// console.log(result);
				if (result.picture.length > 0) {
					var picture = result.picture[0];
					var url = URL.createObjectURL(
						new Blob([picture.data], {
							type: "image/" + picture.format,
						})
					);
				}
				musicmetadatas.title = result.title;
				musicmetadatas.album = result.album;
				musicmetadatas.artist = result.artist;
				musicmetadatas.genre = result.genre;
				musicmetadatas.year = result.year;
				musicmetadatas.picture = url;
			});
		};
		xml.send();
	}

	function visualizer() {
		context = new AudioContext();
		analyser = context.createAnalyser();
		canvas = document.getElementById("visualizerCanvas");

		//Re-route audio playback into the processing graph of the audio context...
		source = context.createMediaElementSource(audio);
		source.connect(analyser);
		analyser.connect(context.destination);

		frameLooper();
	}

	function frameLooper() {
		window.requestAnimationFrame(frameLooper);
		fbc_array = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(fbc_array);
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#800080";
		bars = 500;
		//document.getElementById('info').innerHTML = fbc_array;
		for (var i = 0; i < bars; i++) {
			barx = i * 3;
			bar_width = 1;
			bar_height = -(fbc_array[i] / 2);
			ctx.fillRect(barx, canvas.height, bar_width, bar_height);
		}
	}

	// Initiating Player...
	audio.src = playlist[counter].uri;
	title.innerHTML = playlist[counter].title;
	thumb.style.backgroundImage = "url(" + playlist[counter].thumb + ")"; // Setting the song thumb
});
