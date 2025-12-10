import React, { useCallback, useEffect, useRef, useState, useContext } from "react";
import attendanceService from "../../services/attendanceService";
import { AuthContext } from "../../context/AuthContext";

export default function AttendanceCamera(){
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [today, setToday] = useState(null);
  const [loading, setLoading] = useState(false);

  const start = useCallback(async ()=> {
    try{
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      streamRef.current = s;
      if(videoRef.current){ videoRef.current.srcObject = s; await videoRef.current.play(); }
    }catch(err){ console.warn('camera', err); }
  }, []);

  const stop = useCallback(()=> {
    try{ const s = streamRef.current; if(s) s.getTracks().forEach(t=>t.stop()); if(videoRef.current) videoRef.current.srcObject = null; }catch{}
  },[]);

  useEffect(()=>{ start(); return ()=>stop(); },[start,stop]);

  const capture = useCallback(()=> {
    const v = videoRef.current;
    if(!v) return;
    const c = canvasRef.current;
    c.width = v.videoWidth || 640; c.height = v.videoHeight || 480;
    const ctx = c.getContext('2d'); ctx.drawImage(v,0,0,c.width,c.height);
    const data = c.toDataURL('image/png'); setPhoto(data); return data;
  },[]);

  const loadToday = useCallback(async ()=>{ if(!user?.employeeId) return; const r = await attendanceService.getTodayLog(user.employeeId); setToday(r.data); },[user]);

  useEffect(()=>{ loadToday(); },[loadToday]);

  const handleClockIn = useCallback(async ()=>{ setLoading(true); try{ const data = capture(); await attendanceService.clockIn({ employeeId: user.employeeId, photoDataUrl: data }); await loadToday(); alert('Clocked in'); }catch(e){ alert(e.message||'Failed') } finally{ setLoading(false); } },[capture, user, loadToday]);

  const handleClockOut = useCallback(async ()=>{ setLoading(true); try{ const data = capture(); await attendanceService.clockOut({ employeeId: user.employeeId, photoDataUrl: data }); await loadToday(); alert('Clocked out'); }catch(e){ alert(e.message||'Failed') } finally{ setLoading(false); } },[capture, user, loadToday]);

  return (
    <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
      <div style={{flex:1,minWidth:280}}>
        <div className="card">
          <div style={{fontWeight:700}}>Camera</div>
          <div style={{marginTop:8,background:'#000',height:280,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <video ref={videoRef} style={{maxWidth:'100%',maxHeight:'100%'}} playsInline muted />
            <canvas ref={canvasRef} style={{display:'none'}} />
          </div>
          <div style={{marginTop:8,display:'flex',gap:8}}>
            <button className="btn" onClick={()=>capture()}>Capture</button>
            <button className="btn" onClick={()=>start()}>Start</button>
            <button className="btn" onClick={()=>stop()}>Stop</button>
          </div>
        </div>
        {photo && <div className="card" style={{marginTop:8}}><img src={photo} alt="preview" style={{width:'100%'}} /></div>}
      </div>
      <div style={{width:320}}>
        <div className="card">
          <div style={{fontWeight:700}}>Today</div>
          <div style={{marginTop:8}}><div className="text-muted">Clock in</div><div>{today?.clockIn ? new Date(today.clockIn).toLocaleString() : '-'}</div></div>
          <div style={{marginTop:8}}><div className="text-muted">Clock out</div><div>{today?.clockOut ? new Date(today.clockOut).toLocaleString() : '-'}</div></div>
          <div style={{marginTop:12}}>
            {!today?.clockIn && <button className="btn" onClick={handleClockIn} disabled={loading}>{loading?'...':'Clock In'}</button>}
            {today?.clockIn && !today?.clockOut && <button className="btn" onClick={handleClockOut} disabled={loading}>{loading?'...':'Clock Out'}</button>}
            {today?.clockIn && today?.clockOut && <div className="text-muted">Attendance complete</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
