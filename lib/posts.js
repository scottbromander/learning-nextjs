import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts'); //cwd, current working directory

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory); // reads the directory above.
  const allPostsData = fileNames.map((fileName) => {
    // Remove .md from the file name using Regex
    const id = fileName.replace(/\.md$/, '');

    // Read Markdown as a String
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResults = grayMatter(fileContents);

    return {
      id,
      ...matterResults.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
