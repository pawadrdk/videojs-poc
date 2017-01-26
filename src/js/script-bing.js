"use strict";
// hls
const hls = "http://drod07f-vh.akamaihd.net/i/all/clear/download/50/587ba535a11f9f17b4067f50/Alene-i-vildmarken--4-10-_e2ef26679a9245f5bc6aac8b6d37a623_,296,481,913,2020,2812,.mp4.csmil/master.m3u8?cc1=name=Dansk~default=no~forced=no~lang=da~uri=http://www.dr.dk/mu/subtitles/playlist/urn:dr:mu:manifest:587ba535a11f9f17b4067f50%3Fsegmentsizeinms=60000%26subtitleType=HardOfHearing";

// mpeg dash
var dash = "https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd";

// dvr


// encrypted hls
var encryptedHls = "http://drod08h-vh.akamaihd.net/i/dk/encrypted/streaming/75/588246aaa11f9f0c2c197375/The-Tonight-Show-med-Jimmy-Fal_fac673769752436faeda69fb8ba557ed_,1128,562,2394,362,.mp4.csmil/master.m3u8"

// mp4 download
const mp4 = "http://drod07f-vh.akamaihd.net/p/all/clear/download/50/587ba535a11f9f17b4067f50/Alene-i-vildmarken--4-10-_e2ef26679a9245f5bc6aac8b6d37a623_2812.mp4";

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
playerElement.setAttribute("src", mp4);
playerElement.setAttribute("poster", poster);

// append video element to html handle.
containerElement.appendChild(playerElement);

// Initialize videojs on video-element id
var player = videojs('videojs_player');

// create the bing menu
var bingLink1 = ("<a href='#123' class='bing-link'> BINGLINK1 </a>")
var bingLink2 = ("<a href='#456' class='bing-link'> BINGLINK2 </a>")

// Get a component to subclass
// var vjsButton = videojs.getComponent('button');
var vjsComponent = videojs.getComponent('component');

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
  }
});

// Register the new component with videojs
vjsComponent.registerComponent('bingMenu', bingMenu);

// add the bingmenu component to the player
var myBingMenu = player.addChild("bingMenu");