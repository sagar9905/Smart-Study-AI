import Editor from "@monaco-editor/react";
import { useMutation } from "@tanstack/react-query";
import { Play, Send } from "lucide-react";
import { useState } from "react";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { Select, Textarea } from "../../components/common/Input";
import TerminalConsole from "../../components/coding/TerminalConsole";
import { codingService } from "../../services/codingService";

const starter = {
  java: "import java.util.*;\n\nclass Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    System.out.println(\"SmartStudy AI\");\n  }\n}",
  cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  cout << \"SmartStudy AI\" << endl;\n  return 0;\n}"
};

export default function CodingRoomPage() {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(starter.java);
  const [stdin, setStdin] = useState("");
  const [terminal, setTerminal] = useState("");
  const runMutation = useMutation({
    mutationFn: codingService.run,
    onSuccess: (result) => setTerminal(`stdout:\n${result.stdout}\n\nstderr:\n${result.stderr}\n\nexecutionTime: ${result.executionTime ?? "n/a"}\nmemoryUsage: ${result.memoryUsage ?? "n/a"}`)
  });

  const changeLanguage = (value) => {
    setLanguage(value);
    setCode(starter[value]);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <Card title="Problem Statement">
        <div className="space-y-4 text-sm leading-6 text-slate-700">
          <h1 className="text-xl font-semibold text-slate-950">Practice Coding Problem</h1>
          <p>Write a program that reads input and prints the expected output. Generated coding questions from assessments can be pasted here for execution.</p>
          <div>
            <h2 className="font-semibold text-slate-900">Constraints</h2>
            <p>Java and C++ are supported through the Piston API.</p>
          </div>
          <Textarea label="stdin" value={stdin} onChange={(e) => setStdin(e.target.value)} />
        </div>
      </Card>
      <div className="space-y-4">
        <Card title="Editor" action={<Select label="" value={language} onChange={(e) => changeLanguage(e.target.value)}><option value="java">Java</option><option value="cpp">C++</option></Select>}>
          <div className="overflow-hidden rounded-md border border-slate-200">
            <Editor height="460px" language={language === "cpp" ? "cpp" : "java"} theme="vs-dark" value={code} onChange={(value) => setCode(value || "")} />
          </div>
          <div className="mt-4 flex gap-3">
            <Button disabled={runMutation.isPending} onClick={() => runMutation.mutate({ language, code, stdin })}><Play className="h-4 w-4" />Run</Button>
            <Button variant="dark" disabled={runMutation.isPending} onClick={() => runMutation.mutate({ language, code, stdin })}><Send className="h-4 w-4" />Submit</Button>
          </div>
        </Card>
        <TerminalConsole output={terminal} />
      </div>
    </div>
  );
}
