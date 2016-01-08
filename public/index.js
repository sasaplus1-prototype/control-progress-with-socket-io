'use strict';

var socket = io('http://127.0.0.1:3000'),
    progress = $('#progress');

socket.on('update progress', function(data) {
  progress
    .attr('value', data.value)
    .text(data.value + '%');
});
