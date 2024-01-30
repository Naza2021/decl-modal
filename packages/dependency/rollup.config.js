import typescript from '@rollup/plugin-typescript';
import css from "rollup-plugin-import-css";

export default [
    {
        input: { index: 'src/index.ts', react: 'src/react/index.ts' },  // Tu archivo de entrada
        external: id => id.indexOf('node_modules') >= 0,
        output: [{
            format: 'es',  // Formato CommonJS, adecuado para Node.js
            compact: true,
            preserveModules: true,
            dir: './dist/esm',
            exports: "named",
        }
        ],
        plugins: [
            typescript({ exclude: ['src/debug/**/*'], compilerOptions: { declarationDir: './dist/esm', outDir: './dist/esm' } }), css()
        ]
    },
    {
        input: { index: 'src/index.ts', react: 'src/react/index.ts' },  // Tu archivo de entrada
        external: id => id.indexOf('node_modules') >= 0,
        output: [{
            format: 'cjs',  // Formato CommonJS, adecuado para Node.js
            compact: true,
            preserveModules: true,
            dir: './dist/cjs',
            exports: "named",
        }
        ],
        plugins: [
            typescript({ exclude: ['src/debug/**/*'], compilerOptions: { declarationDir: './dist/cjs', outDir: './dist/cjs' } }), css()
        ]
    },
    // {
    //     input: ['src/react/index.ts'],  // Tu archivo de entrada
    //     external: id => id.indexOf('node_modules') >= 0,
    //     output: [{
    //         file: 'dist/react/bundle.cjs',  // Salida del bundle
    //         format: 'cjs',  // Formato CommonJS, adecuado para Node.js
    //         sourcemap: true,
    //     }, {
    //         file: 'dist/react/bundle-esm.js',  // Salida del bundle
    //         format: 'es',  // Formato CommonJS, adecuado para Node.js
    //         sourcemap: true,
    //     }],
    //     plugins: [
    //         typescript({ exclude: ['src/debug/**/*'], compilerOptions: { declaration: false } }), // Usa el plugin de TypeScript
    //     ]
    // },

    // {
    //     input: 'dist/bundle-esm.js', output: {
    //         file: 'dist/bundle-esm.js',
    //         format: 'esm'
    //     }, plugins: [terser()]
    // },

]
