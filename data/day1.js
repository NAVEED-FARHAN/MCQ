/* Day 1 — Arrays & Strings (DSA) + Coding fundamentals. */

const day1Questions = [
  {
    category: "DSA",
    question: "In most programming languages, what is the index of the first element in an array?",
    options: ["1", "0", "-1", "Depends on array size"],
    correctIndex: 1,
    explanation: "Most languages (Python, Java, C, JavaScript, etc.) use zero-based indexing — the first element sits at index 0."
  },
  {
    category: "DSA",
    question: "What is the time complexity of accessing an array element by its index?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctIndex: 2,
    explanation: "Arrays support direct/random access — the memory address is computed straight from the index, so it's constant time regardless of array size."
  },
  {
    category: "DSA",
    question: "In many languages (e.g. Python, Java), strings are immutable. What does that mean?",
    options: ["Strings can only contain numbers", "Once created, a string's contents can't be changed in place — operations create a new string", "Strings can never be compared", "Strings must be declared before use"],
    correctIndex: 1,
    explanation: "Any 'modification' to an immutable string actually produces a new string in memory rather than changing the original."
  },
  {
    category: "DSA",
    question: "What is the time complexity of searching for an element in an unsorted array?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctIndex: 2,
    explanation: "With no ordering to exploit, you may have to check every element in the worst case — linear time."
  },
  {
    category: "DSA",
    question: "What is the average time complexity of inserting an element at the END of a dynamic array (like Python's list or Java's ArrayList)?",
    options: ["O(1) amortized", "O(n)", "O(log n)", "O(n²)"],
    correctIndex: 0,
    explanation: "Appending is O(1) amortized — occasional resizes cost O(n), but averaged over many insertions it works out to constant time. (Inserting at the START is O(n) since everything has to shift.) Array vs. dynamic array: a plain (static) array has a fixed capacity set when it's created — it can't grow, so adding past its size means manually building a new, bigger array. A dynamic array (Python's list, Java's ArrayList) grows itself: when full, it allocates a larger block (usually 2×) and copies the old elements over. That occasional copy is exactly the O(n) resize hiding behind 'amortized' in O(1) amortized."
  },
  {
    category: "Coding",
    question: "Which of these is typically a mutable data type?",
    options: ["String", "Tuple", "List/Array", "Integer"],
    correctIndex: 2,
    explanation: "Lists/arrays can be changed in place after creation; strings, tuples, and integers instead produce a new value when 'changed'."
  },
  {
    category: "Coding",
    question: "Following standard operator precedence, what is 2 + 3 × 4?",
    options: ["20", "14", "24", "9"],
    correctIndex: 1,
    explanation: "Multiplication happens before addition, so 3×4=12 first, then 2+12=14."
  },
  {
    category: "Coding",
    question: "Which data type holds only True/False?",
    options: ["Integer", "Boolean", "Character", "Float"],
    correctIndex: 1,
    explanation: "Boolean is the type behind conditionals and logical operations."
  },
  {
    category: "Coding",
    question: "What is 'type casting' (or 'type conversion')?",
    options: ["Renaming a variable", "Converting a value from one data type to another", "Deleting a value", "Copying a memory address"],
    correctIndex: 1,
    explanation: "E.g. turning the string \"5\" into the integer 5 so it can be used in arithmetic."
  },
  {
    category: "Coding",
    question: "What does integer (floor) division of 7 by 2 return?",
    options: ["3.5", "3", "4", "1"],
    correctIndex: 1,
    explanation: "Floor division drops the remainder and rounds down: 7 ÷ 2 → 3, unlike regular division which gives 3.5."
  }
];

MCQ.registerDay("day1", "Day 1", day1Questions);
