import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default [
    {
        input: './src/index.ts',
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
                    { src: 'src/Components/**/*', dest: 'dist/esm/Components' }
                ]
            })
        ]
    },
    {
        input: './src/index.ts',
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
                    { src: 'src/Components/**/*', dest: 'dist/cjs/Components' }
                ]
            })
        ]
    },
]
