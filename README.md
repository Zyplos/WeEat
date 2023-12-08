# WeEat

This project was created for the University of Illinois Chicago's CS 422: User Interface Design and Programming class.

WeEat is a web application that allows people to find places to eat based on their food preferences, time, and budget. If you're ever in a hurry or want to explore new places to eat at, this is the app for you!

Built using React, Typescript, and Lit.

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/Zyplos/WeEat.git
cd WeEat
npm install
```

You will need a Google Maps API key to run this project. You can get one by creating a new project in the Google Cloud console and enabling the Google Maps API for that project. Once you have your API key, add it to the approriate spot in `index.html` by replacing the existing API key there with your API key.

Now you can run the project by starting the development server:

```bash
npm run dev
```

Open the website in your browser. You should see the Welcome page. This project uses Vite, so edit `src/Setup/SetupIndex.tsx` and you should see your changes reflected in the browser.

## Project Structure

This project uses React Router v6 for routing. All the pages are located in `src/pages` and the routes for it are defined in `src/App.tsx`.

Components are located in `src/components` and are isolated by directory. Each directory contains its own styling sheets.

The `src/pages/Map` part of this project is built using Lit.

## Next Steps

The core of this web app is centered around finding places to eat based on some set of factors. This part is done and working, however it could use some polish.

Mainly, what is left to be implemented is the ability to join a group of friends and have everyone's preferences aggregated into one list where everyone can vote on where to eat. The UI for this has been implemented, but fully implementing this would require a backend.
