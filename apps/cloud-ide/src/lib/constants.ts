export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.yourapp.com'
  : 'http://localhost:3001'

export const code = `const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server is running on http://localhost:\${port}\`);
});
`;

export const extensionMap: Record<string, string> = {
  // Programming Languages
  "js": "javascript",
  "mjs": "javascript",
  "cjs": "javascript",
  "jsx": "javascript",
  "ts": "typescript",
  "tsx": "javascript",
  "py": "python",
  "java": "java",
  "cpp": "cpp",
  "c": "c",
  "rb": "ruby",
  "php": "php",
  "go": "go",
  "swift": "swift",
  "kt": "kotlin",
  "dart": "dart",
  "rs": "rust",
  "scala": "scala",
  "clj": "clojure",
  "cr": "crystal",
  "ex": "elixir",
  "elm": "elm",
  "fs": "fsharp",
  "hs": "haskell",
  "lisp": "lisp",
  "lua": "lua",
  "nim": "nim",
  "perl": "perl",
  "r": "r",
  "sol": "solidity",
  "v": "verilog",
  "vb": "vb",

  // Markup Languages
  "html": "html",
  "htm": "html",
  "xml": "xml",
  "svg": "xml",
  "css": "css",

  // Markdown
  "md": "markdown",
  "markdown": "markdown",

  // Configuration
  "json": "json",
  "yaml": "yaml",
  "yml": "yaml",
  "toml": "toml",
  "env": "dotenv",
  "gitignore": "git-ignore",
  "gitattributes": "git-attributes",

  // Other
  "sql": "sql",
  "txt": "plaintext",
  "csv": "csv",
  "xlsx": "excel",
  "docx": "word",
  "pdf": "pdf",
  "ppt": "powerpoint",
  "bin": "binary",
  "so": "binary",
  "exe": "executable",
  "img": "image",
  "png": "image",
  "jpg": "image",
  "jpeg": "image",
  "gif": "image",
  "bmp": "image",
  "tiff": "image",
  "ico": "image",
  "ttf": "font",
  "otf": "font",
  "woff": "font",
  "woff2": "font",
  "mp3": "audio",
  "wav": "audio",
  "ogg": "audio",
  "mp4": "video",
  "mov": "video",
  "avi": "video",
  "mkv": "video",
  "zip": "archive",
  "rar": "archive",
  "tar": "archive",
  "gz": "archive",
  "bz2": "archive"
};