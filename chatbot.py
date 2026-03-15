"""
Basic Rule-Based Chatbot
Key concepts: if-elif, functions, loops, input/output
"""

# ─── Response rules ──────────────────────────────────────────────────────────
# Each entry: (list_of_trigger_keywords, response_string)
RULES = [
    # Greetings
    (["hello", "hi", "hey", "howdy", "greetings"],
     "Hi there! 😊 How can I help you today?"),

    # How are you
    (["how are you", "how r you", "how do you do", "hows it going", "how's it going"],
     "I'm doing great, thanks for asking! How about you?"),

    # User replies they're fine / good
    (["i'm fine", "im fine", "i am fine", "good", "great", "awesome", "not bad", "doing well"],
     "Glad to hear that! 😄 Is there anything I can do for you?"),

    # Name
    (["your name", "who are you", "what are you"],
     "I'm ChatBot 🤖 — a simple rule-based assistant built in Python!"),

    # Age
    (["how old", "your age"],
     "I was just born when you ran this script, so I'm very young! 😄"),

    # Creator / built by
    (["who made you", "who built you", "who created you", "who wrote you"],
     "I was built by a Python developer as a learning project!"),

    # Capabilities
    (["what can you do", "help", "assist", "capabilities"],
     "I can chat with you! Try: 'hello', 'how are you', 'your name', 'tell me a joke', or 'bye'."),

    # Jokes
    (["joke", "funny", "laugh", "humor"],
     "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂"),

    # Time / date  (rule-based fallback — no live data)
    (["time", "date", "today"],
     "I don't have a clock, but you can check your system clock! ⏰"),

    # Weather
    (["weather", "temperature", "forecast"],
     "I can't check live weather, but I hope it's sunny wherever you are! ☀️"),

    # Thank you
    (["thank you", "thanks", "thx", "ty"],
     "You're welcome! 😊 Happy to help."),

    # Goodbye
    (["bye", "goodbye", "see you", "exit", "quit", "cya", "later"],
     "Goodbye! Have a wonderful day! 👋"),
]

# ─── Helper functions ────────────────────────────────────────────────────────

def get_response(user_input: str) -> tuple[str, bool]:
    """
    Match user_input against RULES and return (response, should_exit).
    Falls back to a default reply if nothing matches.
    """
    text = user_input.lower().strip()

    for triggers, response in RULES:
        for trigger in triggers:
            if trigger in text:
                should_exit = any(kw in text for kw in ["bye", "goodbye", "exit", "quit"])
                return response, should_exit

    # Default fallback
    return ("Hmm, I'm not sure I understand. 🤔 "
            "Try asking about my name, tell me to crack a joke, or say 'help'!"), False


def print_banner():
    """Display a welcome banner."""
    print("\n" + "=" * 50)
    print("   🤖  W E L C O M E  T O  C H A T B O T  🤖")
    print("=" * 50)
    print("  Type a message and press Enter.")
    print("  Type 'bye' or 'quit' to exit.\n")


# ─── Main loop ───────────────────────────────────────────────────────────────

def main():
    print_banner()

    while True:
        try:
            user_input = input("  You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n  Bot: Goodbye! 👋\n")
            break

        if not user_input:
            print("  Bot: Please say something! I'm listening. 👂")
            continue

        response, should_exit = get_response(user_input)
        print(f"  Bot: {response}\n")

        if should_exit:
            break


if __name__ == "__main__":
    main()
