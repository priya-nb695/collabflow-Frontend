export const projects = [
  { name: "Website Redesign", description: "Refresh the marketing site and core conversion flows.", progress: 72, tasks: 28, due: "Mar 30", status: "On track", members: ["Rahul Verma", "Emma Cole", "Ankit Rao"] },
  { name: "Mobile Application", description: "Ship v2.0 with offline sync and project chat.", progress: 45, tasks: 41, due: "Apr 08", status: "At risk", members: ["John Park", "Priya Nair"] },
  { name: "AI Chatbot", description: "Conversational support connected to the knowledge base.", progress: 88, tasks: 19, due: "Apr 02", status: "On track", members: ["Emma Cole", "Rahul Verma"] },
  { name: "Admin Dashboard", description: "Internal analytics, permissions, and role management.", progress: 18, tasks: 32, due: "Apr 20", status: "Planning", members: ["Ankit Rao", "John Park"] },
];

export const tasks = [
  { title: "Create Login Page", project: "Website Redesign", status: "In Progress", priority: "High", due: "Mar 14", assignee: "Priya Nair", description: "Build a responsive login interface and connect it with the authentication API.", labels: ["Frontend", "Auth"], comments: 4, files: 2 },
  { title: "Integrate Authentication API", project: "Mobile Application", status: "Review", priority: "High", due: "Mar 12", assignee: "Rahul Verma", description: "Connect authentication endpoints and test session refresh.", labels: ["Backend"], comments: 7, files: 1 },
  { title: "Design Dashboard", project: "Admin Dashboard", status: "In Progress", priority: "Medium", due: "Mar 18", assignee: "Emma Cole", description: "Design core dashboard states and responsive data views.", labels: ["Design"], comments: 3, files: 5 },
  { title: "Fix Mobile Navigation", project: "Mobile Application", status: "Todo", priority: "Low", due: "Mar 21", assignee: "Ankit Rao", description: "Resolve mobile drawer focus and scrolling issues.", labels: ["Mobile"], comments: 2, files: 0 },
  { title: "Review Payment API", project: "Website Redesign", status: "Done", priority: "High", due: "Mar 11", assignee: "John Park", description: "Complete security review for checkout webhooks.", labels: ["API"], comments: 9, files: 3 },
];

export const members = [
  { name: "Priya Nair", email: "priya@acme.co", role: "Admin", status: "Active", last: "Now" },
  { name: "Rahul Verma", email: "rahul@acme.co", role: "Developer", status: "Active", last: "2 min ago" },
  { name: "Emma Cole", email: "emma@acme.co", role: "Manager", status: "Active", last: "18 min ago" },
  { name: "Ankit Rao", email: "ankit@acme.co", role: "Developer", status: "Active", last: "1 hour ago" },
  { name: "John Park", email: "john@acme.co", role: "Viewer", status: "Away", last: "Yesterday" },
];