/* Day 5 — Sorting Algorithms (DSA) + OOP Advanced (Concepts). */

const day5Questions = [
  {
    category: "DSA",
    question: "What is the time complexity of Bubble Sort in the worst case?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    correctIndex: 2,
    explanation: "Bubble sort repeatedly compares and swaps adjacent elements across nested loops, giving O(n^2) in the worst case."
  },
  {
    category: "DSA",
    question: "Which sorting algorithm repeatedly selects the minimum remaining element and places it at the correct position?",
    options: ["Merge Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
    correctIndex: 1,
    explanation: "Selection sort scans the unsorted portion each pass to find the minimum and swaps it into place — O(n^2) overall."
  },
  {
    category: "DSA",
    question: "What sorting technique does Merge Sort use?",
    options: [
      "Divide and conquer — split, sort each half, merge back together",
      "Repeatedly swap adjacent elements",
      "Pick a pivot and partition around it",
      "Insert each element into its correct position one at a time"
    ],
    correctIndex: 0,
    explanation: "Merge sort recursively splits the array in half, sorts each half, then merges the sorted halves — O(n log n)."
  },
  {
    category: "DSA",
    question: "What is the average-case time complexity of Quick Sort?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    correctIndex: 1,
    explanation: "With a well-chosen pivot, quicksort partitions into roughly balanced halves, giving O(n log n) on average (O(n^2) worst case)."
  },
  {
    category: "DSA",
    question: "What does it mean for a sorting algorithm to be 'stable'?",
    options: [
      "It never crashes",
      "Elements with equal keys retain their original relative order after sorting",
      "It always runs in O(n log n)",
      "It sorts in place without extra memory"
    ],
    correctIndex: 1,
    explanation: "A stable sort preserves the relative order of equal elements — useful when sorting by one field but wanting to keep order from a prior sort."
  },
  {
    category: "Concepts",
    question: "What is 'inheritance' in OOP?",
    options: [
      "Copying a class's code manually into another class",
      "A mechanism where a subclass derives properties and behavior from a superclass",
      "Deleting unused methods from a class",
      "Running two classes in parallel"
    ],
    correctIndex: 1,
    explanation: "Inheritance lets a subclass reuse and extend a superclass's attributes and methods, avoiding duplication."
  },
  {
    category: "Concepts",
    question: "What is 'polymorphism' in OOP?",
    options: [
      "Multiple unrelated classes with the same file name",
      "The ability for objects of different classes to respond to the same method call in their own way",
      "A class that can never be instantiated",
      "A variable that changes its own data type automatically"
    ],
    correctIndex: 1,
    explanation: "Different classes can implement the same method name differently — e.g. speak() behaving differently for Dog vs Cat."
  },
  {
    category: "Concepts",
    question: "What is 'method overriding'?",
    options: [
      "Defining a method with the same name/signature in a subclass to replace the superclass's version",
      "Calling a method twice",
      "Deleting a method from the superclass",
      "Renaming a method"
    ],
    correctIndex: 0,
    explanation: "Overriding lets a subclass provide its own implementation of a method already defined in its superclass."
  },
  {
    category: "Concepts",
    question: "What is an 'abstract class'?",
    options: [
      "A class that can be instantiated freely",
      "A class that can't be instantiated on its own, meant to be subclassed, often defining methods subclasses must implement",
      "A class with no methods at all",
      "A class used only for storing constants"
    ],
    correctIndex: 1,
    explanation: "Abstract classes define a common blueprint for subclasses without being usable directly themselves."
  },
  {
    category: "Concepts",
    question: "In OOP, what does 'abstraction' mean?",
    options: [
      "Making code run faster",
      "Hiding complex implementation details, exposing only the essential interface",
      "Combining multiple classes into one",
      "Writing code without any classes"
    ],
    correctIndex: 1,
    explanation: "Abstraction lets you use an object through a simple interface (e.g. car.drive()) without needing to know the underlying complexity."
  }
];

MCQ.registerDay("day5", "Day 5", day5Questions);
