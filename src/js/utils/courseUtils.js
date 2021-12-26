import urljoin from 'url-join';
let baseURL = "/docs";
let baseNoCacheURL = "/docs"; // This bypasses CDN.
let getSrcUrl = (repo_url, path) => {
  return urljoin(repo_url.replace("https://github.com", baseURL),
    `${path}`);
};
let getChapterURL = (repoUrl, content, chapter, noCache = false) => { // this also sets window.contentURLBase
  let courseURLBase = repoUrl.replace("https://github.com", noCache?baseNoCacheURL:baseURL);
  let chapterURL;
    if(!content.chapters[chapter]){ // The user reached an unexisted chapter
      location.href = "/";
      return;
    }
    if (content.chapters[chapter].content) {
      window.contentURLBase = urljoin(courseURLBase,
        content.chapters[chapter].content.split("/").slice(0, -1).join("/")); // without the md filename
      chapterURL = urljoin(courseURLBase,
        content.chapters[chapter].content);
    } else {
      window.contentURLBase = courseURLBase;
      chapterURL = urljoin(courseURLBase,
        `Chapter${chapter}.md`);
    }
  return chapterURL;
}
export default { getSrcUrl, baseURL, getChapterURL };