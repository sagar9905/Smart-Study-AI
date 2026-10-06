export function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <input className="focus-ring w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" {...props} />
    </label>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <select className="focus-ring w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" {...props}>
        {children}
      </select>
    </label>
  );
}

export function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <textarea className="focus-ring min-h-28 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" {...props} />
    </label>
  );
}
