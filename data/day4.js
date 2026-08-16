/* Day 4 — Recursion (DSA) + OOP Basics (Concepts). */

const day4Questions = [
  {
    category: "DSA",
    question: "What is a 'base case' in a recursive function?",
    options: ["The first line of any function", "The condition that stops the recursion from continuing infinitely", "A case that always causes an error", "The default return value of a function"],
    correctIndex: 1,
    explanation: "The base case is the simplest instance of the problem, answered directly without further recursive calls — without it, recursion never terminates."
  },
  {
    category: "DSA",
    question: "What happens if a recursive function has no base case (or an unreachable one)?",
    options: ["It runs once and stops", "It causes a stack overflow / infinite recursion", "It automatically converts to a loop", "It returns null"],
    correctIndex: 1,
    explanation: "Without a way to stop, the function keeps calling itself, consuming stack memory until it overflows."
  },
  {
    category: "DSA",
    question: "What data structure does the computer use internally to manage recursive function calls?",
    options: ["A queue", "A heap", "A call stack", "A hash table"],
    correctIndex: 2,
    explanation: "Each recursive call is pushed onto the call stack; when a call returns, it's popped off — LIFO."
  },
  {
    category: "DSA",
    question: "In factorial(n) = n * factorial(n-1), what is the base case?",
    options: ["factorial(n) = n", "factorial(0) = 1 (or factorial(1) = 1)", "There is no base case needed", "factorial(-1) = 0"],
    correctIndex: 1,
    explanation: "factorial(0) returning 1 directly stops the chain of recursive calls."
  },
  {
    category: "DSA",
    question: "What is 'tail recursion'?",
    options: ["A recursive call at the very end of a function, with nothing left to do after it returns", "A function with no return statement", "A function that calls itself twice", "Recursion that only works on arrays"],
    correctIndex: 0,
    explanation: "Because the recursive call is the last operation, some languages/compilers can optimize it to avoid growing the call stack."
  },
  {
    category: "Concepts",
    question: "What is a 'class' in object-oriented programming?",
    options: ["A specific instance of data in memory", "A blueprint that defines the properties and behaviors an object will have", "A type of loop", "A built-in function"],
    correctIndex: 1,
    explanation: "A class defines the structure and behavior its objects will share; an object is an instance created from it."
  },
  {
    category: "Concepts",
    question: "What is an 'object' in OOP?",
    options: ["The same thing as a class", "An instance of a class, with its own actual data", "A function with no name", "A type of variable declaration only"],
    correctIndex: 1,
    explanation: "An object is a concrete instance created from a class, holding its own values for the class's attributes."
  },
  {
    category: "Concepts",
    question: "What term describes a function defined inside a class, meant to operate on its objects?",
    options: ["A variable", "A method", "A module", "A parameter"],
    correctIndex: 1,
    explanation: "Methods are functions attached to a class, typically operating on that object's own data."
  },
  {
    category: "Concepts",
    question: "What is a 'constructor' in OOP?",
    options: ["A method that deletes an object", "A special method automatically called when a new object is created, used to set initial values", "A method that only runs once per program", "A variable that holds the class name"],
    correctIndex: 1,
    explanation: "Constructors (e.g. __init__ in Python) initialize a new object's state right when it's created."
  },
  {
    category: "Concepts",
    question: "What best describes 'encapsulation' in OOP?",
    options: ["Creating multiple classes with the same name", "Bundling data and the methods that operate on it together, often restricting direct access", "Making all variables global", "Running code in a loop"],
    correctIndex: 1,
    explanation: "Encapsulation groups related data and behavior into one unit and controls how that data is accessed from outside."
  }
];

MCQ.registerDay("day4", "Day 4", day4Questions);
