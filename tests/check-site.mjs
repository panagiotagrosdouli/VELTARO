// Zero-dependency static integrity checks. Run: node tests/check-site.mjs
import {readFileSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const pages=['index.html','collaborate.html','privacy.html'];
let failures=0;
function check(ok,message){console.log((ok?'PASS':'FAIL')+' '+message);if(!ok)failures++;}
for(const page of pages){
  const text=readFileSync(resolve(root,page),'utf8');
  const ids=[...text.matchAll(/\\bid=["']([^"']+)["']/g)].map(m=>m[1]);
  const anchors=[...text.matchAll(/\\bhref=["']#([^"']+)["']/g)].map(m=>m[1]);
  check(new Set(ids).size===ids.length,page+': unique element IDs');
  check(anchors.every(id=>ids.includes(id)),page+': internal anchors exist');
  const localLinks=[...text.matchAll(/\\b(?:href|src)=["']([^"'#?:]+(?:\\.[a-z]+)?(?:#[^"']*)?)["']/gi)].map(m=>m[1]).filter(x=>!x.startsWith('data:')&&!x.startsWith('mailto:')&&!x.startsWith('javascript:')&&!x.startsWith('/'));
  for(const link of localLinks){const filename=link.split('#')[0];if(filename && !filename.startsWith('http'))check(existsSync(resolve(root,filename)),page+': local link exists: '+filename);}
}
const home=readFileSync(resolve(root,'index.html'),'utf8');
check(!/radioimg\\.audacy\\.com|informedclearly\\.com/.test(home),'no known third-party editorial image hotlinks');
check(home.includes('href="privacy.html"'),'contact-data notice linked on homepage');
check(home.includes('href="collaborate.html"'),'collaboration page linked on homepage');
check(home.includes('prefers-reduced-motion'),'reduced-motion styling present');
console.log(failures?failures+' check(s) failed.':'Static checks passed; manual mobile/form/privacy checks are still required.');
if(failures)process.exitCode=1;
