<h3 align="center">jerensl.dev</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/jerensl/www.jerenslensun.com)](https://github.com/jerensl/www.jerenslensun.com/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/jerensl/www.jerenslensun.com)](https://github.com/jerensl/www.jerenslensun.com/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![codecov](https://codecov.io/gh/jerensl/www.jerenslensun.com/branch/main/graph/badge.svg?token=HSYPO9VBAU)](https://codecov.io/gh/jerensl/www.jerenslensun.com) ![Continuous Integration](https://github.com/jerensl/www.jerenslensun.com/actions/workflows/integration.yml/badge.svg) ![Docs Deployment](https://github.com/jerensl/www.jerenslensun.com/actions/workflows/deployment.yml/badge.svg)

</div>

---

<p align="center"> A website to share knowledge and project i'm currently work on.
    <br>  
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

A portofolio website, to share about project I'm working on and the lesson i learn from the past.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes..

### Prerequisites

What things you need to install the software and how to install them.

- [NodeJS](https://nodejs.org/en/download)

### Installing

A step by step series of examples that tell you how to get a development env running.

### Clone the project

```sh
  git clone https://github.com/jerensl/www.jerenslensun.com.git
```

### Go to the project directory

```sh
  cd www.jerenslensun.com
```

### Install dependencies

#### `pnpm install`

### Start the application

```sh
pnpm --filter "./apps/web-app" start
```

It will runs the app in development mode and automaticlly open your browser, if not you open the browser, and go to [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running the storybook on local <a name = "docs"></a>

```sh
pnpm --filter "./apps/web-app" storybook
```

### Running the tests <a name = "tests"></a>

To run the automated tests for this system.

### Running the test one time

```sh
pnpm --filter "./apps/web-app" test
```

### Runs the test watcher in an interactive mode.

```sh
pnpm --filter "./apps/web-app" test:watch
```

### Runs the test coverage.

```sh
pnpm --filter "./apps/web-app" test:coverage
```

### Check host port from docker container

```sh
ip addr show docker0 | grep -Po 'inet \K[\d.]+'
```

### `Run playwright server container`

```sh
docker run --add-host=hostmachine:host-gateway -p 8443:8443 --rm --init -it --workdir /home/pwuser --user pwuser mcr.microsoft.com/playwright:v1.58.1-noble /bin/sh -c "npx -y playwright@1.58.1 run-server --port 8443 --host 0.0.0.0"
```

### `Run playwright locally using docker`

```sh
PW_TEST_CONNECT_WS_ENDPOINT=ws://localhost:8443/ npx playwright test --ui-port=8080
```

## 🎈 Usage <a name="usage"></a>

For more information about how to use the component, you can follow the instruction from the storybook [here](https://jerensl.github.io/www.jerenslensun.com/).

## 🚀 Deployment <a name = "deployment"></a>

This website is deployed on [Vercel](https://vercel.com/), with continuous deployment from the `main` branch.

Storybook documentation is published to GitHub Pages by the [Docs Deployment workflow](https://github.com/jerensl/www.jerenslensun.com/actions/workflows/deployment.yml?query=branch%3Amain).

## ⛏️ Built Using <a name = "built_using"></a>

- [NextJs](https://nextjs.org/) - Web Framework
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [React Testing Library](https://testing-library.com/) - React Testing Library
- [Storybook](https://storybook.js.org/) - Documentation
- [MDX Bundler](https://github.com/kentcdodds/mdx-bundler) - Markdown Bundler
- [Material Design 3](https://m3.material.io/) - Design System

## ✍️ Authors <a name = "authors"></a>

- [@jerensl](https://github.com/jerensl) - Idea & Initial work

See also the list of [contributors](https://github.com/jerensl/www.jerenslensun.com/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

-
