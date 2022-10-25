# LiveStateDB
A database subscription API that enables developers to make state reflect database changes in real time. Developers will have access to a custom hook, ```useSubscribe()```, to implement in your front-end codebase, and a back-end library which allows the server to interface with your database. Currently, LiveStateDB only supports MongoDB.

These libraries can be installed by running ```npm/yarn install @livestatedb/client @livestatedb/server``` respectively.

## Using the hook useSubscribe( )
First import the module into the file you wish to use it.

```js
import { useSubscribe } from '@livestatedb/client';
```

When useSubscribe is called, it will open a web socket through which database updates get passed when changes occur that state is 'subscribed to'.

useSubscribe takes one argument: an object with three key-value pairs that correspond with the database name, collection name, and query to a database. Here's an example.

```js
const options = {
  database: 'DBname',
  collection: 'someCollectionName',
  query: {}
};
```

useSubscribe returns the way to reference state in your front-end code, and a function that ends that piece of state's subscription to the database.

```js
const [ state, endSubscription ] = useSubscribe(options);
```

## Using the back-end library
useSubscribe won't work until you pass information about your MongoDB and Redis into a function that opens a web socket and connects everything. Require the module in wherever you instantiate an http server, for example server.js. Feel free to give it a label or to to simply invoke the required-in function with the necessary arguments.

```js
const liveStateDB = require('@livestatedb/server');
liveStateDB(httpServer, databaseInfo);
```
OR
```js
require('@livestatedb/server')(httpServer, databaseInfo);
```

The second paramater, databaseInfo, must be an object with two key-value pairs - these are for passing in information about your MongoDB database and Redis, respectively. The values are both objects that contain connection information for each database. See example below.

```js
const databaseInfo = 
  {
    mongoDbOptions: 
      {
        uri: "mongodb+srv://name:12345678910abcde@cluster0.aabbcc.mongodb.net/?retryWrites=true&w=majority"
      },
    redisDbOptions: 
      {
        host: 'redis-00000.c00.us-east-0-0.ec2.cloud.redislabs.com', 
        port: 15711, 
        password: 'lkajsdf092j3jlsdfmop3jfspdkgpoi',
        family: 4
      },
  }
```

That's it! Thanks for your interest in LiveStateDB, and we hope this improves your development experience.

## Contributors
<a href="https://github.com/karcodes1">Kevin Richardson</a> | <a href="https://github.com/vividvoltage">Stephanie Page</a> | <a href="https://github.com/DavidZCheng">David Cheng</a> | <a href="https://github.com/evandeam">Evan Deam</a>

<p>Kevin Richardson <a href="https://www.linkedin.com/in/kevinalexrichardson/">LinkedIn</a> | <a href="https://github.com/karcodes1">GitHub</a></p>
<p>Stephanie Page <a href="https://www.linkedin.com/in/stephanie-page-atx/">LinkedIn</a> | <a href="https://github.com/vividvoltage">GitHub</a></p>
<p>David Cheng <a href="https://www.linkedin.com/in/davidzcheng/">LinkedIn</a> | <a href="https://github.com/DavidZCheng">GitHub</a></p>
<p>Evan Deam <a href="https://www.linkedin.com/in/evandeam/">LinkedIn</a> | <a href="https://github.com/evandeam">GitHub</a></p>

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Red-Lipped-Batfish Scratch Project. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/red-lipped-batfish-scad/scratchProject">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">LiveStateDB</h2>

  <p align="center">
    Automatically update state based on database changes
    <br />
    <a href="https://github.com/red-lipped-batfish-scad/scratchProject">View Demo</a>
    ·
    <a href="https://github.com/red-lipped-batfish-scad/scratchProject/issues">Report Bug</a>
    ·
    <a href="https://github.com/red-lipped-batfish-scad/scratchProject/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About

[![Product Name Screen Shot][product-screenshot]](https://example.com)

LiveStateDB is a database subscription API that enables developers to make state reflect database changes in real time. Developers will have access to a custom hook, ```useSubscribe()```, to implement in your front-end codebase, and a back-end library which allows the server to interface with your database. Currently, LiveStateDB only supports MongoDB.

These libraries can be installed by running ```npm/yarn install @livestatedb/client @livestatedb/server``` respectively.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![PostgreSQL][ElephantSQL]][ElephantSQL-url]
[![MongoDB][MongoDB]][MongoDB-url]
[![Redis][Redis]][Redis-url]
[![Socket.io][Socket.io]][Socket.io-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

## Using the hook useSubscribe( )
First import the module into the file you wish to use it.

```js
import { useSubscribe } from '@livestatedb/client';
```

When useSubscribe is called, it will open a web socket through which database updates get passed when changes occur that state is 'subscribed to'.

useSubscribe takes one argument: an object with three key-value pairs that correspond with the database name, collection name, and query to a database. Here's an example.

```js
const options = {
  database: 'DBname',
  collection: 'someCollectionName',
  query: {}
};
```

useSubscribe returns the way to reference state in your front-end code, and a function that ends that piece of state's subscription to the database.

```js
const [ state, endSubscription ] = useSubscribe(options);
```

## Using the back-end library
useSubscribe won't work until you pass information about your MongoDB and Redis into a function that opens a web socket and connects everything. Require the module in wherever you instantiate an http server, for example server.js. Feel free to give it a label or to to simply invoke the required-in function with the necessary arguments.

```js
const liveStateDB = require('@livestatedb/server');
liveStateDB(httpServer, databaseInfo);
```
OR
```js
require('@livestatedb/server')(httpServer, databaseInfo);
```

The second paramater, databaseInfo, must be an object with two key-value pairs - these are for passing in information about your MongoDB database and Redis, respectively. The values are both objects that contain connection information for each database. See example below.

```js
const databaseInfo = 
  {
    mongoDbOptions: 
      {
        uri: "mongodb+srv://name:12345678910abcde@cluster0.aabbcc.mongodb.net/?retryWrites=true&w=majority"
      },
    redisDbOptions: 
      {
        host: 'redis-00000.c00.us-east-0-0.ec2.cloud.redislabs.com', 
        port: 15711, 
        password: 'lkajsdf092j3jlsdfmop3jfspdkgpoi',
        family: 4
      },
  }
```

That's it! Thanks for your interest in LiveStateDB, and we hope this improves your development experience.

### Starting Notes
- Main branch is only for production
- Dev branch is for development. Two person review process for pull requests to the dev and main branch.

### Starting off
- [ ] 1. Clone main repository to local machine
- [ ] 2. git checkout -b [name/feature] -> Create feature branch off main or dev
- [ ] 3. Commit to your local feature branch often!

### Pushing changes to the main repo
- [ ] 1. 'Git checkout dev' (locally switch to dev branch)
- [ ] 2. 'Git pull origin dev' (Pull updates of dev down to your local system)
- [ ] 3. 'Git checkout [your branch] (switch back to your branch locally)
- [ ] 4. 'Git merge dev' (Brings dev into your local branch)
- [ ] 5. Resolve conflicts or :q if there aren't any
- [ ] 6. 'Git push origin <your branch>' (Push merged branch up to github)
- [ ] 7. Create a pull request in github from <your branch> ==> dev
- [ ] 8. Repeat as needed
- [ ] 9. When ready to publish main, do step 7 but from dev => main
  ```
  git checkout dev
  git pull origin dev
  git checkout <name/feature>
  git merge dev
  // Resolve Merge conflicts
  git push origin <name/feature>
  ```

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install 
<!--   ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ``` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>
 -->


<!-- ROADMAP -->
## Roadmap
<!-- 
- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish -->

See the [open issues](https://github.com/red-lipped-batfish-scad/scratchProject/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

<p>Kevin Richardson <a href="https://www.linkedin.com/in/kevinalexrichardson/">LinkedIn</a> | <a href="https://github.com/karcodes1">GitHub</a></p>
<p>Stephanie Page <a href="https://www.linkedin.com/in/stephanie-page-atx/">LinkedIn</a> | <a href="https://github.com/vividvoltage">GitHub</a></p>
<p>David Cheng <a href="https://www.linkedin.com/in/davidzcheng/">LinkedIn</a> | <a href="https://github.com/DavidZCheng">GitHub</a></p>
<p>Evan Deam <a href="https://www.linkedin.com/in/evandeam/">LinkedIn</a> | <a href="https://github.com/evandeam">GitHub</a></p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/red-lipped-batfish-scad/scratchProject.svg?style=for-the-badge
[contributors-url]: https://github.com/red-lipped-batfish-scad/scratchProject/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/red-lipped-batfish-scad/scratchProject.svg?style=for-the-badge
[forks-url]: https://github.com/red-lipped-batfish-scad/scratchProject/network/members
[stars-shield]: https://img.shields.io/github/stars/red-lipped-batfish-scad/scratchProject.svg?style=for-the-badge
[stars-url]: https://github.com/red-lipped-batfish-scad/scratchProject/stargazers
[issues-shield]: https://img.shields.io/github/issues/red-lipped-batfish-scad/scratchProject.svg?style=for-the-badge
[issues-url]: https://github.com/red-lipped-batfish-scad/scratchProject/issues
[license-shield]: https://img.shields.io/github/license/red-lipped-batfish-scad/scratchProject.svg?style=for-the-badge
[license-url]: https://github.com/red-lipped-batfish-scad/scratchProject/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/christian-looff/

[product-screenshot]: images/screeenshot2.png

<!-- Library oof badges -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[ReactRouter]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[ElephantSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[ElephantSQL-url]: https://www.elephantsql.com/
[Webpack]: https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black
[Webpack-url]: https://webpack.js.org/plugins/html-webpack-plugin/
[Redis]: https://img.shields.io/badge/-Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
[Socket.io]: https://img.shields.io/badge/-Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white
[Socket.io-url]: https://socket.io/