function App() {
  const panels = [
    "bg-slate-50",
    "bg-slate-100",
    "bg-slate-200",
    "bg-slate-300",
    "bg-slate-400",
  ];

  return (
    <div className="flex flex-col divide-y divide-black">
      {panels.map((color, index) => (
        <div
          key={index}
          className={`flex justify-center items-center min-h-screen ${color}`}
        >{`Panel ${index}`}</div>
      ))}
    </div>
  );
}

export default App;
