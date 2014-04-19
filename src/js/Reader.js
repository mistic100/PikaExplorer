"use strict";

/**
 * Hold the binary data of a file
 * @constructor
 * @param {string} binary string
 */
var Reader = function(data) {
  this.data = data;
  this.length = this.data.length;
};

/**
 * Custom alphabet used in save file
 */
Reader.alphabet = (function(){
  var alphabet = {
    0x7F: ' ', 0x9A: '(', 0x9B: ')', 0x9C: ':',
    0x9D: ';', 0x9E: '[', 0x9F: ']', 0xE3: '-',
    0xE6: '?', 0xE7: '!', 0xE8: '.', 0xEF: '♂',
    0xF1: '×', 0xF3: '/', 0xF4: ',', 0xF5: '♀'
  };
  for (var i=0; i<26; i++) {
    alphabet[0x80+i] = String.fromCharCode(0x41+i);
    alphabet[0xA0+i] = String.fromCharCode(0x61+i);
  }
  for (var i=0; i<10; i++) {
    alphabet[0xF6+i] = String.fromCharCode(0x30+i);
  }
  
  return alphabet;
}());

/**
 * Translate part of the data.
 * Unknown chars are ignored.
 *
 * @param {int|object} start position or object containing **pos** and **len**
 * @param {int} data length
 * @return {string}
 */
Reader.prototype.tr = function(pos, len) {
  if (pos.len != undefined) {
    len = pos.len;
    pos = pos.pos;
  }
  else {
    len = len || 1;
  }
  
  var out = '';
  
  for (var i=pos; i<pos+len; i++) {
    var c = this.char(i);
    if (c == 0x50) {
      break;
    }
    if (Reader.alphabet[c] != undefined) {
      out+= Reader.alphabet[c];
    }
  }
  
  return out;
};

/**
 * Returns the integer value stored in a part of the data.
 *
 * @param {int|object} start position or object containing **pos** and **len**
 * @param {int|boolean} data length or **reverse**
 * @param {boolean} __true__ if data is stored in little-endian
 * @return {int}
 */
Reader.prototype.val = function(pos, len, reverse) {
  if (pos.len != undefined) {
    reverse = len || false;
    len = pos.len;
    pos = pos.pos;
  }
  else {
    reverse = reverse || false;
    len = len || 1;
  }
  
  var out = 0;
  
  if (!reverse) {
    var off = (len-1)*8;
    for (var i=pos; i<pos+len; i++) {
      var c = this.char(i);
      out+= c<<off;
      off-=8;
    }
  }
  else {
    var off = 0;
    for (var i=pos; i<pos+len; i++) {
      var c = this.char(i);
      out+= c<<off;
      off+=8;
    }
  }
  
  return out;
};

/**
 * Returns integer value stored in BCD in a part of the data.
 *
 * @param {int|object} start position or object containing **pos** and **len**
 * @param {int} data length
 * @return {int}
 */
Reader.prototype.bcd = function(pos, len) {
  if (pos.len != undefined) {
    len = pos.len;
    pos = pos.pos;
  }
  else {
    len = len || 1;
  }
  
  var out = '';
  
  for (var i=pos; i<pos+len; i++) {
    out+= this.char(i)>>4;
    out+= this.char(i) & 0x0F;
  }
  
  return parseInt(out);
};

/**
 * Returns a new instance of Reader containing a part of the data.
 *
 * @param {int} start position
 * @param {int} end position
 * @return {Reader}
 */
Reader.prototype.slice = function(pos1, pos2) {
  return new Reader(this.data.slice(pos1, pos2));
};

/**
 * Returns a new instance of Reader containing a part of the data.
 *
 * @param {int|object} start position or object containing **pos** and **len**
 * @param {int} data length
 * @return {Reader}
 */
Reader.prototype.sliceL = function(pos, len) {
  if (pos.len != undefined) {
    len = pos.len;
    pos = pos.pos;
  }
  
  return this.slice(pos, pos+len);
};

/**
 * Returns the char value at a position.
 *
 * @param {int} position
 * @return {int}
 */
Reader.prototype.char = function(pos) {
  return this.data.charCodeAt(pos);
};
