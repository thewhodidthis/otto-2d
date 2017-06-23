import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.es',
  interop: false,
  plugins: [
    babel(),
    nodeResolve(),
  ],
  globals: {
    '@thewhodidthis/otto': 'Otto'
  },
  targets: [
    {
      format: 'iife',
      moduleName: 'Otto2d',
      dest: 'dist/otto2d.js',
    },
    {
      format: 'cjs',
      dest: 'index.js',
    }
  ]
};
