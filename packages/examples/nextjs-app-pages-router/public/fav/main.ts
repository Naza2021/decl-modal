const $ = (selector: string) => {
  const element = document.querySelector(selector);

  const sizes = () => {
    const rect = element.getBoundingClientRect();

    // Las coordenadas del elemento con respecto a la ventana del navegador
    const top = rect.top; // Distancia desde la parte superior de la ventana
    const left = rect.left; // Distancia desde el borde izquierdo de la ventana
    const right = rect.right; // Distancia desde el borde derecho de la ventana
    const bottom = rect.bottom; // Distancia desde la parte inferior de la ventana
    const width = rect.width; // Ancho del elemento (incluyendo padding y borde)
    const height = rect.height; // Altura del elemento (incluyendo padding y borde)

    return { top, left, right, bottom, width, height };
  };

  return { element: element as any as HTMLDivElement, sizes };
};

window.addEventListener('scroll', e => {
  setAnimations();
});

window.addEventListener('resize', e => {
  setAnimations();
});

const sizes = $('#nazfy-logo').sizes();

const { element: realLogo } = $('#nazfy-logo-real');

realLogo.style.top = `${sizes.top}px`;
realLogo.style.left = `${sizes.left}px`;
realLogo.style.opacity = 1;

const setAnimations = () => {
  const fatherProjects = document.getElementsByClassName('ProjectsContainer');
  const fatherPosition = fatherProjects[0].getBoundingClientRect().top;
  const sizes = $('#nazfy-logo').sizes();

  const scrollTop = document.scrollingElement.scrollTop;

  realLogo.style.top = `${Math.max(15, sizes.top - scrollTop / (64 * 1.5))}px`;

  realLogo.style.width = `${Math.max(
    40,
    sizes.width - scrollTop / (6 * 0.75),
  )}px`;

  realLogo.style.height = `${Math.max(
    40,
    sizes.height - scrollTop / (6 * 0.75),
  )}px`;
  realLogo.style.left = `${
    sizes.left + Math.min(28, scrollTop / (6 * 0.75) / 2)
  }px`;

  const navbar = $('nav');

  navbar.element.style.opacity = Math.min(1, 0 + scrollTop / (384 * 1.5)).toString();
  // realLogo.style.transform = (`scale(${Math.max(0.45, 1 - scrollTop / (384 * 1.5))})`);

  if (fatherPosition < 700) {
    for (let i = 0; i < fatherProjects[0].children.length; i++) {
      fatherProjects[0].children[i].children[0].style.animationPlayState =
        'running';
    }
  }
};

setAnimations();
