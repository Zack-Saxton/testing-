Mariner Finance Website Development

1.	Introduction
This document briefs on the technical aspect of the project. It covers the technical stack used and the best practices to be followed by a development team at the time of development. 
	Technical implementation will focus on the UI design development and integration with the API.

2.	Technology Stack
Node v14.16.1  (https://nodejs.org/en/ )
NPM v6.14.11   (https://www.npmjs.com/)
React v17.0.2   (https://reactjs.org/)
Material-UI       (https://material-ui.com/)
Formik               (https://formik.org/)
Yup                     (https://github.com/jquense/yup)


3.	Coding Standards guidelines:
a.	Folder structures
•	All the code will be place in the src folder
•	All the components will be placed under the components folder
•	Helper files will be placed under helper folder
•	Each component should have a specific folder (all related files in respective folder).
•	Use index.js for each folder to export (Avoid repeating names on the imports)
b.	Naming conventions
•	React UI component’s names should be PascalCase Example: CommonUtils.js
•	All the folder names should be camelCase. Example: commonUtils
•	Name your files logically according to the job that they perform
c.	Putting imports in an order
•	React import
•	Library imports (Alphabetical order)
•	Absolute imports from the project (Alphabetical order)
•	Relative imports (Alphabetical order)
•	Import * as
•	Import ‘./<some file>.<some extension>
•	Each kind should be separated by an empty line. This makes your imports clean and easy to understand for all the components, 3rd-party libraries, and etc.

4.	IDE and Plugins
Following IDE extensions are to be available in the developers machine:
1. Prettier - code formatter
2. SonarLint - code quality check
3. Simple React Snippet - Code shortcuts
4. npm Intellisense - usefull for node modules import
5. Material-UI snippet - work effectively with material ui
6. Path Intellisense

