import { crawlUrls } from './crawler';
import { getConfiguredDepth } from './utils/config';

const depth = getConfiguredDepth();
const visitedUrls = new Set();

async function crawl(paths: string[], http: boolean, currentLevel:number, maxLevel:number) {
  if (currentLevel > maxLevel) {
    return [];
  }
  const pathsToBeCrawled = []
  for (const path of paths) {
    if (!visitedUrls.has(path)) {
      visitedUrls.add(path)
      pathsToBeCrawled.push(path)
    }
  }
  const links = await crawlUrls(pathsToBeCrawled, http);
  for (const url of pathsToBeCrawled) {
    const innerLinks = await crawl(links[url], http, currentLevel +1, maxLevel);
    Object.assign(links, innerLinks)
  }
  return links;
}

(async() => {
  const links = await crawl(['htmls/1.html'], false, 1, depth)
  console.log(`result links: ${JSON.stringify(links)}`);
})()


   
