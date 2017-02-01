"use strict";
// hls
const hls_video = "http://drod07f-vh.akamaihd.net/i/all/clear/download/50/587ba535a11f9f17b4067f50/Alene-i-vildmarken--4-10-_e2ef26679a9245f5bc6aac8b6d37a623_,296,481,913,2020,2812,.mp4.csmil/master.m3u8?cc1=name=Dansk~default=no~forced=no~lang=da~uri=http://www.dr.dk/mu/subtitles/playlist/urn:dr:mu:manifest:587ba535a11f9f17b4067f50%3Fsegmentsizeinms=60000%26subtitleType=HardOfHearing";

const local_hls = "http://localhost:8080/hls/master.m3u8";

// mpeg dash
var dash = "https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd";

// dvr

// Live streaming
var decrypt = require("@dr/drc-media-decryption");
var live = "http://dr01-lh.akamaihd.net/i/dr01_0@147054/master.m3u8?b=100-3000";

// encrypted hls
var encryptedHls = "http://drod08h-vh.akamaihd.net/i/dk/encrypted/streaming/75/588246aaa11f9f0c2c197375/The-Tonight-Show-med-Jimmy-Fal_fac673769752436faeda69fb8ba557ed_,1128,562,2394,362,.mp4.csmil/master.m3u8"

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
// playerElement.setAttribute("class", "video-js vjs-default-skin vjs-big-play-centered poc-player");
playerElement.setAttribute("class", "video-js vjs-default-skin vjs-controls-enabled vjs-workinghover vjs-playing");
playerElement.setAttribute("controls", "");
//playerElement.setAttribute("crossorigin", "anonymous");
//playerElement.setAttribute("src", hls);
playerElement.setAttribute("poster", poster);

//build src element
//var source = document.createElement("source");
// source.setAttribute("src", local_hls);
// source.setAttribute("type", "application/x-mpegURL");
//source.setAttribute("type", "application/dash+xml");
// append source to player
//playerElement.appendChild(source);

// Remember to initialize player if HLS is not supported
var player;

try {
  if(Hls.isSupported()) {
    //var video = document.getElementById('video');
    console.log('HLS is supported');

    player = new Hls({autoStartLoad : false});

    player.attachMedia(playerElement);

    player.on(Hls.Events.MEDIA_ATTACHED,function() {
        //player.loadSource("http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8");
        player.loadSource('http://www.streambox.fr/playlists/test_001/stream.m3u8');
        updateLevelInfo();
    });


    player.on(Hls.Events.MANIFEST_PARSED, function(event,data) {
        console.log('got data');
        //player.autoLevelEnabled = false;
        //player.loadLevel = 3;
        console.log('loading');
        //playerElement.startLoad();
        player.startLoad(startPosition = -1);
        console.log('playing');
        playerElement.play();
    });
    // player.loadSource('http://www.streambox.fr/playlists/test_001/stream.m3u8');
    // // hls.attachMedia(video);
    // player.attachMedia(playerElement);
    // player.on(Hls.Events.MANIFEST_PARSED,function() {
    //   // video.play();
    //   playerElement.play();
    // });
  }
} catch (e) {
  console.log('HLS is NOT supported!');
}

// append video element to html handle.
containerElement.appendChild(playerElement);

// Initialize videojs on video-element id
// var player = videojs('videojs_player', {
//   html5: {
//     hls: {
//       withCredentials: true
//     }
//   }
// });



//player.qualityLevels();
// let qualityLevels = player.qualityLevels();
// console.log('qualityLevels: ', qualityLevels);


// var videojsContribQualityLevels = require('videojs-contrib-quality-levels');


// set active texttracks
// player.textTracks()[2].mode = 'showing';

// player.textTracks()[0].mode =  'showing' | 'disabled'
// create the bing menu
var bingLink1 = ("<a href='#123' class='bing-link'> BINGLINK1 </a>")
var bingLink2 = ("<a href='#456' class='bing-link'> BINGLINK2 </a>")

// Get a component to subclass
var vjsComponent = videojs.getComponent('button');
//var vjsComponent = videojs.getComponent('Component');

// Subclass the component (see 'extend' doc for more info)
// list of components to extend http://docs.videojs.com/docs/guides/components.html

var bingMenu = videojs.extend(vjsComponent, {
  constructor: function () {
    vjsComponent.apply(this, arguments);
    // initialize your button
    // Add component specific styling
    this.addClass("bing-menu");
    // add component specific html element
    this.el().innerHTML = bingLink1 + bingLink2;
  },
  handleClick: function () {
    // do something on click
    console.log("clicked");
    // player.qualityLevels().selectedIndex_ = 0;

    // player.qualityLevels()[0].enabled = 'true';
    // // console.log('selectedIndex_: ', player.qualityLevels().selectedIndex_);
    // console.log('qualityLevels: ', player.qualityLevels());
  }
});

// Register the new component with videojs
vjsComponent.registerComponent('BingMenu', bingMenu);

// Add the bingmenu component to the player
//var myBingMenu = player.addChild("bingMenu");

player.on('loadeddata', function (evt) {
  console.log("loadeddata", evt);
  // player.qualityLevels();
  // let qualityLevels = player.qualityLevels();
  // console.log('qualityLevels: ', qualityLevels);

  // player.hls.representations();
  // console.log('player.hls.representations(): ', player.hls.representations());
  //
  // let representations = player.tech_.hls.representations();
  //
  // for (let i = 0; i < representations.length; i++) {
  //   let representation = representations[i];
  //   console.log('Adding a qualityLevel with bitrate: ', representation.bandwidth);
  //   qualityLevels.addQualityLevel(representation);
  // }
  //
  // // qualityLevels[4].enable = true;
  // qualityLevels.selectedIndex_ = 4;
  //
  // // player.qualityLevels()[0].enable = 'true';
  // console.log('qualityLevels: ', qualityLevels);
  // Representation {
  //   id: string,
  //   width: number,
  //   height: number,
  //   bitrate: number,
  //   enabled: function
  // }

});

player.on('loading', function (evt) {
  console.log("loading", evt);
});
player.on('loaded', function (evt) {
  console.log("loaded", evt);
});
player.on('loadedmetadata', function() {
  console.log('loadedmetadata');
    // var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls;
    // // hls.representations().forEach(function(rep) {
    // //     console.log(rep);
    // // });
    // console.log('hls: ', hls);

    // let qualityLevels = player.qualityLevels();
    // console.log('qualityLevels: ', qualityLevels);
});


function updateLevelInfo() {
  var button_template = '<button type="button" class="btn btn-sm ';
  var button_enabled  = 'btn-primary" ';
  var button_disabled = 'btn-success" ';

  var html1 = button_template;
  if(hls.autoLevelEnabled) {
    html1 += button_enabled;
  } else {
    html1 += button_disabled;
  }
  html1 += 'onclick="hls.currentLevel=-1">auto</button>';


  var html2 = button_template;
  if(hls.autoLevelEnabled) {
    html2 += button_enabled;
  } else {
    html2 += button_disabled;
  }
  html2 += 'onclick="hls.loadLevel=-1">auto</button>';

  var html3 = button_template;
  if(hls.autoLevelCapping === -1) {
    html3 += button_enabled;
  } else {
    html3 += button_disabled;
  }
  html3 += 'onclick="levelCapping=hls.autoLevelCapping=-1;updateLevelInfo();updatePermalink();">auto</button>';

  var html4 = button_template;
  if(hls.autoLevelEnabled) {
    html4 += button_enabled;
  } else {
    html4 += button_disabled;
  }
  html4 += 'onclick="hls.nextLevel=-1">auto</button>';

  for (var i=0; i < hls.levels.length; i++) {
    html1 += button_template;
    if(hls.currentLevel === i) {
      html1 += button_enabled;
    } else {
      html1 += button_disabled;
    }
    var levelName = i, label = level2label(i);
    if(label) {
      levelName += '(' + level2label(i) + ')';
    }
    html1 += 'onclick="hls.currentLevel=' + i + '">' + levelName + '</button>';

    html2 += button_template;
    if(hls.loadLevel === i) {
      html2 += button_enabled;
    } else {
      html2 += button_disabled;
    }
    html2 += 'onclick="hls.loadLevel=' + i + '">' + levelName + '</button>';

    html3 += button_template;
    if(hls.autoLevelCapping === i) {
      html3 += button_enabled;
    } else {
      html3 += button_disabled;
    }
    html3 += 'onclick="levelCapping=hls.autoLevelCapping=' + i + ';updateLevelInfo();updatePermalink();">' + levelName + '</button>';

    html4 += button_template;
    if(hls.nextLevel === i) {
      html4 += button_enabled;
    } else {
      html4 += button_disabled;
    }
    html4 += 'onclick="hls.nextLevel=' + i + '">' + levelName + '</button>';
  }
  var v = $('#video')[0];
  if(v.videoWidth) {
    $("#currentResolution").html("video resolution:" + v.videoWidth + 'x' + v.videoHeight);
  }
  if($("#currentLevelControl").html() != html1) {
    $("#currentLevelControl").html(html1);
  }

  if($("#loadLevelControl").html() != html2) {
    $("#loadLevelControl").html(html2);
  }

  if($("#levelCappingControl").html() != html3) {
    $("#levelCappingControl").html(html3);
  }

  if($("#nextLevelControl").html() != html4) {
    $("#nextLevelControl").html(html4);
  }
}
