import React from "react";
import { Greeting } from "./components/Greeting";
import { Counter } from "./components/Counter";
import TodoList from "./components/TodoList";
import {ContactGrid} from "./components/ContactCard";
import GenericList from "./components/GenericList";

const contacts = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
];

// Sample data for the enhanced generic list
const fruits = [
  { name: "Apple", color: "Red", category: "Fruit" },
  { name: "Banana", color: "Yellow", category: "Fruit" },
  { name: "Orange", color: "Orange", category: "Citrus" },
  { name: "Grape", color: "Purple", category: "Fruit" },
  { name: "Lemon", color: "Yellow", category: "Citrus" },
];

const techSkills = [
  "React & TypeScript",
  "Node.js & Express",
  "Python & Django",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
  "AWS & Cloud",
  "GraphQL"
];

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        <Greeting name="Developer rimuru10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Counter />
        <TodoList />
        </div>
         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <ContactGrid />
          </div>
           <div className="space-y-8">
            {/* Fruits List */}
            <GenericList
              title="Healthy Snacks"
              items={fruits}
              renderItem={(fruit) => (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{fruit.name}</div>
                    <div className="text-sm text-muted-foreground">{fruit.category}</div>
                  </div>
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-border"
                    style={{ backgroundColor: fruit.color.toLowerCase() }}
                  />
                </div>
              )}
              keyExtractor={(fruit) => fruit.name}
              searchable
              searchPlaceholder="Search fruits..."
              searchFilter={(fruit, term) => 
                fruit.name.toLowerCase().includes(term.toLowerCase()) ||
                fruit.category.toLowerCase().includes(term.toLowerCase())
              }
              emptyMessage="No fruits found. Try a different search!"
            />
            
            {/* Skills List */}
            <GenericList
              title="Tech Skills"
              items={techSkills}
              renderItem={(skill, index) => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="font-medium text-foreground">{skill}</div>
                </div>
              )}
              searchable
              searchPlaceholder="Search skills..."
              emptyMessage="No skills match your search."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
