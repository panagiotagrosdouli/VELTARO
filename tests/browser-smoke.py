from pathlib import Path
import os,subprocess,time,urllib.request,json,sys,socket
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
with socket.socket() as sock:
 sock.bind(('127.0.0.1',0));port=sock.getsockname()[1]
server=subprocess.Popen([sys.executable,"-m","http.server",str(port),"--bind","127.0.0.1"],cwd=root,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
try:
 for attempt in range(50):
  try:urllib.request.urlopen(f"http://127.0.0.1:{port}/",timeout=1);break
  except OSError:time.sleep(.1)
 with sync_playwright() as p:
  executable=os.environ.get("CHROMIUM_PATH")
  browser=p.chromium.launch(**({"executable_path":executable} if executable else {}),headless=True,args=["--no-sandbox"])
  page=browser.new_page();errors=[];page.on('pageerror',lambda error:errors.append(str(error)));results=[]
  for width in [390,1440]:
   page.set_viewport_size({"width":width,"height":1000})
   for file in sorted(root.glob('*.html')):
    response=page.goto(f"http://127.0.0.1:{port}/{file.name}")
    assert response.status==200,file.name
    assert not page.evaluate('document.documentElement.scrollWidth>innerWidth+2'),file.name
    if width==1440:
     page.add_script_tag(path=str(root/'tests/vendor/axe.min.js'))
     violations=page.evaluate("async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))")
     assert not violations,(file.name,violations)
    results.append({"page":file.name,"width":width,"http":response.status})
  page.goto(f"http://127.0.0.1:{port}/")
  page.click('#startup-language');assert page.locator('html').get_attribute('lang')=='el'
  page.locator('.corporate-nav summary').click();assert page.locator('.dropdown').is_visible()
  page.goto(f"http://127.0.0.1:{port}/about.html");page.click('#locale');assert page.locator('#greek').is_visible()
  assert not errors,errors
  browser.close();print(json.dumps({"routes":len(results),"pageErrors":errors,"scope":"static browser smoke; no form delivery or physical evidence"}))
finally:server.terminate();server.wait(timeout=5)
