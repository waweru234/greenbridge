import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What services do you offer?",
  "Do you work in Africa and the UK?",
  "How do I book a free consultation?",
  "Tell me about solar for businesses",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm **Bridge** 🌱 — Greenbridge Energy's AI concierge. Ask me about our solar, wind, storage or microgrid services, or how to book a free consultation.",
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
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (resp.status === 429) {
        toast.error("Too many requests — please wait a moment.");
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
      toast.error("Something went wrong. Please try again.");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry — I had trouble responding. Please try again or [contact us](/contact)." },
      ]);
    } finally {
      setLoading(false);
      if (!open) setHasNew(true);
    }
  }

  return (
    <>
      {/* Launcher */}
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

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2.5rem)] sm:w-[400px] h-[min(640px,calc(100vh-3rem))] flex flex-col rounded-3xl overflow-hidden shadow-glow border border-border bg-card"
          >
            {/* Header */}
            <div
              className="relative px-5 py-4 text-white"
              style={{ background: "var(--gradient-hero)" }}
            >
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-60" style={{ background: "radial-gradient(circle, var(--sun) 0%, transparent 70%)" }} />
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
                    <div className="text-xs text-white/75">Greenbridge AI · usually replies instantly</div>
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

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-soft">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
                      m.role === "user"
                        ? "bg-gradient-bridge text-white rounded-br-sm"
                        : "bg-card text-foreground border border-border rounded-bl-sm"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-a:text-[color:var(--leaf-deep)] prose-strong:text-foreground">
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
                  className="pt-2"
                >
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-1">Try asking</div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:border-[color:var(--leaf)] hover:bg-secondary transition text-foreground/80"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
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
                  placeholder="Ask about solar, wind, storage…"
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
                Powered by Lovable AI · Bridge can make mistakes
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
