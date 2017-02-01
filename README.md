# videojs-poc

# videojs-markers

Currently a little hack is needed in order be able to use videojs-markers.

in node_modules/videojs-markers/package.json you need to change the peerDependencies to look as shown below.

"peerDependencies": {
  "video.js": "^5.15.1",
  "jquery": "^2.2.4"
},
