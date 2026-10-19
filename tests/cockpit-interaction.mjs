// DOM-free interaction checks for the non-operational cockpit concept.
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';

const html=readFileSync(resolve('cockpit-concept.html'),'utf8');
const match=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match,'Cockpit script exists');
const ids=['contextLabel','contextText','alertPriority','energyLabel','energyValue','energyNote','alertLabel','alertValue','alertNote','permissionLabel','permissionValue','permissionNote','modeNavigation','language','heading','intro','back','advisoryLabel','disclaimer','footer','mode','description','advisory','level'];
const elements=Object.fromEntries(ids.map(id=>[id,{textContent:'',listeners:{},addEventListener(event,fn){this.listeners[event]=fn;}}]));
const modes=['road','site','config','review','service'];
const buttons=modes.map(mode=>({dataset:{mode},textContent:'',pressed:'',listeners:{},setAttribute(k,v){if(k==='aria-pressed')this.pressed=v;},addEventListener(event,fn){this.listeners[event]=fn;},focus(){document.activeElement=this;},click(){this.listeners.click();}}));
const document={activeElement:null,documentElement:{lang:'en'},getElementById(id){assert.ok(elements[id],id);return elements[id]},querySelectorAll(selector){assert.equal(selector,'button[data-mode]');return buttons}};
runInNewContext(match[1],{document},{timeout:1000});
assert.equal(elements.mode.textContent,'ROAD');
assert.match(elements.contextText.textContent,/road information/);
assert.equal(elements.alertPriority.textContent,'ADVISORY · DEMO');
assert.equal(elements.energyValue.textContent,'NOT MEASURED');
assert.ok(!html.includes('width:42%'),'No fabricated battery percentage is visually represented');
assert.ok(html.includes('repeating-linear-gradient'),'Unknown battery status uses indeterminate decoration');
assert.match(html, /@media\(max-width:700px\)/, 'Compact layout breakpoint');
assert.match(html, /@media\(max-width:380px\)/, 'Very narrow screen layout breakpoint');
assert.match(html, /\.nav button\{[^}]*min-height:46px/, 'Mobile touch target height');
assert.match(html, /button:focus-visible/, 'Visible keyboard focus');
assert.match(html, /prefers-reduced-motion/, 'Reduced motion support');
assert.match(html, /id="alertPriority"/, 'Explicit demo advisory');
assert.equal(elements.permissionValue.textContent,'NOT ASSESSED');
assert.equal(buttons[0].pressed,'true');
elements.language.listeners.click();
assert.equal(document.documentElement.lang,'el');
assert.match(elements.contextText.textContent,/οδήγησης/);
assert.equal(elements.alertPriority.textContent,'ΕΝΗΜΕΡΩΣΗ · DEMO');
assert.equal(elements.energyValue.textContent,'ΧΩΡΙΣ ΜΕΤΡΗΣΗ');
assert.equal(elements.permissionValue.textContent,'ΔΕΝ ΕΛΕΓΧΘΗΚΕ');
assert.match(elements.permissionNote.textContent,/δεν παρέχει/);
assert.equal(elements.language.textContent,'EN');
assert.match(elements.heading.textContent,/cockpit/i);
assert.match(elements.disclaimer.textContent,/δεν/);
buttons[3].listeners.click();
assert.equal(elements.mode.textContent,'FLIGHT REVIEW');
assert.match(elements.contextText.textContent,/ετοιμότητα πτήσης/);
assert.equal(buttons[3].pressed,'true');
assert.equal(buttons[0].pressed,'false');
assert.match(elements.advisory.textContent,/Δεν υπάρχει ετοιμότητα/);
elements.language.listeners.click();
assert.equal(document.documentElement.lang,'en');
assert.equal(buttons[3].pressed,'true');
assert.match(elements.advisory.textContent,/Not flight-ready/);
for(const button of buttons){button.listeners.click();assert.equal(button.pressed,'true');assert.equal(buttons.filter(b=>b.pressed==='true').length,1);}
buttons[0].focus();
let prevented=false;
elements.modeNavigation.listeners.keydown({key:'ArrowRight',preventDefault(){prevented=true}});
assert.ok(prevented);
assert.equal(buttons[1].pressed,'true');
assert.equal(document.activeElement,buttons[1]);
elements.modeNavigation.listeners.keydown({key:'End',preventDefault(){}});
assert.equal(buttons[4].pressed,'true');
elements.modeNavigation.listeners.keydown({key:'Home',preventDefault(){}});
assert.equal(buttons[0].pressed,'true');
// Exercise all five modes in both languages; untranslated or stale copy is a regression.
for(const expectedLang of ['el','en']) {
  if(document.documentElement.lang!==expectedLang) elements.language.listeners.click();
  assert.equal(document.documentElement.lang,expectedLang);
  for(const button of buttons) {
    button.listeners.click();
    assert.ok(elements.contextText.textContent.length>15,'Mode has explanatory context');
    assert.ok(elements.description.textContent.length>15,'Mode has description');
    assert.ok(elements.advisory.textContent.length>15,'Mode has safety advisory');
    assert.equal(button.pressed,'true');
    assert.equal(buttons.filter(b=>b.pressed==='true').length,1);
  }
  assert.match(elements.disclaimer.textContent,expectedLang==='el'?/πτήση/:/flight/);
}
assert.ok(html.includes('not a flight simulator') || html.includes('no vehicle systems'),'concept-only notice');
console.log('Cockpit EN/EL interaction regression tests passed.');
