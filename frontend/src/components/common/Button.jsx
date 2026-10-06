export default function Button({ children, className = "", variant = "primary", ...props }) {
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    dark: "bg-slate-900 text-white hover:bg-slate-800"
  };

  return (
    <button className={`focus-ring inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
