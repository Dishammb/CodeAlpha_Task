import random

# ─── ASCII art for the hangman stages ───────────────────────────────────────
HANGMAN_STAGES = [
    # 0 wrong guesses
    """
  +---+
  |   |
      |
      |
      |
      |
=========""",
    # 1 wrong guess
    """
  +---+
  |   |
  O   |
      |
      |
      |
=========""",
    # 2 wrong guesses
    """
  +---+
  |   |
  O   |
  |   |
      |
      |
=========""",
    # 3 wrong guesses
    """
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========""",
    # 4 wrong guesses
    """
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========""",
    # 5 wrong guesses
    """
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========""",
    # 6 wrong guesses – game over
    """
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========""",
]

# ─── Word list ───────────────────────────────────────────────────────────────
WORDS = ["python", "hangman", "keyboard", "monitor", "laptop"]

# ─── Game logic ─────────────────────────────────────────────────────────────

def display_state(word, guessed_letters, wrong_count):
    """Print current hangman figure and the word progress."""
    print(HANGMAN_STAGES[wrong_count])
    # Show letters or underscores
    display = " ".join(letter if letter in guessed_letters else "_" for letter in word)
    print(f"\n  Word: {display}")
    print(f"  Wrong guesses left: {6 - wrong_count}")
    if wrong_count > 0:
        wrong_letters = [l for l in guessed_letters if l not in word]
        print(f"  Incorrect letters : {', '.join(sorted(wrong_letters))}")


def get_guess(guessed_letters):
    """Prompt the player for a valid, new single letter."""
    while True:
        guess = input("\n  Enter a letter: ").strip().lower()
        if len(guess) != 1 or not guess.isalpha():
            print("  ⚠  Please enter a single letter.")
        elif guess in guessed_letters:
            print(f"  ⚠  You already guessed '{guess}'. Try another.")
        else:
            return guess


def play_hangman():
    """Run one full game of Hangman."""
    word = random.choice(WORDS)
    guessed_letters = set()
    wrong_count = 0
    max_wrong = 6

    print("\n" + "=" * 40)
    print("       W E L C O M E  T O  H A N G M A N")
    print("=" * 40)
    print(f"  Guess the {len(word)}-letter word. You have {max_wrong} wrong guesses.")

    while wrong_count < max_wrong:
        display_state(word, guessed_letters, wrong_count)

        # Check win condition
        if all(letter in guessed_letters for letter in word):
            print(f"\n  🎉 You won! The word was: {word.upper()}")
            return

        guess = get_guess(guessed_letters)
        guessed_letters.add(guess)

        if guess in word:
            print(f"  ✅ '{guess}' is in the word!")
        else:
            wrong_count += 1
            print(f"  ❌ '{guess}' is NOT in the word.")

    # Reveal final state
    display_state(word, guessed_letters, wrong_count)
    print(f"\n  💀 Game over! The word was: {word.upper()}")


def main():
    while True:
        play_hangman()
        again = input("\n  Play again? (yes/no): ").strip().lower()
        if again not in ("yes", "y"):
            print("\n  Thanks for playing Hangman! Goodbye. 👋\n")
            break


if __name__ == "__main__":
    main()
