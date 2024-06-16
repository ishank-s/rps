# Rock Paper Scissors

Fellow gambler, here is some interesting calculations I made,
Since game of RPS iteself is random but the you can gain edge by using probablity.
To determine the probability that a player wins more than they lose when betting 100 times, we need to consider the distribution of wins and losses for each type of bet (single or double). Since the outcomes of each bet are independent, we can use the binomial distribution to model the number of wins out of 100 bets.

### Single Bet Scenario

For a single bet:

- Probability of winning a single bet p = 1/3
- Probability of losing a single bet p = 2/3


### Double Bet Scenario

For a double bet:

- Probability of winning a single bet p = 2/3
- Probability of losing a single bet p = 1/3

### Calculating the Probabilities
using binomial culmilative distribution
### Single Bet Scenario

- The probability that the player wins more than they lose in 100 single bets is approximately 0.0002

### Double Bet Scenario

- The probability that the player wins more than they lose in 100 double bets is approximately 0.9996
