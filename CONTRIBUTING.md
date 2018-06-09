## Contributing Guidelines

### File Requirements per Folder

#### /require
1.  'require'd by index.js and made available app-wide
2.  Can execute directly commands
3.  Should **not** interact with the HTML

#### /modules
1.  Should extend ExternalModule
2.  Will all be loaded automatically and inserted in the HTML.
3.  Can execute directly commands
4.  Should interact directly with the HTML
