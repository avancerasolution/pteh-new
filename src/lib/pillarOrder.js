/* =========================================
   Convert number words to actual numbers
   Supports: one → ninety nine
========================================= */

const NUMBER_WORDS = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

const wordsToNumber = (words) => {
  return words.split(/[\s-]+/).reduce((sum, word) => sum + (NUMBER_WORDS[word] || 0), 0);
};

/* =========================================
   MAIN EXPORT
   Extract numeric order from pillar name
========================================= */
export const getPillarOrder = (name = "") => {
  const lower = name.toLowerCase();

  // 1️⃣ If numeric exists → Pillar 21
  const digitMatch = lower.match(/pillar\s+(\d+)/);
  if (digitMatch) {
    return Number(digitMatch[1]);
  }

  // 2️⃣ Word based → Pillar Twenty One
  const wordMatch = lower.match(/pillar\s+([a-z\s-]+)/);
  if (wordMatch) {
    return wordsToNumber(wordMatch[1]);
  }

  // 3️⃣ fallback (end me chala jaye)
  return 9999;
};
