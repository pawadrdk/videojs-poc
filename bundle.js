/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// hls

	var hls_video = "http://drod07f-vh.akamaihd.net/i/all/clear/download/50/587ba535a11f9f17b4067f50/Alene-i-vildmarken--4-10-_e2ef26679a9245f5bc6aac8b6d37a623_,296,481,913,2020,2812,.mp4.csmil/master.m3u8?cc1=name=Dansk~default=no~forced=no~lang=da~uri=http://www.dr.dk/mu/subtitles/playlist/urn:dr:mu:manifest:587ba535a11f9f17b4067f50%3Fsegmentsizeinms=60000%26subtitleType=HardOfHearing";

	var local_hls = "http://localhost:8080/hls/master.m3u8";

	// mpeg dash
	var dash = "https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd";

	// dvr

	// Live streaming
	var decrypt = __webpack_require__(1);
	var live = "http://dr01-lh.akamaihd.net/i/dr01_0@147054/master.m3u8?b=100-3000";

	// encrypted hls
	var encryptedHls = "http://drod08h-vh.akamaihd.net/i/dk/encrypted/streaming/75/588246aaa11f9f0c2c197375/The-Tonight-Show-med-Jimmy-Fal_fac673769752436faeda69fb8ba557ed_,1128,562,2394,362,.mp4.csmil/master.m3u8";

	// mp4 download
	var mp4 = "http://drod07f-vh.akamaihd.net/p/all/clear/download/50/587ba535a11f9f17b4067f50/Alene-i-vildmarken--4-10-_e2ef26679a9245f5bc6aac8b6d37a623_2812.mp4";

	// subtitles webvtt
	var webvtt1 = "https://www.dr.dk/mu/Asset?Id=58891c496187ae03ec8cce73";
	var webvtt2 = "https://www.dr.dk/mu/Asset?Id=587e90e06187a409746e5ada";
	var webvtt3 = "https://www.dr.dk/mu/Asset?Id=587555aba11fac0d8c8855f3";
	// poster
	var poster = "http://www.dr.dk/mu-online/api/1.3/bar/58760448a11fa01578861333?width=322&height=181";

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
	  if (Hls.isSupported()) {
	    //var video = document.getElementById('video');
	    console.log('HLS is supported');

	    player = new Hls({ autoStartLoad: false });

	    player.attachMedia(playerElement);

	    player.on(Hls.Events.MEDIA_ATTACHED, function () {
	      //player.loadSource("http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8");
	      player.loadSource('http://www.streambox.fr/playlists/test_001/stream.m3u8');
	      updateLevelInfo();
	    });

	    player.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
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
	var bingLink1 = "<a href='#123' class='bing-link'> BINGLINK1 </a>";
	var bingLink2 = "<a href='#456' class='bing-link'> BINGLINK2 </a>";

	// Get a component to subclass
	var vjsComponent = videojs.getComponent('button');
	//var vjsComponent = videojs.getComponent('Component');

	// Subclass the component (see 'extend' doc for more info)
	// list of components to extend http://docs.videojs.com/docs/guides/components.html

	var bingMenu = videojs.extend(vjsComponent, {
	  constructor: function constructor() {
	    vjsComponent.apply(this, arguments);
	    // initialize your button
	    // Add component specific styling
	    this.addClass("bing-menu");
	    // add component specific html element
	    this.el().innerHTML = bingLink1 + bingLink2;
	  },
	  handleClick: function handleClick() {
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
	player.on('loadedmetadata', function () {
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
	  var button_enabled = 'btn-primary" ';
	  var button_disabled = 'btn-success" ';

	  var html1 = button_template;
	  if (hls.autoLevelEnabled) {
	    html1 += button_enabled;
	  } else {
	    html1 += button_disabled;
	  }
	  html1 += 'onclick="hls.currentLevel=-1">auto</button>';

	  var html2 = button_template;
	  if (hls.autoLevelEnabled) {
	    html2 += button_enabled;
	  } else {
	    html2 += button_disabled;
	  }
	  html2 += 'onclick="hls.loadLevel=-1">auto</button>';

	  var html3 = button_template;
	  if (hls.autoLevelCapping === -1) {
	    html3 += button_enabled;
	  } else {
	    html3 += button_disabled;
	  }
	  html3 += 'onclick="levelCapping=hls.autoLevelCapping=-1;updateLevelInfo();updatePermalink();">auto</button>';

	  var html4 = button_template;
	  if (hls.autoLevelEnabled) {
	    html4 += button_enabled;
	  } else {
	    html4 += button_disabled;
	  }
	  html4 += 'onclick="hls.nextLevel=-1">auto</button>';

	  for (var i = 0; i < hls.levels.length; i++) {
	    html1 += button_template;
	    if (hls.currentLevel === i) {
	      html1 += button_enabled;
	    } else {
	      html1 += button_disabled;
	    }
	    var levelName = i,
	        label = level2label(i);
	    if (label) {
	      levelName += '(' + level2label(i) + ')';
	    }
	    html1 += 'onclick="hls.currentLevel=' + i + '">' + levelName + '</button>';

	    html2 += button_template;
	    if (hls.loadLevel === i) {
	      html2 += button_enabled;
	    } else {
	      html2 += button_disabled;
	    }
	    html2 += 'onclick="hls.loadLevel=' + i + '">' + levelName + '</button>';

	    html3 += button_template;
	    if (hls.autoLevelCapping === i) {
	      html3 += button_enabled;
	    } else {
	      html3 += button_disabled;
	    }
	    html3 += 'onclick="levelCapping=hls.autoLevelCapping=' + i + ';updateLevelInfo();updatePermalink();">' + levelName + '</button>';

	    html4 += button_template;
	    if (hls.nextLevel === i) {
	      html4 += button_enabled;
	    } else {
	      html4 += button_disabled;
	    }
	    html4 += 'onclick="hls.nextLevel=' + i + '">' + levelName + '</button>';
	  }
	  var v = $('#video')[0];
	  if (v.videoWidth) {
	    $("#currentResolution").html("video resolution:" + v.videoWidth + 'x' + v.videoHeight);
	  }
	  if ($("#currentLevelControl").html() != html1) {
	    $("#currentLevelControl").html(html1);
	  }

	  if ($("#loadLevelControl").html() != html2) {
	    $("#loadLevelControl").html(html2);
	  }

	  if ($("#levelCappingControl").html() != html3) {
	    $("#levelCappingControl").html(html3);
	  }

	  if ($("#nextLevelControl").html() != html4) {
	    $("#nextLevelControl").html(html4);
	  }
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var forge = __webpack_require__(2);

	function generateCipher(seed) {
		var secret = "sRBzYNXBzkKgnjj8pGtkACch";

		var md = forge.md.sha256.create();
		md.update(seed + ":" + secret);

		var cipher = md.digest();

		return cipher;
	}

	function decrypt(encryptedString) {
		var payloadHeader = encryptedString.substring(2, 10);
		var payloadLength = parseInt(payloadHeader, 16);

		var payloadHex = encryptedString.substring(10, 10 + payloadLength);
		var initialVectorHex = encryptedString.substring(10 + payloadLength);

		var cipher = generateCipher(initialVectorHex);

		var initialVector = forge.util.hexToBytes(initialVectorHex);
		var encryptedDataBytes = forge.util.hexToBytes(payloadHex);
		var encryptedDataBuffer = forge.util.createBuffer(encryptedDataBytes);

		var decipher = forge.cipher.createDecipher("AES-CBC", cipher);

		decipher.start({ iv: initialVector });
		decipher.update(encryptedDataBuffer);
		decipher.finish();

		return decipher.output.data;
	}

	module.exports = decrypt;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var forge = {};

	__webpack_require__(3)(forge);
	__webpack_require__(7)(forge);
	__webpack_require__(8)(forge);
	__webpack_require__(9)(forge);
	__webpack_require__(10)(forge);

	module.exports = forge;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Utility functions for web applications.
	 *
	 * @author Dave Longley
	 *
	 * Copyright (c) 2010-2014 Digital Bazaar, Inc.
	 */

	module.exports = function (forge) {

	  var util = forge.util = {};

	  // define setImmediate and nextTick
	  (function () {
	    // use native nextTick
	    if (typeof process !== 'undefined' && process.nextTick) {
	      util.nextTick = process.nextTick;
	      if (typeof setImmediate === 'function') {
	        util.setImmediate = setImmediate;
	      } else {
	        // polyfill setImmediate with nextTick, older versions of node
	        // (those w/o setImmediate) won't totally starve IO
	        util.setImmediate = util.nextTick;
	      }
	      return;
	    }

	    // polyfill nextTick with native setImmediate
	    if (typeof setImmediate === 'function') {
	      util.setImmediate = setImmediate;
	      util.nextTick = function (callback) {
	        return setImmediate(callback);
	      };
	      return;
	    }

	    /* Note: A polyfill upgrade pattern is used here to allow combining
	    polyfills. For example, MutationObserver is fast, but blocks UI updates,
	    so it needs to allow UI updates periodically, so it falls back on
	    postMessage or setTimeout. */

	    // polyfill with setTimeout
	    util.setImmediate = function (callback) {
	      setTimeout(callback, 0);
	    };

	    // upgrade polyfill to use postMessage
	    if (typeof window !== 'undefined' && typeof window.postMessage === 'function') {
	      var handler = function handler(event) {
	        if (event.source === window && event.data === msg) {
	          event.stopPropagation();
	          var copy = callbacks.slice();
	          callbacks.length = 0;
	          copy.forEach(function (callback) {
	            callback();
	          });
	        }
	      };

	      var msg = 'forge.setImmediate';
	      var callbacks = [];
	      util.setImmediate = function (callback) {
	        callbacks.push(callback);
	        // only send message when one hasn't been sent in
	        // the current turn of the event loop
	        if (callbacks.length === 1) {
	          window.postMessage(msg, '*');
	        }
	      };

	      window.addEventListener('message', handler, true);
	    }

	    // upgrade polyfill to use MutationObserver
	    if (typeof MutationObserver !== 'undefined') {
	      // polyfill with MutationObserver
	      var now = Date.now();
	      var attr = true;
	      var div = document.createElement('div');
	      var callbacks = [];
	      new MutationObserver(function () {
	        var copy = callbacks.slice();
	        callbacks.length = 0;
	        copy.forEach(function (callback) {
	          callback();
	        });
	      }).observe(div, { attributes: true });
	      var oldSetImmediate = util.setImmediate;
	      util.setImmediate = function (callback) {
	        if (Date.now() - now > 15) {
	          now = Date.now();
	          oldSetImmediate(callback);
	        } else {
	          callbacks.push(callback);
	          // only trigger observer when it hasn't been triggered in
	          // the current turn of the event loop
	          if (callbacks.length === 1) {
	            div.setAttribute('a', attr = !attr);
	          }
	        }
	      };
	    }

	    util.nextTick = util.setImmediate;
	  })();

	  // define isArray
	  util.isArray = Array.isArray || function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };

	  // define isArrayBuffer
	  util.isArrayBuffer = function (x) {
	    return typeof ArrayBuffer !== 'undefined' && x instanceof ArrayBuffer;
	  };

	  // define isArrayBufferView
	  util.isArrayBufferView = function (x) {
	    return x && util.isArrayBuffer(x.buffer) && x.byteLength !== undefined;
	  };

	  // TODO: set ByteBuffer to best available backing
	  util.ByteBuffer = ByteStringBuffer;

	  /** Buffer w/BinaryString backing */

	  /**
	   * Constructor for a binary string backed byte buffer.
	   *
	   * @param [b] the bytes to wrap (either encoded as string, one byte per
	   *          character, or as an ArrayBuffer or Typed Array).
	   */
	  function ByteStringBuffer(b) {
	    // TODO: update to match DataBuffer API

	    // the data in this buffer
	    this.data = '';
	    // the pointer for reading from this buffer
	    this.read = 0;

	    if (typeof b === 'string') {
	      this.data = b;
	    } else if (util.isArrayBuffer(b) || util.isArrayBufferView(b)) {
	      // convert native buffer to forge buffer
	      // FIXME: support native buffers internally instead
	      var arr = new Uint8Array(b);
	      try {
	        this.data = String.fromCharCode.apply(null, arr);
	      } catch (e) {
	        for (var i = 0; i < arr.length; ++i) {
	          this.putByte(arr[i]);
	        }
	      }
	    } else if (b instanceof ByteStringBuffer || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object' && typeof b.data === 'string' && typeof b.read === 'number') {
	      // copy existing buffer
	      this.data = b.data;
	      this.read = b.read;
	    }

	    // used for v8 optimization
	    this._constructedStringLength = 0;
	  }
	  util.ByteStringBuffer = ByteStringBuffer;

	  /* Note: This is an optimization for V8-based browsers. When V8 concatenates
	    a string, the strings are only joined logically using a "cons string" or
	    "constructed/concatenated string". These containers keep references to one
	    another and can result in very large memory usage. For example, if a 2MB
	    string is constructed by concatenating 4 bytes together at a time, the
	    memory usage will be ~44MB; so ~22x increase. The strings are only joined
	    together when an operation requiring their joining takes place, such as
	    substr(). This function is called when adding data to this buffer to ensure
	    these types of strings are periodically joined to reduce the memory
	    footprint. */
	  var _MAX_CONSTRUCTED_STRING_LENGTH = 4096;
	  util.ByteStringBuffer.prototype._optimizeConstructedString = function (x) {
	    this._constructedStringLength += x;
	    if (this._constructedStringLength > _MAX_CONSTRUCTED_STRING_LENGTH) {
	      // this substr() should cause the constructed string to join
	      this.data.substr(0, 1);
	      this._constructedStringLength = 0;
	    }
	  };

	  // used
	  /**
	   * Gets the number of bytes in this buffer.
	   *
	   * @return the number of bytes in this buffer.
	   */
	  util.ByteStringBuffer.prototype.length = function () {
	    return this.data.length - this.read;
	  };

	  // used
	  /**
	   * Puts bytes in this buffer.
	   *
	   * @param bytes the bytes (as a UTF-8 encoded string) to put.
	   *
	   * @return this buffer.
	   */
	  util.ByteStringBuffer.prototype.putBytes = function (bytes) {
	    this.data += bytes;
	    this._optimizeConstructedString(bytes.length);
	    return this;
	  };

	  // used
	  /**
	   * Puts a 32-bit integer in this buffer in big-endian order.
	   *
	   * @param i the 32-bit integer.
	   *
	   * @return this buffer.
	   */
	  util.ByteStringBuffer.prototype.putInt32 = function (i) {
	    return this.putBytes(String.fromCharCode(i >> 24 & 0xFF) + String.fromCharCode(i >> 16 & 0xFF) + String.fromCharCode(i >> 8 & 0xFF) + String.fromCharCode(i & 0xFF));
	  };

	  // used
	  /**
	   * Puts the given buffer into this buffer.
	   *
	   * @param buffer the buffer to put into this one.
	   *
	   * @return this buffer.
	   */
	  util.ByteStringBuffer.prototype.putBuffer = function (buffer) {
	    return this.putBytes(buffer.getBytes());
	  };

	  // used
	  /**
	   * Gets a uint32 from this buffer in big-endian order and advances the read
	   * pointer by 4.
	   *
	   * @return the word.
	   */
	  util.ByteStringBuffer.prototype.getInt32 = function () {
	    var rval = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
	    this.read += 4;
	    return rval;
	  };

	  // used
	  /**
	   * Reads bytes out into a UTF-8 string and clears them from the buffer.
	   *
	   * @param count the number of bytes to read, undefined or null for all.
	   *
	   * @return a UTF-8 string of bytes.
	   */
	  util.ByteStringBuffer.prototype.getBytes = function (count) {
	    var rval;
	    if (count) {
	      // read count bytes
	      count = Math.min(this.length(), count);
	      rval = this.data.slice(this.read, this.read + count);
	      this.read += count;
	    } else if (count === 0) {
	      rval = '';
	    } else {
	      // read all bytes, optimize to only copy when needed
	      rval = this.read === 0 ? this.data : this.data.slice(this.read);
	      this.clear();
	    }
	    return rval;
	  };

	  // used
	  /**
	   * Gets a UTF-8 encoded string of the bytes from this buffer without modifying
	   * the read pointer.
	   *
	   * @param count the number of bytes to get, omit to get all.
	   *
	   * @return a string full of UTF-8 encoded characters.
	   */
	  util.ByteStringBuffer.prototype.bytes = function (count) {
	    return typeof count === 'undefined' ? this.data.slice(this.read) : this.data.slice(this.read, this.read + count);
	  };

	  // used
	  /**
	   * Gets a byte at the given index without modifying the read pointer.
	   *
	   * @param i the byte index.
	   *
	   * @return the byte.
	   */
	  util.ByteStringBuffer.prototype.at = function (i) {
	    return this.data.charCodeAt(this.read + i);
	  };

	  // used
	  /**
	   * Compacts this buffer.
	   *
	   * @return this buffer.
	   */
	  util.ByteStringBuffer.prototype.compact = function () {
	    if (this.read > 0) {
	      this.data = this.data.slice(this.read);
	      this.read = 0;
	    }
	    return this;
	  };

	  // used
	  /**
	   * Clears this buffer.
	   *
	   * @return this buffer.
	   */
	  util.ByteStringBuffer.prototype.clear = function () {
	    this.data = '';
	    this.read = 0;
	    return this;
	  };

	  // used
	  /**
	   * Shortens this buffer by triming bytes off of the end of this buffer.
	   *
	   * @param count the number of bytes to trim off.
	   *
	   * @return this buffer.
	   */
	  util.ByteStringBuffer.prototype.truncate = function (count) {
	    var len = Math.max(0, this.length() - count);
	    this.data = this.data.substr(this.read, len);
	    this.read = 0;
	    return this;
	  };

	  /** End Buffer w/BinaryString backing */

	  // used
	  /**
	   * Creates a buffer that stores bytes. A value may be given to put into the
	   * buffer that is either a string of bytes or a UTF-16 string that will
	   * be encoded using UTF-8 (to do the latter, specify 'utf8' as the encoding).
	   *
	   * @param [input] the bytes to wrap (as a string) or a UTF-16 string to encode
	   *          as UTF-8.
	   * @param [encoding] (default: 'raw', other: 'utf8').
	   */
	  util.createBuffer = function (input, encoding) {
	    // TODO: deprecate, use new ByteBuffer() instead
	    encoding = encoding || 'raw';
	    if (input !== undefined && encoding === 'utf8') {
	      input = util.encodeUtf8(input);
	    }
	    return new util.ByteBuffer(input);
	  };

	  // used
	  /**
	   * Fills a string with a particular value. If you want the string to be a byte
	   * string, pass in String.fromCharCode(theByte).
	   *
	   * @param c the character to fill the string with, use String.fromCharCode
	   *          to fill the string with a byte value.
	   * @param n the number of characters of value c to fill with.
	   *
	   * @return the filled string.
	   */
	  util.fillString = function (c, n) {
	    var s = '';
	    while (n > 0) {
	      if (n & 1) {
	        s += c;
	      }
	      n >>>= 1;
	      if (n > 0) {
	        c += c;
	      }
	    }
	    return s;
	  };

	  // used
	  /**
	   * Converts a hex string into a 'binary' encoded string of bytes.
	   *
	   * @param hex the hexadecimal string to convert.
	   *
	   * @return the binary-encoded string of bytes.
	   */
	  util.hexToBytes = function (hex) {
	    // TODO: deprecate: "Deprecated. Use util.binary.hex.decode instead."
	    var rval = '';
	    var i = 0;
	    if (hex.length & 1 == 1) {
	      // odd number of characters, convert first character alone
	      i = 1;
	      rval += String.fromCharCode(parseInt(hex[0], 16));
	    }
	    // convert 2 characters (1 byte) at a time
	    for (; i < hex.length; i += 2) {
	      rval += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	    }
	    return rval;
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(5).setImmediate))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function () {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function () {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout = exports.clearInterval = function (timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function () {};
	Timeout.prototype.close = function () {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function (item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function (item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function (item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout) item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(6);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {"use strict";

	(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	        // Callback can either be a function or a string
	        if (typeof callback !== "function") {
	            callback = new Function("" + callback);
	        }
	        // Copy function arguments
	        var args = new Array(arguments.length - 1);
	        for (var i = 0; i < args.length; i++) {
	            args[i] = arguments[i + 1];
	        }
	        // Store and register the task
	        var task = { callback: callback, args: args };
	        tasksByHandle[nextHandle] = task;
	        registerImmediate(nextHandle);
	        return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	            case 0:
	                callback();
	                break;
	            case 1:
	                callback(args[0]);
	                break;
	            case 2:
	                callback(args[0], args[1]);
	                break;
	            case 3:
	                callback(args[0], args[1], args[2]);
	                break;
	            default:
	                callback.apply(undefined, args);
	                break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function registerImmediate(handle) {
	            process.nextTick(function () {
	                runIfPresent(handle);
	            });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function () {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function onGlobalMessage(event) {
	            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function registerImmediate(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function (event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function registerImmediate(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function registerImmediate(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function registerImmediate(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Secure Hash Algorithm with 256-bit digest (SHA-256) implementation.
	 *
	 * See FIPS 180-2 for details.
	 *
	 * @author Dave Longley
	 *
	 * Copyright (c) 2010-2014 Digital Bazaar, Inc.
	 */
	module.exports = function (forge) {

	  var sha256 = forge.sha256 = forge.sha256 || {};
	  forge.md = forge.md || {};
	  forge.md.algorithms = forge.md.algorithms || {};
	  forge.md.sha256 = forge.md.algorithms.sha256 = sha256;

	  /**
	   * Creates a SHA-256 message digest object.
	   *
	   * @return a message digest object.
	   */
	  sha256.create = function () {
	    // do initialization as necessary
	    if (!_initialized) {
	      _init();
	    }

	    // SHA-256 state contains eight 32-bit integers
	    var _state = null;

	    // input buffer
	    var _input = forge.util.createBuffer();

	    // used for word storage
	    var _w = new Array(64);

	    // message digest object
	    var md = {
	      algorithm: 'sha256',
	      blockLength: 64,
	      digestLength: 32,
	      // 56-bit length of message so far (does not including padding)
	      messageLength: 0,
	      // true 64-bit message length as two 32-bit ints
	      messageLength64: [0, 0]
	    };

	    /**
	     * Starts the digest.
	     *
	     * @return this digest object.
	     */
	    md.start = function () {
	      md.messageLength = 0;
	      md.messageLength64 = [0, 0];
	      _input = forge.util.createBuffer();
	      _state = {
	        h0: 0x6A09E667,
	        h1: 0xBB67AE85,
	        h2: 0x3C6EF372,
	        h3: 0xA54FF53A,
	        h4: 0x510E527F,
	        h5: 0x9B05688C,
	        h6: 0x1F83D9AB,
	        h7: 0x5BE0CD19
	      };
	      return md;
	    };
	    // start digest automatically for first time
	    md.start();

	    /**
	     * Updates the digest with the given message input. The given input can
	     * treated as raw input (no encoding will be applied) or an encoding of
	     * 'utf8' maybe given to encode the input using UTF-8.
	     *
	     * @param msg the message input to update with.
	     * @param encoding the encoding to use (default: 'raw', other: 'utf8').
	     *
	     * @return this digest object.
	     */
	    md.update = function (msg, encoding) {
	      if (encoding === 'utf8') {
	        msg = forge.util.encodeUtf8(msg);
	      }

	      // update message length
	      md.messageLength += msg.length;
	      md.messageLength64[0] += msg.length / 0x100000000 >>> 0;
	      md.messageLength64[1] += msg.length >>> 0;

	      // add bytes to input buffer
	      _input.putBytes(msg);

	      // process bytes
	      _update(_state, _w, _input);

	      // compact input buffer every 2K or if empty
	      if (_input.read > 2048 || _input.length() === 0) {
	        _input.compact();
	      }

	      return md;
	    };

	    /**
	     * Produces the digest.
	     *
	     * @return a byte buffer containing the digest value.
	     */
	    md.digest = function () {
	      /* Note: Here we copy the remaining bytes in the input buffer and
	      add the appropriate SHA-256 padding. Then we do the final update
	      on a copy of the state so that if the user wants to get
	      intermediate digests they can do so. */

	      /* Determine the number of bytes that must be added to the message
	      to ensure its length is congruent to 448 mod 512. In other words,
	      the data to be digested must be a multiple of 512 bits (or 128 bytes).
	      This data includes the message, some padding, and the length of the
	      message. Since the length of the message will be encoded as 8 bytes (64
	      bits), that means that the last segment of the data must have 56 bytes
	      (448 bits) of message and padding. Therefore, the length of the message
	      plus the padding must be congruent to 448 mod 512 because
	      512 - 128 = 448.
	       In order to fill up the message length it must be filled with
	      padding that begins with 1 bit followed by all 0 bits. Padding
	      must *always* be present, so if the message length is already
	      congruent to 448 mod 512, then 512 padding bits must be added. */

	      // 512 bits == 64 bytes, 448 bits == 56 bytes, 64 bits = 8 bytes
	      // _padding starts with 1 byte with first bit is set in it which
	      // is byte value 128, then there may be up to 63 other pad bytes
	      var padBytes = forge.util.createBuffer();
	      padBytes.putBytes(_input.bytes());
	      // 64 - (remaining msg + 8 bytes msg length) mod 64
	      padBytes.putBytes(_padding.substr(0, 64 - (md.messageLength64[1] + 8 & 0x3F)));

	      /* Now append length of the message. The length is appended in bits
	      as a 64-bit number in big-endian order. Since we store the length in
	      bytes, we must multiply the 64-bit length by 8 (or left shift by 3). */
	      padBytes.putInt32(md.messageLength64[0] << 3 | md.messageLength64[0] >>> 28);
	      padBytes.putInt32(md.messageLength64[1] << 3);
	      var s2 = {
	        h0: _state.h0,
	        h1: _state.h1,
	        h2: _state.h2,
	        h3: _state.h3,
	        h4: _state.h4,
	        h5: _state.h5,
	        h6: _state.h6,
	        h7: _state.h7
	      };
	      _update(s2, _w, padBytes);
	      var rval = forge.util.createBuffer();
	      rval.putInt32(s2.h0);
	      rval.putInt32(s2.h1);
	      rval.putInt32(s2.h2);
	      rval.putInt32(s2.h3);
	      rval.putInt32(s2.h4);
	      rval.putInt32(s2.h5);
	      rval.putInt32(s2.h6);
	      rval.putInt32(s2.h7);
	      return rval;
	    };

	    return md;
	  };

	  // sha-256 padding bytes not initialized yet
	  var _padding = null;
	  var _initialized = false;

	  // table of constants
	  var _k = null;

	  /**
	   * Initializes the constant tables.
	   */
	  function _init() {
	    // create padding
	    _padding = String.fromCharCode(128);
	    _padding += forge.util.fillString(String.fromCharCode(0x00), 64);

	    // create K table for SHA-256
	    _k = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

	    // now initialized
	    _initialized = true;
	  }

	  /**
	   * Updates a SHA-256 state with the given byte buffer.
	   *
	   * @param s the SHA-256 state to update.
	   * @param w the array to use to store words.
	   * @param bytes the byte buffer to update with.
	   */
	  function _update(s, w, bytes) {
	    // consume 512 bit (64 byte) chunks
	    var t1, t2, s0, s1, ch, maj, i, a, b, c, d, e, f, g, h;
	    var len = bytes.length();
	    while (len >= 64) {
	      // the w array will be populated with sixteen 32-bit big-endian words
	      // and then extended into 64 32-bit words according to SHA-256
	      for (i = 0; i < 16; ++i) {
	        w[i] = bytes.getInt32();
	      }
	      for (; i < 64; ++i) {
	        // XOR word 2 words ago rot right 17, rot right 19, shft right 10
	        t1 = w[i - 2];
	        t1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
	        // XOR word 15 words ago rot right 7, rot right 18, shft right 3
	        t2 = w[i - 15];
	        t2 = (t2 >>> 7 | t2 << 25) ^ (t2 >>> 18 | t2 << 14) ^ t2 >>> 3;
	        // sum(t1, word 7 ago, t2, word 16 ago) modulo 2^32
	        w[i] = t1 + w[i - 7] + t2 + w[i - 16] | 0;
	      }

	      // initialize hash value for this chunk
	      a = s.h0;
	      b = s.h1;
	      c = s.h2;
	      d = s.h3;
	      e = s.h4;
	      f = s.h5;
	      g = s.h6;
	      h = s.h7;

	      // round function
	      for (i = 0; i < 64; ++i) {
	        // Sum1(e)
	        s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
	        // Ch(e, f, g) (optimized the same way as SHA-1)
	        ch = g ^ e & (f ^ g);
	        // Sum0(a)
	        s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
	        // Maj(a, b, c) (optimized the same way as SHA-1)
	        maj = a & b | c & (a ^ b);

	        // main algorithm
	        t1 = h + s1 + ch + _k[i] + w[i];
	        t2 = s0 + maj;
	        h = g;
	        g = f;
	        f = e;
	        e = d + t1 | 0;
	        d = c;
	        c = b;
	        b = a;
	        a = t1 + t2 | 0;
	      }

	      // update hash state
	      s.h0 = s.h0 + a | 0;
	      s.h1 = s.h1 + b | 0;
	      s.h2 = s.h2 + c | 0;
	      s.h3 = s.h3 + d | 0;
	      s.h4 = s.h4 + e | 0;
	      s.h5 = s.h5 + f | 0;
	      s.h6 = s.h6 + g | 0;
	      s.h7 = s.h7 + h | 0;
	      len -= 64;
	    }
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Cipher base API.
	 *
	 * @author Dave Longley
	 *
	 * Copyright (c) 2010-2014 Digital Bazaar, Inc.
	 */
	module.exports = function (forge) {

	  forge.cipher = forge.cipher || {};

	  // registered algorithms
	  forge.cipher.algorithms = forge.cipher.algorithms || {};

	  /**
	   * Creates a cipher object that can be used to encrypt data using the given
	   * algorithm and key. The algorithm may be provided as a string value for a
	   * previously registered algorithm or it may be given as a cipher algorithm
	   * API object.
	   *
	   * @param algorithm the algorithm to use, either a string or an algorithm API
	   *          object.
	   * @param key the key to use, as a binary-encoded string of bytes or a
	   *          byte buffer.
	   *
	   * @return the cipher.
	   */
	  forge.cipher.createCipher = function (algorithm, key) {
	    var api = algorithm;
	    if (typeof api === 'string') {
	      api = forge.cipher.getAlgorithm(api);
	      if (api) {
	        api = api();
	      }
	    }
	    if (!api) {
	      throw new Error('Unsupported algorithm: ' + algorithm);
	    }

	    // assume block cipher
	    return new forge.cipher.BlockCipher({
	      algorithm: api,
	      key: key,
	      decrypt: false
	    });
	  };

	  /**
	   * Creates a decipher object that can be used to decrypt data using the given
	   * algorithm and key. The algorithm may be provided as a string value for a
	   * previously registered algorithm or it may be given as a cipher algorithm
	   * API object.
	   *
	   * @param algorithm the algorithm to use, either a string or an algorithm API
	   *          object.
	   * @param key the key to use, as a binary-encoded string of bytes or a
	   *          byte buffer.
	   *
	   * @return the cipher.
	   */
	  forge.cipher.createDecipher = function (algorithm, key) {
	    var api = algorithm;
	    if (typeof api === 'string') {
	      api = forge.cipher.getAlgorithm(api);
	      if (api) {
	        api = api();
	      }
	    }
	    if (!api) {
	      throw new Error('Unsupported algorithm: ' + algorithm);
	    }

	    // assume block cipher
	    return new forge.cipher.BlockCipher({
	      algorithm: api,
	      key: key,
	      decrypt: true
	    });
	  };

	  /**
	   * Registers an algorithm by name. If the name was already registered, the
	   * algorithm API object will be overwritten.
	   *
	   * @param name the name of the algorithm.
	   * @param algorithm the algorithm API object.
	   */
	  forge.cipher.registerAlgorithm = function (name, algorithm) {
	    name = name.toUpperCase();
	    forge.cipher.algorithms[name] = algorithm;
	  };

	  /**
	   * Gets a registered algorithm by name.
	   *
	   * @param name the name of the algorithm.
	   *
	   * @return the algorithm, if found, null if not.
	   */
	  forge.cipher.getAlgorithm = function (name) {
	    name = name.toUpperCase();
	    if (name in forge.cipher.algorithms) {
	      return forge.cipher.algorithms[name];
	    }
	    return null;
	  };

	  var BlockCipher = forge.cipher.BlockCipher = function (options) {
	    this.algorithm = options.algorithm;
	    this.mode = this.algorithm.mode;
	    this.blockSize = this.mode.blockSize;
	    this._finish = false;
	    this._input = null;
	    this.output = null;
	    this._op = options.decrypt ? this.mode.decrypt : this.mode.encrypt;
	    this._decrypt = options.decrypt;
	    this.algorithm.initialize(options);
	  };

	  /**
	   * Starts or restarts the encryption or decryption process, whichever
	   * was previously configured.
	   *
	   * For non-GCM mode, the IV may be a binary-encoded string of bytes, an array
	   * of bytes, a byte buffer, or an array of 32-bit integers. If the IV is in
	   * bytes, then it must be Nb (16) bytes in length. If the IV is given in as
	   * 32-bit integers, then it must be 4 integers long.
	   *
	   * Note: an IV is not required or used in ECB mode.
	   *
	   * For GCM-mode, the IV must be given as a binary-encoded string of bytes or
	   * a byte buffer. The number of bytes should be 12 (96 bits) as recommended
	   * by NIST SP-800-38D but another length may be given.
	   *
	   * @param options the options to use:
	   *          iv the initialization vector to use as a binary-encoded string of
	   *            bytes, null to reuse the last ciphered block from a previous
	   *            update() (this "residue" method is for legacy support only).
	   *          additionalData additional authentication data as a binary-encoded
	   *            string of bytes, for 'GCM' mode, (default: none).
	   *          tagLength desired length of authentication tag, in bits, for
	   *            'GCM' mode (0-128, default: 128).
	   *          tag the authentication tag to check if decrypting, as a
	   *             binary-encoded string of bytes.
	   *          output the output the buffer to write to, null to create one.
	   */
	  BlockCipher.prototype.start = function (options) {
	    options = options || {};
	    var opts = {};
	    for (var key in options) {
	      opts[key] = options[key];
	    }
	    opts.decrypt = this._decrypt;
	    this._finish = false;
	    this._input = forge.util.createBuffer();
	    this.output = options.output || forge.util.createBuffer();
	    this.mode.start(opts);
	  };

	  /**
	   * Updates the next block according to the cipher mode.
	   *
	   * @param input the buffer to read from.
	   */
	  BlockCipher.prototype.update = function (input) {
	    if (input) {
	      // input given, so empty it into the input buffer
	      this._input.putBuffer(input);
	    }

	    // do cipher operation until it needs more input and not finished
	    while (!this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish) {}

	    // free consumed memory from input buffer
	    this._input.compact();
	  };

	  /**
	   * Finishes encrypting or decrypting.
	   *
	   * @param pad a padding function to use in CBC mode, null for default,
	   *          signature(blockSize, buffer, decrypt).
	   *
	   * @return true if successful, false on error.
	   */
	  BlockCipher.prototype.finish = function (pad) {
	    // backwards-compatibility w/deprecated padding API
	    // Note: will overwrite padding functions even after another start() call
	    if (pad && (this.mode.name === 'ECB' || this.mode.name === 'CBC')) {
	      this.mode.pad = function (input) {
	        return pad(this.blockSize, input, false);
	      };
	      this.mode.unpad = function (output) {
	        return pad(this.blockSize, output, true);
	      };
	    }

	    // build options for padding and afterFinish functions
	    var options = {};
	    options.decrypt = this._decrypt;

	    // get # of bytes that won't fill a block
	    options.overflow = this._input.length() % this.blockSize;

	    if (!this._decrypt && this.mode.pad) {
	      if (!this.mode.pad(this._input, options)) {
	        return false;
	      }
	    }

	    // do final update
	    this._finish = true;
	    this.update();

	    if (this._decrypt && this.mode.unpad) {
	      if (!this.mode.unpad(this.output, options)) {
	        return false;
	      }
	    }

	    if (this.mode.afterFinish) {
	      if (!this.mode.afterFinish(this.output, options)) {
	        return false;
	      }
	    }

	    return true;
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Supported cipher modes.
	 *
	 * @author Dave Longley
	 *
	 * Copyright (c) 2010-2014 Digital Bazaar, Inc.
	 */
	module.exports = function (forge) {

	  forge.cipher = forge.cipher || {};

	  // supported cipher modes
	  var modes = forge.cipher.modes = forge.cipher.modes || {};

	  /** Electronic codebook (ECB) (Don't use this; it's not secure) **/

	  /** Cipher-block Chaining (CBC) **/

	  modes.cbc = function (options) {
	    options = options || {};
	    this.name = 'CBC';
	    this.cipher = options.cipher;
	    this.blockSize = options.blockSize || 16;
	    this._ints = this.blockSize / 4;
	    this._inBlock = new Array(this._ints);
	    this._outBlock = new Array(this._ints);
	  };

	  modes.cbc.prototype.start = function (options) {
	    // Note: legacy support for using IV residue (has security flaws)
	    // if IV is null, reuse block from previous processing
	    if (options.iv === null) {
	      // must have a previous block
	      if (!this._prev) {
	        throw new Error('Invalid IV parameter.');
	      }
	      this._iv = this._prev.slice(0);
	    } else if (!('iv' in options)) {
	      throw new Error('Invalid IV parameter.');
	    } else {
	      // save IV as "previous" block
	      this._iv = transformIV(options.iv);
	      this._prev = this._iv.slice(0);
	    }
	  };

	  modes.cbc.prototype.encrypt = function (input, output, finish) {
	    // not enough input to encrypt
	    if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
	      return true;
	    }

	    // get next block
	    // CBC XOR's IV (or previous block) with plaintext
	    for (var i = 0; i < this._ints; ++i) {
	      this._inBlock[i] = this._prev[i] ^ input.getInt32();
	    }

	    // encrypt block
	    this.cipher.encrypt(this._inBlock, this._outBlock);

	    // write output, save previous block
	    for (var i = 0; i < this._ints; ++i) {
	      output.putInt32(this._outBlock[i]);
	    }
	    this._prev = this._outBlock;
	  };

	  modes.cbc.prototype.decrypt = function (input, output, finish) {
	    // not enough input to decrypt
	    if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
	      return true;
	    }

	    // get next block
	    for (var i = 0; i < this._ints; ++i) {
	      this._inBlock[i] = input.getInt32();
	    }

	    // decrypt block
	    this.cipher.decrypt(this._inBlock, this._outBlock);

	    // write output, save previous ciphered block
	    // CBC XOR's IV (or previous block) with ciphertext
	    for (var i = 0; i < this._ints; ++i) {
	      output.putInt32(this._prev[i] ^ this._outBlock[i]);
	    }
	    this._prev = this._inBlock.slice(0);
	  };

	  modes.cbc.prototype.pad = function (input, options) {
	    // add PKCS#7 padding to block (each pad byte is the
	    // value of the number of pad bytes)
	    var padding = input.length() === this.blockSize ? this.blockSize : this.blockSize - input.length();
	    input.fillWithByte(padding, padding);
	    return true;
	  };

	  modes.cbc.prototype.unpad = function (output, options) {
	    // check for error: input data not a multiple of blockSize
	    if (options.overflow > 0) {
	      return false;
	    }

	    // ensure padding byte count is valid
	    var len = output.length();
	    var count = output.at(len - 1);
	    if (count > this.blockSize << 2) {
	      return false;
	    }

	    // trim off padding bytes
	    output.truncate(count);
	    return true;
	  };

	  /** Utility functions */

	  function transformIV(iv) {
	    if (typeof iv === 'string') {
	      // convert iv string into byte buffer
	      iv = forge.util.createBuffer(iv);
	    }

	    if (forge.util.isArray(iv) && iv.length > 4) {
	      // convert iv byte array into byte buffer
	      var tmp = iv;
	      iv = forge.util.createBuffer();
	      for (var i = 0; i < tmp.length; ++i) {
	        iv.putByte(tmp[i]);
	      }
	    }
	    if (!forge.util.isArray(iv)) {
	      // convert iv byte buffer into 32-bit integer array
	      iv = [iv.getInt32(), iv.getInt32(), iv.getInt32(), iv.getInt32()];
	    }

	    return iv;
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Advanced Encryption Standard (AES) implementation.
	 *
	 * This implementation is based on the public domain library 'jscrypto' which
	 * was written by:
	 *
	 * Emily Stark (estark@stanford.edu)
	 * Mike Hamburg (mhamburg@stanford.edu)
	 * Dan Boneh (dabo@cs.stanford.edu)
	 *
	 * Parts of this code are based on the OpenSSL implementation of AES:
	 * http://www.openssl.org
	 *
	 * @author Dave Longley
	 *
	 * Copyright (c) 2010-2014 Digital Bazaar, Inc.
	 */
	module.exports = function (forge) {

	  /* AES API */
	  forge.aes = forge.aes || {};

	  /**
	   * Creates a new AES cipher algorithm object.
	   *
	   * @param name the name of the algorithm.
	   * @param mode the mode factory function.
	   *
	   * @return the AES algorithm object.
	   */
	  forge.aes.Algorithm = function (name, mode) {
	    if (!init) {
	      initialize();
	    }
	    var self = this;
	    self.name = name;
	    self.mode = new mode({
	      blockSize: 16,
	      cipher: {
	        encrypt: function encrypt(inBlock, outBlock) {
	          return _updateBlock(self._w, inBlock, outBlock, false);
	        },
	        decrypt: function decrypt(inBlock, outBlock) {
	          return _updateBlock(self._w, inBlock, outBlock, true);
	        }
	      }
	    });
	    self._init = false;
	  };

	  /**
	   * Initializes this AES algorithm by expanding its key.
	   *
	   * @param options the options to use.
	   *          key the key to use with this algorithm.
	   *          decrypt true if the algorithm should be initialized for decryption,
	   *            false for encryption.
	   */
	  forge.aes.Algorithm.prototype.initialize = function (options) {
	    if (this._init) {
	      return;
	    }

	    var key = options.key;
	    var tmp;

	    /* Note: The key may be a string of bytes, an array of bytes, a byte
	      buffer, or an array of 32-bit integers. If the key is in bytes, then
	      it must be 16, 24, or 32 bytes in length. If it is in 32-bit
	      integers, it must be 4, 6, or 8 integers long. */

	    if (typeof key === 'string' && (key.length === 16 || key.length === 24 || key.length === 32)) {
	      // convert key string into byte buffer
	      key = forge.util.createBuffer(key);
	    } else if (forge.util.isArray(key) && (key.length === 16 || key.length === 24 || key.length === 32)) {
	      // convert key integer array into byte buffer
	      tmp = key;
	      key = forge.util.createBuffer();
	      for (var i = 0; i < tmp.length; ++i) {
	        key.putByte(tmp[i]);
	      }
	    }

	    // convert key byte buffer into 32-bit integer array
	    if (!forge.util.isArray(key)) {
	      tmp = key;
	      key = [];

	      // key lengths of 16, 24, 32 bytes allowed
	      var len = tmp.length();
	      if (len === 16 || len === 24 || len === 32) {
	        len = len >>> 2;
	        for (var i = 0; i < len; ++i) {
	          key.push(tmp.getInt32());
	        }
	      }
	    }

	    // key must be an array of 32-bit integers by now
	    if (!forge.util.isArray(key) || !(key.length === 4 || key.length === 6 || key.length === 8)) {
	      throw new Error('Invalid key parameter.');
	    }

	    // encryption operation is always used for these modes
	    var mode = this.mode.name;
	    var encryptOp = ['CFB', 'OFB', 'CTR', 'GCM'].indexOf(mode) !== -1;

	    // do key expansion
	    this._w = _expandKey(key, options.decrypt && !encryptOp);
	    this._init = true;
	  };

	  /**
	   * Expands a key. Typically only used for testing.
	   *
	   * @param key the symmetric key to expand, as an array of 32-bit words.
	   * @param decrypt true to expand for decryption, false for encryption.
	   *
	   * @return the expanded key.
	   */
	  forge.aes._expandKey = function (key, decrypt) {
	    if (!init) {
	      initialize();
	    }
	    return _expandKey(key, decrypt);
	  };

	  /**
	   * Updates a single block. Typically only used for testing.
	   *
	   * @param w the expanded key to use.
	   * @param input an array of block-size 32-bit words.
	   * @param output an array of block-size 32-bit words.
	   * @param decrypt true to decrypt, false to encrypt.
	   */
	  forge.aes._updateBlock = _updateBlock;

	  /** Register AES algorithms **/

	  registerAlgorithm('AES-CBC', forge.cipher.modes.cbc);

	  function registerAlgorithm(name, mode) {
	    var factory = function factory() {
	      return new forge.aes.Algorithm(name, mode);
	    };
	    forge.cipher.registerAlgorithm(name, factory);
	  }

	  /** AES implementation **/

	  var init = false; // not yet initialized
	  var Nb = 4; // number of words comprising the state (AES = 4)
	  var sbox; // non-linear substitution table used in key expansion
	  var isbox; // inversion of sbox
	  var rcon; // round constant word array
	  var mix; // mix-columns table
	  var imix; // inverse mix-columns table

	  /**
	   * Performs initialization, ie: precomputes tables to optimize for speed.
	   *
	   * One way to understand how AES works is to imagine that 'addition' and
	   * 'multiplication' are interfaces that require certain mathematical
	   * properties to hold true (ie: they are associative) but they might have
	   * different implementations and produce different kinds of results ...
	   * provided that their mathematical properties remain true. AES defines
	   * its own methods of addition and multiplication but keeps some important
	   * properties the same, ie: associativity and distributivity. The
	   * explanation below tries to shed some light on how AES defines addition
	   * and multiplication of bytes and 32-bit words in order to perform its
	   * encryption and decryption algorithms.
	   *
	   * The basics:
	   *
	   * The AES algorithm views bytes as binary representations of polynomials
	   * that have either 1 or 0 as the coefficients. It defines the addition
	   * or subtraction of two bytes as the XOR operation. It also defines the
	   * multiplication of two bytes as a finite field referred to as GF(2^8)
	   * (Note: 'GF' means "Galois Field" which is a field that contains a finite
	   * number of elements so GF(2^8) has 256 elements).
	   *
	   * This means that any two bytes can be represented as binary polynomials;
	   * when they multiplied together and modularly reduced by an irreducible
	   * polynomial of the 8th degree, the results are the field GF(2^8). The
	   * specific irreducible polynomial that AES uses in hexadecimal is 0x11b.
	   * This multiplication is associative with 0x01 as the identity:
	   *
	   * (b * 0x01 = GF(b, 0x01) = b).
	   *
	   * The operation GF(b, 0x02) can be performed at the byte level by left
	   * shifting b once and then XOR'ing it (to perform the modular reduction)
	   * with 0x11b if b is >= 128. Repeated application of the multiplication
	   * of 0x02 can be used to implement the multiplication of any two bytes.
	   *
	   * For instance, multiplying 0x57 and 0x13, denoted as GF(0x57, 0x13), can
	   * be performed by factoring 0x13 into 0x01, 0x02, and 0x10. Then these
	   * factors can each be multiplied by 0x57 and then added together. To do
	   * the multiplication, values for 0x57 multiplied by each of these 3 factors
	   * can be precomputed and stored in a table. To add them, the values from
	   * the table are XOR'd together.
	   *
	   * AES also defines addition and multiplication of words, that is 4-byte
	   * numbers represented as polynomials of 3 degrees where the coefficients
	   * are the values of the bytes.
	   *
	   * The word [a0, a1, a2, a3] is a polynomial a3x^3 + a2x^2 + a1x + a0.
	   *
	   * Addition is performed by XOR'ing like powers of x. Multiplication
	   * is performed in two steps, the first is an algebriac expansion as
	   * you would do normally (where addition is XOR). But the result is
	   * a polynomial larger than 3 degrees and thus it cannot fit in a word. So
	   * next the result is modularly reduced by an AES-specific polynomial of
	   * degree 4 which will always produce a polynomial of less than 4 degrees
	   * such that it will fit in a word. In AES, this polynomial is x^4 + 1.
	   *
	   * The modular product of two polynomials 'a' and 'b' is thus:
	   *
	   * d(x) = d3x^3 + d2x^2 + d1x + d0
	   * with
	   * d0 = GF(a0, b0) ^ GF(a3, b1) ^ GF(a2, b2) ^ GF(a1, b3)
	   * d1 = GF(a1, b0) ^ GF(a0, b1) ^ GF(a3, b2) ^ GF(a2, b3)
	   * d2 = GF(a2, b0) ^ GF(a1, b1) ^ GF(a0, b2) ^ GF(a3, b3)
	   * d3 = GF(a3, b0) ^ GF(a2, b1) ^ GF(a1, b2) ^ GF(a0, b3)
	   *
	   * As a matrix:
	   *
	   * [d0] = [a0 a3 a2 a1][b0]
	   * [d1]   [a1 a0 a3 a2][b1]
	   * [d2]   [a2 a1 a0 a3][b2]
	   * [d3]   [a3 a2 a1 a0][b3]
	   *
	   * Special polynomials defined by AES (0x02 == {02}):
	   * a(x)    = {03}x^3 + {01}x^2 + {01}x + {02}
	   * a^-1(x) = {0b}x^3 + {0d}x^2 + {09}x + {0e}.
	   *
	   * These polynomials are used in the MixColumns() and InverseMixColumns()
	   * operations, respectively, to cause each element in the state to affect
	   * the output (referred to as diffusing).
	   *
	   * RotWord() uses: a0 = a1 = a2 = {00} and a3 = {01}, which is the
	   * polynomial x3.
	   *
	   * The ShiftRows() method modifies the last 3 rows in the state (where
	   * the state is 4 words with 4 bytes per word) by shifting bytes cyclically.
	   * The 1st byte in the second row is moved to the end of the row. The 1st
	   * and 2nd bytes in the third row are moved to the end of the row. The 1st,
	   * 2nd, and 3rd bytes are moved in the fourth row.
	   *
	   * More details on how AES arithmetic works:
	   *
	   * In the polynomial representation of binary numbers, XOR performs addition
	   * and subtraction and multiplication in GF(2^8) denoted as GF(a, b)
	   * corresponds with the multiplication of polynomials modulo an irreducible
	   * polynomial of degree 8. In other words, for AES, GF(a, b) will multiply
	   * polynomial 'a' with polynomial 'b' and then do a modular reduction by
	   * an AES-specific irreducible polynomial of degree 8.
	   *
	   * A polynomial is irreducible if its only divisors are one and itself. For
	   * the AES algorithm, this irreducible polynomial is:
	   *
	   * m(x) = x^8 + x^4 + x^3 + x + 1,
	   *
	   * or {01}{1b} in hexadecimal notation, where each coefficient is a bit:
	   * 100011011 = 283 = 0x11b.
	   *
	   * For example, GF(0x57, 0x83) = 0xc1 because
	   *
	   * 0x57 = 87  = 01010111 = x^6 + x^4 + x^2 + x + 1
	   * 0x85 = 131 = 10000101 = x^7 + x + 1
	   *
	   * (x^6 + x^4 + x^2 + x + 1) * (x^7 + x + 1)
	   * =  x^13 + x^11 + x^9 + x^8 + x^7 +
	   *    x^7 + x^5 + x^3 + x^2 + x +
	   *    x^6 + x^4 + x^2 + x + 1
	   * =  x^13 + x^11 + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + 1 = y
	   *    y modulo (x^8 + x^4 + x^3 + x + 1)
	   * =  x^7 + x^6 + 1.
	   *
	   * The modular reduction by m(x) guarantees the result will be a binary
	   * polynomial of less than degree 8, so that it can fit in a byte.
	   *
	   * The operation to multiply a binary polynomial b with x (the polynomial
	   * x in binary representation is 00000010) is:
	   *
	   * b_7x^8 + b_6x^7 + b_5x^6 + b_4x^5 + b_3x^4 + b_2x^3 + b_1x^2 + b_0x^1
	   *
	   * To get GF(b, x) we must reduce that by m(x). If b_7 is 0 (that is the
	   * most significant bit is 0 in b) then the result is already reduced. If
	   * it is 1, then we can reduce it by subtracting m(x) via an XOR.
	   *
	   * It follows that multiplication by x (00000010 or 0x02) can be implemented
	   * by performing a left shift followed by a conditional bitwise XOR with
	   * 0x1b. This operation on bytes is denoted by xtime(). Multiplication by
	   * higher powers of x can be implemented by repeated application of xtime().
	   *
	   * By adding intermediate results, multiplication by any constant can be
	   * implemented. For instance:
	   *
	   * GF(0x57, 0x13) = 0xfe because:
	   *
	   * xtime(b) = (b & 128) ? (b << 1 ^ 0x11b) : (b << 1)
	   *
	   * Note: We XOR with 0x11b instead of 0x1b because in javascript our
	   * datatype for b can be larger than 1 byte, so a left shift will not
	   * automatically eliminate bits that overflow a byte ... by XOR'ing the
	   * overflow bit with 1 (the extra one from 0x11b) we zero it out.
	   *
	   * GF(0x57, 0x02) = xtime(0x57) = 0xae
	   * GF(0x57, 0x04) = xtime(0xae) = 0x47
	   * GF(0x57, 0x08) = xtime(0x47) = 0x8e
	   * GF(0x57, 0x10) = xtime(0x8e) = 0x07
	   *
	   * GF(0x57, 0x13) = GF(0x57, (0x01 ^ 0x02 ^ 0x10))
	   *
	   * And by the distributive property (since XOR is addition and GF() is
	   * multiplication):
	   *
	   * = GF(0x57, 0x01) ^ GF(0x57, 0x02) ^ GF(0x57, 0x10)
	   * = 0x57 ^ 0xae ^ 0x07
	   * = 0xfe.
	   */
	  function initialize() {
	    init = true;

	    /* Populate the Rcon table. These are the values given by
	      [x^(i-1),{00},{00},{00}] where x^(i-1) are powers of x (and x = 0x02)
	      in the field of GF(2^8), where i starts at 1.
	       rcon[0] = [0x00, 0x00, 0x00, 0x00]
	      rcon[1] = [0x01, 0x00, 0x00, 0x00] 2^(1-1) = 2^0 = 1
	      rcon[2] = [0x02, 0x00, 0x00, 0x00] 2^(2-1) = 2^1 = 2
	      ...
	      rcon[9]  = [0x1B, 0x00, 0x00, 0x00] 2^(9-1)  = 2^8 = 0x1B
	      rcon[10] = [0x36, 0x00, 0x00, 0x00] 2^(10-1) = 2^9 = 0x36
	       We only store the first byte because it is the only one used.
	    */
	    rcon = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1B, 0x36];

	    // compute xtime table which maps i onto GF(i, 0x02)
	    var xtime = new Array(256);
	    for (var i = 0; i < 128; ++i) {
	      xtime[i] = i << 1;
	      xtime[i + 128] = i + 128 << 1 ^ 0x11B;
	    }

	    // compute all other tables
	    sbox = new Array(256);
	    isbox = new Array(256);
	    mix = new Array(4);
	    imix = new Array(4);
	    for (var i = 0; i < 4; ++i) {
	      mix[i] = new Array(256);
	      imix[i] = new Array(256);
	    }
	    var e = 0,
	        ei = 0,
	        e2,
	        e4,
	        e8,
	        sx,
	        sx2,
	        me,
	        ime;
	    for (var i = 0; i < 256; ++i) {
	      /* We need to generate the SubBytes() sbox and isbox tables so that
	        we can perform byte substitutions. This requires us to traverse
	        all of the elements in GF, find their multiplicative inverses,
	        and apply to each the following affine transformation:
	         bi' = bi ^ b(i + 4) mod 8 ^ b(i + 5) mod 8 ^ b(i + 6) mod 8 ^
	              b(i + 7) mod 8 ^ ci
	        for 0 <= i < 8, where bi is the ith bit of the byte, and ci is the
	        ith bit of a byte c with the value {63} or {01100011}.
	         It is possible to traverse every possible value in a Galois field
	        using what is referred to as a 'generator'. There are many
	        generators (128 out of 256): 3,5,6,9,11,82 to name a few. To fully
	        traverse GF we iterate 255 times, multiplying by our generator
	        each time.
	         On each iteration we can determine the multiplicative inverse for
	        the current element.
	         Suppose there is an element in GF 'e'. For a given generator 'g',
	        e = g^x. The multiplicative inverse of e is g^(255 - x). It turns
	        out that if use the inverse of a generator as another generator
	        it will produce all of the corresponding multiplicative inverses
	        at the same time. For this reason, we choose 5 as our inverse
	        generator because it only requires 2 multiplies and 1 add and its
	        inverse, 82, requires relatively few operations as well.
	         In order to apply the affine transformation, the multiplicative
	        inverse 'ei' of 'e' can be repeatedly XOR'd (4 times) with a
	        bit-cycling of 'ei'. To do this 'ei' is first stored in 's' and
	        'x'. Then 's' is left shifted and the high bit of 's' is made the
	        low bit. The resulting value is stored in 's'. Then 'x' is XOR'd
	        with 's' and stored in 'x'. On each subsequent iteration the same
	        operation is performed. When 4 iterations are complete, 'x' is
	        XOR'd with 'c' (0x63) and the transformed value is stored in 'x'.
	        For example:
	         s = 01000001
	        x = 01000001
	         iteration 1: s = 10000010, x ^= s
	        iteration 2: s = 00000101, x ^= s
	        iteration 3: s = 00001010, x ^= s
	        iteration 4: s = 00010100, x ^= s
	        x ^= 0x63
	         This can be done with a loop where s = (s << 1) | (s >> 7). However,
	        it can also be done by using a single 16-bit (in this case 32-bit)
	        number 'sx'. Since XOR is an associative operation, we can set 'sx'
	        to 'ei' and then XOR it with 'sx' left-shifted 1,2,3, and 4 times.
	        The most significant bits will flow into the high 8 bit positions
	        and be correctly XOR'd with one another. All that remains will be
	        to cycle the high 8 bits by XOR'ing them all with the lower 8 bits
	        afterwards.
	         At the same time we're populating sbox and isbox we can precompute
	        the multiplication we'll need to do to do MixColumns() later.
	      */

	      // apply affine transformation
	      sx = ei ^ ei << 1 ^ ei << 2 ^ ei << 3 ^ ei << 4;
	      sx = sx >> 8 ^ sx & 255 ^ 0x63;

	      // update tables
	      sbox[e] = sx;
	      isbox[sx] = e;

	      /* Mixing columns is done using matrix multiplication. The columns
	        that are to be mixed are each a single word in the current state.
	        The state has Nb columns (4 columns). Therefore each column is a
	        4 byte word. So to mix the columns in a single column 'c' where
	        its rows are r0, r1, r2, and r3, we use the following matrix
	        multiplication:
	         [2 3 1 1]*[r0,c]=[r'0,c]
	        [1 2 3 1] [r1,c] [r'1,c]
	        [1 1 2 3] [r2,c] [r'2,c]
	        [3 1 1 2] [r3,c] [r'3,c]
	         r0, r1, r2, and r3 are each 1 byte of one of the words in the
	        state (a column). To do matrix multiplication for each mixed
	        column c' we multiply the corresponding row from the left matrix
	        with the corresponding column from the right matrix. In total, we
	        get 4 equations:
	         r0,c' = 2*r0,c + 3*r1,c + 1*r2,c + 1*r3,c
	        r1,c' = 1*r0,c + 2*r1,c + 3*r2,c + 1*r3,c
	        r2,c' = 1*r0,c + 1*r1,c + 2*r2,c + 3*r3,c
	        r3,c' = 3*r0,c + 1*r1,c + 1*r2,c + 2*r3,c
	         As usual, the multiplication is as previously defined and the
	        addition is XOR. In order to optimize mixing columns we can store
	        the multiplication results in tables. If you think of the whole
	        column as a word (it might help to visualize by mentally rotating
	        the equations above by counterclockwise 90 degrees) then you can
	        see that it would be useful to map the multiplications performed on
	        each byte (r0, r1, r2, r3) onto a word as well. For instance, we
	        could map 2*r0,1*r0,1*r0,3*r0 onto a word by storing 2*r0 in the
	        highest 8 bits and 3*r0 in the lowest 8 bits (with the other two
	        respectively in the middle). This means that a table can be
	        constructed that uses r0 as an index to the word. We can do the
	        same with r1, r2, and r3, creating a total of 4 tables.
	         To construct a full c', we can just look up each byte of c in
	        their respective tables and XOR the results together.
	         Also, to build each table we only have to calculate the word
	        for 2,1,1,3 for every byte ... which we can do on each iteration
	        of this loop since we will iterate over every byte. After we have
	        calculated 2,1,1,3 we can get the results for the other tables
	        by cycling the byte at the end to the beginning. For instance
	        we can take the result of table 2,1,1,3 and produce table 3,2,1,1
	        by moving the right most byte to the left most position just like
	        how you can imagine the 3 moved out of 2,1,1,3 and to the front
	        to produce 3,2,1,1.
	         There is another optimization in that the same multiples of
	        the current element we need in order to advance our generator
	        to the next iteration can be reused in performing the 2,1,1,3
	        calculation. We also calculate the inverse mix column tables,
	        with e,9,d,b being the inverse of 2,1,1,3.
	         When we're done, and we need to actually mix columns, the first
	        byte of each state word should be put through mix[0] (2,1,1,3),
	        the second through mix[1] (3,2,1,1) and so forth. Then they should
	        be XOR'd together to produce the fully mixed column.
	      */

	      // calculate mix and imix table values
	      sx2 = xtime[sx];
	      e2 = xtime[e];
	      e4 = xtime[e2];
	      e8 = xtime[e4];
	      me = sx2 << 24 ^ // 2
	      sx << 16 ^ // 1
	      sx << 8 ^ ( // 1
	      sx ^ sx2); // 3
	      ime = (e2 ^ e4 ^ e8) << 24 ^ // E (14)
	      (e ^ e8) << 16 ^ // 9
	      (e ^ e4 ^ e8) << 8 ^ ( // D (13)
	      e ^ e2 ^ e8); // B (11)
	      // produce each of the mix tables by rotating the 2,1,1,3 value
	      for (var n = 0; n < 4; ++n) {
	        mix[n][e] = me;
	        imix[n][sx] = ime;
	        // cycle the right most byte to the left most position
	        // ie: 2,1,1,3 becomes 3,2,1,1
	        me = me << 24 | me >>> 8;
	        ime = ime << 24 | ime >>> 8;
	      }

	      // get next element and inverse
	      if (e === 0) {
	        // 1 is the inverse of 1
	        e = ei = 1;
	      } else {
	        // e = 2e + 2*2*2*(10e)) = multiply e by 82 (chosen generator)
	        // ei = ei + 2*2*ei = multiply ei by 5 (inverse generator)
	        e = e2 ^ xtime[xtime[xtime[e2 ^ e8]]];
	        ei ^= xtime[xtime[ei]];
	      }
	    }
	  }

	  /**
	   * Generates a key schedule using the AES key expansion algorithm.
	   *
	   * The AES algorithm takes the Cipher Key, K, and performs a Key Expansion
	   * routine to generate a key schedule. The Key Expansion generates a total
	   * of Nb*(Nr + 1) words: the algorithm requires an initial set of Nb words,
	   * and each of the Nr rounds requires Nb words of key data. The resulting
	   * key schedule consists of a linear array of 4-byte words, denoted [wi ],
	   * with i in the range 0 ≤ i < Nb(Nr + 1).
	   *
	   * KeyExpansion(byte key[4*Nk], word w[Nb*(Nr+1)], Nk)
	   * AES-128 (Nb=4, Nk=4, Nr=10)
	   * AES-192 (Nb=4, Nk=6, Nr=12)
	   * AES-256 (Nb=4, Nk=8, Nr=14)
	   * Note: Nr=Nk+6.
	   *
	   * Nb is the number of columns (32-bit words) comprising the State (or
	   * number of bytes in a block). For AES, Nb=4.
	   *
	   * @param key the key to schedule (as an array of 32-bit words).
	   * @param decrypt true to modify the key schedule to decrypt, false not to.
	   *
	   * @return the generated key schedule.
	   */
	  function _expandKey(key, decrypt) {
	    // copy the key's words to initialize the key schedule
	    var w = key.slice(0);

	    /* RotWord() will rotate a word, moving the first byte to the last
	      byte's position (shifting the other bytes left).
	       We will be getting the value of Rcon at i / Nk. 'i' will iterate
	      from Nk to (Nb * Nr+1). Nk = 4 (4 byte key), Nb = 4 (4 words in
	      a block), Nr = Nk + 6 (10). Therefore 'i' will iterate from
	      4 to 44 (exclusive). Each time we iterate 4 times, i / Nk will
	      increase by 1. We use a counter iNk to keep track of this.
	     */

	    // go through the rounds expanding the key
	    var temp,
	        iNk = 1;
	    var Nk = w.length;
	    var Nr1 = Nk + 6 + 1;
	    var end = Nb * Nr1;
	    for (var i = Nk; i < end; ++i) {
	      temp = w[i - 1];
	      if (i % Nk === 0) {
	        // temp = SubWord(RotWord(temp)) ^ Rcon[i / Nk]
	        temp = sbox[temp >>> 16 & 255] << 24 ^ sbox[temp >>> 8 & 255] << 16 ^ sbox[temp & 255] << 8 ^ sbox[temp >>> 24] ^ rcon[iNk] << 24;
	        iNk++;
	      } else if (Nk > 6 && i % Nk === 4) {
	        // temp = SubWord(temp)
	        temp = sbox[temp >>> 24] << 24 ^ sbox[temp >>> 16 & 255] << 16 ^ sbox[temp >>> 8 & 255] << 8 ^ sbox[temp & 255];
	      }
	      w[i] = w[i - Nk] ^ temp;
	    }

	    /* When we are updating a cipher block we always use the code path for
	      encryption whether we are decrypting or not (to shorten code and
	      simplify the generation of look up tables). However, because there
	      are differences in the decryption algorithm, other than just swapping
	      in different look up tables, we must transform our key schedule to
	      account for these changes:
	       1. The decryption algorithm gets its key rounds in reverse order.
	      2. The decryption algorithm adds the round key before mixing columns
	        instead of afterwards.
	       We don't need to modify our key schedule to handle the first case,
	      we can just traverse the key schedule in reverse order when decrypting.
	       The second case requires a little work.
	       The tables we built for performing rounds will take an input and then
	      perform SubBytes() and MixColumns() or, for the decrypt version,
	      InvSubBytes() and InvMixColumns(). But the decrypt algorithm requires
	      us to AddRoundKey() before InvMixColumns(). This means we'll need to
	      apply some transformations to the round key to inverse-mix its columns
	      so they'll be correct for moving AddRoundKey() to after the state has
	      had its columns inverse-mixed.
	       To inverse-mix the columns of the state when we're decrypting we use a
	      lookup table that will apply InvSubBytes() and InvMixColumns() at the
	      same time. However, the round key's bytes are not inverse-substituted
	      in the decryption algorithm. To get around this problem, we can first
	      substitute the bytes in the round key so that when we apply the
	      transformation via the InvSubBytes()+InvMixColumns() table, it will
	      undo our substitution leaving us with the original value that we
	      want -- and then inverse-mix that value.
	       This change will correctly alter our key schedule so that we can XOR
	      each round key with our already transformed decryption state. This
	      allows us to use the same code path as the encryption algorithm.
	       We make one more change to the decryption key. Since the decryption
	      algorithm runs in reverse from the encryption algorithm, we reverse
	      the order of the round keys to avoid having to iterate over the key
	      schedule backwards when running the encryption algorithm later in
	      decryption mode. In addition to reversing the order of the round keys,
	      we also swap each round key's 2nd and 4th rows. See the comments
	      section where rounds are performed for more details about why this is
	      done. These changes are done inline with the other substitution
	      described above.
	    */
	    if (decrypt) {
	      var tmp;
	      var m0 = imix[0];
	      var m1 = imix[1];
	      var m2 = imix[2];
	      var m3 = imix[3];
	      var wnew = w.slice(0);
	      end = w.length;
	      for (var i = 0, wi = end - Nb; i < end; i += Nb, wi -= Nb) {
	        // do not sub the first or last round key (round keys are Nb
	        // words) as no column mixing is performed before they are added,
	        // but do change the key order
	        if (i === 0 || i === end - Nb) {
	          wnew[i] = w[wi];
	          wnew[i + 1] = w[wi + 3];
	          wnew[i + 2] = w[wi + 2];
	          wnew[i + 3] = w[wi + 1];
	        } else {
	          // substitute each round key byte because the inverse-mix
	          // table will inverse-substitute it (effectively cancel the
	          // substitution because round key bytes aren't sub'd in
	          // decryption mode) and swap indexes 3 and 1
	          for (var n = 0; n < Nb; ++n) {
	            tmp = w[wi + n];
	            wnew[i + (3 & -n)] = m0[sbox[tmp >>> 24]] ^ m1[sbox[tmp >>> 16 & 255]] ^ m2[sbox[tmp >>> 8 & 255]] ^ m3[sbox[tmp & 255]];
	          }
	        }
	      }
	      w = wnew;
	    }

	    return w;
	  }

	  /**
	   * Updates a single block (16 bytes) using AES. The update will either
	   * encrypt or decrypt the block.
	   *
	   * @param w the key schedule.
	   * @param input the input block (an array of 32-bit words).
	   * @param output the updated output block.
	   * @param decrypt true to decrypt the block, false to encrypt it.
	   */
	  function _updateBlock(w, input, output, decrypt) {
	    /*
	    Cipher(byte in[4*Nb], byte out[4*Nb], word w[Nb*(Nr+1)])
	    begin
	      byte state[4,Nb]
	      state = in
	      AddRoundKey(state, w[0, Nb-1])
	      for round = 1 step 1 to Nr–1
	        SubBytes(state)
	        ShiftRows(state)
	        MixColumns(state)
	        AddRoundKey(state, w[round*Nb, (round+1)*Nb-1])
	      end for
	      SubBytes(state)
	      ShiftRows(state)
	      AddRoundKey(state, w[Nr*Nb, (Nr+1)*Nb-1])
	      out = state
	    end
	     InvCipher(byte in[4*Nb], byte out[4*Nb], word w[Nb*(Nr+1)])
	    begin
	      byte state[4,Nb]
	      state = in
	      AddRoundKey(state, w[Nr*Nb, (Nr+1)*Nb-1])
	      for round = Nr-1 step -1 downto 1
	        InvShiftRows(state)
	        InvSubBytes(state)
	        AddRoundKey(state, w[round*Nb, (round+1)*Nb-1])
	        InvMixColumns(state)
	      end for
	      InvShiftRows(state)
	      InvSubBytes(state)
	      AddRoundKey(state, w[0, Nb-1])
	      out = state
	    end
	    */

	    // Encrypt: AddRoundKey(state, w[0, Nb-1])
	    // Decrypt: AddRoundKey(state, w[Nr*Nb, (Nr+1)*Nb-1])
	    var Nr = w.length / 4 - 1;
	    var m0, m1, m2, m3, sub;
	    if (decrypt) {
	      m0 = imix[0];
	      m1 = imix[1];
	      m2 = imix[2];
	      m3 = imix[3];
	      sub = isbox;
	    } else {
	      m0 = mix[0];
	      m1 = mix[1];
	      m2 = mix[2];
	      m3 = mix[3];
	      sub = sbox;
	    }
	    var a, b, c, d, a2, b2, c2;
	    a = input[0] ^ w[0];
	    b = input[decrypt ? 3 : 1] ^ w[1];
	    c = input[2] ^ w[2];
	    d = input[decrypt ? 1 : 3] ^ w[3];
	    var i = 3;

	    /* In order to share code we follow the encryption algorithm when both
	      encrypting and decrypting. To account for the changes required in the
	      decryption algorithm, we use different lookup tables when decrypting
	      and use a modified key schedule to account for the difference in the
	      order of transformations applied when performing rounds. We also get
	      key rounds in reverse order (relative to encryption). */
	    for (var round = 1; round < Nr; ++round) {
	      /* As described above, we'll be using table lookups to perform the
	        column mixing. Each column is stored as a word in the state (the
	        array 'input' has one column as a word at each index). In order to
	        mix a column, we perform these transformations on each row in c,
	        which is 1 byte in each word. The new column for c0 is c'0:
	                  m0      m1      m2      m3
	        r0,c'0 = 2*r0,c0 + 3*r1,c0 + 1*r2,c0 + 1*r3,c0
	        r1,c'0 = 1*r0,c0 + 2*r1,c0 + 3*r2,c0 + 1*r3,c0
	        r2,c'0 = 1*r0,c0 + 1*r1,c0 + 2*r2,c0 + 3*r3,c0
	        r3,c'0 = 3*r0,c0 + 1*r1,c0 + 1*r2,c0 + 2*r3,c0
	         So using mix tables where c0 is a word with r0 being its upper
	        8 bits and r3 being its lower 8 bits:
	         m0[c0 >> 24] will yield this word: [2*r0,1*r0,1*r0,3*r0]
	        ...
	        m3[c0 & 255] will yield this word: [1*r3,1*r3,3*r3,2*r3]
	         Therefore to mix the columns in each word in the state we
	        do the following (& 255 omitted for brevity):
	        c'0,r0 = m0[c0 >> 24] ^ m1[c1 >> 16] ^ m2[c2 >> 8] ^ m3[c3]
	        c'0,r1 = m0[c0 >> 24] ^ m1[c1 >> 16] ^ m2[c2 >> 8] ^ m3[c3]
	        c'0,r2 = m0[c0 >> 24] ^ m1[c1 >> 16] ^ m2[c2 >> 8] ^ m3[c3]
	        c'0,r3 = m0[c0 >> 24] ^ m1[c1 >> 16] ^ m2[c2 >> 8] ^ m3[c3]
	         However, before mixing, the algorithm requires us to perform
	        ShiftRows(). The ShiftRows() transformation cyclically shifts the
	        last 3 rows of the state over different offsets. The first row
	        (r = 0) is not shifted.
	         s'_r,c = s_r,(c + shift(r, Nb) mod Nb
	        for 0 < r < 4 and 0 <= c < Nb and
	        shift(1, 4) = 1
	        shift(2, 4) = 2
	        shift(3, 4) = 3.
	         This causes the first byte in r = 1 to be moved to the end of
	        the row, the first 2 bytes in r = 2 to be moved to the end of
	        the row, the first 3 bytes in r = 3 to be moved to the end of
	        the row:
	         r1: [c0 c1 c2 c3] => [c1 c2 c3 c0]
	        r2: [c0 c1 c2 c3]    [c2 c3 c0 c1]
	        r3: [c0 c1 c2 c3]    [c3 c0 c1 c2]
	         We can make these substitutions inline with our column mixing to
	        generate an updated set of equations to produce each word in the
	        state (note the columns have changed positions):
	         c0 c1 c2 c3 => c0 c1 c2 c3
	        c0 c1 c2 c3    c1 c2 c3 c0  (cycled 1 byte)
	        c0 c1 c2 c3    c2 c3 c0 c1  (cycled 2 bytes)
	        c0 c1 c2 c3    c3 c0 c1 c2  (cycled 3 bytes)
	         Therefore:
	         c'0 = 2*r0,c0 + 3*r1,c1 + 1*r2,c2 + 1*r3,c3
	        c'0 = 1*r0,c0 + 2*r1,c1 + 3*r2,c2 + 1*r3,c3
	        c'0 = 1*r0,c0 + 1*r1,c1 + 2*r2,c2 + 3*r3,c3
	        c'0 = 3*r0,c0 + 1*r1,c1 + 1*r2,c2 + 2*r3,c3
	         c'1 = 2*r0,c1 + 3*r1,c2 + 1*r2,c3 + 1*r3,c0
	        c'1 = 1*r0,c1 + 2*r1,c2 + 3*r2,c3 + 1*r3,c0
	        c'1 = 1*r0,c1 + 1*r1,c2 + 2*r2,c3 + 3*r3,c0
	        c'1 = 3*r0,c1 + 1*r1,c2 + 1*r2,c3 + 2*r3,c0
	         ... and so forth for c'2 and c'3. The important distinction is
	        that the columns are cycling, with c0 being used with the m0
	        map when calculating c0, but c1 being used with the m0 map when
	        calculating c1 ... and so forth.
	         When performing the inverse we transform the mirror image and
	        skip the bottom row, instead of the top one, and move upwards:
	         c3 c2 c1 c0 => c0 c3 c2 c1  (cycled 3 bytes) *same as encryption
	        c3 c2 c1 c0    c1 c0 c3 c2  (cycled 2 bytes)
	        c3 c2 c1 c0    c2 c1 c0 c3  (cycled 1 byte)  *same as encryption
	        c3 c2 c1 c0    c3 c2 c1 c0
	         If you compare the resulting matrices for ShiftRows()+MixColumns()
	        and for InvShiftRows()+InvMixColumns() the 2nd and 4th columns are
	        different (in encrypt mode vs. decrypt mode). So in order to use
	        the same code to handle both encryption and decryption, we will
	        need to do some mapping.
	         If in encryption mode we let a=c0, b=c1, c=c2, d=c3, and r<N> be
	        a row number in the state, then the resulting matrix in encryption
	        mode for applying the above transformations would be:
	         r1: a b c d
	        r2: b c d a
	        r3: c d a b
	        r4: d a b c
	         If we did the same in decryption mode we would get:
	         r1: a d c b
	        r2: b a d c
	        r3: c b a d
	        r4: d c b a
	         If instead we swap d and b (set b=c3 and d=c1), then we get:
	         r1: a b c d
	        r2: d a b c
	        r3: c d a b
	        r4: b c d a
	         Now the 1st and 3rd rows are the same as the encryption matrix. All
	        we need to do then to make the mapping exactly the same is to swap
	        the 2nd and 4th rows when in decryption mode. To do this without
	        having to do it on each iteration, we swapped the 2nd and 4th rows
	        in the decryption key schedule. We also have to do the swap above
	        when we first pull in the input and when we set the final output. */
	      a2 = m0[a >>> 24] ^ m1[b >>> 16 & 255] ^ m2[c >>> 8 & 255] ^ m3[d & 255] ^ w[++i];
	      b2 = m0[b >>> 24] ^ m1[c >>> 16 & 255] ^ m2[d >>> 8 & 255] ^ m3[a & 255] ^ w[++i];
	      c2 = m0[c >>> 24] ^ m1[d >>> 16 & 255] ^ m2[a >>> 8 & 255] ^ m3[b & 255] ^ w[++i];
	      d = m0[d >>> 24] ^ m1[a >>> 16 & 255] ^ m2[b >>> 8 & 255] ^ m3[c & 255] ^ w[++i];
	      a = a2;
	      b = b2;
	      c = c2;
	    }

	    /*
	      Encrypt:
	      SubBytes(state)
	      ShiftRows(state)
	      AddRoundKey(state, w[Nr*Nb, (Nr+1)*Nb-1])
	       Decrypt:
	      InvShiftRows(state)
	      InvSubBytes(state)
	      AddRoundKey(state, w[0, Nb-1])
	     */
	    // Note: rows are shifted inline
	    output[0] = sub[a >>> 24] << 24 ^ sub[b >>> 16 & 255] << 16 ^ sub[c >>> 8 & 255] << 8 ^ sub[d & 255] ^ w[++i];
	    output[decrypt ? 3 : 1] = sub[b >>> 24] << 24 ^ sub[c >>> 16 & 255] << 16 ^ sub[d >>> 8 & 255] << 8 ^ sub[a & 255] ^ w[++i];
	    output[2] = sub[c >>> 24] << 24 ^ sub[d >>> 16 & 255] << 16 ^ sub[a >>> 8 & 255] << 8 ^ sub[b & 255] ^ w[++i];
	    output[decrypt ? 1 : 3] = sub[d >>> 24] << 24 ^ sub[a >>> 16 & 255] << 16 ^ sub[b >>> 8 & 255] << 8 ^ sub[c & 255] ^ w[++i];
	  }

	  /**
	   * Deprecated. Instead, use:
	   *
	   * forge.cipher.createCipher('AES-<mode>', key);
	   * forge.cipher.createDecipher('AES-<mode>', key);
	   *
	   * Creates a deprecated AES cipher object. This object's mode will default to
	   * CBC (cipher-block-chaining).
	   *
	   * The key and iv may be given as a string of bytes, an array of bytes, a
	   * byte buffer, or an array of 32-bit words.
	   *
	   * @param options the options to use.
	   *          key the symmetric key to use.
	   *          output the buffer to write to.
	   *          decrypt true for decryption, false for encryption.
	   *          mode the cipher mode to use (default: 'CBC').
	   *
	   * @return the cipher.
	   */
	  function _createCipher(options) {
	    options = options || {};
	    var mode = (options.mode || 'CBC').toUpperCase();
	    var algorithm = 'AES-' + mode;

	    var cipher;
	    if (options.decrypt) {
	      cipher = forge.cipher.createDecipher(algorithm, options.key);
	    } else {
	      cipher = forge.cipher.createCipher(algorithm, options.key);
	    }

	    // backwards compatible start API
	    var start = cipher.start;
	    cipher.start = function (iv, options) {
	      // backwards compatibility: support second arg as output buffer
	      var output = null;
	      if (options instanceof forge.util.ByteBuffer) {
	        output = options;
	        options = {};
	      }
	      options = options || {};
	      options.output = output;
	      options.iv = iv;
	      start.call(cipher, options);
	    };

	    return cipher;
	  }
	};

/***/ }
/******/ ]);