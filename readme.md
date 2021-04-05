# some-pathfinding


This repository shows some pathfinding examples in javascript.

It randomly genereates a grid, some 'agents' in the form of circles, and a some obstacles to try and move around on each refresh of the page.
It makes use of dijkstras algorithm to generate a path for the agents to follow around the obstacles and to the end point. The A* algorithm would probably have been better but this was my first attempt.


## How to use

git clone the repository, navigate to the folder on your file explorer (Finder on Mac) and then open `index.html` by double clicking it. (should work for every OS)


## The three HTML files

There is `index.html` which simply has all the units going to a point.

There is `index-old.html` (not sure why it's called old) that shows some debugging information, like the distance of each square from the goal square and the direction you have to go in to get to the goal square.

There is `changing path and making new units.html` which describes itself pretty well. I tried to add two new features, they are:  
1. Changing the path. You can right click on a square to make that the new end goal of the moving circles, they will reroute to that path
2. Making new units. In this case the circles are called "units". You can click on one of the coloured rectanges and if you press `f` on your keyboard a new circle will spawn.

Open each file correspondingly in your browser to give them a try.
