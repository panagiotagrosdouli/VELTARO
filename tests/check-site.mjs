// Static checks only; does not validate live form delivery or legal compliance.
import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const pages=['index.html','collaborate.html','privacy.html'];
let failures=0;
function check(ok,label){console.log((ok?'PASS':'FAIL')+' '+label);if(!ok)failures++}
for(const page of pages){
  const html=readFileSync(resolve(root,page),'utf8');
  const ids=[...html.matchAll(/\bid=["']([^"']+)["']/g)].map(x=>x[1]);
  check(ids.length===new Set(ids).size,page+' unique element IDs');
  const anchors=[...html.matchAll(/href=["']#([^"']+)["']/g)].map(x=>x[1]);
  check(anchors.every(a=>ids.includes(a)),page+' internal anchors');
  for(const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)){
    const link=match[1].split('#')[0];
    if(link && !/^(https?:|mailto:|tel:|data:|\/)/.test(link)){
      check(existsSync(resolve(root,link)),page+' local path '+link);
    }
  }
}
const homepage=readFileSync(resolve(root,'index.html'),'utf8');
check(homepage.includes('href="collaborate.html"'),'collaboration link');
check(homepage.includes('href="privacy.html"'),'privacy link');
check(homepage.includes('prefers-reduced-motion'),'reduced motion');
check(homepage.includes('const productImages=[')&&homepage.includes('const droneImages=['),'product image arrays');
console.log(failures?'Failures: '+failures:'Static checks passed. Manual QA still required.');
if(failures)process.exitCode=1;
