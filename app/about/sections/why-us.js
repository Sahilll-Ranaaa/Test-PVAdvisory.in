const items = [
  {
    id: 1,
    title: "Specialists in implementation consulting",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Consultative-sales-amico-1024x1024.png",
  },
  {
    id: 2,
    title: "Diverse industry expertise",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Experts-pana-e1675502143917-1024x699.png",
  },
  {
    id: 3,
    title: "Client-Centric approach",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Customer-relationship-management-rafiki-e1675501917639-1024x930.png",
  },
  {
    id: 4,
    title: "Solution-Driven methodology",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Business-solution-cuate-e1675501637125-1024x768.png",
  },
];

export default function WhyUsSection() {
  return (
    <section className="p-10 bg-gray-100">
      <div className="max-w-screen-lg mx-auto space-y-4">
        <h1 className="text-center text-4xl font-bold text-app">Why Us</h1>
      </div>
    </section>
  );
}
