import { useEffect, useState } from 'react';

export default function CookieGate({ onChoice }) {
  const [consented, setConsented] = useState(false);
  const [askAdmin, setAskAdmin] = useState(false);

  useEffect(() => {
    const c = localStorage.getItem('animal_cookie_ok') === '1';
    if (c) {
      setConsented(true);
      setAskAdmin(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('animal_cookie_ok', '1');
    setConsented(true);
    setAskAdmin(true);
  };

  if (!askAdmin) {
    return (
      <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-black border border-orange-500/30 rounded-2xl p-6 text-orange-100 shadow-xl">
          <h3 className="text-2xl font-bold text-orange-400">Cookies & Datenschutz</h3>
          <p className="mt-2 text-orange-200/80">Wir verwenden Cookies für ein besseres Erlebnis. Stimmen Sie der Nutzung zu?</p>
          <div className="mt-4 flex gap-3">
            <button onClick={acceptCookies} className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 transition-colors">Akzeptieren</button>
            <button onClick={() => onChoice && onChoice({ admin: false })} className="px-4 py-2 rounded-lg border border-orange-500/40 hover:bg-orange-500/10 transition-colors">Ablehnen</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-black border border-orange-500/30 rounded-2xl p-6 text-orange-100 shadow-xl">
        <h3 className="text-2xl font-bold text-orange-400">Möchten Sie als Admin fortfahren?</h3>
        <p className="mt-2 text-orange-200/80">Mit Admin-Zugang können Sie Inhalte bearbeiten.</p>
        <div className="mt-4 flex gap-3">
          <button onClick={() => onChoice && onChoice({ admin: true })} className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 transition-colors">Ja</button>
          <button onClick={() => onChoice && onChoice({ admin: false })} className="px-4 py-2 rounded-lg border border-orange-500/40 hover:bg-orange-500/10 transition-colors">Nein</button>
        </div>
      </div>
    </div>
  );
}
