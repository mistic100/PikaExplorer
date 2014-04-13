"use strict";

var RBY = function(file) {
  this.config = {
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
  
  this.file = file;
  
  if (!this.check()) {
    throw "Invalid data";
  }
};

RBY.prototype.check = function() {
  var sum = 0xFF,
      checked = this.file.slice(this.config.checksum.start, this.config.checksum.end+1),
      checksum = this.file.val(this.config.checksum);

  for (var i=0; i<checked.length; i++) {
    sum-= checked.char(i);
    sum&= 0xFF;
  }

  return sum == checksum;
};

RBY.prototype.getPlayerName = function() {
  return this.file.tr(this.config.playerName);
};

RBY.prototype.getPokemonOwned = function() {
  return this.getPokemonOwnedSeen(this.config.pokedexOwned);
};

RBY.prototype.getPokemonSeen = function () {
  return this.getPokemonOwnedSeen(this.config.pokedexSeen);
};

RBY.prototype.getBagItems = function() {
  return this.getItems(this.config.bagItems);
};

RBY.prototype.getMoney = function() {
  return this.file.bcd(this.config.money);
};

RBY.prototype.getRivalName = function(f) {
  return this.file.tr(this.config.rivalName);
};
  
RBY.prototype.getOptions = function() {
  var opt = this.file.char(this.config.options.pos),
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
      val = this.file.char(this.config.badges.pos);
  
  for (var i=0; i<8; i++) {
    out[i] = !!(val>>i & 0x01);
  }
  
  return out;
};

RBY.prototype.getTrainerID = function() {
  return this.file.val(this.config.trainerID);
};

RBY.prototype.getPikachuFriendship = function() {
  return this.file.val(this.config.pikachuFriendship);
};
  
RBY.prototype.getPCItems = function() {
  return this.getItems(this.config.pcItems);
};
  
RBY.prototype.getCurrentBox = function() {
  return this.file.char(this.config.currentBox.pos) & 0x0F;
};

RBY.prototype.getCasinoCoins = function() {
  return this.file.bcd(this.config.casinoCoins);
};

RBY.prototype.getTimePlayed = function() {
  return {
    hours: this.file.val(this.config.timePlayed.pos, 2, true),
    minutes: this.file.char(this.config.timePlayed.pos+2),
    seconds: this.file.char(this.config.timePlayed.pos+3)
  };
};
  
RBY.prototype.getTeamPokemons = function() {
  return this.getPokemons(this.config.teamPokemons);
};

RBY.prototype.getPCPokemons = function(box) {
  if (box == this.getCurrentBox()) {
    return this.getPokemons(this.config.currentBoxPokemons);
  }
  else {
    var conf = {
      pos: this.config.pcPokemons.pos[box],
      len: this.config.pcPokemons.len,
      capacity: this.config.pcPokemons.capacity,
      entrySize: this.config.pcPokemons.entrySize
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
      specie:      pokemonsByIndex[poke.char(0x00)],
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