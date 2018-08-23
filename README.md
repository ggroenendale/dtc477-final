# Thingable - DTC 477 Final Project
This was the final project for Spring 2018 DTC 477 - Advanced Multimedia course with Will Luers. During this project I collaborated with fellow student Erin Cooper to build a webpage that could relate raw materials to what can be created with each raw material. We started with a pallet and found ways that creators and makers have taken a pallet to create something new. Part of this project required creating a usable interface to explore not only the raw materials but to also explore what can be made by the raw material. The other part of this project required a complex data structure behind the scenes to store all of the connections.

We played a lot with different designs to create a usable interface. There are still more iterations that can the project can go through to make it more usable. Currently the design features a list of things that can be created in a hamburger style menu with images and links that can also be revealed.

The data backend was created using a graph database called neo4j. Graph databases enable node to node relationships where node __"a"__ may be a _"pallet"_ and node __"b"__ would be a _"doghouse"_. The relationship between the two would be that pallets can be used to create a doghouse. This could be extended to almost anything on the planet. Old jeans used to make a beanbag chair, milk jugs recycled to make other plastics, or egg yolks made into custard. 

![Graphenedb](https://www.github.com/ggroenendale/thingable/master/graphenedb-pic.png "Text") 
Moar Text
