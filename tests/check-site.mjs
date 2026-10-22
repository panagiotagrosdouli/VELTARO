// Static checks only; does not validate live form delivery or legal compliance.
import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const pages=['index.html','collaborate.html','privacy.html','cockpit-concept.html','early-interest.html'];
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
check(homepage.includes('href="cockpit-concept.html"'),'V1 cockpit link');
const interestPage=readFileSync(resolve(root,'early-interest.html'),'utf8');
check(homepage.includes('href="early-interest.html"'),'early interest link');
check(/<form\b[^>]*\bid="interest-form"[^>]*>/.test(interestPage),'early interest valid form opening tag');
check(!/<form\b[^>]*<input/.test(interestPage),'form opening tag cannot swallow input');
check(interestPage.includes('method="POST"'),'early interest POST method');
check(interestPage.includes('type="email"') && interestPage.includes('name="research_profile"') && interestPage.includes('name="use_case"'),'research segmentation fields');
check(interestPage.includes('name="research_contact_consent"') && interestPage.includes('href="privacy.html"'),'consent and privacy notice');
check(homepage.includes('radioimg.audacy.com') && homepage.includes('informedclearly.com'),'original gallery image sources restored');
check(homepage.includes('name="contact_consent"'),'contact form captures consent');
check(homepage.includes('name="_captcha"') && interestPage.includes('name="_captcha"'),'inquiry forms anti-spam enabled');
check(homepage.includes('name="_autoresponse"') && interestPage.includes('name="_autoresponse"'),'inquiry forms acknowledgment configured');
check(homepage.includes('action="https://formsubmit.co/panagiotagrosdouli@gmail.com"'),'contact form recipient');
check(interestPage.includes('action="https://formsubmit.co/panagiotagrosdouli@gmail.com"'),'customer form recipient');
check(homepage.includes('name="_subject" value="VELTARO | New Website Contact Message"'),'contact email subject');
check(interestPage.includes('name="_subject" value="VELTARO | New Potential Customer Inquiry"'),'customer email subject');
for (const [name,html] of [['contact',homepage],['customer',interestPage]]) {
 const forms=[...html.matchAll(/<form\b[^>]*>/g)].map(m=>m[0]);
 check(forms.length===1,name+' exactly one form');
 check(forms[0]?.includes('method="POST"') && forms[0]?.includes('https://formsubmit.co/'),name+' actual POST action');
 check((html.match(new RegExp('</form>', 'g'))||[]).length===1,name+' form closes');
 check(!/<form\b[^>]*<input/.test(html),name+' opening markup clean');
 for(const field of ['name="name"','name="email"','name="message"','name="_subject"']) check(html.includes(field),name+' required field '+field);
}
const cockpit=readFileSync(resolve(root,'cockpit-concept.html'),'utf8');
for(const state of ['road','site','config','review','service']) check(cockpit.includes('data-mode="'+state+'"'),'cockpit '+state+' navigation');
check(homepage.includes('prefers-reduced-motion'),'reduced motion');
check(homepage.includes('const productImages=[')&&homepage.includes('const droneImages=['),'product image arrays');
for(const [field,limit] of [['name',100],['email',200],['interest',160],['message',1500]]) {
 const attrs=homepage.split('name="'+field+'"')[1]?.split('>')[0]||'';
 check(attrs.includes('maxlength="'+limit+'"'),'contact field '+field+' length limit');
}
const sitemap=readFileSync('sitemap.xml','utf8');
const robots=readFileSync('robots.txt','utf8');
check(robots.includes('Sitemap: https://panagiotagrosdouli.github.io/VELTARO/sitemap.xml'),'robots sitemap link');
for(const route of ['','early-interest.html','collaborate.html','cockpit-concept.html','privacy.html']) check(sitemap.includes('https://panagiotagrosdouli.github.io/VELTARO/'+route+'</loc>'),'sitemap route '+(route||'homepage'));
for (const [label,html,path] of [['homepage',homepage,''],['early interest',interestPage,'early-interest.html']]) {
 const url='https://panagiotagrosdouli.github.io/VELTARO/'+path;
 check(html.includes('rel="canonical" href="'+url+'"'),label+' canonical address');
 check(html.includes('property="og:url" content="'+url+'"'),label+' social URL');
 check(html.includes('property="og:description"'),label+' social description');
}
check(readFileSync(resolve(root,'privacy.html'),'utf8').includes('mailto:panagiotagrosdouli@gmail.com'),'privacy inquiry contact is reachable');
check(readFileSync(resolve(root,'privacy.html'),'utf8').includes('customer research form'),'privacy notice mentions separate research form');
check(homepage.includes('CONCEPT STAGE · INDEPENDENT PROJECT'),'pre-company status visible on homepage');
check(homepage.includes('href="early-interest.html">Join early research'),'clear research CTA');
check(homepage.includes('href="collaborate.html">Explore collaboration'),'clear collaboration CTA');
console.log(failures?'Failures: '+failures:'Static checks passed. Manual QA still required.');
if(failures)process.exitCode=1;
