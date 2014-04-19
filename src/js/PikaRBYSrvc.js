"use strict";

var PikaRBYSrvc = angular.module('PikaRBYSrvc', []);

PikaRBYSrvc.factory('PikaRBYSrvc', [function() {
    var file = new Reader(localStorage.data);
    var save = new RBY(file);
    
    return {
        getPlayer: function() {
            return {
                playerName: save.getPlayerName(),
                playerId: save.getTrainerID(),
                timePlayed: save.getTimePlayed(),
                money: save.getMoney(),
                casinoCoins: save.getCasinoCoins(),
                pokemonsSeen: save.getNbPokemonsSeen(),
                pokemonsOwned: save.getNbPokemonsOwned()
            };
        },
        getBadges: function() {
            var _in = save.getBadges();
            var _out = [];
            
            for (var i=0; i<8; i++) {
                _out.push({
                  label: badges[i],
                  id: badges[i].toLowerCase(),
                  owned: _in[i]
                });
            }

            return _out;
        }
    };

}]);