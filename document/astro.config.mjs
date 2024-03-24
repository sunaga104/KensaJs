import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export const locales = {
  root: { label: 'English', lang: 'en' },
  ja: { label: '日本語', lang: 'ja' },
};

// https://astro.build/config
export default defineConfig({
  base: '',
  integrations: [
    starlight({
      title: 'KensaJs',
      social: {
        github: 'https://github.com/sunaga104/KensaJs',
      },
      defaultLocale: 'root',
      locales,
      sidebar: [
        {
          label: 'Guides',
          translations: {
            ja: 'ガイド',
          },
          items: [
            {
              label: 'Get Started',
              translations: {
                ja: '入門',
              },
              link: '/guides/start/',
            },
            {
              label: 'Title',
              translations: {
                ja: 'タイトル',
              },
              link: '/guides/title/',
            },
            {
              label: 'Test',
              translations: {
                ja: 'テスト',
              },
              link: '/guides/test/',
            },
            {
              label: 'Stub',
              translations: {
                ja: 'スタブ',
              },
              link: '/guides/stub/',
            },
          ],
        },
        // {
        //   label: 'Reference',
        //   translations: {
        //     ja: 'リファレンス',
        //   },
        //   items: [
        //     { label: 'Kensa', link: '/reference/kensa/' },
        //     { label: 'test', link: '/reference/test/' },
        //     { label: 'stub', link: '/reference/stub/' },
        //   ],
        // },
      ],
    }),
  ],
});
