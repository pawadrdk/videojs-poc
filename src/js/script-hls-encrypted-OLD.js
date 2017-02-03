"use strict";
// hls
const hls = "http://drod07f-vh.akamaihd.net/i/all/clear/download/50/587ba535a11f9f17b4067f50/Alene-i-vildmarken--4-10-_e2ef26679a9245f5bc6aac8b6d37a623_,296,481,913,2020,2812,.mp4.csmil/master.m3u8?cc1=name=Dansk~default=no~forced=no~lang=da~uri=http://www.dr.dk/mu/subtitles/playlist/urn:dr:mu:manifest:587ba535a11f9f17b4067f50%3Fsegmentsizeinms=60000%26subtitleType=HardOfHearing";

// mpeg dash
var dash = "https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd";

// dvr

// Live streaming
var decrypt = require("@dr/drc-media-decryption");
var live = "http://dr01-lh.akamaihd.net/i/dr01_0@147054/master.m3u8?b=100-3000";
console.log("live", live);

// encrypted hls
var encryptedHls = "http://drod08h-vh.akamaihd.net/i/dk/encrypted/streaming/75/588246aaa11f9f0c2c197375/The-Tonight-Show-med-Jimmy-Fal_fac673769752436faeda69fb8ba557ed_,1128,562,2394,362,.mp4.csmil/master.m3u8"
// var encryptedHls = "http://aegon.codesense.fi/~nnarhinen/encrypted-hls/list-session.m3u8";
// mp4 download
const mp4 = "http://drod07f-vh.akamaihd.net/p/all/clear/download/50/587ba535a11f9f17b4067f50/Alene-i-vildmarken--4-10-_e2ef26679a9245f5bc6aac8b6d37a623_2812.mp4";

// subtitles webvtt
const webvtt1 = "https://www.dr.dk/mu/Asset?Id=58891c496187ae03ec8cce73";
const webvtt2 = "https://www.dr.dk/mu/Asset?Id=587e90e06187a409746e5ada";
const webvtt3 = "https://www.dr.dk/mu/Asset?Id=587555aba11fac0d8c8855f3";
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
playerElement.setAttribute("crossorigin", "anonymous");
//playerElement.setAttribute("src", hls);
playerElement.setAttribute("poster", poster);

//build src element
var source = document.createElement("source");
source.setAttribute("src", encryptedHls);
source.setAttribute("type", "application/x-mpegURL");
//source.setAttribute("type", "application/dash+xml");
// append source to player
playerElement.appendChild(source);

// append video element to html handle.
containerElement.appendChild(playerElement);

// Initialize videojs on video-element id
var player = videojs('videojs_player', {

});

// set subtitles
player.addRemoteTextTrack({
  kind: 'subtitles',
  src: webvtt1,
  srclang: 'dk',
  label: 'HardOfHearing'
});

player.addRemoteTextTrack({
  kind: 'subtitles',
  src: webvtt2,
  srclang: 'dk',
  label: 'Foreign'
});

player.addRemoteTextTrack({
  kind: 'subtitles',
  src: webvtt3,
  srclang: 'dk',
  label: 'Foreign_HardOfHearing',
});

// set active texttracks
// player.textTracks()[2].mode = 'showing';

// player.textTracks()[0].mode =  'showing' | 'disabled'
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
    console.log("clicked");
  }
});

// Register the new component with videojs
vjsComponent.registerComponent('bingMenu', bingMenu);

// Add the bingmenu component to the player
var myBingMenu = player.addChild("bingMenu");


var previousTime = 0;
var currentTime = 0;
player.on("waiting", function () {
  console.log("previoustime", previousTime);
  console.log("currenttime", player.currentTime());
  console.log("Waiting..");
});
player.on("play", function () {
  console.log("Play..")
});
player.on("playing", function () {
  previousTime = player.currentTime();
  console.log("Playing..", player.bufferedPercent())
});
player.on("pause", function () {
  console.log("Pause..")
});
player.on("paused", function () {
  console.log("Paused..")
});

// happens every second
player.on('timeupdate', function () {
  //console.log("progress : " +  player.currentTime() + " of " + player.duration());
});
// happens every ~3 seconds
player.on("progress", function (evt) {
  previousTime = player.currentTime();
  console.log("progress", player.currentTime());
});

player.on('seeking', function (evt) {
  console.log("seeking", player.currentTime());
});

player.on("seeked", function () {
  console.log("seeked", player.currentTime());
});
player.on('ended', function (evt) {
  console.log("ended");
});

player.on('loadeddata', function (evt) {
  console.log("loadeddata", evt);
});

player.on('loadedmetadata', function (evt) {
  console.log("loadedmetadata", evt);
});
player.on('volumechange', function (evt) {
  console.log("volumechange", evt);
});
player.on('loading', function (evt) {
  console.log("loading", evt);
});
player.on('loaded', function (evt) {
  console.log("loaded", evt);
});
