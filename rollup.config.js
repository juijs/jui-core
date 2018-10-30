import {uglify} from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const babelOpts = babel({
    exclude: 'node_modules/**',
    plugins: [ 'external-helpers' ]
});

export default [
    {
        input: 'src/main.js',
        output: {
            file: pkg.main,
            format: 'cjs'
        },
        plugins: [ babelOpts ]
    },
    {
        input: 'src/main.js',
        output: {
            file: pkg.module,
            format: 'es'
        },
        plugins: [ babelOpts ]
    },
    {
        input: 'src/main.js',
        output: {
            file: 'dist/jui-core.js',
            format: 'iife',
            name: 'jui'
        },
        plugins: [ babelOpts ]
    },
    {
        input: 'src/main.js',
        output: {
            file: 'dist/jui-core.min.js',
            format: 'iife',
            name: 'jui'
        },
        plugins: [ babelOpts, uglify() ]
    }
]