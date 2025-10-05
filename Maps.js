const mapData = [
    {
        "Id": "Castle Crypt",
        "Name": "Abyss Castle Crypt",
        "MinLevel": 106,
        "MaxLevel": 110,
        "Monsters": ["Eyeball Creep Blue", "Eyeball Creep Green", "Eyeball Creep Red", "Direwolf"],
        "Exits": ["Castle Keep", "Castle Keep"]
    },
    {
        "Id": "Castle Keep",
        "Name": "Abyss Castle Keep",
        "MinLevel": 101,
        "MaxLevel": 105,
        "Monsters": ["Cyclops Bat", "Death", "Cyclops Bat Wizard", "Skeleton Mage", "Skeleton Giant"],
        "Exits": ["Ice Cave", "Castle Crypt", "Castle Crypt", "Castle Crypt", "Castle Crypt", "Castle Library"]
    },
    {
        "Id": "Castle Library",
        "Name": "Abyss Castle Library",
        "MinLevel": 111,
        "MaxLevel": 115,
        "Monsters": ["Nightmare", "Cyclops Bat Mage", "Eyeball Mage Blue", "Eyeball Mage Green", "Eyeball Mage Red"],
        "Exits": ["Castle Keep"]
    },
    {
        "Id": "Ice Cave",
        "Name": "Crystal Cave",
        "MinLevel": 66,
        "MaxLevel": 70,
        "Monsters": ["Ice", "Snow Bomb", "Dragon Water", "Cyclops Minion", "Icicle", "Dragon Ice", "Cyclops", "Elder Wisp Blue", "Dragon Blizzard", "Cyclops Giant", "Golem Ice"],
        "Exits": ["Dungeon Outside", "Castle Keep"]
    },
    {
        "Id": "Dark Forest",
        "Name": "Dark Forest",
        "MinLevel": 96,
        "MaxLevel": 100,
        "Monsters": ["Alien Spike", "Jellyfish Robot", "Alien Sporella", "Alien Cyclops", "Alien Wheel", "Stinger Robot", "Alien Biteroot"],
        "Exits": ["Enchanted Forest", "Night Garden"]
    },
    {
        "Id": "Demon's Maw",
        "Name": "Demon's Maw",
        "MinLevel": 96,
        "MaxLevel": 100,
        "Monsters": ["Fire", "Imp Mischief", "Dragon Spark", "Flame", "Imp Demon", "Dragon Fire", "Shade", "Elder Wisp Yellow", "Fire Mage", "Dragon Inferno", "Shadow", "Golem Fire"],
        "Exits": ["Poison Cave", "Forge"]
    },
    {
        "Id": "Enchanted Forest",
        "Name": "Fairy Glen",
        "MinLevel": 31,
        "MaxLevel": 35,
        "Monsters": ["Moth Luna", "Sun Blossom", "Butterfly Fairy", "Glow Wisp Yellow", "Moth Moon", "Sunflower Fairy", "Butterfly Pixie", "Moth Celestial"],
        "Exits": ["Labyrinth 3", "Dark Forest"]
    },
    {
        "Id": "Cemetery",
        "Name": "Festering Woods",
        "MinLevel": 21,
        "MaxLevel": 25,
        "Monsters": ["Eyeball Bat Blue", "Eyeball Bat Green", "Eyeball Bat Red", "Wolf Pup", "Skeleton", "Wolf"],
        "Exits": ["Nevaris"]
    },
    {
        "Id": "Labyrinth 3",
        "Name": "Forest Labyrinth",
        "MinLevel": 16,
        "MaxLevel": 20,
        "Monsters": ["Burrow", "Bumble", "Rabbit", "Sprout"],
        "Exits": ["Labyrinth 2", "Enchanted Forest", "Labyrinth 3", "Labyrinth 3", "Labyrinth 3", "Labyrinth 2", "Labyrinth 3", "Labyrinth 3", "Labyrinth 2", "Labyrinth 4", "Labyrinth 3"]
    },
    {
        "Id": "Labyrinth 4",
        "Name": "Forest Labyrinth",
        "MinLevel": 21,
        "MaxLevel": 25,
        "Monsters": ["Butterfly Hue", "Wisp Purple", "Egglet", "Flower Pot Monster"],
        "Exits": ["Mystic Lake", "Labyrinth 4", "Labyrinth 4", "Labyrinth 3", "Labyrinth 4", "Labyrinth 4", "Labyrinth 4", "Labyrinth 4", "Labyrinth 2"]
    },
    {
        "Id": "Labyrinth 1",
        "Name": "Forest Labyrinth",
        "MinLevel": 6,
        "MaxLevel": 10,
        "Monsters": ["Bee", "Seed", "Cat Meow", "Dog Pup"],
        "Exits": ["Forest Field 1", "Labyrinth 2", "Labyrinth 1", "Labyrinth 1", "Labyrinth 1", "Labyrinth 1", "Labyrinth 1", "Labyrinth 1"]
    },
    {
        "Id": "Labyrinth 2",
        "Name": "Forest Labyrinth",
        "MinLevel": 11,
        "MaxLevel": 15,
        "Monsters": ["Wisp Blue", "Fledgling", "Dog Bark", "Bird"],
        "Exits": ["Labyrinth 1", "Labyrinth 3", "Labyrinth 2", "Labyrinth 2", "Labyrinth 2", "Labyrinth 2", "Labyrinth 2", "Labyrinth 2", "Labyrinth 3", "Labyrinth 4", "Labyrinth 3"]
    },
    {
        "Id": "Dungeon Boss",
        "Name": "Forgotten Depths",
        "MinLevel": 46,
        "MaxLevel": 50,
        "Monsters": ["Vampire Bat", "Snake", "Spider King", "Horror"],
        "Exits": ["Dungeon Outside", "Goblin Cave"]
    },
    {
        "Id": "Dungeon Outside",
        "Name": "Forgotten Depths",
        "MinLevel": 41,
        "MaxLevel": 45,
        "Monsters": ["Bat", "Spider", "Lurker", "Snakelet", "Spider Toxin", "Creeper"],
        "Exits": ["Dungeon Boss", "Ice Cave", "Desert Field 3"]
    },
    {
        "Id": "Goblin Cave",
        "Name": "Goblin Cave",
        "MinLevel": 51,
        "MaxLevel": 55,
        "Monsters": ["Zombie Goblin Minion", "Zombie Goblin Soldier", "Zombie Goblin Giant"],
        "Exits": ["Dungeon Boss", "Goblin Village"]
    },
    {
        "Id": "Goblin Village",
        "Name": "Goblin Village",
        "MinLevel": 56,
        "MaxLevel": 60,
        "Monsters": ["Goblin Minion", "Goblin Trooper Assassin", "Goblin Trooper Mage", "Goblin Trooper", "Goblin Trooper Soldier", "Goblin Giant Mage", "Goblin Giant", "Goblin Giant Devil"],
        "Exits": ["Goblin Cave", "Goblin Warcamp"]
    },
    {
        "Id": "Goblin Warcamp",
        "Name": "Goblin Warcamp",
        "MinLevel": 116,
        "MaxLevel": 120,
        "Monsters": ["Goblin Warlock", "Goblin Warblade", "Goblin Warcrusher"],
        "Exits": ["Goblin Village"]
    },
    {
        "Id": "Mystic Lake",
        "Name": "Mystic Lake",
        "MinLevel": 31,
        "MaxLevel": 35,
        "Monsters": ["Posy", "Shell", "Mushroom", "Glow Wisp Blue", "Flora", "Fungi", "Spike", "Petal", "Toadstool"],
        "Exits": ["Labyrinth 4"]
    },
    {
        "Id": "Nevaris",
        "Name": "Nevaris",
        "MinLevel": 0,
        "MaxLevel": 0,
        "Monsters": null,
        "Exits": ["Forest Field 1", "Forest Field 1", "Cemetery", "PVP Arena"]
    },
    {
        "Id": "Night Garden",
        "Name": "Night Garden",
        "MinLevel": 126,
        "MaxLevel": 130,
        "Monsters": ["Alien One Eye", "Alien Wreck", "Tentacles Robot", "Alien Plant"],
        "Exits": ["Dark Forest"]
    },
    {
        "Id": "Sanctum Inner",
        "Name": "Sanctum of Light",
        "MinLevel": 76,
        "MaxLevel": 80,
        "Monsters": ["Angel", "Ghost", "Dragon Dusk", "Soul", "Archangel", "Dragon Nightfall", "Haunt"],
        "Exits": ["Desert Field 1", "Sanctum Throne", "Poison Cave", "Poison Cave"]
    },
    {
        "Id": "Sanctum Throne",
        "Name": "Sanctum of Light",
        "MinLevel": 81,
        "MaxLevel": 85,
        "Monsters": ["Bomb", "Spook", "Phantom", "Dragon Darkness", "Soul Mage"],
        "Exits": ["Sanctum Inner"]
    },
    {
        "Id": "Forest Field 1",
        "Name": "Sunny Meadows",
        "MinLevel": 1,
        "MaxLevel": 5,
        "Monsters": ["Pollen", "Wisp Yellow", "Bunny", "Chick", "Egg"],
        "Exits": ["Nevaris", "Forest Field 2", "Labyrinth 1"]
    },
    {
        "Id": "Swamp",
        "Name": "Swamp",
        "MinLevel": 36,
        "MaxLevel": 40,
        "Monsters": ["Dragonfly Arrow", "Housefly Icky", "Mosquito Bug", "Earthworm", "Dragonfly Darner", "Housefly Nom", "Mosquito Pester", "Worm", "Dragonfly Swift", "Housefly Junk", "Mosquito Stinger"],
        "Exits": ["Desert Field 2"]
    },
    {
        "Id": "Forge",
        "Name": "The Forge",
        "MinLevel": 126,
        "MaxLevel": 130,
        "Monsters": ["Razor Robot", "Shell Robot", "Spike Robot", "Spiderling Robot", "Nozzle Robot", "Spider Robot", "Nose Robot", "Delivery Robot", "Snout Robot", "Boxy Robot", "Gripper Robot"],
        "Exits": ["Demon's Maw"]
    },
    {
        "Id": "Forest Field 2",
        "Name": "Treant Trail",
        "MinLevel": 11,
        "MaxLevel": 15,
        "Monsters": ["Wisp Red", "Treant Minion Autumn", "Treant Minion Evergreen", "Treant Tree Autumn", "Treant Tree Evergreen", "Treant Forest Autumn", "Treant Forest Evergreen"],
        "Exits": ["Forest Field 1", "Desert Field 1"]
    },
    {
        "Id": "Poison Cave",
        "Name": "Underground Cavern",
        "MinLevel": 86,
        "MaxLevel": 90,
        "Monsters": ["Bud", "Poison Bomb", "Worm Stink", "Worm Rot", "Bloom", "Elder Wisp Purple", "Blossom"],
        "Exits": ["Sanctum Inner", "Demon's Maw"]
    },
    {
        "Id": "Desert Field 3",
        "Name": "Windy Desert",
        "MinLevel": 26,
        "MaxLevel": 30,
        "Monsters": ["Cacti", "Spore", "Cactus", "Plant Chewer", "Golem Earth"],
        "Exits": ["Desert Field 1", "Dungeon Outside"]
    },
    {
        "Id": "Desert Field 2",
        "Name": "Windy Desert",
        "MinLevel": 26,
        "MaxLevel": 30,
        "Monsters": ["Scorpling", "Mole Rat", "Scorpion", "Dog Bowwow", "Mole Rat King"],
        "Exits": ["Desert Field 1", "Swamp"]
    },
    {
        "Id": "Desert Field 1",
        "Name": "Windy Desert",
        "MinLevel": 21,
        "MaxLevel": 25,
        "Monsters": ["Whirlwind", "Glow Wisp Purple", "Wind", "Cat Lightning", "Wind Mage"],
        "Exits": ["Forest Field 2", "Sanctum Inner", "Desert Field 3", "Desert Field 2"]
    }
];
