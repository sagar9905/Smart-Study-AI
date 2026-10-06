export default function Card({ title, action, children, className = "" }) {
  return (
    <section className={`rounded-md border border-slate-200 bg-white shadow-panel ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          {title && <h2 className="text-sm font-semibold text-slate-900">{title}</h2>}
          {action}
        </div>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}
