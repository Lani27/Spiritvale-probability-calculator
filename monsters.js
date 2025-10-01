const monsters = [
  {
    "MonsterName": "Angel",
    "IsBoss": false,
    "Level": 76,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Angel Mage",
    "IsBoss": true,
    "Level": 90,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Archangel",
    "IsBoss": false,
    "Level": 79,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Bat",
    "IsBoss": false,
    "Level": 39,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Bat Lord",
    "IsBoss": true,
    "Level": 55,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Bee",
    "IsBoss": false,
    "Level": 4,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Bird",
    "IsBoss": false,
    "Level": 15,
    "Element": "Neutral",
    "ArchetypeId": "Critter",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Bloom",
    "IsBoss": false,
    "Level": 88,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Blossom",
    "IsBoss": false,
    "Level": 90,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Bomb",
    "IsBoss": false,
    "Level": 81,
    "Element": "Fire",
    "ArchetypeId": "Runner",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Bud",
    "IsBoss": false,
    "Level": 86,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Bumble",
    "IsBoss": false,
    "Level": 16,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Bunny",
    "IsBoss": false,
    "Level": 3,
    "Element": "Neutral",
    "ArchetypeId": "Critter",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Burrow",
    "IsBoss": false,
    "Level": 14,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Butterfly Fairy",
    "IsBoss": false,
    "Level": 32,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Butterfly Hue",
    "IsBoss": false,
    "Level": 19,
    "Element": "Holy",
    "ArchetypeId": "Flyer",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Butterfly Pixie",
    "IsBoss": false,
    "Level": 34,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Cacti",
    "IsBoss": false,
    "Level": 24,
    "Element": "Earth",
    "ArchetypeId": "Plant",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Cactus",
    "IsBoss": false,
    "Level": 27,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Cactus Boss",
    "IsBoss": true,
    "Level": 35,
    "Element": "Earth",
    "ArchetypeId": "Defender",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Cat Bolt",
    "IsBoss": true,
    "Level": 30,
    "Element": "Wind",
    "ArchetypeId": "Hybrid",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Cat Lightning",
    "IsBoss": false,
    "Level": 24,
    "Element": "Wind",
    "ArchetypeId": "Hybrid",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Cat Meow",
    "IsBoss": false,
    "Level": 8,
    "Element": "Wind",
    "ArchetypeId": "Hybrid",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Chick",
    "IsBoss": false,
    "Level": 4,
    "Element": "Neutral",
    "ArchetypeId": "Critter",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Creeper",
    "IsBoss": false,
    "Level": 45,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Cyclops",
    "IsBoss": false,
    "Level": 68,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Cyclops Bat",
    "IsBoss": false,
    "Level": 102,
    "Element": "Undead",
    "ArchetypeId": "Flyer",
    "Map": "Abyss Castle Keep"
  },
  {
    "MonsterName": "Cyclops Bat Mage",
    "IsBoss": false,
    "Level": 112,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Cyclops Bat Wizard",
    "IsBoss": false,
    "Level": 103,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Keep"
  },
  {
    "MonsterName": "Cyclops Giant",
    "IsBoss": false,
    "Level": 70,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Cyclops Minion",
    "IsBoss": false,
    "Level": 67,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Death",
    "IsBoss": false,
    "Level": 101,
    "Element": "Shadow",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Keep"
  },
  {
    "MonsterName": "Death Mage",
    "IsBoss": true,
    "Level": 120,
    "Element": "Shadow",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Direwolf",
    "IsBoss": false,
    "Level": 110,
    "Element": "Undead",
    "ArchetypeId": "Ravager",
    "Map": "Abyss Castle Crypt"
  },
  {
    "MonsterName": "Dog Bark",
    "IsBoss": false,
    "Level": 13,
    "Element": "Fire",
    "ArchetypeId": "Brute",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Dog Bowwow",
    "IsBoss": false,
    "Level": 28,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Dog Pup",
    "IsBoss": false,
    "Level": 10,
    "Element": "Fire",
    "ArchetypeId": "Brute",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Dragon Blizzard",
    "IsBoss": false,
    "Level": 69,
    "Element": "Water",
    "ArchetypeId": "Hybrid",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Dragon Darkness",
    "IsBoss": false,
    "Level": 85,
    "Element": "Shadow",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Dragon Dusk",
    "IsBoss": false,
    "Level": 78,
    "Element": "Shadow",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Dragon Fire",
    "IsBoss": false,
    "Level": 98,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Dragon Ice",
    "IsBoss": false,
    "Level": 68,
    "Element": "Water",
    "ArchetypeId": "Hybrid",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Dragon Inferno",
    "IsBoss": false,
    "Level": 99,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Dragon Nightfall",
    "IsBoss": false,
    "Level": 80,
    "Element": "Shadow",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Dragon Spark",
    "IsBoss": false,
    "Level": 97,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Dragon Water",
    "IsBoss": false,
    "Level": 67,
    "Element": "Water",
    "ArchetypeId": "Hybrid",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Dragonfly Arrow",
    "IsBoss": false,
    "Level": 35,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Dragonfly Darner",
    "IsBoss": false,
    "Level": 37,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Dragonfly Swift",
    "IsBoss": false,
    "Level": 39,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Earthworm",
    "IsBoss": false,
    "Level": 36,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Egg",
    "IsBoss": false,
    "Level": 5,
    "Element": "Neutral",
    "ArchetypeId": "Egg",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Egglet",
    "IsBoss": false,
    "Level": 23,
    "Element": "Neutral",
    "ArchetypeId": "Runner",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Elder Wisp Blue",
    "IsBoss": false,
    "Level": 69,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Elder Wisp Purple",
    "IsBoss": false,
    "Level": 89,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Elder Wisp Yellow",
    "IsBoss": false,
    "Level": 99,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Eyeball Bat Blue",
    "IsBoss": false,
    "Level": 19,
    "Element": "Undead",
    "ArchetypeId": "Flyer",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Eyeball Bat Green",
    "IsBoss": false,
    "Level": 20,
    "Element": "Undead",
    "ArchetypeId": "Flyer",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Eyeball Bat Red",
    "IsBoss": false,
    "Level": 21,
    "Element": "Undead",
    "ArchetypeId": "Flyer",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Eyeball Creep Blue",
    "IsBoss": false,
    "Level": 109,
    "Element": "Undead",
    "ArchetypeId": "Hybrid",
    "Map": "Abyss Castle Crypt"
  },
  {
    "MonsterName": "Eyeball Creep Green",
    "IsBoss": false,
    "Level": 107,
    "Element": "Undead",
    "ArchetypeId": "Hybrid",
    "Map": "Abyss Castle Crypt"
  },
  {
    "MonsterName": "Eyeball Creep Red",
    "IsBoss": false,
    "Level": 106,
    "Element": "Undead",
    "ArchetypeId": "Hybrid",
    "Map": "Abyss Castle Crypt"
  },
  {
    "MonsterName": "Eyeball Mage Blue",
    "IsBoss": false,
    "Level": 113,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Eyeball Mage Green",
    "IsBoss": false,
    "Level": 114,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Eyeball Mage Red",
    "IsBoss": false,
    "Level": 115,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Fire",
    "IsBoss": false,
    "Level": 96,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Fire Mage",
    "IsBoss": false,
    "Level": 99,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Flame",
    "IsBoss": false,
    "Level": 97,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Fledgling",
    "IsBoss": false,
    "Level": 11,
    "Element": "Neutral",
    "ArchetypeId": "Critter",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Flora",
    "IsBoss": false,
    "Level": 32,
    "Element": "Water",
    "ArchetypeId": "Critter",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Flower Pot Monster",
    "IsBoss": false,
    "Level": 25,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Fungi",
    "IsBoss": false,
    "Level": 33,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Ghost",
    "IsBoss": false,
    "Level": 77,
    "Element": "Shadow",
    "ArchetypeId": "Flyer",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Glow Wisp Blue",
    "IsBoss": false,
    "Level": 31,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Glow Wisp Purple",
    "IsBoss": false,
    "Level": 22,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Glow Wisp Yellow",
    "IsBoss": false,
    "Level": 31,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Goblin Giant",
    "IsBoss": false,
    "Level": 64,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Giant Devil",
    "IsBoss": false,
    "Level": 65,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Giant Gold",
    "IsBoss": true,
    "Level": 70,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Giant Mage",
    "IsBoss": false,
    "Level": 63,
    "Element": "Earth",
    "ArchetypeId": "Caster",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Minion",
    "IsBoss": false,
    "Level": 59,
    "Element": "Earth",
    "ArchetypeId": "Critter",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Trooper",
    "IsBoss": false,
    "Level": 62,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Trooper Assassin",
    "IsBoss": false,
    "Level": 60,
    "Element": "Earth",
    "ArchetypeId": "Runner",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Trooper Mage",
    "IsBoss": false,
    "Level": 61,
    "Element": "Earth",
    "ArchetypeId": "Caster",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Trooper Soldier",
    "IsBoss": false,
    "Level": 62,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Golem Earth",
    "IsBoss": false,
    "Level": 30,
    "Element": "Earth",
    "ArchetypeId": "Defender",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Golem Fire",
    "IsBoss": false,
    "Level": 100,
    "Element": "Fire",
    "ArchetypeId": "Defender",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Golem Ice",
    "IsBoss": false,
    "Level": 70,
    "Element": "Water",
    "ArchetypeId": "Defender",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Hare",
    "IsBoss": true,
    "Level": 10,
    "Element": "Neutral",
    "ArchetypeId": "Runner",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Haunt",
    "IsBoss": false,
    "Level": 79,
    "Element": "Holy",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Hermit King",
    "IsBoss": true,
    "Level": 40,
    "Element": "Water",
    "ArchetypeId": "Defender",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Horror",
    "IsBoss": false,
    "Level": 50,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Housefly Icky",
    "IsBoss": false,
    "Level": 34,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Housefly Junk",
    "IsBoss": false,
    "Level": 39,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Housefly Nom",
    "IsBoss": false,
    "Level": 36,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Ice",
    "IsBoss": false,
    "Level": 66,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Ice Mage",
    "IsBoss": true,
    "Level": 75,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Icicle",
    "IsBoss": false,
    "Level": 68,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Imp Demon",
    "IsBoss": false,
    "Level": 97,
    "Element": "Fire",
    "ArchetypeId": "Runner",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Imp Devil",
    "IsBoss": true,
    "Level": 105,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Imp Mischief",
    "IsBoss": false,
    "Level": 96,
    "Element": "Fire",
    "ArchetypeId": "Runner",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Lurker",
    "IsBoss": false,
    "Level": 43,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Mole Rat",
    "IsBoss": false,
    "Level": 26,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Mole Rat King",
    "IsBoss": false,
    "Level": 30,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Mosquito Bug",
    "IsBoss": false,
    "Level": 35,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Mosquito Pester",
    "IsBoss": false,
    "Level": 38,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Mosquito Stinger",
    "IsBoss": false,
    "Level": 40,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Moth Celestial",
    "IsBoss": false,
    "Level": 35,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Moth Luna",
    "IsBoss": false,
    "Level": 29,
    "Element": "Holy",
    "ArchetypeId": "Flyer",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Moth Moon",
    "IsBoss": false,
    "Level": 32,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Mushroom",
    "IsBoss": false,
    "Level": 30,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Nightmare",
    "IsBoss": false,
    "Level": 111,
    "Element": "Shadow",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Petal",
    "IsBoss": false,
    "Level": 34,
    "Element": "Water",
    "ArchetypeId": "Critter",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Phantom",
    "IsBoss": false,
    "Level": 83,
    "Element": "Shadow",
    "ArchetypeId": "Flyer",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Plant Chewer",
    "IsBoss": false,
    "Level": 28,
    "Element": "Neutral",
    "ArchetypeId": "Plant",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Poison Bomb",
    "IsBoss": false,
    "Level": 87,
    "Element": "Poison",
    "ArchetypeId": "Runner",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Pollen",
    "IsBoss": false,
    "Level": 2,
    "Element": "Neutral",
    "ArchetypeId": "Flyer",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Posy",
    "IsBoss": false,
    "Level": 29,
    "Element": "Water",
    "ArchetypeId": "Critter",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Practice Dummy",
    "IsBoss": false,
    "Level": 0,
    "Element": "Neutral",
    "ArchetypeId": "Egg",
    "Map": "Nevaris"
  },
  {
    "MonsterName": "Queen Worm",
    "IsBoss": true,
    "Level": 45,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Rabbit",
    "IsBoss": false,
    "Level": 18,
    "Element": "Neutral",
    "ArchetypeId": "Critter",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Scorpion",
    "IsBoss": false,
    "Level": 27,
    "Element": "Fire",
    "ArchetypeId": "Brute",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Scorpion King",
    "IsBoss": true,
    "Level": 35,
    "Element": "Fire",
    "ArchetypeId": "Ravager",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Scorpling",
    "IsBoss": false,
    "Level": 24,
    "Element": "Fire",
    "ArchetypeId": "Critter",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Seed",
    "IsBoss": false,
    "Level": 6,
    "Element": "Earth",
    "ArchetypeId": "Plant",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Shade",
    "IsBoss": false,
    "Level": 98,
    "Element": "Shadow",
    "ArchetypeId": "Brute",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Shadow",
    "IsBoss": false,
    "Level": 100,
    "Element": "Shadow",
    "ArchetypeId": "Brute",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Shell",
    "IsBoss": false,
    "Level": 30,
    "Element": "Water",
    "ArchetypeId": "Critter",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Skeleton",
    "IsBoss": false,
    "Level": 24,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Skeleton Giant",
    "IsBoss": false,
    "Level": 105,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Abyss Castle Keep"
  },
  {
    "MonsterName": "Skeleton Mage",
    "IsBoss": false,
    "Level": 104,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Keep"
  },
  {
    "MonsterName": "Snake",
    "IsBoss": false,
    "Level": 46,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Snake Naga",
    "IsBoss": true,
    "Level": 50,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Snakelet",
    "IsBoss": false,
    "Level": 40,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Snow Bomb",
    "IsBoss": false,
    "Level": 66,
    "Element": "Water",
    "ArchetypeId": "Runner",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Soul",
    "IsBoss": false,
    "Level": 77,
    "Element": "Holy",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Soul Mage",
    "IsBoss": false,
    "Level": 84,
    "Element": "Holy",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Spider",
    "IsBoss": false,
    "Level": 41,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Spider King",
    "IsBoss": false,
    "Level": 48,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Spider Toxin",
    "IsBoss": false,
    "Level": 44,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Spike",
    "IsBoss": false,
    "Level": 34,
    "Element": "Water",
    "ArchetypeId": "Defender",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Spook",
    "IsBoss": false,
    "Level": 82,
    "Element": "Shadow",
    "ArchetypeId": "Flyer",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Spore",
    "IsBoss": false,
    "Level": 26,
    "Element": "Neutral",
    "ArchetypeId": "Plant",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Sprout",
    "IsBoss": false,
    "Level": 20,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Sting",
    "IsBoss": true,
    "Level": 20,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Sun Blossom",
    "IsBoss": false,
    "Level": 30,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Sunflora Pixie",
    "IsBoss": true,
    "Level": 40,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Sunflower Fairy",
    "IsBoss": false,
    "Level": 33,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Target Dummy",
    "IsBoss": false,
    "Level": 0,
    "Element": "Neutral",
    "ArchetypeId": "Egg",
    "Map": "Nevaris"
  },
  {
    "MonsterName": "Toadstool",
    "IsBoss": false,
    "Level": 35,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Training Dummy",
    "IsBoss": false,
    "Level": 0,
    "Element": "Neutral",
    "ArchetypeId": "Egg",
    "Map": "Nevaris"
  },
  {
    "MonsterName": "Treant Forest Autumn",
    "IsBoss": false,
    "Level": 15,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Treant Forest Evergreen",
    "IsBoss": false,
    "Level": 14,
    "Element": "Earth",
    "ArchetypeId": "Hybrid",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Treant Minion Autumn",
    "IsBoss": false,
    "Level": 11,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Treant Minion Evergreen",
    "IsBoss": false,
    "Level": 10,
    "Element": "Earth",
    "ArchetypeId": "Hybrid",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Treant Tree Autumn",
    "IsBoss": false,
    "Level": 13,
    "Element": "Fire",
    "ArchetypeId": "Brute",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Treant Tree Evergreen",
    "IsBoss": false,
    "Level": 12,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Vampire Bat",
    "IsBoss": false,
    "Level": 44,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Werewolf",
    "IsBoss": true,
    "Level": 30,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Whirlwind",
    "IsBoss": false,
    "Level": 19,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Wind",
    "IsBoss": false,
    "Level": 20,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Wind Mage",
    "IsBoss": false,
    "Level": 25,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Wisp Blue",
    "IsBoss": false,
    "Level": 9,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Wisp Purple",
    "IsBoss": false,
    "Level": 21,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Wisp Red",
    "IsBoss": false,
    "Level": 9,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Wisp Yellow",
    "IsBoss": false,
    "Level": 1,
    "Element": "Earth",
    "ArchetypeId": "Caster",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Wolf",
    "IsBoss": false,
    "Level": 25,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Wolf Pup",
    "IsBoss": false,
    "Level": 23,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Worm",
    "IsBoss": false,
    "Level": 38,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Worm Creep",
    "IsBoss": true,
    "Level": 95,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Worm Rot",
    "IsBoss": false,
    "Level": 89,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Worm Stink",
    "IsBoss": false,
    "Level": 87,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Zombie Goblin Giant",
    "IsBoss": false,
    "Level": 55,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Goblin Cave"
  },
  {
    "MonsterName": "Zombie Goblin King",
    "IsBoss": true,
    "Level": 60,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Goblin Cave"
  },
  {
    "MonsterName": "Zombie Goblin Minion",
    "IsBoss": false,
    "Level": 49,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Goblin Cave"
  },
  {
    "MonsterName": "Zombie Goblin Soldier",
    "IsBoss": false,
    "Level": 52,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Goblin Cave"
  }
]