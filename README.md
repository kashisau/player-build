# Player build assignment
This coding exercise is designed to test various front-end approaches to web-application building, canvassing git workflow, to use of HTML5 technology, implementations of responsive CSS and an advanced understanding of JavaScript concepts.

## Objectives
This is a concrete implementation of the media control design supplied as part of a coding test. This solution will demonstrate the following skills in my repertoire:

* Semantic HTML5 document construction
  * Structuring documents with an adherence to [flow](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Flow_content)
  * Observing [good accessibility practices](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
  * ARIA markup for notable document elements
* CSS:
  * Implementing Block-Element-Modifier consistency
  * Leveraging the inheritance features of CSS to maximise code reuse
* JavaScript:
  * An understanding of JavaScript's event loop model
  * An understanding of JavaScript contexts and their implications for variable scoping
  * An understanding ES6 concepts such as:
    * module `import`-ing
    * `class` and class extension
    * Array and Object destructuring (`{ a, b, ...z }`)
    * Asynchronous expressions using the `await` statement
    * Array transformations (`map`, `reduce`, etc.)
* React
  * Logical componentisation of self-contained elements
  * Property distribution through component composition

## Downloading and building this project
This build observes an [MIT License (below)](#mit-license), so you may download it to your local machine and build, run, modify and extend it at your leisure.

### Prerequisites
This web application has been tested on the following environment:
* Mac OS 11.1.3
* Node.js 10.0.0
* NPM 5.1
* git

If you have trouble executing any of the development and/or build tasks, please check to see if there is an incompatibility between your version of Node.js/NPM.

### Downloading the repo
#### 1. Find the remote git URI on github.com
From the [Player build homepage on github.com](https://github.com/kashisau/player-build), find the "Clone or download" dropdown, and click the "Use HTTPS" toggle. From this modal you may copy the HTTPS URL from the textbox below (pictured).

#### 2. clone the project using your favourite console emulator
This guide will assume the use of MacOS's Terminal app, however these steps should be applicable for Windows and Linux environments as well.
Navigate to a directory on your local disk where you'd like to download the project to, and run the following command:
```
$ git clone https://github.om/kashisau/player-build.git
```
This will create a new directory called `player-build`, placing the minimal custom files that are necessary to set-up this application. To change your working directory to the `player-build` directory, run the following command after the `git clone https://...` command completes:
```
$ cd player-build
```

### Installing dependencies
From within the `player-build` directory (see above for [download instructions](#downloading-the-repo)), run the Node Package Manager's install command:
```
$ npm install
```
This project has been boostrapped by Facebook's [`create-react-app`](https://github.com/facebook/create-react-app), and all of the development techniques described in the [`create-react-app` documentation](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) apply to this project as well.

## Running this project
Once the application and all of its dependencies have been downloaded and set up, you may run this project as a standalone web application, being served by a separate Node package named `serve`.

The development tooling we require for serving the player build is documented in the [Deployment section of the `create-react-app` documentation](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment):

> `npm run build` creates a build directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.
```
npm install -g serve
serve -s build
```
> The last command shown above will serve your static site on the port *5000*. Like many of serve’s internal settings, the port can be adjusted using the `-p` or `--port` flags.

## License
MIT License

Copyright (c) 2018 Kashi Samaraweera

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.