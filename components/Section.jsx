export default function Section({ title, subtitle, children }) {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-500">{subtitle}</p>
          <h2 className="text-2xl font-bold mt-2">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
