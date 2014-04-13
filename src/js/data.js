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


var items = {
  0x00: 'Nothing', 0x01: 'Master Ball', 0x02: 'Ultra Ball', 
  0x03: 'Great Ball', 0x04: 'Poké Ball', 0x05: 'Town Map', 
  0x06: 'Bicycle', 0x07: '?????', 0x08: 'Safari Ball', 
  0x09: 'Pokédex', 0x0A: 'Moon Stone', 0x0B: 'Antidote', 
  0x0C: 'Burn Heal', 0x0D: 'Ice Heal', 0x0E: 'Awakening', 
  0x0F: 'Parlyz Heal', 0x10: 'Full Restore', 0x11: 'Max Potion', 
  0x12: 'Hyper Potion', 0x13: 'Super Potion', 0x14: 'Potion', 
  0x15: 'BoulderBadge', 0x16: 'CascadeBadge', 0x17: 'ThunderBadge', 
  0x18: 'RainbowBadge', 0x19: 'SoulBadge', 0x1A: 'MarshBadge', 
  0x1B: 'VolcanoBadge', 0x1C: 'EarthBadge', 0x1D: 'Escape Rope', 
  0x1E: 'Repel', 0x1F: 'Old Amber', 0x20: 'Fire Stone', 
  0x21: 'Thunder Stone', 0x22: 'Water Stone', 0x23: 'HP Up', 
  0x24: 'Protein', 0x25: 'Iron', 0x26: 'Carbos', 
  0x27: 'Calcium', 0x28: 'Rare Candy', 0x29: 'Dome Fossil', 
  0x2A: 'Helix Fossil', 0x2B: 'Secret Key', 0x2C: '?????', 
  0x2D: 'Bike Voucher', 0x2E: 'X Accuracy', 0x2F: 'Leaf Stone', 
  0x30: 'Card Key', 0x31: 'Nugget', 0x32: 'PP Up', 
  0x33: 'Poké Doll', 0x34: 'Full Heal', 0x35: 'Revive', 
  0x36: 'Max Revive', 0x37: 'Guard Spec.', 0x38: 'Super Repel', 
  0x39: 'Max Repel', 0x3A: 'Dire Hit', 0x3B: 'Coin', 
  0x3C: 'Fresh Water', 0x3D: 'Soda Pop', 0x3E: 'Lemonade', 
  0x3F: 'S.S. Ticket', 0x40: 'Gold Teeth', 0x41: 'X Attack', 
  0x42: 'X Defend', 0x43: 'X Speed', 0x44: 'X Special', 
  0x45: 'Coin Case', 0x46: 'Oak\'s Parcel', 0x47: 'Itemfinder', 
  0x48: 'Silph Scope', 0x49: 'Poké Flute', 0x4A: 'Lift Key', 
  0x4B: 'Exp. All', 0x4C: 'Old Rod', 0x4D: 'Good Rod', 
  0x4E: 'Super Rod', 0x4F: 'PP Up', 0x50: 'Ether', 
  0x51: 'Max Ether', 0x52: 'Elixir', 0x53: 'Max Elixir', 
  0xC4: 'HM01', 0xC5: 'HM02', 0xC6: 'HM03', 0xC7: 'HM04',
  0xC8: 'HM05', 0xC9: 'TM01', 0xCA: 'TM02', 0xCB: 'TM03', 
  0xCC: 'TM04', 0xCD: 'TM05', 0xCE: 'TM06', 0xCF: 'TM07', 
  0xD0: 'TM08', 0xD1: 'TM09', 0xD2: 'TM10', 0xD3: 'TM11', 
  0xD4: 'TM12', 0xD5: 'TM13', 0xD6: 'TM14', 0xD7: 'TM15', 
  0xD8: 'TM16', 0xD9: 'TM17', 0xDA: 'TM18', 0xDB: 'TM19', 
  0xDC: 'TM20', 0xDD: 'TM21', 0xDE: 'TM22', 0xDF: 'TM23', 
  0xE0: 'TM24', 0xE1: 'TM25', 0xE2: 'TM26', 0xE3: 'TM27', 
  0xE4: 'TM28', 0xE5: 'TM29', 0xE6: 'TM30', 0xE7: 'TM31', 
  0xE8: 'TM32', 0xE9: 'TM33', 0xEA: 'TM34', 0xEB: 'TM35', 
  0xEC: 'TM36', 0xED: 'TM37', 0xEE: 'TM38', 0xEF: 'TM39', 
  0xF0: 'TM40', 0xF1: 'TM41', 0xF2: 'TM42', 0xF3: 'TM43', 
  0xF4: 'TM44', 0xF5: 'TM45', 0xF6: 'TM46', 0xF7: 'TM47', 
  0xF8: 'TM48', 0xF9: 'TM49', 0xFA: 'TM50', 0xFB: 'TM51', 
  0xFC: 'TM52', 0xFD: 'TM53', 0xFE: 'TM54', 0xFF: 'TM55'
};

var pokemonsByIndex = {
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

var pokemons = {
  1: 'Bulbasaur', 2: 'Ivysaur', 3: 'Venusaur', 4: 'Charmander', 5: 'Charmeleon',
  6: 'Charizard', 7: 'Squirtle', 8: 'Wartortle', 9: 'Blastoise', 10: 'Caterpie',
  11: 'Metapod', 12: 'Butterfree', 13: 'Weedle', 14: 'Kakuna', 15: 'Beedrill',
  16: 'Pidgey', 17: 'Pidgeotto', 18: 'Pidgeot', 19: 'Rattata', 20: 'Raticate',
  21: 'Spearow', 22: 'Fearow', 23: 'Ekans', 24: 'Arbok', 25: 'Pikachu',
  26: 'Raichu', 27: 'Sandshrew', 28: 'Sandslash', 29: 'Nidoran♀', 30: 'Nidorina',
  31: 'Nidoqueen', 32: 'Nidoran♂', 33: 'Nidorino', 34: 'Nidoking', 35: 'Clefairy',
  36: 'Clefable', 37: 'Vulpix', 38: 'Ninetales', 39: 'Jigglypuff', 40: 'Wigglytuff',
  41: 'Zubat', 42: 'Golbat', 43: 'Oddish', 44: 'Gloom', 45: 'Vileplume',
  46: 'Paras', 47: 'Parasect', 48: 'Venonat', 49: 'Venomoth', 50: 'Diglett',
  51: 'Dugtrio', 52: 'Meowth', 53: 'Persian', 54: 'Psyduck', 55: 'Golduck',
  56: 'Mankey', 57: 'Primeape', 58: 'Growlithe', 59: 'Arcanine', 60: 'Poliwag',
  61: 'Poliwhirl', 62: 'Poliwrath', 63: 'Abra', 64: 'Kadabra', 65: 'Alakazam',
  66: 'Machop', 67: 'Machoke', 68: 'Machamp', 69: 'Bellsprout', 70: 'Weepinbell',
  71: 'Victreebel', 72: 'Tentacool', 73: 'Tentacruel', 74: 'Geodude', 75: 'Graveler',
  76: 'Golem', 77: 'Ponyta', 78: 'Rapidash', 79: 'Slowpoke', 80: 'Slowbro',
  81: 'Magnemite', 82: 'Magneton', 83: 'Farfetch\'d', 84: 'Doduo', 85: 'Dodrio',
  86: 'Seel', 87: 'Dewgong', 88: 'Grimer', 89: 'Muk', 90: 'Shellder',
  91: 'Cloyster', 92: 'Gastly', 93: 'Haunter', 94: 'Gengar', 95: 'Onix',
  96: 'Drowzee', 97: 'Hypno', 98: 'Krabby', 99: 'Kingler', 100: 'Voltorb',
  101: 'Electrode', 102: 'Exeggcute', 103: 'Exeggutor', 104: 'Cubone', 105: 'Marowak',
  106: 'Hitmonlee', 107: 'Hitmonchan', 108: 'Lickitung', 109: 'Koffing', 110: 'Weezing',
  111: 'Rhyhorn', 112: 'Rhydon', 113: 'Chansey', 114: 'Tangela', 115: 'Kangaskhan',
  116: 'Horsea', 117: 'Seadra', 118: 'Goldeen', 119: 'Seaking', 120: 'Staryu',
  121: 'Starmie', 122: 'Mr. Mime', 123: 'Scyther', 124: 'Jynx', 125: 'Electabuzz',
  126: 'Magmar', 127: 'Pinsir', 128: 'Tauros', 129: 'Magikarp', 130: 'Gyarados',
  131: 'Lapras', 132: 'Ditto', 133: 'Eevee', 134: 'Vaporeon', 135: 'Jolteon',
  136: 'Flareon', 137: 'Porygon', 138: 'Omanyte', 139: 'Omastar', 140: 'Kabuto',
  141: 'Kabutops', 142: 'Aerodactyl', 143: 'Snorlax', 144: 'Articuno', 145: 'Zapdos',
  146: 'Moltres', 147: 'Dratini', 148: 'Dragonair', 149: 'Dragonite', 150: 'Mewtwo',
  151: 'Mew'
};

var statusAilments = {
  0x04: 'Asleep',
  0x08: 'Poisoned',
  0x10: 'Burned',
  0x20: 'Frozen',
  0x40: 'Paralyzed'
};

var types = {
  0x00: 'Normal',
  0x01: 'Fighting',
  0x02: 'Flying',
  0x03: 'Poison',
  0x04: 'Ground',
  0x05: 'Rock',
  0x07: 'Bug',
  0x08: 'Ghost',
  0x14: 'Fire',
  0x15: 'Water',
  0x16: 'Grass',
  0x17: 'Electric',
  0x18: 'Psychic',
  0x19: 'Ice',
  0x1A: 'Dragon'
};

var badges = {
  0: 'Boulder',
  1: 'Cascade',
  2: 'Thunder',
  3: 'Rainbow',
  4: 'Soul',
  5: 'Marsh',
  6: 'Volcano',
  7: 'Earth'
};