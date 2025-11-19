import { useState } from 'react';

export default function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState('Lucien1409@gmail.streaming.com');
  const [password, setPassword] = useState('Streaming.Lucien');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Login fehlgeschlagen');
      const data = await res.json();
      localStorage.setItem('animal_admin_token', data.token);
      onSuccess && onSuccess(data.token);
    } catch (err) {
      setError(err.message || 'Fehler');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-6">
      <form onSubmit={login} className="w-full max-w-md bg-black border border-orange-500/30 rounded-2xl p-6 text-orange-100 shadow-xl">
        <h3 className="text-2xl font-bold text-orange-400">Admin Login</h3>
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-sm text-orange-200/70">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full bg-black border border-orange-500/40 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="text-sm text-orange-200/70">Passwort</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full bg-black border border-orange-500/40 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <button disabled={loading} className="mt-5 w-full px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 transition-colors disabled:opacity-60">{loading ? 'Anmelden...' : 'Anmelden'}</button>
      </form>
    </div>
  );
}
