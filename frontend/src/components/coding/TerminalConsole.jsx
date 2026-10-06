export default function TerminalConsole({ output }) {
  return (
    <div className="h-44 overflow-auto rounded-md bg-slate-950 p-4 font-mono text-xs text-slate-100">
      <pre className="whitespace-pre-wrap">{output || "Run code to view stdout, stderr, execution time, and memory usage."}</pre>
    </div>
  );
}
