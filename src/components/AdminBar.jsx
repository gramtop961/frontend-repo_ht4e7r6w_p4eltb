import { useState } from 'react';

export default function AdminBar({ onCreate }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-30">
      {open && (
        <div className="mb-3 p-3 bg-black/80 border border-orange-500/40 rounded-xl backdrop-blur text-orange-100 shadow-lg">
          <h4 className="font-semibold text-orange-400 mb-2">Quick Actions</h4>
          <div className="flex flex-wrap gap-2">
            {['news','film','partner','production'].map(c => (
              <button key={c} onClick={() => onCreate && onCreate(c)} className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-sm">Neu: {c}</button>
            ))}
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(!open)} className="px-4 py-2 rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-lg">{open ? 'Schließen' : 'Admin'}</button>
    </div>
  );
}
