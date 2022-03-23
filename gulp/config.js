const srcPath = 'src';
const destPath = 'build';

const config = {
  src: {
    root: srcPath,
    js: `${srcPath}/js`,
    pug: `${srcPath}/pug`,
    scss: `${srcPath}/scss`,
    fonts: `${srcPath}/assets/fonts`,
    images: `${srcPath}/assets/images`,
    iconsMono: `${srcPath}/assets/icons/mono`,
    iconsMulti: `${srcPath}/assets/icons/multi`
  },

  dest: {
    root: destPath,
    html: destPath,
    js: `${destPath}/js`,
    css: `${destPath}/css`,
    fonts: `${destPath}/fonts`,
    images: `${destPath}/images`
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  }
};

export default config;
