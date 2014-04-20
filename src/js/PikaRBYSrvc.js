"use strict";

var PikaRBYSrvc = angular.module('PikaRBYSrvc', []);

PikaRBYSrvc.factory('PikaRBYSrvc', [function() {
    return new RBYDecorator();
}]);


/**
 * RBYDecorator extends RBY with higher level methods and data management
 */
var RBYDecorator = function() {
    this.file = null;
    
    if (this.hasData()) {
        this.setData(localStorage.data);
    }
};

RBYDecorator.prototype = new RBY();

RBYDecorator.prototype.hasData = function() {
    return localStorage.data != undefined;
};

RBYDecorator.prototype.deleteData = function() {
    localStorage.removeItem('data');
    this.file = null;
};

RBYDecorator.prototype.setData = function(data) {
    this.file = new Reader(data);
    
    if (!this.check()) {
        this.deleteData();
        return false;
    }
    else {
        localStorage.data = data;
        return true;
    }
};

RBYDecorator.prototype.getPlayer = function() {
    return {
        playerName: this.getPlayerName(),
        playerId: this.getTrainerID(),
        timePlayed: this.getTimePlayed(),
        money: this.getMoney(),
        casinoCoins: this.getCasinoCoins(),
        pokemonsSeen: this.getNbPokemonsSeen(),
        pokemonsOwned: this.getNbPokemonsOwned()
    };
};

RBYDecorator.prototype.getReadableBadges = function() {
    var _in = this.getBadges();
    var _out = [];
    
    for (var i=0; i<8; i++) {
        _out.push({
          label: badges[i],
          id: badges[i].toLowerCase(),
          owned: _in[i]
        });
    }

    return _out;
};