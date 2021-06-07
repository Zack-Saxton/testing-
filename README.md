Mariner Finance - UI/UX

Folder Structure:

MarinerFinance App
    .vscode
        -extensions.json
    node_modules
    public
        favicon.ico
        index.html
        manifest.json
    src
        -assets
            -images
            -sass
        -components
            -app
                -Appbar
                    header.js
                    sidenav.js
                -hooks
                app.css
                app.jsx
                app.test.jsx
                index.js
            -<Component-Name>                         //basic structure for new component
                -hooks
                <Component-Name>.css
                <Component-Name>.jsx
                <Component-Name>.test.jsx
                index.js
        -helper
        -routes
        index.css
        index.js
    .gitignore
    package-lock.json
    package.json
    yarn.lock
