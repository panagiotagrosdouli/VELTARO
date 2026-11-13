"""Check all static HTML links/assets/fragments, duplicate IDs and basic a11y semantics."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,sys,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__();self.ids=[];self.links=[];self.missing_alt=0;self.lang=False;self.title=False;self.feed(s)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='html':self.lang=bool(a.get('lang'))
  if tag=='title':self.title=True
  if tag=='img' and 'alt' not in a:self.missing_alt+=1
  for key in ['href','src']:
   if a.get(key):self.links.append(a[key])
errors=[];pages={p:Page(p.read_text()) for p in ROOT.glob('*.html')}
for p,data in pages.items():
 if len(data.ids)!=len(set(data.ids)):errors.append(p.name+': duplicate ids')
 if not data.lang or not data.title:errors.append(p.name+': title/lang absent')
 if data.missing_alt:errors.append(p.name+': image alt absent')
 for raw in data.links:
  u=urlsplit(raw)
  if u.scheme or u.netloc or raw.startswith('/'):continue
  target=(p.parent/unquote(u.path)).resolve() if u.path else p
  if target.is_dir():target=target/'index.html'
  if not target.exists():errors.append(f'{p.name}: missing {raw}')
  elif u.fragment and target.suffix=='.html':
   parsed=pages.get(target) or Page(target.read_text())
   if unquote(u.fragment) not in parsed.ids:errors.append(f'{p.name}: missing fragment {raw}')
for p in ROOT.rglob('*.svg'):
 try:ET.parse(p)
 except ET.ParseError as e:errors.append(str(p.relative_to(ROOT))+': '+str(e))
for p in (ROOT/'engineering').rglob('*.json'):json.loads(p.read_text())
print(f'{len(pages)} HTML pages, SVG XML and engineering JSON checked')
for e in errors:print('FAIL',e)
sys.exit(bool(errors))
