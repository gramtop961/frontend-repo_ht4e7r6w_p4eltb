import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL;

async function fetchList(collection) {
  const res = await fetch(`${API}/api/${collection}`);
  return res.json();
}

async function createDoc(collection, payload, token) {
  const res = await fetch(`${API}/api/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export function AboutSection({ isAdmin, token }) {
  const [about, setAbout] = useState([]);
  const [newHistory, setNewHistory] = useState('');

  useEffect(() => { fetchList('about').then(setAbout); }, []);

  const save = async () => {
    if (!newHistory) return;
    const res = await createDoc('about', { history: newHistory }, token);
    if (res.id) fetchList('about').then(setAbout);
    setNewHistory('');
  };

  return (
    <section id="about" className="py-16 bg-black text-orange-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-orange-500">About</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {about.map(item => (
            <div key={item.id} className="p-4 rounded-xl border border-orange-500/20 bg-black/40">{item.history || '—'}</div>
          ))}
        </div>
        {isAdmin && (
          <div className="mt-6 p-4 rounded-xl border border-orange-500/30">
            <textarea value={newHistory} onChange={(e)=>setNewHistory(e.target.value)} placeholder="Neue Geschichte..." className="w-full h-24 bg-black border border-orange-500/40 rounded-lg p-3 outline-none" />
            <button onClick={save} className="mt-3 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500">Speichern</button>
          </div>
        )}
      </div>
    </section>
  );
}

export function NewsSection({ isAdmin, token }) {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => { fetchList('news').then(setNews); }, []);

  const submit = async () => {
    if (!form.title) return;
    const res = await createDoc('news', form, token);
    if (res.id) fetchList('news').then(setNews);
    setForm({ title: '', content: '' });
  };

  return (
    <section id="news" className="py-16 bg-black text-orange-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-orange-500">News</h2>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(n => (
            <article key={n.id} className="p-4 rounded-xl border border-orange-500/20 bg-black/40 hover:translate-y-[-2px] transition-transform">
              <h3 className="font-bold text-orange-400">{n.title}</h3>
              <p className="text-orange-200/80 text-sm mt-1">{n.content}</p>
            </article>
          ))}
        </div>
        {isAdmin && (
          <div className="mt-6 p-4 rounded-xl border border-orange-500/30 grid gap-3">
            <input value={form.title} onChange={(e)=>setForm({ ...form, title: e.target.value })} placeholder="Titel" className="w-full bg-black border border-orange-500/40 rounded-lg p-2" />
            <textarea value={form.content} onChange={(e)=>setForm({ ...form, content: e.target.value })} placeholder="Inhalt" className="w-full h-24 bg-black border border-orange-500/40 rounded-lg p-2" />
            <button onClick={submit} className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500">News anlegen</button>
          </div>
        )}
      </div>
    </section>
  );
}

export function ExclusivesSection({ isAdmin, token }) {
  const [films, setFilms] = useState([]);
  const [form, setForm] = useState({ title: '', poster_url: '', length_min: '', release_date: '', fsk: '' });

  useEffect(() => { fetchList('film').then(setFilms); }, []);

  const submit = async () => {
    if (!form.title) return;
    const payload = { ...form, length_min: form.length_min ? Number(form.length_min) : undefined, exclusive: true };
    const res = await createDoc('film', payload, token);
    if (res.id) fetchList('film').then(setFilms);
    setForm({ title: '', poster_url: '', length_min: '', release_date: '', fsk: '' });
  };

  return (
    <section id="exclusives" className="py-16 bg-black text-orange-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-orange-500">Exclusives</h2>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {films.filter(f=>f.exclusive).map(f => (
            <div key={f.id} className="group rounded-xl overflow-hidden border border-orange-500/20 bg-black/40">
              {f.poster_url ? (
                <img src={f.poster_url} alt={f.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-64 flex items-center justify-center text-orange-400 bg-black">Poster</div>
              )}
              <div className="p-3">
                <h3 className="font-bold text-orange-400">{f.title}</h3>
                <p className="text-xs text-orange-200/70">{f.length_min ? `${f.length_min} min` : ''} {f.fsk ? `• FSK ${f.fsk}` : ''}</p>
              </div>
            </div>
          ))}
        </div>
        {isAdmin && (
          <div className="mt-6 p-4 rounded-xl border border-orange-500/30 grid gap-3">
            <input value={form.title} onChange={(e)=>setForm({ ...form, title: e.target.value })} placeholder="Titel" className="w-full bg-black border border-orange-500/40 rounded-lg p-2" />
            <input value={form.poster_url} onChange={(e)=>setForm({ ...form, poster_url: e.target.value })} placeholder="Poster URL" className="w-full bg-black border border-orange-500/40 rounded-lg p-2" />
            <div className="grid grid-cols-3 gap-3">
              <input value={form.length_min} onChange={(e)=>setForm({ ...form, length_min: e.target.value })} placeholder="Länge (min)" className="bg-black border border-orange-500/40 rounded-lg p-2" />
              <input value={form.release_date} onChange={(e)=>setForm({ ...form, release_date: e.target.value })} placeholder="Release" className="bg-black border border-orange-500/40 rounded-lg p-2" />
              <input value={form.fsk} onChange={(e)=>setForm({ ...form, fsk: e.target.value })} placeholder="FSK" className="bg-black border border-orange-500/40 rounded-lg p-2" />
            </div>
            <button onClick={submit} className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500">Film anlegen</button>
          </div>
        )}
      </div>
    </section>
  );
}

export function ProductionSection({ isAdmin, token }) {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ phase: '', text: '' });

  useEffect(() => { fetchList('production').then(setEntries); }, []);

  const submit = async () => {
    if (!form.phase) return;
    const res = await createDoc('production', form, token);
    if (res.id) fetchList('production').then(setEntries);
    setForm({ phase: '', text: '' });
  };

  return (
    <section id="production" className="py-16 bg-black text-orange-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-orange-500">Production</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {entries.map(e => (
            <div key={e.id} className="p-4 rounded-xl border border-orange-500/20 bg-black/40">
              <div className="text-orange-400 font-semibold">{e.phase}</div>
              <p className="text-orange-200/80 text-sm mt-1">{e.text}</p>
            </div>
          ))}
        </div>
        {isAdmin && (
          <div className="mt-6 p-4 rounded-xl border border-orange-500/30 grid gap-3">
            <input value={form.phase} onChange={(e)=>setForm({ ...form, phase: e.target.value })} placeholder="Phase (z.B. Pre-Production)" className="w-full bg-black border border-orange-500/40 rounded-lg p-2" />
            <textarea value={form.text} onChange={(e)=>setForm({ ...form, text: e.target.value })} placeholder="Text" className="w-full h-24 bg-black border border-orange-500/40 rounded-lg p-2" />
            <button onClick={submit} className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500">Eintrag anlegen</button>
          </div>
        )}
      </div>
    </section>
  );
}

export function PartnersAndApply({ isAdmin, token }) {
  const [partners, setPartners] = useState([]);
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', logo_url: '', url: '' });

  useEffect(() => { fetchList('partner').then(setPartners); }, []);
  useEffect(() => { if (isAdmin) fetchList('application').then(setApps); }, [isAdmin]);

  const createPartner = async () => {
    if (!form.name) return;
    const res = await createDoc('partner', form, token);
    if (res.id) fetchList('partner').then(setPartners);
    setForm({ name: '', description: '', logo_url: '', url: '' });
  };

  const submitApp = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await fetch(`${API}/api/application`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fd.get('name'),
        email: fd.get('email'),
        role: fd.get('role'),
        message: fd.get('message')
      })
    });
    e.target.reset();
    alert('Bewerbung eingereicht.');
  };

  return (
    <section id="partner" className="py-16 bg-black text-orange-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-orange-500">Partner & Bewerbung</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
            {partners.map(p => (
              <div key={p.id} className="p-4 rounded-xl border border-orange-500/20 bg-black/40 flex items-center gap-3">
                {p.logo_url ? <img src={p.logo_url} className="w-16 h-16 object-contain" /> : <div className="w-16 h-16 bg-orange-900/30" />}
                <div>
                  <div className="font-semibold text-orange-400">{p.name}</div>
                  <p className="text-sm text-orange-200/80">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl border border-orange-500/30 bg-black/40">
            <h3 className="font-semibold text-orange-400">Jetzt bewerben</h3>
            <form onSubmit={submitApp} className="mt-3 grid gap-2">
              <input name="name" placeholder="Name" className="bg-black border border-orange-500/40 rounded-lg p-2" />
              <input name="email" placeholder="Email" className="bg-black border border-orange-500/40 rounded-lg p-2" />
              <input name="role" placeholder="Rolle" className="bg-black border border-orange-500/40 rounded-lg p-2" />
              <textarea name="message" placeholder="Nachricht" className="h-24 bg-black border border-orange-500/40 rounded-lg p-2" />
              <button className="mt-1 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500">Absenden</button>
            </form>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-8 p-4 rounded-xl border border-orange-500/30">
            <h4 className="font-semibold text-orange-400 mb-2">Partner hinzufügen</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              <input value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} placeholder="Name" className="bg-black border border-orange-500/40 rounded-lg p-2" />
              <input value={form.logo_url} onChange={(e)=>setForm({ ...form, logo_url: e.target.value })} placeholder="Logo URL" className="bg-black border border-orange-500/40 rounded-lg p-2" />
              <input value={form.url} onChange={(e)=>setForm({ ...form, url: e.target.value })} placeholder="Website" className="bg-black border border-orange-500/40 rounded-lg p-2" />
              <input value={form.description} onChange={(e)=>setForm({ ...form, description: e.target.value })} placeholder="Beschreibung" className="bg-black border border-orange-500/40 rounded-lg p-2" />
            </div>
            <button onClick={createPartner} className="mt-3 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500">Partner anlegen</button>
          </div>
        )}

        {isAdmin && (
          <div className="mt-8 p-4 rounded-xl border border-orange-500/30">
            <h4 className="font-semibold text-orange-400 mb-2">Bewerbungen</h4>
            <div className="grid gap-3">
              {apps.map(a => (
                <div key={a.id} className="p-3 rounded-lg border border-orange-500/20">
                  <div className="text-sm text-orange-300">{a.name} • {a.email} • {a.role}</div>
                  <p className="text-orange-200/80 text-sm mt-1">{a.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function StreamingSection({ isAdmin, token }) {
  const [films, setFilms] = useState([]);
  const [form, setForm] = useState({ title: '', stream_url: '', poster_url: '', trailer_url: '', length_min: '', fsk: '', release_date: '' });

  useEffect(() => { fetchList('film').then(setFilms); }, []);

  const createStream = async () => {
    if (!form.title) return;
    const payload = { ...form, length_min: form.length_min ? Number(form.length_min) : undefined };
    const res = await createDoc('film', payload, token);
    if (res.id) fetchList('film').then(setFilms);
    setForm({ title: '', stream_url: '', poster_url: '', trailer_url: '', length_min: '', fsk: '', release_date: '' });
  };

  return (
    <section id="streaming" className="py-16 bg-black text-orange-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-orange-500">Animal Streaming</h2>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {films.filter(f=>f.stream_url).map(f => (
            <div key={f.id} className="group rounded-xl overflow-hidden border border-orange-500/20 bg-black/40">
              {f.poster_url ? (
                <img src={f.poster_url} alt={f.title} className="w-full h-56 object-cover" />
              ) : (
                <div className="w-full h-56 flex items-center justify-center text-orange-400 bg-black">Poster</div>
              )}
              <div className="p-3">
                <h3 className="font-bold text-orange-400">{f.title}</h3>
                {f.trailer_url && (
                  <video controls className="w-full mt-2 rounded">
                    <source src={f.trailer_url} />
                  </video>
                )}
                {f.stream_url && (
                  <video controls className="w-full mt-2 rounded">
                    <source src={f.stream_url} />
                  </video>
                )}
              </div>
            </div>
          ))}
        </div>
        {isAdmin && (
          <div className="mt-6 p-4 rounded-xl border border-orange-500/30 grid gap-3">
            <input value={form.title} onChange={(e)=>setForm({ ...form, title: e.target.value })} placeholder="Titel" className="w-full bg-black border border-orange-500/40 rounded-lg p-2" />
            <input value={form.poster_url} onChange={(e)=>setForm({ ...form, poster_url: e.target.value })} placeholder="Poster URL" className="w-full bg-black border border-orange-500/40 rounded-lg p-2" />
            <input value={form.trailer_url} onChange={(e)=>setForm({ ...form, trailer_url: e.target.value })} placeholder="Trailer URL" className="w-full bg-black border border-orange-500/40 rounded-lg p-2" />
            <input value={form.stream_url} onChange={(e)=>setForm({ ...form, stream_url: e.target.value })} placeholder="Film/Stream URL" className="w-full bg-black border border-orange-500/40 rounded-lg p-2" />
            <div className="grid grid-cols-3 gap-3">
              <input value={form.length_min} onChange={(e)=>setForm({ ...form, length_min: e.target.value })} placeholder="Länge (min)" className="bg-black border border-orange-500/40 rounded-lg p-2" />
              <input value={form.release_date} onChange={(e)=>setForm({ ...form, release_date: e.target.value })} placeholder="Release" className="bg-black border border-orange-500/40 rounded-lg p-2" />
              <input value={form.fsk} onChange={(e)=>setForm({ ...form, fsk: e.target.value })} placeholder="FSK" className="bg-black border border-orange-500/40 rounded-lg p-2" />
            </div>
            <button onClick={createStream} className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500">Streaming-Film anlegen</button>
          </div>
        )}
      </div>
    </section>
  );
}
