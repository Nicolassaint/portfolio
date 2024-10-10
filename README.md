# Nicolas Saint's Portfolio

This repository contains the source code and content for my personal portfolio and blog, built with [Hugo](https://gohugo.io/) and using the [PaperMod theme](https://github.com/adityatelange/hugo-PaperMod).

## Table of Contents

- [Nicolas Saint's Portfolio](#nicolas-saints-portfolio)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Install Hugo](#install-hugo)
    - [Install Node.js](#install-nodejs)
    - [Clone the Repository](#clone-the-repository)
    - [Install papermod](#install-papermod)
    - [Install Dependencies](#install-dependencies)
  - [Running the Site Locally](#running-the-site-locally)
  - [Deploying the Site](#deploying-the-site)
  - [Modify the Content](#modify-the-content)
    - [Adding a New Post](#adding-a-new-post)
    - [Modifying Existing Pages](#modifying-existing-pages)

## Installation

To get started, you'll need to have Hugo and Node.js installed.

### Install Hugo

Follow the instructions for your operating system: [Hugo installation guide](https://gohugo.io/getting-started/installing/).

Verify your installation:

```bash
hugo version
```

### Install Node.js

You also need Node.js and npm. You can install them by following the instructions on the [Node.js website](https://nodejs.org/).

Verify your installation:

```bash
node -v
npm -v
```

### Clone the Repository

```bash
git clone
cd nicolassaint.github.io
```

### Install papermod

```bash
git submodule update --init --recursive
```

### Install Dependencies

```bash
npm install
```

## Running the Site Locally

To run the site locally, use the following command:

```bash
hugo server -D
```

This will start a local development server. Open your browser and go to `http://localhost:1313/` to see the site.

Hugo will watch for changes in your content and update the site in real-time.

## Deploying the Site

The website is deployed using GitHub Pages. The deployment process involves building the static files and pushing them to the `gh-pages` branch.

You can deploy the site manually using the following command:

```bash
npm run deploy
```

This will:

1. Build the static files into the `public/` directory using Hugo.
2. Push the content of the `public/` directory to the `gh-pages` branch of your repository, which GitHub Pages uses to serve the site.

Make sure your `baseURL` in `config.yaml` is set correctly, especially if you're deploying to a project page:

```yaml
baseURL: "https://nicolassaint.github.io"
```

## Modify the Content

### Adding a New Post

To add a new post, you can use the following command:

```bash
hugo new posts/my-new-post.md
```

This will create a new markdown file in the `content/blog/` directory with the necessary front matter.

You can then edit the file and add your content. Make sure to include the necessary front matter at the top, such as:

```yaml
---
title: "My New Post"
date: 2024-10-09
draft: false
tags: ["Hugo", "Portfolio"]
---
```

Once you're done, save the file and it will be available on your site. If you want to preview it before deploying, make sure your post is set to `draft: false` or use the `-D` flag with `hugo server`.

### Modifying Existing Pages

If you want to modify existing pages, navigate to the `content/` directory where you'll find sections like `experience/`, `education/`, `projects/`, etc.

Edit the Markdown files directly, then save your changes. The site will automatically reflect the updates when run locally or after deployment.

