import whatsappIcon from "@/assets/new ones/whatsapp.png";

export function WhatsAppButton() {
  const phone = "254723363636";
  const msg = encodeURIComponent(
    "Hi Greenbridge Energy, I'd like a free consultation."
  );
  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 left-5 z-50 inline-flex items-center justify-center h-15 w-15 rounded-full bg-white/95 border border-white/80 shadow-glow backdrop-blur-md animate-float hover:scale-105 transition-all duration-300"
    >
      <span className="absolute inset-0 rounded-full ring-2 ring-[color:var(--leaf)]/25 group-hover:ring-[color:var(--leaf)]/45 transition" />
      <img
        src={whatsappIcon}
        alt="WhatsApp"
        className="h-8 w-8 object-contain drop-shadow-sm"
        width={32}
        height={32}
      />
    </a>
  );
}
