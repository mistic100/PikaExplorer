"use strict";

var RBY = function(file) {
  this.file = file;
  
  if (!this.check()) {
    throw "Invalid data";
  }
};

RBY.config = {
  playerName: {
    pos: 0x2598,
    len: 8
  },
  pokedexOwned: {
    pos: 0x25A3,
    len: 19
  },
  pokedexSeen: {
    pos: 0x25B6,
    len: 19
  },
  bagItems: {
    pos: 0x25C9,
    len: 42,
    capacity: 20
  },
  money: {
    pos: 0x25F3,
    len: 3
  },
  rivalName: {
    pos: 0x25F6,
    len: 8,
  },
  options: {
    pos: 0x2601,
    len: 1
  },
  badges: {
    pos: 0x2602,
    len: 1
  },
  trainerID: {
    pos: 0x2605,
    len: 2
  },
  pikachuFriendship: {
    pos: 0x271C,
    len: 1
  },
  pcItems: {
    pos: 0x27E6,
    len: 102,
    capacity: 50
  },
  currentBox: {
    pos: 0x284C,
    len: 1
  },
  casinoCoins: {
    pos: 0x2850,
    len: 2
  },
  timePlayed: {
    pos: 0x2CED,
    len: 4
  },
  teamPokemons: {
    pos: 0x2F2C,
    len: 404,
    capacity: 6,
    entrySize: 44
  },
  currentBoxPokemons: {
    pos: 0x30C0,
    len: 1122,
    capacity: 20,
    entrySize: 33
  },
  checksum: {
    pos: 0x3523,
    len: 1,
    start: 0x2598,
    end: 0x3522
  },
  pcPokemons: {
    pos: [
      0x4000, 0x4462, 0x48C4, 0x4D26, 0x5188, 0x55EA,
      0x6000, 0x6462, 0x68C4, 0x6D26, 0x7188, 0x75EA
    ],
    len: 1122,
    capacity: 20,
    entrySize: 33
  }
};

RBY.pokemonsByIndex = {
  0x01: 112, 0x02: 115, 0x03:  32, 0x04:  35, 0x05:  21, 0x06: 100, 0x07:  34,
  0x08:  80, 0x09:   2, 0x0A: 103, 0x0B: 108, 0x0C: 102, 0x0D:  88, 0x0E:  94,
  0x0F:  29, 0x10:  31, 0x11: 104, 0x12: 111, 0x13: 131, 0x14:  59, 0x15: 151,
  0x16: 130, 0x17:  90, 0x18:  72, 0x19:  92, 0x1A: 123, 0x1B: 120, 0x1C:   9,
  0x1D: 127, 0x1E: 114, 0x21:  58, 0x22:  95, 0x23:  22, 0x24:  16, 0x25:  79,
  0x26:  64, 0x27:  75, 0x28: 113, 0x29:  67, 0x2A: 122, 0x2B: 106, 0x2C: 107,
  0x2D:  24, 0x2E:  47, 0x2F:  54, 0x30:  96, 0x31:  76, 0x33: 126, 0x35: 125,
  0x36:  82, 0x37: 109, 0x39:  56, 0x3A:  86, 0x3B:  50, 0x3C: 128, 0x40:  83,
  0x41:  48, 0x42: 149, 0x46:  84, 0x47:  60, 0x48: 124, 0x49: 146, 0x4A: 144,
  0x4B: 145, 0x4C: 132, 0x4D:  52, 0x4E:  98, 0x52:  37, 0x53:  38, 0x54:  25,
  0x55:  26, 0x58: 147, 0x59: 148, 0x5A: 140, 0x5B: 141, 0x5C: 116, 0x5D: 117,
  0x60:  27, 0x61:  28, 0x62: 138, 0x63: 139, 0x64:  39, 0x65:  40, 0x66: 133,
  0x67: 136, 0x68: 135, 0x69: 134, 0x6A:  66, 0x6B:  41, 0x6C:  23, 0x6D:  46,
  0x6E:  61, 0x6F:  62, 0x70:  13, 0x71:  14, 0x72:  15, 0x74:  85, 0x75:  57,
  0x76:  51, 0x77:  49, 0x78:  87, 0x7B:  10, 0x7C:  11, 0x7D:  12, 0x7E:  68,
  0x80:  55, 0x81:  97, 0x82:  42, 0x83: 150, 0x84: 143, 0x85: 129, 0x88:  89,
  0x8A:  99, 0x8B:  91, 0x8D: 101, 0x8E:  36, 0x8F: 110, 0x90:  53, 0x91: 105,
  0x93:  93, 0x94:  63, 0x95:  65, 0x96:  17, 0x97:  18, 0x98: 121, 0x99:   1,
  0x9A:   3, 0x9B:  73, 0x9D: 118, 0x9E: 119, 0xA3:  77, 0xA4:  78, 0xA5:  19,
  0xA6:  20, 0xA7:  33, 0xA8:  30, 0xA9:  74, 0xAA: 137, 0xAB: 142, 0xAD:  81,
  0xB0:   4, 0xB1:   7, 0xB2:   5, 0xB3:   8, 0xB4:   6, 0xB9:  43, 0xBA:  44,
  0xBB:  45, 0xBC:  69, 0xBD:  70, 0xBE:  71
};

RBY.prototype.check = function() {
  var sum = 0xFF,
      checked = this.file.slice(RBY.config.checksum.start, RBY.config.checksum.end+1),
      checksum = this.file.val(RBY.config.checksum);

  for (var i=0; i<checked.length; i++) {
    sum-= checked.char(i);
    sum&= 0xFF;
  }

  return sum == checksum;
};

RBY.prototype.getPlayerName = function() {
  return this.file.tr(RBY.config.playerName);
};

RBY.prototype.getPokemonOwned = function() {
  return this.getPokemonOwnedSeen(RBY.config.pokedexOwned);
};

RBY.prototype.getPokemonSeen = function () {
  return this.getPokemonOwnedSeen(RBY.config.pokedexSeen);
};

RBY.prototype.getNbPokemonsOwned = function() {
  return this.getPokemonOwned().reduce(function(a,b){ return a+b; })
};

RBY.prototype.getNbPokemonsSeen = function() {
  return this.getPokemonSeen().reduce(function(a,b){ return a+b; })
};

RBY.prototype.getBagItems = function() {
  return this.getItems(RBY.config.bagItems);
};

RBY.prototype.getMoney = function() {
  return this.file.bcd(RBY.config.money);
};

RBY.prototype.getRivalName = function(f) {
  return this.file.tr(RBY.config.rivalName);
};
  
RBY.prototype.getOptions = function() {
  var opt = this.file.char(RBY.config.options.pos),
      ts = opt & 0x0F;
  
  return {
    animations: !(opt>>7),
    battleStyle: (opt>>6 & 0x01) ? 'Set' : 'Switch',
    sound: (opt>>4 & 0x01) ? 'Stereo' : 'Mono',
    textSpeed: (ts==0x01) ? 'Fast' : ((ts==0x03) ? 'Normal' : 'Slow'),
  };
};

RBY.prototype.getBadges = function() {
  var out = [],
      val = this.file.char(RBY.config.badges.pos);
  
  for (var i=0; i<8; i++) {
    out[i] = !!(val>>i & 0x01);
  }
  
  return out;
};

RBY.prototype.getTrainerID = function() {
  return this.file.val(RBY.config.trainerID);
};

RBY.prototype.getPikachuFriendship = function() {
  return this.file.val(RBY.config.pikachuFriendship);
};
  
RBY.prototype.getPCItems = function() {
  return this.getItems(RBY.config.pcItems);
};
  
RBY.prototype.getCurrentBox = function() {
  return this.file.char(RBY.config.currentBox.pos) & 0x0F;
};

RBY.prototype.getCasinoCoins = function() {
  return this.file.bcd(RBY.config.casinoCoins);
};

RBY.prototype.getTimePlayed = function() {
  return {
    hours: this.file.val(RBY.config.timePlayed.pos, 2, true),
    minutes: this.file.char(RBY.config.timePlayed.pos+2),
    seconds: this.file.char(RBY.config.timePlayed.pos+3)
  };
};
  
RBY.prototype.getTeamPokemons = function() {
  return this.getPokemons(RBY.config.teamPokemons);
};

RBY.prototype.getPCPokemons = function(box) {
  if (box == this.getCurrentBox()) {
    return this.getPokemons(RBY.config.currentBoxPokemons);
  }
  else {
    var conf = {
      pos: RBY.config.pcPokemons.pos[box],
      len: RBY.config.pcPokemons.len,
      capacity: RBY.config.pcPokemons.capacity,
      entrySize: RBY.config.pcPokemons.entrySize
    };

    return this.getPokemons(conf);
  }
};
  
RBY.prototype.getAllPokemons = function() {
  var out = this.getTeamPokemons();

  for (var i=0; i<12; i++) {
    out = out.concat(this.getPCPokemons(i));
  }
  
  return out;
};
  
  
RBY.prototype.getPokemonOwnedSeen = function(conf) {
  var out = [];
  
  for (var i=conf.pos, k=1; i<conf.pos+conf.len; i++) {
    var c = this.file.char(i);
    
    out[k++] = c>>7 & 0x01; out[k++] = c>>6 & 0x01;
    out[k++] = c>>5 & 0x01; out[k++] = c>>4 & 0x01;
    out[k++] = c>>3 & 0x01; out[k++] = c>>2 & 0x01;
    out[k++] = c>>1 & 0x01; out[k++] = c>>1 & 0x01;
  }
  
  delete out[152];
  
  return out;
};
  
RBY.prototype.getItems = function(conf) {
  var ctn = this.file.sliceL(conf),
      count = ctn.char(0x00),
      out = [];
  
  if (count > conf.capacity) {
    throw "Invalid items list size";
  }
  
  for (var i=0; i<count; i++) {
    out.push({
      id: ctn.char(0x01 + i*2),
      count: ctn.char(0x02 + i*2)
    });
  }
  
  return out;
};
  
RBY.prototype.getPokemons = function(conf) {
  var out = [],
      count = this.file.char(conf.pos);
  
  if (count > conf.capacity) {
    throw "Invalid pokemons list size";
  }

  var ctn = this.file.slice(conf.pos+conf.capacity+2, conf.pos+conf.len),
      names = ctn.slice(conf.capacity*conf.entrySize);
  
  for (var i=0; i<count; i++) {
    var poke = ctn.sliceL(i*conf.entrySize, conf.entrySize);
    
    var item = {
      specie:      RBY.pokemonsByIndex[poke.char(0x00)],
      currentHp:   poke.val(0x01, 2),
      level:       poke.val(0x03, 1),
      status:      this.getStatusFromByte(poke.char(0x04)),
      type1:       poke.char(0x05),
      type2:       poke.char(0x06),
      moves:       this.getMovesFromBytes(poke.sliceL(0x08, 4), poke.sliceL(0x1D, 4)),
      trainerId:   poke.val(0x0C, 2),
      exp:         poke.val(0x0E, 3),
      hpEV:        poke.val(0x11, 2),
      attackEV:    poke.val(0x13, 2),
      defenseEV:   poke.val(0x15, 2),
      speedEV:     poke.val(0x17, 2),
      specialEV:   poke.val(0x19, 2),
      attackIV:    poke.char(0x1B)>>4,
      defenseIV:   poke.char(0x1B) & 0x0F,
      speedIV:     poke.char(0x1C)>>4,
      specialIV:   poke.char(0x1C) & 0x0F,
      name:        names.tr((conf.capacity+i)*11, 10),
      trainerName: names.tr(i*11, 10)
    };
    
    if (conf.entrySize == 44) {
      item.maxHp =    poke.val(0x22, 2);
      item.attack =   poke.val(0x24, 2);
      item.defense =  poke.val(0x26, 2);
      item.speed =    poke.val(0x28, 2);
      item.special =  poke.val(0x2A, 2);
    }
    
    out.push(item);
  }
  
  return out;
};

RBY.prototype.getStatusFromByte = function(val) {
  var out = {};
  
  for (var i=4; i<=64; i*=2) {
    out[i] = !!(val & i);
  }
  
  return out;
};

RBY.prototype.getMovesFromBytes = function(indexes, pps) {
  var out = [];
  
  for (var i=0; i<4; i++) {
    var pp = pps.char(i);
    
    out.push({
      id: indexes.char(i),
      pp: pp & 0x3F,
      ppUps: pp>>6      
    });
  }
  
  return out;
};