# A3 - A JavaScript Game

In this assignment, you'll create an event-driven graphical user interface for a
JavaScript poker game that runs in a browser. In order to do so, you'll first need to understand the basics
of the gameplay and the the event model associated with the game engine that we provide to you.

## Texas Hold'Em

Texas Hold'Em is a form of poker, a card game played with a standard 52-card deck. A poker "match" begins with
a set number of players (at least 2, usually no more than 10) that are seated around a table with each player
given a starting number of chips. The match is then played in "rounds" with each
round comprising of a sequence of "turns". Note that this terminology of "match", "rounds" and "turns" is not standard but is
something that we came up with in order to be able to describe the game play and to use with respect to our game engine. 

At the beginning of each round, one of the players is understood to be the "dealer". The role of dealer simply rotates clockwise amongst the players left in the match. The player to the left of the dealer is known as the "small blind" and is required to put in a specific number of chips into the "pot". The pot is the collection of chips that have been bet in the current round and will be won by a particular player at the end of the round. The next player to the left of the small blind is known as the "big blind" as is required to put in twice as many chips as the small blind into the pot. Each player is given two cards. The round is then played in turns as follows.

During a turn, players are given a chance to take one of several available actions related to the current bet for the turn. Typically these actions include: folding, checking, calling, or raising. Folding means the player is abandoning their hand and any chips they have already put into the pot for this round. A player that folds can not win the round. Checking is only allowed when the current bet for the turn is zero chips and means that the player wishes to remain in the hand and is choosing not to increase the current bet beyond zero. Calling means that the player will put in however many additional chips are necessary to match the current bet. Raising means that the player will put in as many chips as necessary to match the current bet as well as additional chips to raise the current bet to a new value. Each player in clockwise order is given a chance to take one of these actions until the following conditions apply:
  * All but one player folds.
    * In this case, the remaining player wins any chips in the pot and the round is over.
  * Any player that has not folded has called the current bet amount.
    * In other words, every player after the last player to raise has either called or folded with no additional raises.
    * At the end of a turn, one or more "community" cards are turned over in the middle of the table. These cards can be
      be used by any of the players (see below).
      
Each round has at most four turns. Each of these turns has a specific name. The first "turn" is known as the "preflop" turn. 
The first remaining player to the left of the big blind begins the preflop action with the current bet set to the big blind amount. After the preflop turn is over, if two or more players remain in the round, three community cards are flipped over and the next turn, called the "flop" turn begins. The first remaining player to the left of the dealer begins the flop turn with the current bet set to zero. Once the flop turn is over, if two or more players are still in the round, one additional community card is flipped over and the next turn known as the "turn" turn begins (this naming is unfortunate, I know, but we'll have to live with it). Again, the first remaining player to the left of the dealer begins the turn turn with the current bet set to zero. After the turn turn is over, if two or more players are still in the round, a final community card is flipped over and the "river" turn begins. Again, the first remaining player to the left of the dealer is the first to act. If at the end of the river turn, two or more players remain in the round, the player that can form the best five card poker hand using the two cards in their hand along with the five community cards is named the winner and wins any chips in the pot.

If at some point during any turn a player ends up with all of their chips in the pot, that player is known as being "all-in". This can happen if a player calls a current bet which requires more than the number of chips that they have or if they raise the current bet to an amount that requires all of the chips that they have. A player that is all-in will no longer be allowed to take any further action, but will remain in the hand until the end of the round and could possibly win chips if they end up with the best poker hand. A player that loses all of their chips at the end of a round is out of the match. Play continues in rounds until one player has all of the chips. The small and big blinds increase steadily after a configurable number of rounds, generally ensuring that the match will eventually end.

## Shortcomings of our game engine

There are a number of edge cases that our poker engine does not correctly handle, but since the point of this assignment isn't to actually play poker, we are simply not going to worry about it. For example, an all-in player is not supposed to win any chips above and beyond those that they were able to match while betting, but our game engine is not sophisticated enough to handle this case (known as a "side pot") and so it is possible for an all-in player to win more than they technically deserve. Similarly, if two or more players have identical poker hands at the end of a round, the pot should be split between them (known as a "chopped pot"), but out game engine will simply award one of the players the entire pot.

## Writing the Game

Your version of hold'em poker should be implemented as a single HTML file called "poker.html" in a directory called a3 in your course web space. You should include via <script> elements the following JavaScript files in this order:
  * [jquery-3.3.1.js](http://www.cs.unc.edu/~kmp/comp426fall18/jquery-3.3.1.js)
    * This just loads jQuery which is required by the poker engine and which you might find generally useful to use yourself.
  * [pokerEngine.js](http://www.cs.unc.edu/~kmp/comp426fall18/pokerEngine.js)
    * This is the poker game engine. This file contains code for both the poker match as well as a "dumb" AI player that will simply
      take a random action.
  * Your code in a file called "poker.js"
    * Put all of your code into a single JavaScript file called "poker.js" in your a3 directory.
  
Your interface should first provide a way for the user to indicate the total number of other opponents, a starting balance of chips per player (at least 100), and the name of the user's player. Using these values, you should create an AI player object for each opponent generating a unique name (for exampe, "AI1", "AI2", etc.) as an instance of the DumbAI class defined in pokerEngine.js. You should also create an instance of your own player object. This is something that you need to write. 


# Javascript Poker engine

### Custom Settings
##### startingBudget
* The amount of money each player starts with (default 100)
##### smallBlind 
* The amount of the small blind for each turn (default 2)
Note: Minimum bet for each round will be 2 * small blind
##### blindIncreaseFrequency
* The amount of rounds before the blinds double (default 3)

### Public Round Functions/Objects
##### Pot
* Player_id is key for all money that player has put in for current round

### Public Match Functions/Objects
##### getPlayerActiveStatus -> player_id
* returns true or false if a player is still in the match
##### getPlayerBudget -> player_id
* returns budget of player
##### players
* list of all players regardless of being active or not

### Events
##### ROUND_STARTED_EVENT
* getDealer \
Returns the player object of the dealer
* getHand -> player_id \
Returns the 2 card hand of the player with player_id
* getSmallBlind \
Returns the small blind amount
* getBigBlind \
Returns the big blind amount
* getBigBlindPlayer \
Returns the player object of the big blind
* getSmallBlindPlayer \
Returns the player object of the small blind
##### ROUND_ENDED_EVENT
* getWinner \
Returns the player object of the round winner
* getWinnings \
Returns the amount of money the player won
* getType \
Returns the way the player won the round
##### TURN_STARTED_EVENT
* getTurnState \
Returns the  name of the turn (i.e. preflop, flop, turn, river)
* getFlippedCards \
Returns the cards that have been flipped for each turn \
Note: No cards are flipped during preflop 
##### TURN_ENDED_EVENT
##### BET_STARTED_EVENT
* getBetter \
Returns the player who needs to bet
* getValidActions \
Returns a list of valid bet functions the player can use
##### BET_ENDED_EVENT
* getPreviousBetter \
Returns the player who just betted
* getBetType \
Returns the type of bet action the player did
* getBetAmount \
Returns the amount of money the player just bet (if any)
##### GAME_OVER_EVENT
* getWinner \
Returns the player object of the winner of the whole match
##### ERROR
* getError \
Returns error message

### Bet Actions
##### Raise -> bet_amount
* Raises the current max bet by bet_amount
##### Fold
* Eliminates player from round
##### Call
* Matches the current max bet
##### Check
* Player currently has the same amount as max bet, can opt to not add more money



