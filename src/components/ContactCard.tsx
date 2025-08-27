import React, { useState } from "react";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
};

const contacts: Contact[] = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    email: "alice@company.com", 
    phone: "+1 (555) 123-4567",
    role: "Product Manager",
    status: 'online'
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    email: "bob@company.com", 
    phone: "+1 (555) 987-6543",
    role: "Developer",
    status: 'away'
  },
  { 
    id: 3, 
    name: "Charlie Brown", 
    email: "charlie@company.com",
    role: "Designer",
    status: 'offline'
  },
  { 
    id: 4, 
    name: "Diana Prince", 
    email: "diana@company.com", 
    phone: "+1 (555) 456-7890",
    role: "Marketing Lead",
    status: 'online'
  },
];

const statusColors = {
  online: 'bg-success',
  away: 'bg-warning',
  offline: 'bg-muted-foreground'
};


export function ContactCard({ contact }: { contact: Contact }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  return (
     <div className="group relative h-48">
      <div 
        className={`w-full h-full transition-transform duration-700 transform-gpu ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-glass backdrop-blur-xl border border-border rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer"
          style={{ backfaceVisibility: 'hidden' }}
          onClick={() => setIsFlipped(true)}
        >
          <div className="flex flex-col items-center text-center h-full">
            <div className="relative mb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                {getInitials(contact.name)}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColors[contact.status]} rounded-full border-2 border-background`} />
            </div>
            
            <h3 className="font-bold text-lg text-foreground mb-1">{contact.name}</h3>
            {contact.role && (
              <p className="text-sm text-muted-foreground mb-2">{contact.role}</p>
            )}
            <p className="text-sm text-muted-foreground truncate w-full">{contact.email}</p>
            
            <div className="mt-auto">
              <p className="text-xs text-muted-foreground">Click to see more</p>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-secondary backdrop-blur-xl border border-border rounded-2xl p-6 shadow-card transform rotate-y-180"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground truncate">{contact.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <span className="text-muted-foreground">×</span>
              </button>
            </div>
            
            <div className="space-y-3 flex-1">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                <p className="text-sm text-foreground break-all">{contact.email}</p>
              </div>
              
              {contact.phone && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Phone</p>
                  <p className="text-sm text-foreground">{contact.phone}</p>
                </div>
              )}
              
              {contact.role && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Role</p>
                  <p className="text-sm text-foreground">{contact.role}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-gradient-primary text-primary-foreground py-2 px-3 rounded-lg text-sm font-medium hover:shadow-glow transition-all duration-300">
                Email
              </button>
              {contact.phone && (
                <button className="flex-1 bg-secondary text-secondary-foreground py-2 px-3 rounded-lg text-sm font-medium hover:bg-muted transition-all duration-300">
                  Call
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactGrid() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.role && contact.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const onlineCount = contacts.filter(c => c.status === 'online').length;

  return (
    <div className="bg-gradient-glass backdrop-blur-xl border border-border rounded-2xl p-8 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Contacts
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          {onlineCount} online
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300"
        />
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredContacts.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No contacts found.
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
      </div>
    </div>
  );
}

// Add custom CSS to handle 3D transforms
const style = document.createElement('style');
style.textContent = `
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;
document.head.appendChild(style);
