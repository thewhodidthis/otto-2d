import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.es',
  dest: 'dist/otto2d.js',
  format: 'iife',
  indent: true,
  sourceMap: true,
  moduleName: 'Otto2d',
  plugins: [
    babel(),
    nodeResolve(),
  ],
};
