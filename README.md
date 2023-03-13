<!-- REACTREE README -->
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/oslabs-beta/ReacTree">
    <img src="https://raw.githubusercontent.com/oslabs-beta/ReacTree/dev/src/media/icon.png" alt="Logo" height="250">
  </a>
  <h1 align="center"><b>ReacTree</b></h1>
</p>

  <h2 align="center">
    A VS Code extension with a dynamic and interactive hierarchy visualizer for React applications.
    <br />
    <br />
  </h2>

<!-- BADGES -->
<div align="center">      
  <!-- VSCode Installs -->
    <b><u><span><a href="https://marketplace.visualstudio.com/items?itemName=ReacTreeDev.reactree">
    Install ReacTree</a>
    </span></u></b>
    <p><img src="https://img.shields.io/visual-studio-marketplace/v/reactreedev.reactree"></p>
</div>

<hr>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#functionality">Functionality</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#articles">Articles</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#meet-our-team">Meet our Team</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<hr>
<br/>

## <b>Overview</b>

<p align="left">
  ReacTree is a VS Code extension which visualizes the component hierarchy within a React application, enabling developers to quickly identify the relationships between components. The extension generates a hierarchy tree of React components, displaying the parent-child relationships and how data is passed between components.
</p>
<br/>
<p align="center">
  <img  src="https://raw.githubusercontent.com/oslabs-beta/ReacTree/fabian/readme/src/media/navbar-controls.gif" width=90% >
</p>

## <b>Installation</b>

The ReacTree extension can be easily installed via the <a href='https://marketplace.visualstudio.com/items?itemName=ReacTreeDev.reactree'>VS Code Marketplace</a>. Bring up the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of VS Code or by using the View: Extensions command (Ctrl+Shift+X). Type ‘reactree’ in the search box and select the Install button. VS Code will download and install the extension from the Marketplace.
<br/>

<p align="center">
<br/>
<img src="https://raw.githubusercontent.com/oslabs-beta/ReacTree/dev/src/media/Install_ReacTree.png" width=90% />
<br/>
</p>
<br/>

## <b>Getting Started</b>

After installing the ReacTree extension in your VSCode, a ‘Start Tree’ item will be added to the Status Bar of your VS Code (bottom right). The extension can be launched by clicking on the Start Tree item on the Status Bar or by using the Command Palette (Ctrl+Shift+P) and selecting ReactTree: Show Panel.
<br/>

<p align="center">
<br/>
<img src="https://raw.githubusercontent.com/oslabs-beta/ReacTree/fabian/readme/src/media/status_bar_icon.png" width=90% />
<br/>
</p>
<br/>

## <b>Functionality</b>

- After launching the extension, click on the Select File button and select the file you want to serve as the root. The extension generates a hierarchy tree of React components, displaying the parent-child relationships and the data passed between components.
- Toggle the tree's nodes to view the component's props. Easily access the component files by clicking the file button, which will direct you to the corresponding file.
<p align="center">
  <img  src="https://raw.githubusercontent.com/oslabs-beta/ReacTree/fabian/readme/src/media/launch-props-open-files.gif" width=90% >
</p>

<br/>
<br/>

- Customize the tree by dragging and dropping components to your preferred layout. Easily switch your view to vertical or horizontal with a click of a button. You can also lock your tree in place so you don't accidentally move your tree.

<p align="center">
  <img  src="https://raw.githubusercontent.com/oslabs-beta/ReacTree/fabian/readme/src/media/navbar-controls.gif" width=90% >
</p>

<br/>
<br/>

- ⇧⌘P(Mac) Ctrl+Shift+P (Windows) then type "Preferences:Color Theme" (or use ⌘K⌘T on Mac or Ctlr+K Ctrl+T on Windows) to change the theme of VSCode and ReacTree that best suits your preference.
<p align="center">
  <img  src="https://raw.githubusercontent.com/oslabs-beta/ReacTree/fabian/readme/src/media/themes.gif" width=90% >
</p>

<br/>
<br/>
<br/>

## <b>Tech Stack</b>

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Reactflow](https://reactflow.dev/)
- [VSCode Extension API](https://code.visualstudio.com/api)
- [Babel Parser](https://babeljs.io/docs/en/babel-parser)
- [Webpack](https://webpack.js.org/)
  <br/>
  <br/>

## <b>Articles</b>

Checkout out our <a href="https://medium.com/@bnohcub/onboarding-a-dense-react-codebase-reactree-has-your-back-c29c71dd9ee2">medium article</a> for more information about ReacTree!

Additionally, we realized documentation on building a VSCode Webview Panel with React and Messaging is scarce. Don't worry, we wrote <a href="https://medium.com/@michaelbenliyan/developers-guide-to-building-vscode-webview-panel-with-react-and-messages-797981f34013">this article</a> which goes in depth to easily understand how to build a Webview Panel!

<br/>
<br/>

## <b>Contributing</b>

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

You can check out more information and get started with ReacTree on its official webpage and on its <a href="https://www.linkedin.com/company/react-tree/">LinkedIn</a> page. These pages provide useful information about the project, including how it works, its key features, and how to get started with using it.

Additionally, you can find the project’s source code, documentation, and issue tracker in Github. You can also fork the project, make changes, and submit pull requests to help improve the project.

If you like the project and find it useful, please consider giving it a star on GitHub. This can help increase visibility for the project and attract more contributors and users.

  <p align="left">
      <br />
      <a href="https://github.com/oslabs-beta/ReacTree/issues">Report Bug / Request Feature</a>
  </p>
<br/>

## <b>Meet Our Team</b>

- Justin Kim • [LinkedIn](https://www.linkedin.com/in/justin27kim/) • [Github](https://github.com/justin27kim)
- Fabian Salazar • [LinkedIn](https://www.linkedin.com/in/fabian-salazar-260a7957/) • [Github](https://github.com/fsalazar88)
- Brian Noh • [LinkedIn](https://www.linkedin.com/in/briannohski/) • [Github](https://github.com/dogenoh)
- Mike Benliyan• [LinkedIn](https://www.linkedin.com/in/michaelbenliyan/) • [Github](https://github.com/MichaelBenliyan)
- Kevin Liu• [LinkedIn](https://www.linkedin.com/in/kevindliu/) • [Github](https://github.com/K8Liu)

<br/>

## <b>License</b>

<!-- Make sure to add license file to master branch -->

ReacTree is developed under the [MIT license](https://github.com/open-source-labs/ZusTime/LICENSE)
