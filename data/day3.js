/* Day 3 — Stacks & Queues (DSA) + Functions & Scope (Concepts). */

const day3Questions = [
  {
    category: "DSA",
    question: "What is the defining behavior of a Stack data structure?",
    options: ["First-In-First-Out (FIFO)", "Last-In-First-Out (LIFO)", "Random access", "Sorted insertion"],
    correctIndex: 1,
    explanation: "A stack follows LIFO — the last element pushed is the first one popped, like a stack of plates."
  },
  {
    category: "DSA",
    question: "What is the defining behavior of a Queue data structure?",
    options: ["Last-In-First-Out (LIFO)", "First-In-First-Out (FIFO)", "Random access", "Sorted insertion"],
    correctIndex: 1,
    explanation: "A queue follows FIFO — the first element enqueued is the first one dequeued, like a line of people."
  },
  {
    category: "DSA",
    question: "Which real-world scenario best matches a Queue?",
    options: ["Undo functionality in a text editor", "People waiting in line at a ticket counter", "Function call stack during recursion", "Browser back button history"],
    correctIndex: 1,
    explanation: "People join at the back and are served from the front — classic FIFO."
  },
  {
    category: "DSA",
    question: "What is the time complexity of push/pop operations on a stack (array or linked list backed)?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctIndex: 0,
    explanation: "Both push and pop happen at one end (the top) — no shifting or traversal needed."
  },
  {
    category: "DSA",
    question: "What classic problem is commonly solved using a stack?",
    options: ["Sorting an array", "Balanced parentheses / bracket matching", "Binary search", "Hashing"],
    correctIndex: 1,
    explanation: "Push opening brackets, pop and match on closing ones — a textbook stack use case."
  },
  {
    category: "Concepts",
    question: "What is a 'parameter' in the context of a function?",
    options: ["The value returned by a function", "A variable in the function's definition that receives an input value", "A global variable", "The function's name"],
    correctIndex: 1,
    explanation: "Parameters are placeholders in the signature; actual values passed in when calling are 'arguments'."
  },
  {
    category: "Concepts",
    question: "What does 'scope' refer to in programming?",
    options: ["The size of a variable's value", "The region of code where a variable is accessible", "The function's return type", "The number of parameters a function has"],
    correctIndex: 1,
    explanation: "Scope determines where in the code a variable can be referenced — e.g. local vs global."
  },
  {
    category: "Concepts",
    question: "What is a 'local variable'?",
    options: ["Accessible from anywhere in the program", "Declared inside a function, accessible only within it", "A variable that never changes", "Declared outside any function"],
    correctIndex: 1,
    explanation: "Local variables exist only within the function/block they're declared in, and disappear once it finishes."
  },
  {
    category: "Concepts",
    question: "What does a function's 'return' statement do?",
    options: ["Prints a value to the screen", "Ends the function and optionally sends a value back to the caller", "Restarts the function", "Declares a new variable"],
    correctIndex: 1,
    explanation: "return exits the function immediately and hands a value back to the caller, if any."
  },
  {
    category: "Concepts",
    question: "What does it mean when a variable inside a function 'shadows' a global variable of the same name?",
    options: ["The global variable is permanently deleted", "Inside that function, the name refers to the local variable, not the global one", "It causes a syntax error", "The function cannot run"],
    correctIndex: 1,
    explanation: "The local variable takes precedence within its own scope; the global one is unaffected outside the function."
  }
];

MCQ.registerDay("day3", "Day 3", day3Questions);
