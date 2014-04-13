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
 * Translate part of the data.
 * Uses the global **alphabet** char map. Unknown chars are ignored.
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
    var c = this.data.charCodeAt(i);
    if (c == 0x50) {
      break;
    }
    if (alphabet[c] != undefined) {
      out+= alphabet[c];
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
      var c = this.data.charCodeAt(i);
      out+= c<<off;
      off-=8;
    }
  }
  else {
    var off = 0;
    for (var i=pos; i<pos+len; i++) {
      var c = this.data.charCodeAt(i);
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
    out+= this.data.charCodeAt(i)>>4;
    out+= this.data.charCodeAt(i) & 0x0F;
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
