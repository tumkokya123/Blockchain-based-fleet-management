export default function TechnologySection() {
  return (
    <section id="technology" className="section-container">
      <h2 className="text-3xl font-bold mb-12">Technology Stack</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {["Polygon Blockchain", "IoT Monitoring", "Smart Contracts", "Escrow Automation"].map((tech) => (
          <div
            key={tech}
            className="bg-[#393E46] p-6 rounded-lg text-center hover:scale-105 transition"
          >
            <p className="text-[#00ADB5] font-semibold">{tech}</p>
          </div>
        ))}
      </div>
    </section>
  );
}