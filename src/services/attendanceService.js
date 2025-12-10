const AKEY='ems_attendance';
function load(){ try{ return JSON.parse(localStorage.getItem(AKEY))||[] }catch{return []} }
function save(a){ try{ localStorage.setItem(AKEY, JSON.stringify(a)) }catch{} }
export default {
  async listAll(){ return { data: load() }; },
  async listByEmployee(id){ return { data: load().filter(x=>x.employeeId===id) }; },
  async getTodayLog(id){ const today = new Date().toISOString().slice(0,10); return { data: load().find(x=>x.employeeId===id && x.date===today) || null }; },
  async clockIn({employeeId,photoDataUrl}){ const all = load(); const today = new Date().toISOString().slice(0,10); if(all.find(x=>x.employeeId===employeeId && x.date===today)) throw new Error('Already clocked in'); const entry = { id:'a'+Date.now(), employeeId, date:today, clockIn:new Date().toISOString(), clockOut:null, photoIn:photoDataUrl, photoOut:null }; all.push(entry); save(all); return { data: entry }; },
  async clockOut({employeeId,photoDataUrl}){ const all = load(); const today = new Date().toISOString().slice(0,10); const e = all.find(x=>x.employeeId===employeeId && x.date===today); if(!e) throw new Error('Not clocked in'); if(e.clockOut) throw new Error('Already clocked out'); e.clockOut=new Date().toISOString(); e.photoOut=photoDataUrl; save(all); return { data: e }; }
};
