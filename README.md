# wave-duality.github.io
An implementation of ProSet.

# Overview
ProSet is a card/pattern recognition game popularized at Canada/USA Mathcamp. There is currently no cheap version to buy the physical game online, so hopefully this online implementation can widen its reach.

# Rules
The canonical deck consists of $2^6 - 1 = 63$ cards, corresponding to the distinct, non-empty subsets of $6$ colored dots (red, orange, yellow, green, blue, purple). At any given point, $7$ cards are shown face up, and the player's goal is to find any non-empty subset of these $7$ cards such that **every** color appears an even amount of times in this set (so $0, 2, 4,$ or $6$ times). 

Once a "ProSet" is found, those cards are discarded and replaced with new ones. The goal is to exhaust the deck, and the timer stops once no cards remain in the deck, since the remaining cards are guaranteed to form a "ProSet" (as the sum over the whole deck is the "empty card"). 

# Why Must a "ProSet" Always Exist Among 7 Cards?
One can also think of finding a "ProSet" as trying to create the $0$ vector with addition in $\mathbb{F}_2^6,$ a corollary of which is that every subset of $7$ cards must allow for a solution, since $7$ vectors can not all be linearly independent in a $6$-dimensional space.

# Strategy

# Implementation
This is a simplistic implementation. Cards can be selected/de-selected by mouse OR the {w,e,a,s,d,z,x} keys. The game will only check whether you have a correct "ProSet" upon a key press of "Enter" -- this is to make it harder to simply spam keys and get a valid subset accidentally.


