import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Loader2,
  BriefcaseBusiness,
  Users,
  PhoneCall,
  MapPinned,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

type Suggestion = {
  label: string;
  prompt: string;
};

const QUICK_ASKS: Suggestion[] = [
  { label: "All services", prompt: "List all Greenbridge services in detail." },
  { label: "Leadership", prompt: "Who are your leaders and what are their roles?" },
  { label: "Water systems", prompt: "Explain your solar water pumping and pressurized water network services." },
  { label: "Project examples", prompt: "Share key project examples in UK and East Africa." },
  { label: "Contact details", prompt: "How can I contact Greenbridge quickly?" },
  { label: "Free consultation", prompt: "How do I book a free consultation?" },
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const SITE_KNOWLEDGE = `
Greenbridge Energy Limited - Website Reference

Company:
- Greenbridge Energy bridges renewable energy delivery between the United Kingdom and Africa.
- Focus areas: solar, wind, battery storage, off-grid and hybrid systems, and water-energy infrastructure.

Leadership:
- Jimsley Omari - Founder & Director. Background: PhD Mechanical Engineering, Energy Systems and Infrastructure.
- George Henry - CEO & Director. Focus: cross-continental execution, governance, and long-term renewable scale-up.

Core Services:
1. Solar PV Installation.
2. Battery Storage Solutions.
3. Off-Grid and Hybrid Systems.
4. Commercial and Industrial Energy Solutions.
5. Solar Lighting (Home and Security).
6. Wind Power Generators.
7. Solar Hot Water Systems.
8. Solar Water Pumping Systems.
9. Pressurized Water Supply Networks (Non-Tower).
10. Energy Consultation and System Design.

Project Coverage and Examples:
- UK residential solar installations.
- Nairobi commercial hybrid solar.
- Kisumu off-grid mini-grid systems.
- Solar home lighting and solar security lighting roll-outs.
- Wind and hybrid renewable deployments.
- Solar-powered tubewell irrigation and water supply pressure-network upgrades.
- Referenced landmark regional projects include Garissa, Malindi, and Kesses utility-scale solar narratives.

Offices and Contacts:
- UK office: 34 Lullington Close, Manchester, M22 1LY, England.
- Kenya office: Mombasa Road - Beijing Road, P.O. Box 871-00241, Nairobi, Kenya.
- UK phone: +44 7520 674133.
- Kenya phone / WhatsApp: +254 723 363636.
- Email: greenbridgegy@outlook.com.
- Instagram: @greenbridgeenergyltd.

Consultation:
- Free consultation is available.
- Users can use the contact page at /contact or WhatsApp for quick support.

Assistant behavior:
- Be accurate and align with the details above.
- If asked about pricing, quote ranges, or site-specific feasibility: explain that it depends on site conditions and recommend a free consultation through /contact.
- Keep responses warm, practical, and concise with bullets when useful.
`.trim();

function getOfflineAnswer(question: string): string | null {
  const q = question.toLowerCase();

  if (q.includes("leader") || q.includes("ceo") || q.includes("director")) {
    return [
      "Greenbridge leadership:",
      "- **Jimsley Omari** - Founder & Director",
      "- **George Henry** - CEO & Director",
      "",
      "Both profiles are available on the About page with direct contact details.",
    ].join("\n");
  }

  if (q.includes("service") || q.includes("offer")) {
    return [
      "Greenbridge services include:",
      "1. Solar PV Installation",
      "2. Battery Storage Solutions",
      "3. Off-Grid and Hybrid Systems",
      "4. Commercial and Industrial Energy Solutions",
      "5. Solar Lighting (Home and Security)",
      "6. Wind Power Generators",
      "7. Solar Hot Water Systems",
      "8. Solar Water Pumping Systems",
      "9. Pressurized Water Supply Networks (Non-Tower)",
      "10. Energy Consultation and System Design",
    ].join("\n");
  }

  if (q.includes("contact") || q.includes("phone") || q.includes("whatsapp") || q.includes("consultation")) {
    return [
      "You can reach Greenbridge directly:",
      "- **UK:** +44 7520 674133",
      "- **Kenya / WhatsApp:** +254 723 363636",
      "- **Email:** greenbridgegy@outlook.com",
      "- **Contact page:** /contact",
    ].join("\n");
  }

  if (q.includes("project") || q.includes("where") || q.includes("uk") || q.includes("africa")) {
    return [
      "Greenbridge operates across the **UK and Africa** with projects such as:",
      "- UK residential solar installations",
      "- Nairobi commercial hybrid solar",
      "- Kisumu off-grid mini-grid systems",
      "- Solar pumping and non-tower pressurized water networks",
    ].join("\n");
  }

  return null;
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Welcome to **Bridge**, Greenbridge Energy's AI assistant.\n\nI can help with leaders, all services, project coverage, offices, and consultation steps.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";
    let assistantStarted = false;
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        if (!assistantStarted) {
          assistantStarted = true;
          return [...prev, { role: "assistant", content: assistantSoFar }];
        }
        return prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, content: assistantSoFar } : m,
        );
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "assistant",
              content: SITE_KNOWLEDGE,
            },
            ...next.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      if (resp.status === 429) {
        toast.error("Too many requests - please wait a moment.");
        setLoading(false);
        return;
      }
      if (resp.status === 402) {
        toast.error("AI service is temporarily unavailable.");
        setLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error("chat error", err);
      const offline = getOfflineAnswer(trimmed);
      if (offline) {
        setMessages((prev) => [...prev, { role: "assistant", content: offline }]);
      } else {
        toast.error("Something went wrong. Please try again.");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I could not reach the AI service right now. You can still contact our team directly at **+44 7520 674133**, **+254 723 363636**, or via **/contact**.",
          },
        ]);
      }
    } finally {
      setLoading(false);
      if (!open) setHasNew(true);
    }
  }

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={() => setOpen(true)}
            aria-label="Open chat"
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-24 z-40 group inline-flex items-center gap-2 rounded-full pl-4 pr-5 py-3 text-white shadow-glow hover:-translate-y-0.5 transition-transform"
            style={{ background: "var(--gradient-bridge)" }}
          >
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="h-4 w-4" />
              {hasNew && (
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-[color:var(--sun)] ring-2 ring-white animate-pulse" />
              )}
            </span>
            <span className="text-sm font-semibold tracking-wide">Ask Bridge</span>
            <Sparkles className="h-3.5 w-3.5 text-white/80 group-hover:text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[430px] h-[min(700px,calc(100vh-2.5rem))] flex flex-col rounded-3xl overflow-hidden shadow-glow border border-border bg-card"
          >
            <div
              className="relative px-5 py-4 text-white"
              style={{ background: "var(--gradient-hero)" }}
            >
              <div
                className="absolute -top-14 -right-14 h-44 w-44 rounded-full opacity-60"
                style={{ background: "radial-gradient(circle, var(--sun) 0%, transparent 70%)" }}
              />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-[color:var(--sun)]" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[color:var(--sun)] ring-2 ring-white animate-pulse" />
                  </div>
                  <div>
                    <div className="font-semibold leading-tight">Bridge</div>
                    <div className="text-xs text-white/80">Greenbridge AI assistant</div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="rounded-full p-1.5 hover:bg-white/15 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-soft">
              {messages.length === 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid gap-2"
                >
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-2xl border border-border bg-card px-3 py-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                        <Users className="h-3.5 w-3.5 text-[color:var(--leaf-deep)]" />
                        Leaders
                      </div>
                      <p className="mt-1 text-xs font-medium text-foreground">2 directors listed</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card px-3 py-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                        <BriefcaseBusiness className="h-3.5 w-3.5 text-[color:var(--leaf-deep)]" />
                        Services
                      </div>
                      <p className="mt-1 text-xs font-medium text-foreground">10 core services</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card px-3 py-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                        <MapPinned className="h-3.5 w-3.5 text-[color:var(--leaf-deep)]" />
                        Regions
                      </div>
                      <p className="mt-1 text-xs font-medium text-foreground">UK + Africa</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[color:var(--leaf)]/25 bg-card px-3 py-2">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <PhoneCall className="h-3.5 w-3.5 text-[color:var(--leaf-deep)]" />
                      Fast contact
                    </div>
                    <p className="mt-1 text-xs text-foreground/85">+44 7520 674133 | +254 723 363636 (WhatsApp)</p>
                  </div>
                </motion.div>
              )}

              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
                      m.role === "user"
                        ? "bg-gradient-bridge text-white rounded-br-sm"
                        : "bg-card text-foreground border border-border rounded-bl-sm"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-a:text-[color:var(--leaf-deep)] prose-strong:text-foreground">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-soft">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 rounded-full bg-[color:var(--leaf-deep)]"
                          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.length === 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pt-1"
                >
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-1">Quick prompts</div>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_ASKS.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => send(s.prompt)}
                        className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:border-[color:var(--leaf)] hover:bg-secondary transition text-foreground/90"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="p-3 border-t border-border bg-card"
            >
              <div className="flex items-center gap-2 rounded-full border border-border bg-background pl-4 pr-1.5 py-1.5 focus-within:border-[color:var(--leaf)] focus-within:ring-2 focus-within:ring-[color:var(--leaf)]/20 transition">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about leaders, services, projects or contacts..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sun disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition"
                  style={{ background: "var(--gradient-bridge)" }}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
              <div className="text-[10px] text-muted-foreground text-center mt-2">
                Bridge uses the website's latest details and can route you to /contact for a free consultation.
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
