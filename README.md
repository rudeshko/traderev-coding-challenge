# Dima Rudeshko - TradeRev coding challenge

This project showcases an interaction with Unsplash API to provide an image gallery by using VueJS components.
It is paginated and responsive. This application works best on all modern browsers.

## Installation on Mac

Install *NodeJS* and *NPM* at this [Download link](https://nodejs.org/en/download/)

**Alternatively using the Terminal**

Install *Homebrew*
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Install *NodeJS* and *NPM*
```bash
brew install node
```

You may also update your *NPM* to the latest version (It is not always the latest with *NodeJS* bundle)
```bash
npm install npm@latest -g
```

Make sure *NodeJS* and *NPM* are installed by checking the versions
```bash
node -v && npm -v
```

## Installation on Windows

Install *NodeJS* and *NPM* at this [Download link](https://nodejs.org/en/download/)

Make sure *NodeJS* and *NPM* are installed by running this in your Terminal
```bash
node -v && npm -v
```

## How To Run

Clone this repo to your local machine

```bash
git clone https://bitbucket.org/rudeshko/traderev-gallery.git
```

Navigate into the newly created folder
```bash
cd ./traderev-gallery
```

Install all of the dependancies required by the application
```bash
npm install
```

Run the dev server command, which will compile the components using webpack preferences, and automatically open the link to the local server in your default browser
```bash
npm run dev
```

Alternatively you may also build the application using production settings
```bash
npm run build
```

And run the build with a simple web server from *NodeJS*
```bash
npm start
```

You can access the application from one of the URLs provided by the command above:
e.g. `http://127.0.0.1:8080`