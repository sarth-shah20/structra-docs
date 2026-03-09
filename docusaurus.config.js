// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Structra Documentation',
  tagline: 'Architecture Quality Intelligence for Engineering Teams',
  favicon: 'img/logo.png',

  future: {
    v4: true,
  },

  url: 'https://docs.structra.cloud',
  baseUrl: '/',

  organizationName: 'structra',
  projectName: 'structra-docs',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  scripts: [
    {
      src: '/js/sidebar-search.js',
      defer: true,
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Dark-first configuration for an enterprise AI product feel.
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      // Focused, high-signal product message at the top of every page.
      announcementBar: {
        id: 'structra-positioning',
        content:
          'Structra · Architecture Quality Intelligence for Engineering Teams',
        isCloseable: true,
      },

      navbar: {
        title: 'structra',
        logo: {
          alt: 'Structra Logo',
          src: 'img/logo.png',
          srcDark: 'img/logo.png',
          href: '/',
          target: '_self',
        },
        items: [
          {
            href: 'https://structra.cloud/app/workspaces',
            label: 'Workspaces',
            position: 'right',
            className: 'header-link nav-workspaces',
          },
          {
            href: 'https://structra.cloud/pricing',
            label: 'Pricing',
            position: 'right',
            className: 'header-link nav-pricing nav-ghost',
          },
          {
            href: 'https://structra.cloud/app',
            label: 'Open App',
            position: 'right',
            className: 'header-link nav-open-app nav-cta',
          },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Platform',
            items: [
              {label: 'Workspaces', href: 'https://structra.cloud/app/workspaces'},
              {label: 'Pricing', href: 'https://structra.cloud/pricing'},
              {label: 'GitHub', href: 'https://github.com'},
            ],
          },
        ],
        // Using HTML here keeps the footer compact and brand-aligned.
        copyright: `© ${new Date().getFullYear()} Structra · All rights reserved.<br/><span class="footer-powered">Powered by Structra</span>`,
      },

      prism: {
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
      },
    }),
};

export default config;
