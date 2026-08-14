/* Day 2 — Linked Lists (DSA) + Control Flow (Concepts). */

const day2Questions = [
  {
    category: "DSA",
    question: "What is a key structural difference between an array and a singly linked list?",
    options: ["Arrays can hold different types, linked lists can't", "Linked list nodes are connected via pointers, not stored contiguously in memory", "Linked lists have a fixed size, arrays don't", "Arrays don't support iteration"],
    correctIndex: 1,
    explanation: "Each node holds data plus a pointer to the next node; nodes can live anywhere in memory, unlike an array's contiguous block."
  },
  {
    category: "DSA",
    question: "What is the time complexity of inserting a node at the head of a singly linked list?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctIndex: 0,
    explanation: "You just create the node and point it to the current head — no shifting, unlike an array's O(n) front-insert."
  },
  {
    category: "DSA",
    question: "What is the time complexity of accessing the k-th element in a singly linked list?",
    options: ["O(1)", "O(log n)", "O(n)", "O(k^2)"],
    correctIndex: 2,
    explanation: "No random access — you must traverse from the head, node by node."
  },
  {
    category: "DSA",
    question: "In a singly linked list, what does the last node's 'next' pointer point to?",
    options: ["The head node", "Itself", "Null/None", "A random node"],
    correctIndex: 2,
    explanation: "Null/None marks the end of the list."
  },
  {
    category: "DSA",
    question: "What's the main advantage of a doubly linked list over a singly linked list?",
    options: ["Uses less memory", "Allows traversal in both directions", "Faster random access", "Doesn't need a head pointer"],
    correctIndex: 1,
    explanation: "Each node has 'next' and 'prev' pointers, enabling backward traversal — at the cost of extra memory per node."
  },
  {
    category: "Concepts",
    question: "What's the key difference between a while loop and a for loop, conceptually?",
    options: ["while loops always run faster", "for is typically used when the number of iterations is known; while is used until a condition changes", "for loops can't use conditions", "There is no real difference"],
    correctIndex: 1,
    explanation: "for suits a set number of iterations; while suits looping until something changes."
  },
  {
    category: "Concepts",
    question: "What happens when 'break' executes inside a loop?",
    options: ["Rest of the iteration is skipped, loop continues", "Loop restarts from the beginning", "Loop terminates immediately", "Nothing — break is invalid inside loops"],
    correctIndex: 2,
    explanation: "break exits the nearest enclosing loop right away."
  },
  {
    category: "Concepts",
    question: "What does 'continue' do inside a loop?",
    options: ["Stops the loop completely", "Skips the rest of the current iteration, moves to the next", "Pauses execution", "Restarts the program"],
    correctIndex: 1,
    explanation: "continue jumps straight to the next iteration's check, skipping remaining code in the current pass."
  },
  {
    category: "Concepts",
    question: "What's a common risk with while loops that's less common with for loops over a fixed collection?",
    options: ["They can't have conditions", "Accidentally creating an infinite loop", "They run only once", "They can't be nested"],
    correctIndex: 1,
    explanation: "If the exit condition never changes correctly, a while loop can run forever."
  },
  {
    category: "Concepts",
    question: "In an if-elif-else chain, how many blocks can execute in one pass?",
    options: ["All blocks with a true condition", "Exactly one — the first true one (or else)", "None, unless forced", "Exactly two"],
    correctIndex: 1,
    explanation: "Once a condition matches, that block runs and the rest of the chain is skipped."
  }
];

MCQ.registerDay("day2", "Day 2", day2Questions);
