// Shared by the ordering page and the store board.
// Menu, options and deals as read from each store's GloriaFood page on 5 Nov 2026. Pizza prices are small; medium +$1, large +$2.
// DEMO STORAGE: orders live in this browser's localStorage and are mirrored across tabs. The live version posts them to the
// Station platform instead (orders table + contact record), which is what the board and customer list would read.
(() => {
const STD = [[10,21],[10,21],[10,21],[10,21],[10,22],[10,22],[11,21]]; // Monday first
const S = [
  {k:'swokc', t:'SW OKC & Moore', a:'11613 S Western Ave', c:'Oklahoma City 73170', p:'405-703-4555', h:[[10,22],[10,22],[10,22],[10,22],[10,22],[10,22],[10,22]]},
  {k:'mwc', t:'Midwest City', a:'1920 S Air Depot Blvd', c:'Midwest City 73110', p:'405-455-5822', h:[[10,21],[10,21],[10,21],[10,21],[10,22],[10,22],null]},
  {k:'harrah', t:'Harrah', a:'20213 NE 23rd St', c:'Harrah 73045', p:'405-309-6500', h:STD, x:'Drive-thru'},
  {k:'norman', t:'Norman', a:'1951 W Lindsey St', c:'Norman 73069', p:'405-701-5757', h:STD},
  {k:'classen', t:'North Classen', a:'3513 N Classen Blvd', c:'Oklahoma City 73118', p:'405-900-5724', h:STD},
  {k:'lex', t:'Lexington', a:'128 N Main St', c:'Lexington 73051', p:'405-955-0055', h:[[10,21],[10,21],[10,21],[10,21],[10,22],[10,22],[10,21]]},
  {k:'holden', t:'Holdenville', a:'101 E Highway St', c:'Holdenville 74848', p:'405-379-2900', h:STD},
];
const CRUSTS = [['Hand tossed',0],['Thin',0],['Gluten-free',4],['Stuffed',5]];
const SAUCES = ['Marinara','Alfredo','BBQ','Garlic butter','Olive oil','No sauce'];
const TOPS = ['Pepperoni','Sausage','Beef','Canadian bacon','Italian sausage','Bacon','Chicken','Gyro meat','Anchovies','Onions','Mushrooms','Bell peppers','Black olives','Green olives','Tomatoes','Jalapeños','Banana peppers','Spinach','Pineapple'];
const EXTRAS = [['Extra cheese',3],['Feta cheese',3],['Extra pepperoni',2],['Extra sausage',2],['Extra beef',2],['Extra bacon',2],['Extra chicken',2],['Sauce on the side',0.5]];
const SPEC = [
  ['The Works','Pepperoni, sausage, beef, Canadian bacon, onions, green peppers, mushrooms, black olives, extra cheese'],
  ['All Meat','Pepperoni, sausage, beef, Canadian bacon, extra cheese'],
  ['The Ultimate Meat','Pepperoni, sausage, beef, Canadian bacon, Italian sausage, bacon, chicken, extra cheese','img/supreme-closeup.jpg'],
  ['Hawaiian','Canadian bacon, pineapple, extra cheese','img/hawaiian.jpg'],
  ['The Veggie','Onions, green peppers, black olives, mushrooms, tomatoes, extra cheese'],
  ['Alfredo Chicken','Alfredo sauce, chicken breast, extra cheese'],
  ['Spinach Alfredo','Alfredo sauce, spinach, extra cheese'],
  ['The Greek','Gyro meat, onion, tomatoes, feta, extra mozzarella'],
  ['Original BBQ Chicken','BBQ sauce, chicken, extra cheese'],
  ['Margarita','Italian tomatoes, basil, Parmesan, extra cheese'],
  ['Chicken Bacon Ranch','Ranch, chicken, bacon'],
];
const MENU = [
  {id:'byo', cat:'Pizza', name:'Build your own pizza', desc:'Hand-tossed, your toppings. 1 topping $8.99, 2 for $9.99, 3 or more $10.99 (small).', price:8.99, opt:'byo', pizza:true, img:'img/pepperoni-box.jpg'},
  {id:'cauli', cat:'Pizza', name:'Cauliflower crust pizza', desc:'Unlimited toppings.', price:13.99, opt:'cauli', pizza:true},
  ...SPEC.map(([n,d,img],i) => ({id:'sp'+i, cat:'Specialty pizzas', name:n, desc:d, price:10.99, opt:'spec', pizza:true, img: img || (i === 0 ? 'img/combo-box.jpg' : '')})),
  {id:'cz0', cat:'Calzones', name:'Original calzone', desc:'Sausage, Canadian bacon, onions, mushrooms', price:9.99, opt:'calzone'},
  {id:'cz1', cat:'Calzones', name:'All Meat calzone', desc:'Pepperoni, sausage, beef, Canadian bacon', price:9.99, opt:'calzone'},
  {id:'cz2', cat:'Calzones', name:'Supreme calzone', desc:'Pepperoni, sausage, Canadian bacon, beef, onion, green peppers, black olives, mushrooms', price:9.99, opt:'calzone'},
  {id:'gy0', cat:'Gyros', name:'Gyro sandwich', desc:'Lettuce, tomato, onions, gyro meat, cucumber sauce, pita', price:6.99},
  {id:'gy1', cat:'Gyros', name:'Western gyro', desc:'Melted mozzarella, grilled onions, green peppers, gyro meat, pita', price:7.99},
  {id:'gy2', cat:'Gyros', name:'Gyro combo', desc:'Gyro sandwich, bag of chips, can of soda', price:8.99},
  {id:'gy3', cat:'Gyros', name:'Gyro platter', desc:'Small Greek salad, gyro meat, pita cut in fourths', price:10.99},
  {id:'gy4', cat:'Gyros', name:'Low-carb gyro', desc:'Small Greek salad, side of gyro meat', price:9.99},
  {id:'gy5', cat:'Gyros', name:'Gyro meat', desc:'A side of gyro meat', price:6.99},
  {id:'wg', cat:'Wings', name:'Chicken wings', desc:'BBQ, buffalo or plain', price:6.99, opt:'wings'},
  {id:'sa0', cat:'Salads', name:'Garden salad', desc:'Lettuce, tomato, black olives, cucumber, onions, mozzarella', price:5.99},
  {id:'sa1', cat:'Salads', name:'Greek salad', desc:'Lettuce, tomato, black olives, gyro meat, onions, feta, cucumber', price:5.99},
  {id:'sa2', cat:'Salads', name:'Chef salad', desc:'Lettuce, tomato, black olives, Canadian bacon, onions, mozzarella', price:5.99},
  {id:'sa3', cat:'Salads', name:'Garlic chicken salad', desc:'Lettuce, tomato, black olives, chicken, onions, mozzarella', price:5.99},
  {id:'si0', cat:'Sticks & pies', name:'Bread sticks', price:3.99},
  {id:'si1', cat:'Sticks & pies', name:'Cinnamon sticks', price:3.99},
  {id:'si2', cat:'Sticks & pies', name:'Cheese sticks', price:5.99},
  {id:'si3', cat:'Sticks & pies', name:'Chocolate chip cookie pie', price:5.99},
  {id:'si4', cat:'Sticks & pies', name:'Vanilla icing cookie pie', price:5.99},
  {id:'dr0', cat:'Drinks', name:'Can of soda', price:1.50, opt:'drink', flavors:['Coke','Diet Coke','Sprite','Fanta Orange','Dr Pepper','Diet Dr Pepper',"Barq's Root Beer"]},
  {id:'dr1', cat:'Drinks', name:'Lemonade or Strawberry Fanta', price:3.25, opt:'drink', flavors:['Lemonade','Strawberry Fanta']},
  {id:'dr2', cat:'Drinks', name:'Coke Zero', price:3.25},
];
// which lines the SW OKC pick-up 10% covers: wings, sandwiches (gyros), calzones, salads, drinks
const TEN = new Set(['Wings','Gyros','Calzones','Salads','Drinks']);

const DAY = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const h12 = h => (h % 12 || 12) + (h < 12 || h === 24 ? ' am' : ' pm');
function clock(){
  const f = new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',weekday:'short',hour:'numeric',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
  const g = t => f.find(x => x.type === t).value;
  return {d:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(g('weekday')), t:+g('hour') + +g('minute')/60};
}
function today(s){
  const {d,t} = clock(), x = s.h[d];
  if (x && t >= x[0] && t < x[1]) return {open:true, txt:'Open now, until ' + h12(x[1])};
  if (x && t < x[0]) return {open:false, txt:'Closed, opens at ' + h12(x[0])};
  for (let i = 1; i < 8; i++){ const n = s.h[(d+i)%7]; if (n) return {open:false, txt:'Closed, opens ' + (i === 1 ? 'tomorrow' : DAY[(d+i)%7]) + ' at ' + h12(n[0])}; }
  return {open:false, txt:'Closed'};
}
const money = n => '$' + (Math.round(n * 100) / 100).toFixed(2);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');

function deals(s, how){
  if (how === 'pick') return ['35% off every pizza, taken off below'].concat(s.k === 'swokc' ? ['10% off wings, gyros, calzones, salads and drinks'] : []);
  return s.k === 'norman' ? [] : ['Order 2 large pizzas: free bread or cinnamon sticks'];
}
function priceOrder(cart, s, how){
  const sub = cart.reduce((a,l) => a + l.unit * l.qty, 0), disc = [];
  if (how === 'pick') {
    const pz = cart.filter(l => l.pizza).reduce((a,l) => a + l.unit * l.qty, 0);
    if (pz) disc.push({label:'35% off pizza, pick-up', amt:Math.round(pz * 35) / 100});
    if (s.k === 'swokc') { const o = cart.filter(l => TEN.has(l.cat)).reduce((a,l) => a + l.unit * l.qty, 0); if (o) disc.push({label:'10% off, pick-up', amt:Math.round(o * 10) / 100}); }
  } else if (s.k !== 'norman' && cart.filter(l => l.large).reduce((a,l) => a + l.qty, 0) >= 2) {
    disc.push({label:'Free bread or cinnamon sticks', amt:0});
  }
  const off = disc.reduce((a,d) => a + d.amt, 0);
  return {sub:Math.round(sub*100)/100, disc, total:Math.round((sub - off)*100)/100};
}

/* demo order store */
const KEY = 'eop-orders';
const ch = 'BroadcastChannel' in window ? new BroadcastChannel('eop-orders') : null;
function getOrders(){ try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
function putOrders(o){ try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} if (ch) ch.postMessage('changed'); }
function saveOrder(o){
  const all = getOrders();
  const prior = all.filter(x => x.phone === o.phone).length;
  const order = Object.assign({no: 1001 + all.length, ts: Date.now(), status:'new', firstOrder: prior === 0}, o);
  all.push(order); putOrders(all); return order;
}
function setStatus(no, status){ const all = getOrders(), o = all.find(x => x.no === no); if (o) { o.status = status; o[status + 'At'] = Date.now(); putOrders(all); } }
function onChange(fn){ if (ch) ch.onmessage = fn; window.addEventListener('storage', e => { if (e.key === KEY) fn(); }); }

window.EOP = {S, MENU, CRUSTS, SAUCES, TOPS, EXTRAS, today, money, esc, deals, priceOrder, saveOrder, getOrders, putOrders, setStatus, onChange};
})();
