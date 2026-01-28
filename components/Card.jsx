export default function Card({ title, description, footer }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      {footer ? <div className="mt-4 text-sm text-primary-600 font-medium">{footer}</div> : null}
    </div>
  );
}
