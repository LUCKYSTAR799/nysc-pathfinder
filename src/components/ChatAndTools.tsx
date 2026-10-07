import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Search,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  MapPin,
  Navigation,
  Bookmark,
  Check,
  X,
  Send,
  Sparkles,
  Home,
  Tent,
  Briefcase,
  RefreshCw,
  FileCheck,
  Shield,
  BookOpen,
  ExternalLink,
  Menu,
  ArrowLeft,
  User,
  Bot,
  Plus,
  ChevronUp,
} from "lucide-react";
import {
  BRAND_NAME,
  TAGLINE,
  CATEGORIES,
  FAQ_DATA,
  CHECKLIST_ITEMS,
  CHECKLIST_CATEGORIES,
  CAMP_LOCATIONS,
  RELOCATION_GROUNDS,
  QUICK_REPLIES,
} from "../constants";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import type { Message, FAQCategory, ChecklistCategory } from "../types";

/* ──────────────── Tab config ──────────────── */
type TabId = "chat" | "faq" | "checklist" | "locations" | "relocation";
const TABS: { id: TabId; label: string; icon: typeof MessageCircle }[] = [
  { id: "chat", label: "KopaBot", icon: MessageCircle },
  { id: "faq", label: "FAQ", icon: BookOpen },
  { id: "checklist", label: "Checklist", icon: ClipboardList },
  { id: "locations", label: "Camps", icon: MapPin },
  { id: "relocation", label: "Relocate", icon: Navigation },
];

/* ──────────────── Helper ──────────────── */
const categoryIcon = (icon: string) => {
  const map: Record<string, React.ReactNode> = {
    RefreshCw: <RefreshCw className="h-4 w-4" />,
    Tent: <Tent className="h-4 w-4" />,
    Briefcase: <Briefcase className="h-4 w-4" />,
    Navigation: <Navigation className="h-4 w-4" />,
    FileCheck: <FileCheck className="h-4 w-4" />,
    Shield: <Shield className="h-4 w-4" />,
  };
  return map[icon] || <BookOpen className="h-4 w-4" />;
};

/* ──────────────── Chat Panel ──────────────── */
function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `👋 Hey there! Welcome to ${BRAND_NAME}. I'm your NYSC companion. Ask me anything about mobilization, camp, PPA, relocation, or clearance!`,
      timestamp: Date.now(),
      suggestedQuestions: QUICK_REPLIES.slice(0, 4),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate a smart reply
    setTimeout(() => {
      const reply = generateReply(text.trim());
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: "assistant",
        content: reply,
        timestamp: Date.now(),
        suggestedQuestions: QUICK_REPLIES.filter((q) => q !== text.trim()).slice(0, 3),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <ScrollArea className="flex-1 px-3 py-4" ref={scrollRef}>
        <div className="space-y-3 max-w-2xl mx-auto">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar
                  className={`h-8 w-8 shrink-0 mt-0.5 ${
                    msg.role === "assistant"
                      ? "bg-emerald-600"
                      : "bg-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-center h-full w-full text-white">
                    {msg.role === "assistant" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                </Avatar>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-emerald-600 text-white rounded-tr-md"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-tl-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2.5 border-t border-zinc-200 dark:border-zinc-700">
                      {msg.suggestedQuestions.map((sq) => (
                        <button
                          key={sq}
                          onClick={() => handleSend(sq)}
                          className="text-xs bg-white/80 dark:bg-zinc-700/80 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 transition-colors"
                        >
                          {sq}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2.5"
            >
              <Avatar className="h-8 w-8 shrink-0 bg-emerald-600">
                <Bot className="h-4 w-4 text-white m-auto" />
              </Avatar>
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input bar */}
      <div className="border-t border-zinc-200 dark:border-zinc-700 p-3 bg-white dark:bg-zinc-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2 max-w-2xl mx-auto"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about NYSC..."
            className="flex-1 rounded-xl border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isTyping}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

/* ── Simple reply generator ── */
function generateReply(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("mobilization") || q.includes("register") || q.includes("batch"))
    return "NYSC mobilizes corps members three times a year (Batches A, B, C). Registration is done on the NYSC portal. Make sure you have your degree certificate, school ID, birth certificate, and LGA identification letter ready. Check portal.nysc.org.ng for the latest schedule.";
  if (q.includes("camp") || q.includes("bring") || q.includes("pack") || q.includes("orientation"))
    return "The orientation camp lasts 21 days. You'll need: NYSC white T-shirts & shorts, bedsheets, mosquito net, foam mattress, padlock, toiletries, cutlery, and cash. 🙌 Don't forget your call-up letter and credentials!";
  if (q.includes("relocation") || q.includes("transfer") || q.includes("marital"))
    return "Relocation can be on marital grounds (for married female corps members), health grounds (with medical documentation), or security grounds. Submit your application through the NYSC portal with supporting documents.";
  if (q.includes("pop") || q.includes("passing out") || q.includes("end"))
    return "POP (Passing Out Parade) happens after 12 months of service. NYSC usually holds it on a designated Thursday. You'll receive your certificate of national service and discharge letter.";
  if (q.includes("ppa") || q.includes("place of primary") || q.includes("cds") || q.includes("community"))
    return "Your PPA (Place of Primary Assignment) is where you'll work during service. CDS (Community Development Service) is a weekly group activity. Both are mandatory — attend regularly and get your forms signed!";
  if (q.includes("clearance") || q.includes("allowance") || q.includes("form"))
    return "Clearance is done monthly at your PPA. Your supervisor signs your clearance form. Missing clearance may delay your allowance. If you miss a month, get a backdated signature with a valid reason.";
  return "Great question! Let me help you with that. For specific NYSC info, you can check the NYSC portal (portal.nysc.org.ng) or ask me more details. What exactly would you like to know about?";
}

/* ──────────────── FAQ Panel ──────────────── */
function FAQPanel() {
  const [activeCat, setActiveCat] = useState<FAQCategory>("mobilization");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const currentFAQ = FAQ_DATA.find((f) => f.id === activeCat);
  const filtered = currentFAQ?.questions.filter(
    (q) =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="pl-9 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
          />
        </div>
      </div>

      {/* Category chips */}
      <ScrollArea className="shrink-0 px-3 pb-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCat(cat.id);
                setOpenItems([]);
              }}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCat === cat.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {categoryIcon(cat.icon)}
              {cat.label}
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* FAQ list */}
      <ScrollArea className="flex-1 px-3 pb-3">
        <div className="space-y-1.5 max-w-2xl mx-auto">
          {filtered && filtered.length > 0 ? (
            filtered.map((faq, i) => {
              const itemId = `${activeCat}-${i}`;
              const isOpen = openItems.includes(itemId);
              return (
                <motion.div
                  key={itemId}
                  layout
                  className="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900"
                >
                  <button
                    onClick={() => toggleItem(itemId)}
                    className="flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <span className="pr-2">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-emerald-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 text-zinc-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No FAQs found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

/* ──────────────── Checklist Panel ──────────────── */
function ChecklistPanel() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [activeCat, setActiveCat] = useState<ChecklistCategory>("documents");

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const items = CHECKLIST_ITEMS.filter((i) => i.category === activeCat);
  const completed = CHECKLIST_ITEMS.filter((i) => checked.has(i.id)).length;
  const total = CHECKLIST_ITEMS.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
          <span>Camp Prep Progress</span>
          <span className="font-medium text-emerald-600">{completed}/{total} items</span>
        </div>
        <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-3 pb-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {CHECKLIST_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCat === cat.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <ScrollArea className="flex-1 px-3 pb-3">
        <div className="space-y-1 max-w-2xl mx-auto">
          {items.map((item) => {
            const isChecked = checked.has(item.id);
            return (
              <motion.div
                key={item.id}
                layout
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all cursor-pointer ${
                  isChecked
                    ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/20"
                    : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
                onClick={() => toggle(item.id)}
              >
                <div
                  className={`h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    isChecked
                      ? "bg-emerald-600 border-emerald-600"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}
                >
                  {isChecked && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
                <span
                  className={`text-sm transition-all ${
                    isChecked
                      ? "line-through text-zinc-400 dark:text-zinc-500"
                      : "text-zinc-800 dark:text-zinc-100"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

/* ──────────────── Locations Panel ──────────────── */
function LocationsPanel() {
  const [selectedZone, setSelectedZone] = useState<string>("All");
  const zones = ["All", "North-Central", "North-East", "North-West", "South-East", "South-South", "South-West"];
  const filtered = selectedZone === "All" ? CAMP_LOCATIONS : CAMP_LOCATIONS.filter((l) => l.geozone === selectedZone);

  const zoneColors: Record<string, string> = {
    "North-Central": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    "North-East": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    "North-West": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    "South-East": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    "South-South": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "South-West": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  };

  return (
    <div className="flex flex-col h-full">
      {/* Geo-zone filter */}
      <div className="px-3 pt-3 pb-2">
        <ScrollArea className="w-full">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedZone === zone
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Location cards */}
      <ScrollArea className="flex-1 px-3 pb-3">
        <div className="space-y-2 max-w-2xl mx-auto">
          {filtered.map((loc, i) => (
            <motion.div
              key={loc.state}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
              className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            >
              <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{loc.state}</p>
                <p className="text-xs text-zinc-500 truncate">{loc.address}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${zoneColors[loc.geozone] || "bg-zinc-100 text-zinc-600"}`}>
                {loc.geozone}
              </span>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

/* ──────────────── Relocation Panel ──────────────── */
function RelocationPanel() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 pt-3 pb-1">
        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Relocation Grounds</h3>
        <p className="text-xs text-zinc-500 mt-0.5">Eligible grounds for NYSC relocation applications</p>
      </div>
      <ScrollArea className="flex-1 px-3 pb-3">
        <div className="space-y-2 max-w-2xl mx-auto">
          {RELOCATION_GROUNDS.map((ground) => {
            const isOpen = expanded === ground.id;
            return (
              <motion.div
                key={ground.id}
                layout
                className="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : ground.id)}
                  className="flex items-center gap-3 w-full p-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                    <Navigation className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{ground.title}</p>
                    <p className="text-xs text-zinc-500 truncate">{ground.description}</p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 space-y-2">
                        <div>
                          <p className="text-xs font-medium text-zinc-500 mb-1">Eligibility</p>
                          <p className="text-xs text-zinc-700 dark:text-zinc-300">{ground.eligibility}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-zinc-500 mb-1">Required Documents</p>
                          <ul className="space-y-0.5">
                            {ground.documents.map((doc) => (
                              <li key={doc} className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                                <Check className="h-3 w-3 text-emerald-500" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

/* ──────────────── Main Component ──────────────── */
export default function ChatAndTools() {
  const [activeTab, setActiveTab] = useState<TabId>("chat");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 h-12">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">{BRAND_NAME}</h1>
              <p className="text-[10px] text-zinc-500 leading-tight">{TAGLINE}</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Menu className="h-4 w-4 text-zinc-600" />
          </button>
        </div>

        {/* Tab bar */}
        <div className="px-2 pb-0">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-lg border-b-2 transition-all shrink-0 ${
                    activeTab === tab.id
                      ? "border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30"
                      : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Tab content */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="h-full"
          >
            {activeTab === "chat" && <ChatPanel />}
            {activeTab === "faq" && <FAQPanel />}
            {activeTab === "checklist" && <ChecklistPanel />}
            {activeTab === "locations" && <LocationsPanel />}
            {activeTab === "relocation" && <RelocationPanel />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}