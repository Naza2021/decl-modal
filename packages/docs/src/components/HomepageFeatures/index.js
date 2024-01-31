import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Construye lo que quieras',
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Esta libreria simplemente expone su Core para que construyas tu propia UI. No existen limites de lo que puedes construir. (Popups, Tooltips, Modales, etc)
      </>
    ),
  },
  {
    title: 'Vistas declarativas',
    // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        No tienes que preocuparte estados innecesarios, como si es visible o de guardar una potencial respuesta unica de una vista. Simplemente haz visible la vista y espera por una respuesta.
      </>
    ),
  },
  {
    title: 'Facil de usar',
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Solo es cuestion de aprender algunos metodos, ya luego eres dueño de tu propia UI, tus props, tus configuraciones, tus estilos.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      {/* <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div> */}
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
