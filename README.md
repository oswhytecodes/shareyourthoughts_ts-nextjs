## Share Your Thoughts

A full stack web application using NEXTJS and MYSQL. A messaging app that allows for user sign up. Each user is giving a page to add and save messages. Built with JavaScript, React, React hooks, SWR, and CSS.


# Features
CRUD - Create, Read, Update and Delete Messages
Profile - Users can sign in and out to their own "page"
# Core Dependencies
React - Javascript Library
NextJS - FullStack Framework
Next Auth - User Authentication 
Prisma - Node.JS and Typescript ORM
MySQL - Database
SWR - 

## Project Status

#### JANUARY

Jan 4 - prisma and next auth are connected, User data is being sent to the db
Jan 30 - Using session object and router to redirect users that haven't signed up
#### DECEMBER

Dec 24 - REworked the site's UI with Tailwind
- Installed Next Auth, Prisma
---------------------------------------------------------

Dec 15 - Restarted the project to include typescript and tailwind.
UseContext for the site's dark mode
#### NOVEMBER

Nov 23 - Filter through messages using a search input field
Nov 21 - Created a edit and delete feature for both the UI and in the database
Nov 14 - Dynamic routes for each user
Nov 10 - Connected the NextJS app with MySQL database. Formik library linked to database

## Project Screen Shot(s)

<img src="./public/screenshots/ui1.png">
<img src="./public/screenshots/ui_edit.png">
<img src="./public/screenshots/ui_delete.png">
<img src="./public/screenshots/ui_errors.png">
<img src="./public/screenshots/ui_search.png">

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Start Server:

`npm run dev`

To Visit App:

`localhost:3000`

## Reflection

- What was the context for this project?
  - To learn and practice developing a fullstack application in NextJs.

- What did you set out to build?
  - A full stack CRUD application,

- Why was this project challenging and therefore a really good learning experience?
  - As a developer, it's important to understand how an entire web application flows.

- What were some unexpected obstacles?
  - Immediately redirecting users to the profile page if they do not have a username
  - The favorites feature and persisting the data in localstorage

- What tools did you use to implement this project?
  - NEXTJS, React, SWR, Next Auth, Prisma, MySQL, Sql, Git, Github, VS Code
