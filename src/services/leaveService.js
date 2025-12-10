const LKEY='ems_leaves';
function load(){ try{ return JSON.parse(localStorage.getItem(LKEY))||[] }catch{return []} }
function save(a){ try{ localStorage.setItem(LKEY, JSON.stringify(a)) }catch{} }
export default {
  async apply(payload){ const all = load(); const rec = { id:'l'+Date.now(), ...payload, status:'pending', requestedAt: new Date().toISOString() }; all.push(rec); save(all); return { data: rec }; },
  async listAll(){ return { data: load() }; },
  async listByEmployee(empId){ return { data: load().filter(x=>x.employeeId===empId) }; },
  async approve(id){ const all = load(); const r = all.find(x=>x.id===id); if(r) r.status='approved'; save(all); return { data:true }; },
  async reject(id){ const all = load(); const r = all.find(x=>x.id===id); if(r) r.status='rejected'; save(all); return { data:true }; }
};
