// 1. import default from the plugin module
const { addDisplayNameTransformer } = require('ts-react-display-name');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

// 2. create a transformer;
// the factory additionally accepts an options object which described below
const displayNameTransformer = addDisplayNameTransformer();
const styledComponentsTransformer = createStyledComponentsTransformer();

// 3. create getCustomTransformer function
export const getCustomTransformers = () => ({ before: [displayNameTransformer, styledComponentsTransformer] });

// 4. export getCustomTransformers
// export { getCustomTransformers };
