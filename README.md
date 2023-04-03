Mariner Finance Website Development

## Running locally on your computer
  `npm run start:local`

1. Introduction
   This document briefs on the technical aspect of the project. It covers the technical stack used and the best practices being followed by a development team at the time of development.
   Technical implementation will focus on the UI design development and integration with the API.

2. Technology Stack
   Node v14.16.1 (https://nodejs.org/en/ )
   NPM v6.14.11 (https://www.npmjs.com/)
   React v17.0.2 (https://reactjs.org/)
   Material-UI (https://material-ui.com/)
   Formik (https://formik.org/)
   Yup (https://github.com/jquense/yup)

3. Coding Standards guidelines:
   a. Folder structures
   • All the code will be place in the src folder
   • All the components will be placed under the components folder
   • Helper files will be placed under helper folder
   • Each component should have a specific folder (all related files in respective folder).
   • Use index.js for each folder to export (Avoid repeating names on the imports)
   b. Naming conventions
   • React UI component’s names should be PascalCase Example: CommonUtils.js
   • All the folder names should be camelCase. Example: commonUtils
   • Name your files logically according to the job that they perform
   c. Putting imports in an order
   • React import
   • Library imports (Alphabetical order)
   • Absolute imports from the project (Alphabetical order)
   • Relative imports (Alphabetical order)
   • Import \* as
   • Import ‘./<some file>.<some extension>
   • Each kind should be separated by an empty line. This makes your imports clean and easy to understand for all the components, 3rd-party libraries, and etc.

4. IDE and Plugins
   Following IDE extensions are to be available in the developers machine:
5. Prettier - code formatter
6. SonarLint - code quality check
7. Simple React Snippet - Code shortcuts
8. npm Intellisense - usefull for node modules import
9. Material-UI snippet - work effectively with material ui
10. Path Intellisense

11. NPM List
    @date-io/date-fns v1.3.13
    @material-ui/core: v4.11.4
    @material-ui/data-grid: v4.0.0-alpha.31
    @material-ui/icons: v4.11.2
    @material-ui/lab: v4.0.0-alpha.58
    @material-ui/pickers: v3.3.10
    @testing-library/react: v11.2.7
    classnames: v2.3.1
    date-fns: v2.22.1
    formik: v2.2.8
    react: v16.8.6
    react-dom: v16.8.6
    react-input-mask: v2.0.4
    react-router-dom: v5.2.0
    react-scripts: v4.0.3
    react-text-mask: v5.4.3
    use-local-storage: v2.2.1
    yup: v0.32.9
# testing-
