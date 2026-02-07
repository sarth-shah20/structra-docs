// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Structra Documentation',
  tagline: 'System Design Architecture',
  favicon: 'img/logo.png',


  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.structra.cloud',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/', // CRITICAL for the rewrite setup

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'structra', // Usually your GitHub org/user name.
  projectName: 'structra-docs', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve docs at /docs/ instead of /docs/docs/
          sidebarPath: './sidebars.js',
        },
        blog: false, // Disable blog if not needed
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 1. Color Mode: Respect user system, but allow toggle
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      
      // 2. Navbar: Matches your AuthenticatedNavbar.jsx
      navbar: {
        title: 'Structra',
        logo: {
          alt: 'Structra Logo',
          src: 'img/logo.png', // Ensure this file exists in /static/img/
          srcDark: 'img/logo.png', // Or a white version if you have one
          href: 'https://structra.cloud/app', // Clicking logo goes to App, not docs home
          target: '_self',
        },
        items: [
          // Right Side: Navigation back to App
          {
            href: 'https://structra.cloud/app/workspaces',
            label: 'Workspaces',
            position: 'right',
            className: 'header-link',
          },
          {
            href: 'https://github.com/sarth-shah20/structra-backend', // Optional: Repo link
            label: 'GitHub',
            position: 'right',
            className: 'header-github-link',
          },
        ],
      },

      // 3. Footer: Matches your Footer.jsx
      footer: {
        style: 'light', // Keep it clean/light to match app
        links: [
          {
            title: 'Product',
            items: [
              { label: 'Workspaces', href: 'https://structra.cloud/app/workspaces' },
              { label: 'Systems', href: 'https://structra.cloud/app/systems' },
              { label: 'Pricing', href: 'https://structra.cloud/pricing' },
            ],
          },
          {
            title: 'Resources',
            items: [
              { label: 'Documentation', to: '/' },
              { label: 'Principles', to: '/principles' },
              { label: 'API Reference', to: '/api' },
            ],
          },
          {
            title: 'Company',
            items: [
              { label: 'About', href: 'https://structra.cloud/about' },
              { label: 'Contact', href: 'mailto:support@structra.cloud' },
              { label: 'Privacy Policy', to: '/privacy' }, // create standard md files for these
              { label: 'Terms of Service', to: '/terms' },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Structra. Built for Scalability.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
