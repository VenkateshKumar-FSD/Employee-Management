const EKEY='ems_employees';
function load(){ try{ return JSON.parse(localStorage.getItem(EKEY))||[] }catch{return []} }
function save(a){ try{ localStorage.setItem(EKEY, JSON.stringify(a)) }catch{} }
export default {
  async list(){ return { data: { data: load() } }; },
  async get(id){ const r = load().find(x=>x.id===id); return { data: r }; },
  async create(emp){ const all = load(); const n = { ...emp, id:'e'+Date.now() }; all.push(n); save(all); return { data: n }; },
  async update(id,p){ let all = load(); all = all.map(x=> x.id===id?{...x,...p}:x); save(all); return { data: true }; },
  async remove(id){ let all = load(); all = all.filter(x=>x.id!==id); save(all); return { data: true }; }
};
