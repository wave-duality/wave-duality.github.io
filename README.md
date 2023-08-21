# wave-duality.github.io
An implementation of ProSet.

# Overview
ProSet is a card/pattern recognition game popularized at Canada/USA Mathcamp. The canonical deck consists of $2^6 - 1 = 63$ cards, corresponding to the distinct, non-empty subsets of $6$ colored dots (red, orange, yellow, green, blue, purple). At any given point, $7$ cards are shown face up, and the player's goal is to find any (non-empty) subset of these $7$ cards such that **every** color appears an even amount of times in this set (so $0, 2, 4,$ or $6$ times). One can also think of this as trying to create the $0$ vector with addition in $\mathbb{F}_2^6,$ a corollary of which is that every subset of $7$ cards must allow for a solution, or a "ProSet", since $7$ vectors can not all be linearly independent in a $6$-dimensional space.

Once a "ProSet" is found, those cards are discarded and replaced with new ones. The goal is to exhaust the deck, and it has been commonly accepted to stop the timer once no cards remain in the deck, since the remaining cards are guaranteed to form a "ProSet" (as the global sum over the whole deck is the $0$ vector). 

# Implementation
This is a very rough implementation that may only work on certain display sizes. The large number on the right indicates the number of cards remaining in the deck, and the small number(s) on the left indicate the timer. Once the player hits "Start", the timer automatically begins, and $7$ cards will automatically be dealt. Use the $\{w,e,a,s,d,z,x\}$ keys to select and de-select cards, which correspond to the cards in the same shape as the letters are arranged on the QWERTY keyboard. Once you believe you have selected a set of cards consisting of a "ProSet", use the Enter key to check -- if you were correct, the cards will disappear and be replaced with new ones (you will also see the cards remaining number go down), and if not, nothing will happen. The Enter key is in place since auto-checking is considered to be cheating by some.

Let me know what times you can achieve! At 2023 Mathcamp, we got a collaborative record of 1:19 -- but this was with a physical deck, so we needed to manually deal and move cards.
