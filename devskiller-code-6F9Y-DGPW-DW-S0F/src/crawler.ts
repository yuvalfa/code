import { scrapeLinks } from './utils/scraper';
import * as fs from 'fs';

function writeToFile(filePath: string, key:string, value:string) {
  fs.readFile(filePath, 'utf8', (err, existingData) => {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      let jsonObject: any = {};
  
      try {
        jsonObject = JSON.parse(existingData); // Parse the existing data into an object
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
      }
  
      jsonObject[key] = value;
  
      const updatedContent: string = JSON.stringify(jsonObject, null, 2);
  
      fs.writeFile(filePath, updatedContent, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to file:', writeErr);
        } else {
          console.log('New key-value pair added and file updated successfully.');
        }
      });
    }
  });
}

export async function crawlUrls(paths: string[], http: boolean): Promise<object> {
  /*
    As an example, the following extracts links from given website URL or file path
    scrapeLinks('htmls/1.html', false).then(console.log);
    scrapeLinks('http://some-website.com/', true).then(console.log);
  */
  try {
    const innerData = await Promise.all(
      paths.map(async (innerPath) => {
          const innerLinks = await scrapeLinks(innerPath, http);

          return {[innerPath] :innerLinks};
      })
    );

    const linksObj = {}
 
    for (const item of innerData) {
      const url = Object.keys(item)[0]
      linksObj[url] = item[url]
      //writeToFile('resut.txt', url, `${JSON.stringify(item[url])},`)
 
    }
    
    return linksObj;
  } catch(err) {
    return Promise.resolve([]);
  }
  

}
