const monsters = [
  {
    "MonsterName": "Angel",
    "Level": 76,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Angel Mage",
    "Level": 90,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Archangel",
    "Level": 79,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Bat",
    "Level": 39,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Bat Lord",
    "Level": 55,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Bee",
    "Level": 4,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Bird",
    "Level": 15,
    "Element": "Neutral",
    "ArchetypeId": "Critter",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Bloom",
    "Level": 88,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Blossom",
    "Level": 90,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Bomb",
    "Level": 81,
    "Element": "Fire",
    "ArchetypeId": "Runner",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Bud",
    "Level": 86,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Bumble",
    "Level": 16,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Bunny",
    "Level": 3,
    "Element": "Neutral",
    "ArchetypeId": "Critter",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Burrow",
    "Level": 14,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Butterfly Fairy",
    "Level": 32,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Butterfly Hue",
    "Level": 19,
    "Element": "Holy",
    "ArchetypeId": "Flyer",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Butterfly Pixie",
    "Level": 34,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Cacti",
    "Level": 24,
    "Element": "Earth",
    "ArchetypeId": "Plant",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Cactus",
    "Level": 27,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Cactus Boss",
    "Level": 35,
    "Element": "Earth",
    "ArchetypeId": "Defender",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Cat Bolt",
    "Level": 30,
    "Element": "Wind",
    "ArchetypeId": "Hybrid",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Cat Lightning",
    "Level": 24,
    "Element": "Wind",
    "ArchetypeId": "Hybrid",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Cat Meow",
    "Level": 8,
    "Element": "Wind",
    "ArchetypeId": "Hybrid",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Chick",
    "Level": 4,
    "Element": "Neutral",
    "ArchetypeId": "Critter",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Creeper",
    "Level": 45,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Cyclops",
    "Level": 68,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Cyclops Bat",
    "Level": 102,
    "Element": "Undead",
    "ArchetypeId": "Flyer",
    "Map": "Abyss Castle Keep"
  },
  {
    "MonsterName": "Cyclops Bat Mage",
    "Level": 112,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Cyclops Bat Wizard",
    "Level": 103,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Keep"
  },
  {
    "MonsterName": "Cyclops Giant",
    "Level": 70,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Cyclops Minion",
    "Level": 67,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Death",
    "Level": 101,
    "Element": "Shadow",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Keep"
  },
  {
    "MonsterName": "Death Mage",
    "Level": 120,
    "Element": "Shadow",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Direwolf",
    "Level": 110,
    "Element": "Undead",
    "ArchetypeId": "Ravager",
    "Map": "Abyss Castle Crypt"
  },
  {
    "MonsterName": "Dog Bark",
    "Level": 13,
    "Element": "Fire",
    "ArchetypeId": "Brute",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Dog Bowwow",
    "Level": 28,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Dog Pup",
    "Level": 10,
    "Element": "Fire",
    "ArchetypeId": "Brute",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Dragon Blizzard",
    "Level": 69,
    "Element": "Water",
    "ArchetypeId": "Hybrid",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Dragon Darkness",
    "Level": 85,
    "Element": "Shadow",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Dragon Dusk",
    "Level": 78,
    "Element": "Shadow",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Dragon Fire",
    "Level": 98,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Dragon Ice",
    "Level": 68,
    "Element": "Water",
    "ArchetypeId": "Hybrid",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Dragon Inferno",
    "Level": 99,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Dragon Nightfall",
    "Level": 80,
    "Element": "Shadow",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Dragon Spark",
    "Level": 97,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Dragon Water",
    "Level": 67,
    "Element": "Water",
    "ArchetypeId": "Hybrid",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Dragonfly Arrow",
    "Level": 35,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Dragonfly Darner",
    "Level": 37,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Dragonfly Swift",
    "Level": 39,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Earthworm",
    "Level": 36,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Egg",
    "Level": 5,
    "Element": "Neutral",
    "ArchetypeId": "Egg",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Egglet",
    "Level": 23,
    "Element": "Neutral",
    "ArchetypeId": "Runner",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Elder Wisp Blue",
    "Level": 69,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Elder Wisp Purple",
    "Level": 89,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Elder Wisp Yellow",
    "Level": 99,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Eyeball Bat Blue",
    "Level": 19,
    "Element": "Undead",
    "ArchetypeId": "Flyer",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Eyeball Bat Green",
    "Level": 20,
    "Element": "Undead",
    "ArchetypeId": "Flyer",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Eyeball Bat Red",
    "Level": 21,
    "Element": "Undead",
    "ArchetypeId": "Flyer",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Eyeball Creep Blue",
    "Level": 109,
    "Element": "Undead",
    "ArchetypeId": "Hybrid",
    "Map": "Abyss Castle Crypt"
  },
  {
    "MonsterName": "Eyeball Creep Green",
    "Level": 107,
    "Element": "Undead",
    "ArchetypeId": "Hybrid",
    "Map": "Abyss Castle Crypt"
  },
  {
    "MonsterName": "Eyeball Creep Red",
    "Level": 106,
    "Element": "Undead",
    "ArchetypeId": "Hybrid",
    "Map": "Abyss Castle Crypt"
  },
  {
    "MonsterName": "Eyeball Mage Blue",
    "Level": 113,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Eyeball Mage Green",
    "Level": 114,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Eyeball Mage Red",
    "Level": 115,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Fire",
    "Level": 96,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Fire Mage",
    "Level": 99,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Flame",
    "Level": 97,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Fledgling",
    "Level": 11,
    "Element": "Neutral",
    "ArchetypeId": "Critter",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Flora",
    "Level": 32,
    "Element": "Water",
    "ArchetypeId": "Critter",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Flower Pot Monster",
    "Level": 25,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Fungi",
    "Level": 33,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Ghost",
    "Level": 77,
    "Element": "Shadow",
    "ArchetypeId": "Flyer",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Glow Wisp Blue",
    "Level": 31,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Glow Wisp Purple",
    "Level": 22,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Glow Wisp Yellow",
    "Level": 31,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Goblin Giant",
    "Level": 64,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Giant Devil",
    "Level": 65,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Giant Gold",
    "Level": 70,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Giant Mage",
    "Level": 63,
    "Element": "Earth",
    "ArchetypeId": "Caster",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Minion",
    "Level": 59,
    "Element": "Earth",
    "ArchetypeId": "Critter",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Trooper",
    "Level": 62,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Trooper Assassin",
    "Level": 60,
    "Element": "Earth",
    "ArchetypeId": "Runner",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Trooper Mage",
    "Level": 61,
    "Element": "Earth",
    "ArchetypeId": "Caster",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Goblin Trooper Soldier",
    "Level": 62,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Goblin Village"
  },
  {
    "MonsterName": "Golem Earth",
    "Level": 30,
    "Element": "Earth",
    "ArchetypeId": "Defender",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Golem Fire",
    "Level": 100,
    "Element": "Fire",
    "ArchetypeId": "Defender",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Golem Ice",
    "Level": 70,
    "Element": "Water",
    "ArchetypeId": "Defender",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Hare",
    "Level": 10,
    "Element": "Neutral",
    "ArchetypeId": "Runner",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Haunt",
    "Level": 79,
    "Element": "Holy",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Hermit King",
    "Level": 40,
    "Element": "Water",
    "ArchetypeId": "Defender",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Horror",
    "Level": 50,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Housefly Icky",
    "Level": 34,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Housefly Junk",
    "Level": 39,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Housefly Nom",
    "Level": 36,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Ice",
    "Level": 66,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Ice Mage",
    "Level": 75,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Icicle",
    "Level": 68,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Imp Demon",
    "Level": 97,
    "Element": "Fire",
    "ArchetypeId": "Runner",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Imp Devil",
    "Level": 105,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Imp Mischief",
    "Level": 96,
    "Element": "Fire",
    "ArchetypeId": "Runner",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Lurker",
    "Level": 43,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Mole Rat",
    "Level": 26,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Mole Rat King",
    "Level": 30,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Mosquito Bug",
    "Level": 35,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Mosquito Pester",
    "Level": 38,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Mosquito Stinger",
    "Level": 40,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Moth Celestial",
    "Level": 35,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Moth Luna",
    "Level": 29,
    "Element": "Holy",
    "ArchetypeId": "Flyer",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Moth Moon",
    "Level": 32,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Mushroom",
    "Level": 30,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Nightmare",
    "Level": 111,
    "Element": "Shadow",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Library"
  },
  {
    "MonsterName": "Petal",
    "Level": 34,
    "Element": "Water",
    "ArchetypeId": "Critter",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Phantom",
    "Level": 83,
    "Element": "Shadow",
    "ArchetypeId": "Flyer",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Plant Chewer",
    "Level": 28,
    "Element": "Neutral",
    "ArchetypeId": "Plant",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Poison Bomb",
    "Level": 87,
    "Element": "Poison",
    "ArchetypeId": "Runner",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Pollen",
    "Level": 2,
    "Element": "Neutral",
    "ArchetypeId": "Flyer",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Posy",
    "Level": 29,
    "Element": "Water",
    "ArchetypeId": "Critter",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Practice Dummy",
    "Level": 0,
    "Element": "Neutral",
    "ArchetypeId": "Egg",
    "Map": "Nevaris"
  },
  {
    "MonsterName": "Queen Worm",
    "Level": 45,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Rabbit",
    "Level": 18,
    "Element": "Neutral",
    "ArchetypeId": "Critter",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Scorpion",
    "Level": 27,
    "Element": "Fire",
    "ArchetypeId": "Brute",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Scorpion King",
    "Level": 35,
    "Element": "Fire",
    "ArchetypeId": "Ravager",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Scorpling",
    "Level": 24,
    "Element": "Fire",
    "ArchetypeId": "Critter",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Seed",
    "Level": 6,
    "Element": "Earth",
    "ArchetypeId": "Plant",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Shade",
    "Level": 98,
    "Element": "Shadow",
    "ArchetypeId": "Brute",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Shadow",
    "Level": 100,
    "Element": "Shadow",
    "ArchetypeId": "Brute",
    "Map": "Demon's Maw"
  },
  {
    "MonsterName": "Shell",
    "Level": 30,
    "Element": "Water",
    "ArchetypeId": "Critter",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Skeleton",
    "Level": 24,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Skeleton Giant",
    "Level": 105,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Abyss Castle Keep"
  },
  {
    "MonsterName": "Skeleton Mage",
    "Level": 104,
    "Element": "Undead",
    "ArchetypeId": "Caster",
    "Map": "Abyss Castle Keep"
  },
  {
    "MonsterName": "Snake",
    "Level": 46,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Snake Naga",
    "Level": 50,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Snakelet",
    "Level": 40,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Snow Bomb",
    "Level": 66,
    "Element": "Water",
    "ArchetypeId": "Runner",
    "Map": "Crystal Cave"
  },
  {
    "MonsterName": "Soul",
    "Level": 77,
    "Element": "Holy",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Soul Mage",
    "Level": 84,
    "Element": "Holy",
    "ArchetypeId": "Hybrid",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Spider",
    "Level": 41,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Spider King",
    "Level": 48,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Spider Toxin",
    "Level": 44,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Spike",
    "Level": 34,
    "Element": "Water",
    "ArchetypeId": "Defender",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Spook",
    "Level": 82,
    "Element": "Shadow",
    "ArchetypeId": "Flyer",
    "Map": "Sanctum of Light"
  },
  {
    "MonsterName": "Spore",
    "Level": 26,
    "Element": "Neutral",
    "ArchetypeId": "Plant",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Sprout",
    "Level": 20,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Sting",
    "Level": 20,
    "Element": "Wind",
    "ArchetypeId": "Flyer",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Sun Blossom",
    "Level": 30,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Sunflora Pixie",
    "Level": 40,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Sunflower Fairy",
    "Level": 33,
    "Element": "Holy",
    "ArchetypeId": "Caster",
    "Map": "Fairy Glen"
  },
  {
    "MonsterName": "Target Dummy",
    "Level": 0,
    "Element": "Neutral",
    "ArchetypeId": "Egg",
    "Map": "Nevaris"
  },
  {
    "MonsterName": "Toadstool",
    "Level": 35,
    "Element": "Water",
    "ArchetypeId": "Brute",
    "Map": "Mystic Lake"
  },
  {
    "MonsterName": "Training Dummy",
    "Level": 0,
    "Element": "Neutral",
    "ArchetypeId": "Egg",
    "Map": "Nevaris"
  },
  {
    "MonsterName": "Treant Forest Autumn",
    "Level": 15,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Treant Forest Evergreen",
    "Level": 14,
    "Element": "Earth",
    "ArchetypeId": "Hybrid",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Treant Minion Autumn",
    "Level": 11,
    "Element": "Fire",
    "ArchetypeId": "Hybrid",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Treant Minion Evergreen",
    "Level": 10,
    "Element": "Earth",
    "ArchetypeId": "Hybrid",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Treant Tree Autumn",
    "Level": 13,
    "Element": "Fire",
    "ArchetypeId": "Brute",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Treant Tree Evergreen",
    "Level": 12,
    "Element": "Earth",
    "ArchetypeId": "Brute",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Vampire Bat",
    "Level": 44,
    "Element": "Poison",
    "ArchetypeId": "Flyer",
    "Map": "Forgotten Depths"
  },
  {
    "MonsterName": "Werewolf",
    "Level": 30,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Whirlwind",
    "Level": 19,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Wind",
    "Level": 20,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Wind Mage",
    "Level": 25,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Windy Desert"
  },
  {
    "MonsterName": "Wisp Blue",
    "Level": 9,
    "Element": "Water",
    "ArchetypeId": "Caster",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Wisp Purple",
    "Level": 21,
    "Element": "Wind",
    "ArchetypeId": "Caster",
    "Map": "Forest Labyrinth"
  },
  {
    "MonsterName": "Wisp Red",
    "Level": 9,
    "Element": "Fire",
    "ArchetypeId": "Caster",
    "Map": "Treant Trail"
  },
  {
    "MonsterName": "Wisp Yellow",
    "Level": 1,
    "Element": "Earth",
    "ArchetypeId": "Caster",
    "Map": "Sunny Meadows"
  },
  {
    "MonsterName": "Wolf",
    "Level": 25,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Wolf Pup",
    "Level": 23,
    "Element": "Shadow",
    "ArchetypeId": "Ravager",
    "Map": "Festering Woods"
  },
  {
    "MonsterName": "Worm",
    "Level": 38,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Swamp"
  },
  {
    "MonsterName": "Worm Creep",
    "Level": 95,
    "Element": "Poison",
    "ArchetypeId": "Ravager",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Worm Rot",
    "Level": 89,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Worm Stink",
    "Level": 87,
    "Element": "Poison",
    "ArchetypeId": "Undead",
    "Map": "Underground Cavern"
  },
  {
    "MonsterName": "Zombie Goblin Giant",
    "Level": 55,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Goblin Cave"
  },
  {
    "MonsterName": "Zombie Goblin King",
    "Level": 60,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Goblin Cave"
  },
  {
    "MonsterName": "Zombie Goblin Minion",
    "Level": 49,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Goblin Cave"
  },
  {
    "MonsterName": "Zombie Goblin Soldier",
    "Level": 52,
    "Element": "Undead",
    "ArchetypeId": "Undead",
    "Map": "Goblin Cave"
  }
]
if (typeof module !== 'undefined' && module.exports) {
    module.exports = monsters;
}