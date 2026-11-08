// Launch-page checks. Legacy showroom-specific assertions were removed when the homepage was redesigned.
import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const pages=['index.html','collaborate.html','privacy.html','cockpit-concept.html','early-interest.html'];
let failures=0;
function check(ok,label){console.log((ok?'PASS':'FAIL')+' '+label);if(!ok)failures++}
const read=name=>readFileSync(resolve(root,name),'utf8');
for(const page of pages){
  const html=read(page);
  const ids=[...html.matchAll(/\bid=["']([^"']+)["']/g)].map(x=>x[1]);
  check(ids.length===new Set(ids).size,page+' unique IDs');
  const anchors=[...html.matchAll(/href=["']#([^"']+)["']/g)].map(x=>x[1]);
  check(anchors.every(a=>ids.includes(a)),page+' internal anchors');
  for(const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)){
    const link=match[1].split('#')[0];
    if(link && !/^(https?:|mailto:|tel:|data:|\/)/.test(link))check(existsSync(resolve(root,link)),page+' local path '+link);
  }
}
const home=read('index.html'),interest=read('early-interest.html'),privacy=read('privacy.html'),cockpit=read('cockpit-concept.html');
// Validate cross-page fragments as well as same-document anchors.
for(const page of pages){
 const html=read(page);
 for(const match of html.matchAll(/href=["']([^"']+\.html#[^"']+)["']/g)){
  const [target,fragment]=match[1].split('#');
  if(existsSync(resolve(root,target))){
   const targetHtml=readFileSync(resolve(root,target),'utf8');
   check([...targetHtml.matchAll(/\bid=["']([^"']+)["']/g)].some(x=>x[1]===fragment),page+' cross-page anchor '+match[1]);
  }
 }
 for(const match of html.matchAll(/<a\b([^>]*target=["']_blank["'][^>]*)>/gi))
  check(/\brel=["'][^"']*\bnoopener\b[^"']*\b noreferrer\b|\brel=["'][^"']*\bnoreferrer\b[^"']*\bnoopener\b/i.test(match[1]),page+' secure new-tab link');
 check(/<title>[^<]+<\/title>/i.test(html),page+' unique page title present');
 check(/<meta\s+name=["']description["']\s+content=["'][^"']{40,}["']/i.test(html),page+' meta description present');
 check(/<link\s+rel=["']canonical["']\s+href=["']https:\/\/panagiotagrosdouli\.github\.io\/VELTARO\/[^"']*["']/i.test(html),page+' GitHub Pages canonical');
 check(/<meta\s+property=["']og:url["']\s+content=["']https:\/\/panagiotagrosdouli\.github\.io\/VELTARO\/[^"']*["']/i.test(html),page+' Open Graph URL');
 check(/<meta\s+name=["']twitter:card["']\s+content=["']summary["']/i.test(html),page+' social card');
}
const websiteSchema=home.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
check(!!websiteSchema,'homepage structured data exists');
if(websiteSchema){try{const schema=JSON.parse(websiteSchema[1]);check(schema['@type']==='WebSite'&&schema.url==='https://panagiotagrosdouli.github.io/VELTARO/','homepage structured data is valid');}catch{check(false,'homepage structured data is valid')}}
for(const path of ['collaborate.html','early-interest.html','privacy.html'])check(home.includes('href="'+path+'"'),'homepage link '+path);
check(/<main\b[^>]*id=["']main["']/.test(home),'semantic main landmark');
check(/class=["']skip["'][^>]*href=["']#main["']/.test(home),'keyboard skip link');
check(home.includes('prefers-reduced-motion:reduce'),'reduced motion preference');
check(home.includes('Concept-stage venture'),'concept-stage disclosure');
check(home.includes('No working vehicle, certification, sales, or reservations'),'honest availability disclaimer');
check(home.includes('href="#vision"'),'vision CTA');
check(home.includes('href="early-interest.html"'),'customer research CTA');
check(home.includes('href="collaborate.html"'),'collaboration CTA');
check(home.includes('name="viewport"'),'responsive viewport');
check(home.includes('@media(max-width:760px)'),'mobile layout');
check(home.includes(':focus-visible'),'keyboard focus styling');
check(!home.includes('VISION SYSTEM / 2070'),'no speculative milestone year');
check(/<form\b[^>]*id="interest-form"[^>]*>/.test(interest),'customer form exists');
check(interest.includes('method="POST"') && interest.includes('action="https://formsubmit.co/panagiotagrosdouli@gmail.com"'),'customer form POST recipient');
check((interest.match(/<\/form>/g)||[]).length===1,'customer form closed');
for(const field of ['name','email','message','_subject','research_profile','use_case','research_contact_consent','_captcha','_autoresponse']){
  check(interest.includes('name="'+field+'"'),'customer form '+field);
}
check(interest.includes('href="privacy.html"'),'customer form consent notice');
check(home.includes('name="_subject" value="VELTARO | New Website Contact Message"'),'homepage contact form subject');
check(existsSync(resolve(root,'v1-evidence-dashboard.html')),'engineering evidence dashboard exists');
const dashboard=read('v1-evidence-dashboard.html');
check(dashboard.includes('name="robots" content="noindex,follow"'),'engineering dashboard is excluded from search indexing');
check(dashboard.includes('id="dependency-body"')&&dashboard.includes('id="subsystems"'),'engineering dashboard data regions');
check(privacy.includes('mailto:panagiotagrosdouli@gmail.com'),'privacy contact');
check(privacy.includes('customer research form'),'privacy research disclosure');
for(const mode of ['road','site','config','review','service'])check(cockpit.includes('data-mode="'+mode+'"'),'cockpit mode '+mode);
const sitemap=read('sitemap.xml'),robots=read('robots.txt');
check(robots.includes('Sitemap: https://panagiotagrosdouli.github.io/VELTARO/sitemap.xml'),'robots sitemap');
for(const route of ['','early-interest.html','collaborate.html','cockpit-concept.html','privacy.html'])check(sitemap.includes('https://panagiotagrosdouli.github.io/VELTARO/'+route+'</loc>'),'sitemap route '+(route||'home'));
for(const [label,html,path] of [['homepage',home,''],['interest',interest,'early-interest.html']]){
 const url='https://panagiotagrosdouli.github.io/VELTARO/'+path;
 check(html.includes('rel="canonical" href="'+url+'"'),label+' canonical');
 check(html.includes('property="og:url" content="'+url+'"'),label+' social url');
 check(html.includes('property="og:description"'),label+' social description');
}
console.log(failures?'Failures: '+failures:'Static checks passed. Form delivery, accessibility and legal review still require manual verification.');
if(failures)process.exitCode=1;

