// @ts-nocheck

import plugin from 'tailwindcss/plugin';

const generateTailwindClass = (newClasses) => {
  return plugin(function ({ addUtilities }) {
    addUtilities(
      Object.fromEntries(
        Object.entries(newClasses).map(([className, classValue]) => [
          `.${className}`,
          { [`@apply ${classValue}`]: {} },
        ]),
      ),
    );
  });
};

export default generateTailwindClass;
