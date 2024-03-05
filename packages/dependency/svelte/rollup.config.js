import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import preserveDirectives from "rollup-plugin-preserve-directives";
import copy from 'rollup-plugin-copy'

export default [
    {
        input: { index: 'src/index.ts', react: 'src/react/index.ts', svelte: 'src/svelte/index.ts' },  // Tu archivo de entrada
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
            typescript({ exclude: ['./debug/**/*'], compilerOptions: { declarationDir: './dist/esm', outDir: './dist/esm' } }),
            terser(),
            copy({
                targets: [
                    { src: 'src/svelte/Components/**/*', dest: 'dist/esm/svelte/Components' }
                ]
            })
        ]
    },
    {
        input: { index: 'src/index.ts', react: 'src/react/index.ts', svelte: 'src/svelte/index.ts' },  // Tu archivo de entrada
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
            typescript({ exclude: ['./debug/**/*'], compilerOptions: { declarationDir: './dist/cjs', outDir: './dist/cjs' } }),
            terser(),
            copy({
                targets: [
                    { src: 'src/svelte/Components/**/*', dest: 'dist/cjs/svelte/Components' }
                ]
            })
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
    //     }, plugins: []
    // },

]
