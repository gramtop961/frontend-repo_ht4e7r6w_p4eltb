import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Ujidb4bmigoHT4IV/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm tracking-wide">Animal Studios</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-orange-500 drop-shadow-[0_0_20px_rgba(255,115,0,0.35)]">Cinematic Worlds. Crafted.</h1>
          <p className="mt-4 text-orange-200/80 max-w-2xl mx-auto">Exklusive Produktionen, Streaming-Premieren und tiefe Einblicke in unsere Filmwelten. Komplett administrierbar.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/80" />
    </section>
  );
}
