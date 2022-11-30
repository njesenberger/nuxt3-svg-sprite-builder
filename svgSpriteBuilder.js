import { readdirSync, readFileSync } from 'fs';

export default defineNitroPlugin((nitroApp) => {
  const svgDirectory = './assets/svg/';

  const isSvg = (fileName) => {
    return fileName.endsWith('.svg');
  };

  const getSvgFiles = (path) => {
    const svgFiles = [];
    const dirents = readdirSync(path, { withFileTypes: true });
    dirents.forEach(dirent => {
      if (dirent.isDirectory()) {
        svgFiles.push(...getSvgFiles(`${path}${dirent.name}/`));
      } else if (isSvg(dirent.name)) {
        dirent.path = `${path}${dirent.name}`;
        svgFiles.push(dirent);
      };
    });
    return svgFiles;
  };

  const svgFileToSymbol = (svgFile) => {
    const svg = readFileSync(svgFile.path).toString();
    const svgId = svgFile.path.replace(svgDirectory, '').replace('.svg', '');
    return svg.replace('<svg', `<symbol id=${svgId}`).replace('</svg>', '</symbol>');
  };

  const buildSvgSprite = () => {
    const svgFiles = getSvgFiles(svgDirectory);
    const svgSymbols = svgFiles.map(svgFile => svgFileToSymbol(svgFile));
    return `
      <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 0; height: 0;" aria-hidden="true">
        ${svgSymbols.join('')}
      </svg>
    `;
  };

  nitroApp.hooks.hook('render:html', (html) => {
    const svgSprite = buildSvgSprite();
    html.bodyPrepend.push(svgSprite);
  });
});