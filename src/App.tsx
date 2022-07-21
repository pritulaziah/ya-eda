function App() {
  const sections = [
    "bg-slate-50",
    "bg-slate-100",
    "bg-slate-200",
    "bg-slate-300",
    "bg-slate-400",
  ];

  return (
    <main className="flex flex-col divide-y divide-black">
      {sections.map((color, index) => (
        <section
          key={index}
          className={`flex justify-center items-center min-h-screen ${color}`}
        >{`Section ${index}`}</section>
      ))}
    </main>
  );
}

export default App;
