export default function QuestionNavigator({ questions, currentIndex, onSelect, answers }) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
      {questions.map((question, index) => {
        const answered = answers[String(question._id)] !== undefined;
        return (
          <button
            key={question._id}
            onClick={() => onSelect(index)}
            className={`h-9 rounded-md border text-sm font-semibold ${
              currentIndex === index
                ? "border-emerald-600 bg-emerald-600 text-white"
                : answered
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}
