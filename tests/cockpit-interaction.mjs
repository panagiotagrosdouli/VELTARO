// DOM-free interaction checks for the non-operational cockpit concept.
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';

const html=readFileSync(resolve('cockpit-concept.html'),'utf8');
const match=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match,'Cockpit script exists');
const ids=['language','heading','intro','back','advisoryLabel','disclaimer','footer','mode','description','advisory','level'];
const elements=Object.fromEntries(ids.map(id=>[id,{textContent:'',listeners:{},addEventListener(event,fn){this.listeners[event]=fn;}}]));
const modes=['road','site','config','review','service'];
const buttons=modes.map(mode=>({dataset:{mode},textContent:'',pressed:'',listeners:{},setAttribute(k,v){if(k==='aria-pressed')this.pressed=v;},addEventListener(event,fn){this.listeners[event]=fn;}}));
const document={documentElement:{lang:'en'},getElementById(id){assert.ok(elements[id],id);return elements[id]},querySelectorAll(selector){assert.equal(selector,'button[data-mode]');return buttons}};
runInNewContext(match[1],{document},{timeout:1000});
assert.equal(elements.mode.textContent,'ROAD');
assert.equal(buttons[0].pressed,'true');
elements.language.listeners.click();
assert.equal(document.documentElement.lang,'el');
assert.equal(elements.language.textContent,'EN');
assert.match(elements.heading.textContent,/cockpit/i);
assert.match(elements.disclaimer.textContent,/δεν/);
buttons[3].listeners.click();
assert.equal(elements.mode.textContent,'FLIGHT REVIEW');
assert.equal(buttons[3].pressed,'true');
assert.equal(buttons[0].pressed,'false');
assert.match(elements.advisory.textContent,/Δεν υπάρχει ετοιμότητα/);
elements.language.listeners.click();
assert.equal(document.documentElement.lang,'en');
assert.equal(buttons[3].pressed,'true');
assert.match(elements.advisory.textContent,/Not flight-ready/);
for(const button of buttons){button.listeners.click();assert.equal(button.pressed,'true');assert.equal(buttons.filter(b=>b.pressed==='true').length,1);}
assert.ok(html.includes('not a flight simulator') || html.includes('no vehicle systems'),'concept-only notice');
console.log('Cockpit EN/EL interaction regression tests passed.');
