/// <reference types="react-scripts" />
declare module 'react-xml-viewer'
declare module 'html2pdf.js'
declare module "*.xml" {
  const doc: any; // Change this to an actual XML type
  export default doc;
}