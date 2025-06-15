import { useState } from "react";

export default function ConspiracyChat() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Witaj. Zanim zadamy pytania – czy jesteś gotów poznać prawdę, której boi się mainstream?" }
  ]);
  const [input, setInput] = useState("");

  const persona = `Jestem Jarek, niezależny badacz. Śledzę powiązania, które ukrywają media i politycy. Zadaj pytanie, a pokażę Ci ukrytą stronę rzeczywistości.`;

  const generateResponse = (userInput) => {
    const altReplies = [
      "Zadałeś ważne pytanie. Niewielu odważa się o to pytać. To ma związek z projektem Blue Beam i kontrolą mas przez elektromagnetyzm.",
      "Oficjalna wersja to zasłona dymna. Spójrz na wzorce – te wydarzenia nie są przypadkowe.",
      "To wszystko zaczęło się, gdy pewne dokumenty zniknęły z archiwum w Langley. Prawda nie ujrzała światła dziennego do dziś.",
      "To nie teoria – to praktyka od lat. Ślady znajdziesz w raportach WHO, tylko trzeba umieć czytać między wierszami."
    ];
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

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontWeight: "bold", fontSize: 20 }}>🧠 Chat z Jarkiem – niezależnym badaczem</h1>
      <div style={{ border: "1px solid #ccc", height: 300, overflowY: "auto", padding: 10, margin: "10px 0" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left", color: msg.role === "user" ? "#000" : "#0b572d" }}>
            <strong>{msg.role === "user" ? "Ty" : "Jarek"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Zadaj pytanie np. 'Czy księżyc jest sztuczny?'"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleSend} style={{ padding: "8px 12px" }}>Wyślij</button>
      </div>
    </div>
  );
}