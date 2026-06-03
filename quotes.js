/**
 * Top 100 Greatest Movie Quotes of All Time (The Ultimate List)
 * Source: https://www.imdb.com/list/ls054689899/
 */
const movieQuotes = [
  {
    "number": 1,
    "movie": "Casablanca",
    "year": 1942,
    "quote": "Here's looking at you, kid.",
    "speaker": "Rick Blaine"
  },
  {
    "number": 2,
    "movie": "Gone with the Wind",
    "year": 1939,
    "quote": "Frankly, my dear, I don't give a damn.",
    "speaker": "Rhett Butler"
  },
  {
    "number": 3,
    "movie": "The Wizard of Oz",
    "year": 1939,
    "quote": "Toto, I've got a feeling we're not in Kansas anymore.",
    "speaker": "Dorothy Gale"
  },
  {
    "number": 4,
    "movie": "The Godfather",
    "year": 1972,
    "quote": "I'm going to make him an offer he can't refuse.",
    "speaker": "Vito Corleone"
  },
  {
    "number": 5,
    "movie": "Casablanca",
    "year": 1942,
    "quote": "Of all the gin joints in all the towns in all the world, she walks into mine.",
    "speaker": "Rick Blaine"
  },
  {
    "number": 6,
    "movie": "On the Waterfront",
    "year": 1954,
    "quote": "You don't understand! I coulda had class. I coulda been a contender. I could've been somebody, instead of a bum, which is what I am.",
    "speaker": "Terry Malloy"
  },
  {
    "number": 7,
    "movie": "Citizen Kane",
    "year": 1941,
    "quote": "Rosebud.",
    "speaker": "Charles Foster Kane"
  },
  {
    "number": 8,
    "movie": "Gone with the Wind",
    "year": 1939,
    "quote": "After all, tomorrow is another day!",
    "speaker": "Scarlett O'Hara"
  },
  {
    "number": 9,
    "movie": "Sunset Boulevard",
    "year": 1950,
    "quote": "All right, Mr. DeMille, I'm ready for my close-up.",
    "speaker": "Norma Desmond"
  },
  {
    "number": 10,
    "movie": "Star Wars: Episode IV - A New Hope",
    "year": 1977,
    "quote": "May the Force be with you.",
    "speaker": "Han Solo"
  },
  {
    "number": 11,
    "movie": "Jaws",
    "year": 1975,
    "quote": "You're gonna need a bigger boat.",
    "speaker": "Martin Brody"
  },
  {
    "number": 12,
    "movie": "Apocalypse Now",
    "year": 1979,
    "quote": "I love the smell of napalm in the morning.",
    "speaker": "Lt. Col. Bill Kilgore"
  },
  {
    "number": 13,
    "movie": "The Shining",
    "year": 1980,
    "quote": "Here's Johnny!",
    "speaker": "Jack Torrance"
  },
  {
    "number": 14,
    "movie": "The Wizard of Oz",
    "year": 1939,
    "quote": "There's no place like home.",
    "speaker": "Dorothy Gale"
  },
  {
    "number": 15,
    "movie": "Forrest Gump",
    "year": 1994,
    "quote": "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
    "speaker": "Forrest Gump"
  },
  {
    "number": 16,
    "movie": "Titanic",
    "year": 1997,
    "quote": "I'm the king of the world!",
    "speaker": "Jack Dawson"
  },
  {
    "number": 17,
    "movie": "A Few Good Men",
    "year": 1992,
    "quote": "You can't handle the truth!",
    "speaker": "Col. Nathan R. Jessup"
  },
  {
    "number": 18,
    "movie": "The Silence of the Lambs",
    "year": 1991,
    "quote": "A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti.",
    "speaker": "Hannibal Lecter"
  },
  {
    "number": 19,
    "movie": "Chinatown",
    "year": 1974,
    "quote": "Forget it, Jake, it's Chinatown.",
    "speaker": "Lawrence Walsh"
  },
  {
    "number": 20,
    "movie": "Casablanca",
    "year": 1942,
    "quote": "Play it, Sam. Play 'As Time Goes By.'",
    "speaker": "Ilsa Lund"
  },
  {
    "number": 21,
    "movie": "The Maltese Falcon",
    "year": 1941,
    "quote": "The stuff that dreams are made of.",
    "speaker": "Sam Spade"
  },
  {
    "number": 22,
    "movie": "Taxi Driver",
    "year": 1976,
    "quote": "You talkin' to me?",
    "speaker": "Travis Bickle"
  },
  {
    "number": 23,
    "movie": "The Terminator",
    "year": 1984,
    "quote": "I'll be back.",
    "speaker": "The Terminator"
  },
  {
    "number": 24,
    "movie": "E.T. the Extra-Terrestrial",
    "year": 1982,
    "quote": "E.T. phone home.",
    "speaker": "E.T."
  },
  {
    "number": 25,
    "movie": "The Sixth Sense",
    "year": 1999,
    "quote": "I see dead people.",
    "speaker": "Cole Sear"
  },
  {
    "number": 26,
    "movie": "Casablanca",
    "year": 1942,
    "quote": "Louis, I think this is the beginning of a beautiful friendship.",
    "speaker": "Rick Blaine"
  },
  {
    "number": 27,
    "movie": "All About Eve",
    "year": 1950,
    "quote": "Fasten your seatbelts. It's going to be a bumpy night.",
    "speaker": "Margo Channing"
  },
  {
    "number": 28,
    "movie": "In the Heat of the Night",
    "year": 1967,
    "quote": "They call me Mister Tibbs!",
    "speaker": "Virgil Tibbs"
  },
  {
    "number": 29,
    "movie": "Cool Hand Luke",
    "year": 1967,
    "quote": "What we've got here is failure to communicate.",
    "speaker": "Captain"
  },
  {
    "number": 30,
    "movie": "Love Story",
    "year": 1970,
    "quote": "Love means never having to say you're sorry.",
    "speaker": "Jennifer Cavilleri Barrett"
  },
  {
    "number": 31,
    "movie": "Sudden Impact",
    "year": 1983,
    "quote": "Go ahead, make my day.",
    "speaker": "Harry Callahan"
  },
  {
    "number": 32,
    "movie": "White Heat",
    "year": 1949,
    "quote": "Made it, Ma! Top of the world!",
    "speaker": "Arthur \"Cody\" Jarrett"
  },
  {
    "number": 33,
    "movie": "Network",
    "year": 1976,
    "quote": "I'm as mad as hell, and I'm not going to take this anymore!",
    "speaker": "Howard Beale"
  },
  {
    "number": 34,
    "movie": "Jerry Maguire",
    "year": 1996,
    "quote": "Show me the money!",
    "speaker": "Rod Tidwell"
  },
  {
    "number": 35,
    "movie": "Dr. No",
    "year": 1962,
    "quote": "Bond. James Bond.",
    "speaker": "James Bond"
  },
  {
    "number": 36,
    "movie": "She Done Him Wrong",
    "year": 1933,
    "quote": "Why don't you come up sometime and see me?\"",
    "speaker": "Lady Lou"
  },
  {
    "number": 37,
    "movie": "Sunset Boulevard",
    "year": 1950,
    "quote": "I am big! It's the pictures that got small.",
    "speaker": "Norma Desmond"
  },
  {
    "number": 38,
    "movie": "Psycho",
    "year": 1960,
    "quote": "A boy's best friend is his mother.",
    "speaker": "Norman Bates"
  },
  {
    "number": 39,
    "movie": "Apollo 13",
    "year": 1995,
    "quote": "Houston, we have a problem.",
    "speaker": "Jim Lovell"
  },
  {
    "number": 40,
    "movie": "Midnight Cowboy",
    "year": 1969,
    "quote": "I'm walkin' here! I'm walkin' here!",
    "speaker": "\"Ratso\" Rizzo"
  },
  {
    "number": 41,
    "movie": "Casablanca",
    "year": 1942,
    "quote": "Round up the usual suspects.",
    "speaker": "Capt. Louis Renault"
  },
  {
    "number": 42,
    "movie": "The Treasure of the Sierra Madre",
    "year": 1948,
    "quote": "Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinking badges!",
    "speaker": "\"Gold Hat\""
  },
  {
    "number": 43,
    "movie": "A Streetcar Named Desire",
    "year": 1951,
    "quote": "Stella! Hey, Stella!",
    "speaker": "Stanley Kowalski"
  },
  {
    "number": 44,
    "movie": "The Pride of the Yankees",
    "year": 1942,
    "quote": "Today, I consider myself the luckiest man on the face of the earth.",
    "speaker": "Lou Gehrig"
  },
  {
    "number": 45,
    "movie": "Field of Dreams",
    "year": 1989,
    "quote": "If you build it, he will come.",
    "speaker": "Shoeless Joe Jackson"
  },
  {
    "number": 46,
    "movie": "When Harry Met Sally...",
    "year": 1989,
    "quote": "I'll have what she's having.",
    "speaker": "Customer"
  },
  {
    "number": 47,
    "movie": "To Have and Have Not",
    "year": 1944,
    "quote": "You know how to whistle, don't you, Steve? You just put your lips together and blow.",
    "speaker": "Marie \"Slim\" Browning"
  },
  {
    "number": 48,
    "movie": "Grand Hotel",
    "year": 1932,
    "quote": "I want to be alone.",
    "speaker": "Grusinskaya"
  },
  {
    "number": 49,
    "movie": "Bonnie and Clyde",
    "year": 1967,
    "quote": "We rob banks.",
    "speaker": "Clyde Barrow"
  },
  {
    "number": 50,
    "movie": "Frankenstein",
    "year": 1931,
    "quote": "It's alive! It's alive!",
    "speaker": "Henry Frankenstein"
  },
  {
    "number": 51,
    "movie": "Shane",
    "year": 1953,
    "quote": "Shane. Shane. Come back!",
    "speaker": "Joey Starrett"
  },
  {
    "number": 52,
    "movie": "The Wizard of Oz",
    "year": 1939,
    "quote": "I'll get you, my pretty, and your little dog too!",
    "speaker": "Wicked Witch of the West"
  },
  {
    "number": 53,
    "movie": "Casablanca",
    "year": 1942,
    "quote": "We'll always have Paris.",
    "speaker": "Rick Blaine"
  },
  {
    "number": 54,
    "movie": "The Graduate",
    "year": 1967,
    "quote": "Plastics.",
    "speaker": "Mr. Maguire"
  },
  {
    "number": 55,
    "movie": "Some Like It Hot",
    "year": 1959,
    "quote": "Well, nobody's perfect.",
    "speaker": "Osgood Fielding III"
  },
  {
    "number": 56,
    "movie": "Now, Voyager",
    "year": 1942,
    "quote": "Oh, Jerry, don't let's ask for the moon. We have the stars.",
    "speaker": "Charlotte Vale"
  },
  {
    "number": 57,
    "movie": "Jerry Maguire",
    "year": 1996,
    "quote": "You had me at 'hello.'",
    "speaker": "Dorothy Boyd"
  },
  {
    "number": 58,
    "movie": "Titanic",
    "year": 1997,
    "quote": "I'll Never Let Go.",
    "speaker": "Rose Dawson"
  },
  {
    "number": 59,
    "movie": "The Godfather Part II",
    "year": 1974,
    "quote": "Keep your friends close, but your enemies closer.",
    "speaker": "Michael Corleone"
  },
  {
    "number": 60,
    "movie": "Wall Street",
    "year": 1987,
    "quote": "Greed, for lack of a better word, is good.",
    "speaker": "Gordon Gekko"
  },
  {
    "number": 61,
    "movie": "Dirty Harry",
    "year": 1971,
    "quote": "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    "speaker": "Harry Callahan"
  },
  {
    "number": 62,
    "movie": "Scarface",
    "year": 1983,
    "quote": "Say 'hello' to my little friend!",
    "speaker": "Tony Montana"
  },
  {
    "number": 63,
    "movie": "Gone with the Wind",
    "year": 1939,
    "quote": "As God is my witness, I'll never be hungry again.",
    "speaker": "Scarlett O'Hara"
  },
  {
    "number": 64,
    "movie": "A Streetcar Named Desire",
    "year": 1951,
    "quote": "I have always depended on the kindness of strangers.",
    "speaker": "Blanche DuBois"
  },
  {
    "number": 65,
    "movie": "Annie Hall",
    "year": 1977,
    "quote": "La-dee-da, la-dee-da.",
    "speaker": "Annie Hall"
  },
  {
    "number": 66,
    "movie": "The Graduate",
    "year": 1967,
    "quote": "Mrs. Robinson, you're trying to seduce me. Aren't you?",
    "speaker": "Benjamin Braddock"
  },
  {
    "number": 67,
    "movie": "Sons of the Desert",
    "year": 1933,
    "quote": "Well, here's another nice mess you've gotten me into!",
    "speaker": "Oliver"
  },
  {
    "number": 68,
    "movie": "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    "year": 1964,
    "quote": "Gentlemen, you can't fight in here! This is the War Room!",
    "speaker": "President Merkin Muffley"
  },
  {
    "number": 69,
    "movie": "Poltergeist",
    "year": 1982,
    "quote": "They're here!",
    "speaker": "Carol Anne Freeling"
  },
  {
    "number": 70,
    "movie": "Animal Crackers",
    "year": 1930,
    "quote": "One morning I shot an elephant in my pajamas. How he got in my pajamas, I don't know.",
    "speaker": "Capt. Geoffrey T. Spaulding"
  },
  {
    "number": 71,
    "movie": "The Adventures of Sherlock Holmes",
    "year": 1939,
    "quote": "Elementary, my dear Watson.",
    "speaker": "Sherlock Holmes"
  },
  {
    "number": 72,
    "movie": "Planet of the Apes",
    "year": 1968,
    "quote": "Get your stinking paws off me, you damned dirty ape.",
    "speaker": "George Taylor"
  },
  {
    "number": 73,
    "movie": "Terminator 2: Judgment Day",
    "year": 1991,
    "quote": "Hasta la vista, baby.",
    "speaker": "The Terminator"
  },
  {
    "number": 74,
    "movie": "The Lord of the Rings: The Two Towers",
    "year": 2002,
    "quote": "My precious.",
    "speaker": "Gollum"
  },
  {
    "number": 75,
    "movie": "2001: A Space Odyssey",
    "year": 1968,
    "quote": "Open the pod bay doors please, HAL.",
    "speaker": "Dave Bowman"
  },
  {
    "number": 76,
    "movie": "King Kong",
    "year": 1933,
    "quote": "Oh, no, it wasn't the airplanes. It was Beauty killed the Beast.",
    "speaker": "Carl Denham"
  },
  {
    "number": 77,
    "movie": "A League of Their Own",
    "year": 1992,
    "quote": "There's no crying in baseball!",
    "speaker": "Jimmy Dugan"
  },
  {
    "number": 78,
    "movie": "National Lampoon's Animal House",
    "year": 1978,
    "quote": "Toga! Toga!",
    "speaker": "John \"Bluto\" Blutarsky"
  },
  {
    "number": 79,
    "movie": "Airplane!",
    "year": 1980,
    "quote": "Striker: \"Surely you can't be serious.\" Rumack: \"I am serious...and don't call me Shirley.\"",
    "speaker": "Ted Striker and Dr. Rumack"
  },
  {
    "number": 80,
    "movie": "Rocky",
    "year": 1976,
    "quote": "Yo, Adrian!",
    "speaker": "Rocky Balboa"
  },
  {
    "number": 81,
    "movie": "Dog Day Afternoon",
    "year": 1975,
    "quote": "Attica! Attica!",
    "speaker": "Sonny Wortzik"
  },
  {
    "number": 82,
    "movie": "Mommie Dearest",
    "year": 1981,
    "quote": "No wire hangers, ever!",
    "speaker": "Joan Crawford"
  },
  {
    "number": 83,
    "movie": "Funny Girl",
    "year": 1968,
    "quote": "Hello, gorgeous.",
    "speaker": "Fanny Brice"
  },
  {
    "number": 84,
    "movie": "Dracula",
    "year": 1931,
    "quote": "Listen to them. Children of the night. What music they make.",
    "speaker": "Count Dracula"
  },
  {
    "number": 85,
    "movie": "42nd Street",
    "year": 1933,
    "quote": "Sawyer, you're going out a youngster, but you've got to come back a star!",
    "speaker": "Julian Marsh"
  },
  {
    "number": 86,
    "movie": "Soylent Green",
    "year": 1973,
    "quote": "Soylent Green is people!",
    "speaker": "Det. Robert Thorn"
  },
  {
    "number": 87,
    "movie": "Goldfinger",
    "year": 1964,
    "quote": "A martini. Shaken, not stirred.",
    "speaker": "James Bond"
  },
  {
    "number": 88,
    "movie": "On Golden Pond",
    "year": 1981,
    "quote": "Listen to me, mister. You're my knight in shining armor. Don't you forget it. You're going to get back on that horse, and I'm going to be right behind you, holding on tight, and away we're gonna go, go, go!",
    "speaker": "Ethel Thayer"
  },
  {
    "number": 89,
    "movie": "Knute Rockne All American",
    "year": 1940,
    "quote": "Tell 'em to go out there with all they got and win just one for the Gipper.",
    "speaker": "Knute Rockne"
  },
  {
    "number": 90,
    "movie": "Marathon Man",
    "year": 1976,
    "quote": "Is it safe?",
    "speaker": "Dr. Christian Szell"
  },
  {
    "number": 91,
    "movie": "The Naughty Nineties",
    "year": 1945,
    "quote": "Who's on first?",
    "speaker": "Dexter"
  },
  {
    "number": 92,
    "movie": "Little Caesar",
    "year": 1931,
    "quote": "Mother of mercy, is this the end of Rico?",
    "speaker": "Cesare Enrico \"Rico\" Bandello"
  },
  {
    "number": 93,
    "movie": "Caddyshack",
    "year": 1980,
    "quote": "Cinderella story. Outta nowhere. A former greenskeeper, now, about to become the Masters champion. It looks like a mirac...It's in the hole! It's in the hole! It's in the hole!",
    "speaker": "Carl Spackler"
  },
  {
    "number": 94,
    "movie": "Auntie Mame",
    "year": 1958,
    "quote": "Life is a banquet, and most poor suckers are starving to death!",
    "speaker": "Mame Dennis"
  },
  {
    "number": 95,
    "movie": "Top Gun",
    "year": 1986,
    "quote": "I feel the need—the need for speed!",
    "speaker": "Lt. Pete \"Maverick\" Mitchell and Lt. Nick \"Goose\" Bradshaw"
  },
  {
    "number": 96,
    "movie": "Dead Poets Society",
    "year": 1989,
    "quote": "Carpe diem. Seize the day, boys. Make your lives extraordinary.",
    "speaker": "John Keating"
  },
  {
    "number": 97,
    "movie": "Moonstruck",
    "year": 1987,
    "quote": "Snap out of it!",
    "speaker": "Loretta Castorini"
  },
  {
    "number": 98,
    "movie": "The Jazz Singer",
    "year": 1927,
    "quote": "Wait a minute, wait a minute. You ain't heard nothin' yet!",
    "speaker": "Jakie Rabinowitz/Jack Robin"
  },
  {
    "number": 99,
    "movie": "Dirty Dancing",
    "year": 1987,
    "quote": "Nobody puts Baby in a corner.",
    "speaker": "Johnny Castle"
  },
  {
    "number": 100,
    "movie": "Yankee Doodle Dandy",
    "year": 1942,
    "quote": "My mother thanks you. My father thanks you. My sister thanks you. And I thank you.",
    "speaker": "George M. Cohan"
  }
];

// Export for ES modules, CommonJS, and browser globals
if (typeof exports !== 'undefined') {
    exports.movieQuotes = movieQuotes;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = movieQuotes;
}
if (typeof window !== 'undefined') {
    window.movieQuotes = window.movieQuotes;
}
export default movieQuotes;
