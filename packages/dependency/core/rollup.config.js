import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',  // Tu archivo de entrada
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
        ]
    },
    {
        input: 'src/index.ts',  // Tu archivo de entrada
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
        ]
    },
]
