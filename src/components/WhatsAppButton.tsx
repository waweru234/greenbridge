export function WhatsAppButton() {
  const phone = "254700000000";
  const msg = encodeURIComponent(
    "Hi Greenbridge Energy, I'd like a free consultation."
  );
  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center h-14 w-14 rounded-full text-white shadow-glow animate-float"
      style={{ background: "#25D366" }}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.11 17.27c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.13-.42-2.16-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.54.13-.13.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.13.18 1.93 2.95 4.69 4.13.66.28 1.18.45 1.58.58.66.21 1.27.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.02 4C9.4 4 4.04 9.36 4.04 15.98c0 2.11.55 4.17 1.6 5.99L4 28l6.21-1.62c1.76.96 3.74 1.46 5.81 1.46 6.62 0 11.98-5.36 11.98-11.98S22.64 4 16.02 4z" />
      </svg>
    </a>
  );
}
