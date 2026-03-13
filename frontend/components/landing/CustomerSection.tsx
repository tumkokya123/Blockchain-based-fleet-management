export default function CustomerSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-8 py-32">

      <p className="text-[12px] tracking-[0.2em] uppercase text-[#00ADB5] font-medium mb-6">
        External Touchpoints
      </p>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <h2 className="text-[40px] font-semibold tracking-[-0.02em]">
          Customer Transparency Portal
        </h2>

        <p className="text-gray-400 max-w-md text-[16px] leading-[1.6]">
          Secure access for senders and receivers to track shipments and verify
          blockchain-backed delivery confirmation.
        </p>
      </div>

      <div className="h-[1px] bg-[#393E46] mb-16" />

      <div className="grid md:grid-cols-2 gap-10">

        {[
          {
            title: "Sender",
            desc: "Create shipment requests, monitor dispatch progress, and access immutable tracking history.",
          },
          {
            title: "Receiver",
            desc: "Track incoming deliveries, confirm receipt, and raise disputes with verifiable proof.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-[#393E46] rounded-2xl p-10 hover:translate-y-[-4px] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#222831] rounded-xl mb-8 flex items-center justify-center text-[#00ADB5] text-xl font-bold">
              {card.title[0]}
            </div>

            <h3 className="text-[20px] font-semibold mb-4">
              {card.title}
            </h3>

            <p className="text-gray-400 text-[15px] leading-[1.7] mb-8">
              {card.desc}
            </p>

            <span className="text-[#00ADB5] text-[14px] font-medium tracking-wide">
              ROLE-BASED ACCESS →
            </span>
          </div>
        ))}

      </div>
    </section>
  );
}