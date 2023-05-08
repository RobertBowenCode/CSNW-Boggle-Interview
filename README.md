# CSNW-Boggle-Interview
Boggle Game for 2nd Interview W/ CSNW. 


## Brainstorming (5/6/2023)


-Okay so we want to implement a version of Boggle in Javascript. 

-I think I want to use the tool React to do the UI

UI Requirements. 
-The UI will need a place to put in the 4x4 matrix. So sometype of table. 
-Then we will need a text box to input words. 
-Then we will need the system to read in the table into a 4x4 vector
-and read in the words into an array of strings. 


-we will then have a button to Play Boggle. 
->this button will call an algo that will find each word or not in the 4x4 vector 
-then we will need to write an algorithm that finds each word

-add each word found to a found list
-add each word not found to a not found list
-display lists. 

-record results and put it in a history tab. 

-for the algorithm. I think this could be done using a recursive algorithm. So we search the 2d array for the first letter. 
-going to have a 2d vector for the letters. 
-going to have a 2d vector for coloring 


- for each row , col we visit -> if it contains the letter we want, color it. Then sent the remaining of the word the surrounding 
nodes. 

-base case 
-if the remaining letters is empty, thus we've found all of the letters. then put the word into a list vector
-then if colored. We've already been here so return . 
-then when we bubble up, uncolor the node. 


## Brainstorming (5/7/2023)

Goals for today: 

-Create a basic React front end, get recursive algo implemented. 

Thoughts: 


-If we have more time on Monday Lets create a server with Node.js and Express so we can save and load the results of our games. 



## End Of Day Thoughts  (5/7/2023)

I created the frontend and implemented the algorithm. 
For Monday I need to first finish up the part where is will reset the game properly when we want to play a new game and show everything correctly
Then once I've gotten this part done if I have free time I can create a server with Node and Express to be able and save previous games progress
through posting and getting. Shouldn't be too hard. 