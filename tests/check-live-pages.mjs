// Non-invasive GET checks for public GitHub Pages routes. Does not submit forms.
const base='https://panagiotagrosdouli.github.io/VELTARO/';
const routes=['','early-interest.html','collaborate.html','privacy.html','cockpit-concept.html','assets/v1-concept.svg','assets/v1-flying-design.svg'];
let failures=0;
for(const route of routes){
 const url=new URL(route,base);
 try {
  const response=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(15000)});
  const text=await response.text();
  const ok=response.ok && text.length>100 && (route.endsWith('.html')||route===''?text.toLowerCase().includes('<html'):text.includes('<svg'));
  console.log((ok?'PASS':'FAIL')+' '+response.status+' '+url);
  if(!ok)failures++;
  if(route==='early-interest.html'){
   const formOk=text.includes('action="https://formsubmit.co/panagiotagrosdouli@gmail.com"') && text.includes('name="_subject"') && text.includes('id="interest-form"');
   console.log((formOk?'PASS':'FAIL')+' published customer form configuration');
   if(!formOk)failures++;
  }
 } catch(error){failures++;console.error('FAIL '+url+' '+error.message)}
}
if(failures)process.exitCode=1;
