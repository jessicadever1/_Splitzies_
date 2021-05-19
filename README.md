# Splitzies

Splitzies was created for those of us who like to do things with friends that cost
money! More specifically, it will calculate how much you owe, and who you owe it to
for any event or trip that you take with friends, where you have shared costs. 
Splitzies calucates the total cost for the Splitz, ie. the trip or event, how much
the logged in user owes in total, as well as how much they owe to each person who
participated.

## Table of Contents
* [Project Requirements and Features List](#project-requirements-and-features-list)
* [Technologies Used](#technologies-used)
* [Installing and Launching Splitzies](#instructions-for-installing-splitzies)
* [Appendix 1: Planning Documentation](#appendix-1-planning-documentation)
    * [Entity Relationship Diagrams](#entity-relationship-diagram)
    * [Wireframes](#wireframes)
 * [Appendix 2: Set Up Instructions](#appendix-2-set-up-instructions)
 
## Project Requirements and Features List

### Capstone Proposal 

<a href="https://docs.google.com/document/d/1xNc_EPJXexNj9wtw2TNjatTmBaHJCRshGoSl21IoWag/edit">Proposal</a>

### Two Types of Users

Users are offered two registration options. If they are not a farmer, they
register with just their name, username, email, profile picture and zip code.
As a farmer, they also are required to fill out information on their farm,
including the address, website (if applicable), and their farm's name.
###### Click picture to watch features

<a href=""><img src="SplitziesLogin.PNG" alt="login" width="50%"></img></a>

### Get Started
When a user registers an account, or logs in from a previously registered
account, they are shown a list of all of the farms in the Middle TN area
that have opted into Find A Farmer. The are given the option to find a farm
in their preferred county, and then shown a list of only farms in that area.
They can then choose an individual farm to learn more about.

<a href="https://youtu.be/5kBMo1OtAyE"><img src="FarmList.png" alt="Farm List Screen Shot" width="50%"></img></a>

### Farm Details
When the user has selected a farm, they are shown the farm's address, the
instructions provided for dropping off their food waste, a list of items 
they are welcome to include, and a list of items they are asked to exclude.
They are given reviews for that farm, listed from most recent to least 
recent, and the option to add their own review. Last, they are also given 
the option to go back to the list of all of the farms.

<a href="https://youtu.be/zyerSAX9VIQ"><img src="FarmDeails.png" alt="Farm Details Screen Shot" width="100%"></img></a>

### Farm Review
When the user has clicked on the 'Add Review' button (on either the farm
details page, or from the list of farms), they are taken to a form that
allows them to write their own review. The title of the review includes
the name of the farm, so they can confirm they're reviewing the correct
farm. They are asked to give their review a title, the date they visited,
and the review itself. Once they submit their review, they are redirected
to the details page of the farm they have just reviewed.

<a href="https://youtu.be/wHq62cJCvT0"><img src="AddReview.png" alt="Farm Review Screen Shot" width="100%"></img></a>

### Edit and Delete Review
Users are given the option to edit or delete the reviews that they have
written.

<a href="https://youtu.be/PRfWl9qae9Q"><img src="EditDeleteReview.png" alt="Farm Edit/Delete Review Screen Shot" width="100%"></img></a>

## Technologies Used

### Development Languages and Libraries
<img src="https://miro.medium.com/max/1000/1*Yafu7ihc1LFuP4azerAa4w.png" alt="react logo" width="200"/><img src="https://www.logolynx.com/images/logolynx/ee/ee6197d1b17644329226e0587dce4a9c.png" alt="CSS Logo" width="200"/><img src="http://res.cloudinary.com/cloudinary/image/upload/new_cloudinary_logo_square.png" alt="Cloudinary Logo"  width="200"/>

<img src="https://www.generalcatalyst.com/wp-content/uploads/2019/05/canva-logo-1.jpg" alt="Canva Logo"  width="200"/><img src="https://i0.wp.com/publicmediastack.com/wp-content/uploads/2020/04/FIGMA.png?fit=1200%2C675&ssl=1" alt="Figma Logo"  width="200"/><img src="https://www.evernote.design/assets/images/coolors.jpg" alt="Coolers Logo"  width="200"/>


### Development Tools

 <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo"  width="200"/> <img src="https://secrethub.io/img/vs-code.svg" alt="VS Code Logo" width="200" /> 
 
 <img src="http://blog.dbdiagram.io/content/images/2020/04/dbdiagram_logo_text_720.png" alt="dbDiagram Logo"  width="200"/> <img src="https://mms.businesswire.com/media/20190619005152/en/728506/23/pm-logo-vert%402x-100.jpg" alt="Postman Logo" width="200" />


## Instructions for Installing Find A Farmer
To launch the Simplified Supper app, you will need to have access to 
command line tools, node package manager, JSON Server. If you do not 
have access to any of these tools, you can find instructions for 
installing them in the Appendix.

Clone this repo on you personal machine using the following command
```sh
  git clone git@github.com:jessicadever1/findAFarmer.git
 ```
  
Install the NPM dependencies for this project using the following commands
```sh
  cd find-a-farmer
  npm install
 ```
 
From your terminal window, type
```sh
  npm start
```

Now that the server is up and running, you can open an internet browser 
and access the application
```sh
  http://localhost:8014/
```
### Congratulations you are now experiencing Find A Farmer!


## Appendix 1: Planning Documentation

  ### Entity Relationship Diagram
  ![Find A Farmer ERD](/src/components/images/FindAFarmer_ERD.png)

  ### Wireframes
  <img src="./src/components/images/MVP WireFrame.png" width="90%"></img> 
  
  <img src="./src/components/images/StretchGoalWireFrame.png" width="50%"></img>
  

## Appendix 2: Set Up Instructions

  You will need to have command line tools installed for your computer 
  to use terminal commands.

  Linux/ Windows users, please visit the [Git page](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and follow the instructions for set up

  Mac users follow the instructions below

  Open your terminal and type
  ```sh
    git --version
  ```

  You will now need to configure your git account. In the terminal window, type:
  ```sh
    git config -global user.name "Your Name"
    git config -global user.email "Your Email"
  ```

  If you do not have Node.js installed on your machine, visit the [Node.js Download Page](https://nodejs.org/en/download/) and  follow the instructions. To ensure that it is installed correctly, in your terminal window, type
  ```sh
    echo $PATH
  ```
  Ensure that the result has the following in the $PATH
  ```sh
    /usr/local/bin
    or
    /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
  ```

  Now you can follow the [installation instructions](#instructions-for-installing-Find-A-Farmer) 
  to get Find A Farmer up and running on your machine.

