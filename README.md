# HEX Portfolio

**HEX Portfolio** is a modern web development project that showcases a portfolio website built with cutting-edge technologies like Next.js, React, GSAP, and TailwindCSS. This repository contains the source code for the website, which includes sections like About, Services, and more, all with smooth animations and responsive design.

## Project Overview

HEX Portfolio is a portfolio website designed to highlight various projects and skills with a focus on modern web technologies and animations. The website is structured into six main sections:

-**Home Page**: Features a Stripe-style animation powered by a minified WebGL library, creating an engaging and dynamic landing experience.
-**About**: Provides background information and details about me.
-**Services**: Describes the range of services I offer.
-**Works**: Showcases the portfolio projects. This section is connected to a backend system where I manage the project listings through an admin dashboard. Access to this dashboard is secured via NextAuth, and project data is handled using Supabase.
-**Contact**: Contains a contact button that copies my email address to the clipboard. The section is equipped with a GSAP-animated popup that provides feedback when the email is copied.
-**Admin Dashboard**: A protected area for managing and updating project listings, accessible only with proper authentication.

## Table of Contents

- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Demo

You can view a live demo of the project here: [Live Demo](https://www.hexthecoder.pl/)

## Technologies Used

- **Next.js**: A powerful React framework for server-rendered applications.
- **React**: A JavaScript library for building user interfaces.
- **GSAP**: A robust animation library used for creating smooth and performant animations.
- **TailwindCSS**: A utility-first CSS framework for rapidly building custom designs.
- **Blobity**: A small library for creating fun cursor animations.
- **Kinet**: A library for mouse-follow animations.
- **Lodash**: A utility library delivering consistency, customization, and performance.
- **Sharp**: An image processing library used for optimizing images.
- **Supabase**: An image processing library used for optimizing images.
- **NextAuth**: A flexible authentication library for Next.js applications.

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/66HEX/hexthecoder.git
cd hexthecoder
npm install
```

## Usage

```bash
npm run dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Designed by [Marek Jóźwiak](https://github.com/66HEX).
