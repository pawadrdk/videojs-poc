"use strict";

// Live streaming
var live = "http://dr01-lh.akamaihd.net/i/dr01_0@147054/master.m3u8?b=100-3000";

// hls
const remote_hls = "http://drod07f-vh.akamaihd.net/i/all/clear/download/50/587ba535a11f9f17b4067f50/Alene-i-vildmarken--4-10-_e2ef26679a9245f5bc6aac8b6d37a623_,296,481,913,2020,2812,.mp4.csmil/master.m3u8?cc1=name=Dansk~default=no~forced=no~lang=da~uri=http://www.dr.dk/mu/subtitles/playlist/urn:dr:mu:manifest:587ba535a11f9f17b4067f50%3Fsegmentsizeinms=60000%26subtitleType=HardOfHearing";

// poster
const poster = "http://www.dr.dk/mu-online/api/1.3/bar/58760448a11fa01578861333?width=322&height=181";

var containerElement = document.getElementById("playerHandle");
console.log(containerElement);

// Build the standard video element
var playerElement = document.createElement("video");

playerElement.setAttribute("height", "480");
playerElement.setAttribute("width", "640");
playerElement.setAttribute("id", "videojs_player");
playerElement.setAttribute("class", "video-js vjs-default-skin vjs-big-play-centered poc-player");
playerElement.setAttribute("controls", "");

var hls;

if(Hls.isSupported()) {
  console.log('Got HLS');
  alert('HLS');
  hls = new Hls();
  hls.loadSource(live);
  hls.attachMedia(playerElement);
  hls.on(Hls.Events.MANIFEST_PARSED,function() {
    playerElement.play();
  });
}
else { // Running native iOS
  console.log('No HLS');
  //alert('NO HLS');
  playerElement.setAttribute("src", live);
}

// append video element to html handle.
containerElement.appendChild(playerElement);

// Initialize videojs on video-element id
var player = videojs('videojs_player', {
    controlBar: {
      remainingTimeDisplay: false
    }
});

player.markers({
    markerTip:{
       display: true,
       text: function(marker) {
          return marker.text;
       }
    },
    breakOverlay:{
       display: true,
       displayTime: 3,
       text: function(marker) {
          return marker.text;
       }
    },
    markers: [
        {time: 0, text: "Velkommen til TV AVISEN 21:00", overlayText: 'TV AVISEN 21:00'},
        {time: 300,  text: "USA - Trump møder May", overlayText: 'USA - Trump møder May'},
        {time: 600,text: "USA - Stemningen under pressemødet", overlayText: 'USA - Stemningen under pressemødet'},
        {time: 900,  text: "Bandepakke - Færre betjente jagter rockere", overlayText: 'Bandepakke - Færre betjente jagter rockere'}
    ]
 });

// create the bing menu
var bingLink1 = ("<a href='#123' class='bing-link'> BINGLINK1 </a>")
var bingLink2 = ("<a href='#456' class='bing-link'> BINGLINK2 </a>")

// Get a component to subclass
// var vjsButton = videojs.getComponent('button');
var vjsComponent = videojs.getComponent('button');

// Subclass the component (see 'extend' doc for more info)
// list of components to extend http://docs.videojs.com/docs/guides/components.html
var bingMenu = videojs.extend(vjsComponent, {
  constructor: function () {
    vjsComponent.apply(this, arguments);
    /* initialize your button */
    // Add component specific styling
    this.addClass("bing-menu");
    // add component specific html element
    this.el().innerHTML = bingLink1 + bingLink2;
  },
  handleClick: function () {
    /* do something on click */
    console.log('clicked');
    playerElement.play();
    if (hls.currentLevel == 0) {
      hls.currentLevel = -1;
    }
    else {
      hls.currentLevel = 0;
    }
  }
});

// Register the new component with videojs
vjsComponent.registerComponent('bingMenu', bingMenu);

// add the bingmenu component to the player
var myBingMenu = player.addChild("bingMenu");

player.on('loaded', function (evt) {
  //console.log("loaded", evt);
  //alert('Loaded');
  playerElement.currentLevel = 0;
});
