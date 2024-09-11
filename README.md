# HEX Portfolio

**HEX Portfolio** is a modern web development project that showcases a portfolio website built with cutting-edge technologies like Next.js, React, GSAP, and TailwindCSS. This repository contains the source code for the website, which includes sections like About, Services, and more, all with smooth animations and responsive design.

## Project Overview

HEX Portfolio is a portfolio website designed to highlight various projects and skills with a focus on modern web technologies and animations. The website is structured into six main sections:

- **Home Page**: Features a Stripe-style animation powered by a minified WebGL library, creating an engaging and dynamic landing experience.
- **About**: This section provides background information about me, detailing my professional journey, skills, and experiences. The About section is designed to offer visitors a personal touch and a deeper understanding of who I am and what motivates me in my professional endeavors.
- **Services**: This section outlines the range of services I offer, emphasizing the expertise and solutions I can provide to clients. The Services section is crafted to showcase my capabilities and the value I bring to potential clients, making it easier for them to understand how my services can meet their requirements.
- **Works**: The Admin Dashboard is equipped with a drag-and-drop feature, allowing dynamic reordering of projects to reflect changes in their display order on the main site. The dashboard is secured via NextAuth for authentication, and project data is managed using Supabase for reliable storage and retrieval.
- **Contact**: Contains a contact button that copies my email address to the clipboard. The section is equipped with a GSAP-animated popup that provides visual feedback when the email is copied, ensuring a smooth and interactive user experience.
- **Admin Dashboard**: A protected area for managing and updating project listings, accessible only with proper authentication. The Admin Dashboard includes a drag-and-drop interface that allows admins to dynamically change the order of projects, which is reflected immediately on the main site. This functionality provides a user-friendly way to organize and prioritize project displays without needing to manually update the order in the database. The dashboard integrates with Supabase for data management and storage.

The entire website is animated using GSAP and Blobity, ensuring a smooth and visually appealing user experience.

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
git clone https://github.com/66HEX/hex-portfolio.git
cd hex-portfolio
npm install
```

## Usage

```bash
npm run dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Designed by [Marek Jóźwiak](https://github.com/66HEX).
