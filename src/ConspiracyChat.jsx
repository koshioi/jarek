// Web chat z symulowaną SI "alternatywnego badacza" – ulepszona wersja z dodatkowymi teoriami i tłem z kosmicznymi kotami i lodami
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConspiracyChat() {
  const [isMuted, setIsMuted] = useState(false);
  const audio = new Audio("https://cdn.pixabay.com/audio/2023/03/15/audio_2e0987f1f0.mp3");
  audio.loop = true;
  audio.volume = 0.4;
  audio.play().catch(() => {});

  const toggleAudio = () => {
    if (isMuted) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    setIsMuted(!isMuted);
  };

  const [messages, setMessages] = useState([
    { role: "ai", content: "Witaj. Zanim zadamy pytania – czy jesteś gotów poznać prawdę, której boi się mainstream?" }
  ]);
  const [input, setInput] = useState("");

  const persona = `Jestem Jarek, niezależny badacz. Śledzę powiązania, które ukrywają media i politycy. Zadaj pytanie, a pokażę Ci ukrytą stronę rzeczywistości.`;

  const keywordResponses = {
    "tarot": "Tarot? Symboliczny język intuicji i archetypów...",
    "egipt": "Egipt? Nie wszystko zostało zbudowane przez faraonów...",
    "piramidy": "Piramidy – rezonatory energii czy punkty komunikacji...",
    "duchy": "Duchy to nie halucynacje – to byty zakleszczone między wymiarami...",
    "yeti": "Yeti? Ślady istnieją, ale często znikają akta...",
    "kosmos": "Kosmos nie jest pustką. To struktura pełna tuneli, bram...",
    "kosmici": "Niektóre rasy były tu przed nami – Dogoni, Hopi, Sumerowie...",
    "mk ultra": "Projekt MK Ultra – kontrola umysłu poprzez traumę i środki...",
    "cia": "CIA – nie tylko wywiad. To reżyser narracji...",
    "bilderberg": "Grupa Bilderberg – elitarne spotkania decydujące o losach świata...",
    "nowy porządek": "New World Order – konsolidacja władzy pod przykrywką postępu...",
    "vaccines": "Szczepionki? Historia Tuskegee to ostrzeżenie...",
    "5g": "5G to nie tylko transmisja danych. Może wpływać na układ nerwowy...",
    "flat earth": "Ziemia? Oficjalna narracja to eksperyment psychologiczny...",
    "reptilian": "Reptilianie? Symbolika w heraldyce mówi sama za siebie...",
    "iluminaci": "Iluminaci? To nie mit, lecz sieć wpływów...",
    "matrix": "Matrix? To metafora kontroli i programowania społecznego...",
    // ...i inne
  };

  const altReplies = [
    "To pytanie prowadzi do wątku, o którym niewiele się mówi. Sprawdź Montauk Project.",
    "Czy wiesz, że niektóre sny są projekcjami z innego wymiaru?",
    "Twój temat łączy się z zapiskami z CIA. Odtajnione materiały są w sieci.",
    "Badaj – nie wierz. Nawet ja mogę się mylić. Ale dane nie kłamią."
  ];

  const generateResponse = (userInput) => {
    const normalized = userInput.toLowerCase();
    for (const keyword in keywordResponses) {
      if (normalized.includes(keyword)) {
        return `${persona}\n\n${keywordResponses[keyword]}`;
      }
    }
    const reply = altReplies[Math.floor(Math.random() * altReplies.length)];
    return `${persona}\n\n${reply}`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const aiMessage = { role: "ai", content: generateResponse(input) };
    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="p-4 max-w-4xl mx-auto space-y-4 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("https://i.imgur.com/zx3N5e1.jpg")' }}
    >
      <div className="flex justify-center">
        <img src="https://images.unsplash.com/photo-1629210549433-bcffb7fe2004" alt="człowiek z folią" className="rounded-xl shadow-lg w-[200px]" />
      </div>
      <div className="flex gap-6">
        <div className="flex-1 space-y-4 bg-white/80 p-4 rounded-xl shadow-xl">
          <h1 className="text-xl font-bold text-center">🧠 Chat z Jarkiem – niezależnym badaczem</h1>
          <Card className="h-[400px] overflow-y-auto p-2">
            <CardContent className="space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === "user" ? "text-right" : "text-left text-green-800"}>
                  <p><strong>{msg.role === "user" ? "Ty" : "Jarek"}:</strong> {msg.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={toggleAudio}>{isMuted ? "🔈 Włącz muzykę" : "🔇 Wycisz muzykę"}</Button>
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Zadaj pytanie np. 'Czy księżyc jest sztuczny?'"
            />
            <Button onClick={handleSend}>Wyślij</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
