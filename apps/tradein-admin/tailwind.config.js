const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        dataEntry: '2fr 3fr',
      },
      colors: {
        primary: {
          DEFAULT: '#01463A',
          light: '#216A4C',
        },
        secondary: {
          DEFAULT: '#D4FDCC',
        },
        background: {
          DEFAULT: '#E8EAE3',
        },
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontWeight: theme('fontWeight.bold') },
        h2: { fontWeight: theme('fontWeight.bold') },
        h3: { fontWeight: theme('fontWeight.bold') },
        h4: { fontWeight: theme('fontWeight.bold') },
        h5: { fontWeight: theme('fontWeight.bold') },
        h6: { fontWeight: theme('fontWeight.bold') },
      });
    }),
  ],
};
