import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { CalendarDays, CheckCircle2, ChevronDown, ChevronUp, Code2, Download, Flame, RotateCcw, Target, Trophy, BookOpen, Clock3, Save, AlertCircle, NotebookPen, ExternalLink, Pencil, Trash2, Plus, X } from "lucide-react";
import "./styles.css";

const DAYS = [
  { day:1, title:"Python fundamentals", phase:"Python + QA foundation", learn:"Variables, strings, numbers, print(), input(), type conversion.", code:"Write 5 small programs: print details, calculate a payment total, format strings, convert types, and take input.", build:"Create a simple payment-validation program using variables.", interview:"Explain variables, data types, and each line of your program.", topics:["Python variables and data types","Strings and numbers","print() and input()","Type conversion"] },
  { day:2, title:"Conditions and operators", phase:"Python + QA foundation", learn:"if/elif/else, comparison operators, logical operators.", code:"Write login validation and payment amount validation.", build:"Test valid, invalid, zero, and negative amounts.", interview:"Explain positive and negative test scenarios.", topics:["if/elif/else","Comparison operators","Logical operators","Input validation"] },
  { day:3, title:"Lists, dictionaries and loops", phase:"Python + QA foundation", learn:"Lists, dictionaries, for loops, while loops.", code:"Read transaction statuses and identify failed transactions.", build:"Solve run-length encoding: aabgsssdda → 2a1b1g3s2d1a.", interview:"Explain loops, dictionaries, and your coding solution.", topics:["Lists and dictionaries","for and while loops","String traversal","Run-length encoding"] },
  { day:4, title:"Functions and reusable code", phase:"Python + QA foundation", learn:"Functions, arguments, return values, scope.", code:"Write functions to validate status codes and payment amounts.", build:"Test functions with valid and invalid inputs.", interview:"Explain functions and the difference between print and return.", topics:["def and parameters","return values","Scope","Reusable validation functions"] },
  { day:5, title:"Exceptions, files and JSON", phase:"Python + QA foundation", learn:"try/except, file handling, JSON objects and lists.", code:"Create TestData.json with ShipperName and TruckType; load and print the values.", build:"Handle missing or invalid JSON fields safely.", interview:"Explain how JSON test data is used in automation.", topics:["try/except","File handling","JSON parsing","Data-driven testing fundamentals"] },
  { day:6, title:"OOP + HTML/CSS/JavaScript basics", phase:"Programming + web foundations", learn:"Classes, objects, __init__, self; HTML elements/forms; CSS selectors; JavaScript and DOM basics.", code:"Create a simple LoginPage class and a basic HTML form.", build:"Inspect form elements and identify labels, IDs, classes, and buttons.", interview:"Explain a class, object, HTML element, CSS selector, and DOM.", topics:["Classes and objects","__init__ and self","HTML forms and attributes","CSS selectors","JavaScript and DOM basics"] },
  { day:7, title:"Manual QA + weekly review", phase:"Programming + web foundations", learn:"SDLC, STLC, severity, priority, defect lifecycle, test design.", code:"Write test cases using equivalence partitioning and boundary value analysis.", build:"Test login, wallet top-up, invoice, and payment scenarios.", interview:"Answer a manual QA mock interview and review weak Python topics.", topics:["SDLC and STLC","Test case design","Severity vs priority","Defect lifecycle","Boundary value analysis"] },
  { day:8, title:"Playwright setup and browser control", phase:"Browser automation", learn:"Playwright setup, browser, browser context, page, navigation.", code:"Launch a browser, open a demo site, and close the browser correctly.", build:"Practise navigation and inspect the browser lifecycle.", interview:"Explain browser, context, and page.", topics:["Playwright installation","Browser and context","Page navigation","Browser lifecycle"] },
  { day:9, title:"Playwright locators", phase:"Browser automation", learn:"get_by_role, get_by_label, get_by_text, CSS selectors.", code:"Locate and interact with form fields and buttons.", build:"Debug a failing locator and prefer resilient locator strategies.", interview:"Explain locator choice and strict-mode errors.", topics:["get_by_role","get_by_label","get_by_text","CSS selectors","Locator debugging"] },
  { day:10, title:"Browser actions and assertions", phase:"Browser automation", learn:"fill, click, select_option, check, expect assertions, waits.", code:"Automate a login or registration form.", build:"Test success, invalid input, and validation messages.", interview:"Explain actions versus assertions and auto-waiting.", topics:["fill/click/select","Assertions","Auto-waiting","Positive and negative tests"] },
  { day:11, title:"PyTest foundations", phase:"Browser automation", learn:"Test naming, assert, pytest -v, test discovery, fixtures overview.", code:"Write positive and negative tests and run them from terminal.", build:"Investigate one deliberate failing assertion.", interview:"Explain how PyTest discovers and executes tests.", topics:["Test discovery","assert statements","pytest commands","Test organization"] },
  { day:12, title:"Fixtures and test lifecycle", phase:"Browser automation", learn:"Fixtures, yield, setup, teardown, fixture scope.", code:"Create reusable browser and page fixtures.", build:"Observe setup and cleanup when a test passes or fails.", interview:"Explain fixture purpose, scope, and teardown.", topics:["Fixtures","yield","Setup and teardown","Fixture scope"] },
  { day:13, title:"POM and data-driven testing", phase:"Browser automation", learn:"Page Object Model, page classes, reusable methods, JSON data.", code:"Separate page actions from test assertions and load JSON test data.", build:"Parameterize tests using multiple input cases.", interview:"Explain POM and why it improves maintainability.", topics:["Page Object Model","Reusable page methods","JSON test data","pytest parametrization"] },
  { day:14, title:"Automation framework review", phase:"Browser automation", learn:"Project structure, configuration, logging, screenshots, reports.", code:"Add failure screenshots and useful logs to your test suite.", build:"Run the full browser suite and fix failures.", interview:"Mock interview on Playwright, PyTest, fixtures, and POM.", topics:["Framework structure","Logging","Screenshots","Allure/report basics","Debugging"] },
  { day:15, title:"API testing with Postman", phase:"API + data + CI", learn:"HTTP methods, status codes, headers, request bodies, authentication.", code:"Send GET and POST requests to a safe demo API.", build:"Validate status, response fields, and negative cases.", interview:"Explain API test cases and authentication basics.", topics:["GET/POST/PUT/PATCH/DELETE","Status codes","Headers and payloads","Authentication"] },
  { day:16, title:"Python API automation", phase:"API + data + CI", learn:"requests, JSON responses, assertions, timeouts.", code:"Write PyTest API tests for status codes and response data.", build:"Test missing fields, invalid inputs, and error responses.", interview:"Explain API automation and common failure causes.", topics:["Python requests","Response validation","Timeouts","API negative testing"] },
  { day:17, title:"SQL fundamentals", phase:"API + data + CI", learn:"SELECT, WHERE, ORDER BY, DISTINCT, NULL.", code:"Create sample payment and invoice tables or use a practice database.", build:"Find duplicate transactions and failed payments.", interview:"Solve basic SQL questions aloud.", topics:["SELECT and WHERE","ORDER BY","DISTINCT","NULL handling"] },
  { day:18, title:"SQL joins and reconciliation", phase:"API + data + CI", learn:"JOIN, GROUP BY, HAVING, COUNT, SUM.", code:"Compare payment records with invoice records.", build:"Find missing transactions, mismatched amounts, and totals.", interview:"Explain joins and database validation.", topics:["INNER/LEFT JOIN","GROUP BY","HAVING","Payment reconciliation"] },
  { day:19, title:"Git, MongoDB and configuration", phase:"API + data + CI", learn:"Git status/add/commit/branch; MongoDB document basics; environment variables.", code:"Version-control your project and add safe configuration.", build:"Add logs and inspect sample MongoDB documents if available.", interview:"Explain version control and backend validation.", topics:["Git workflow","Branches and commits","Environment variables","MongoDB basics"] },
  { day:20, title:"CI/CD and performance testing", phase:"API + data + CI", learn:"Jenkins/GitHub Actions/GitLab CI concepts; JMeter threads, ramp-up, duration.", code:"Run your tests through one available CI workflow.", build:"Understand response time, throughput, load versus stress testing.", interview:"Explain how tests run automatically in a pipeline.", topics:["CI/CD concepts","Jenkins pipeline","GitHub Actions basics","JMeter fundamentals"] },
  { day:21, title:"AI testing fundamentals", phase:"AI testing + DeepEval", learn:"LLM behavior, nondeterminism, prompts, test oracles, test design.", code:"Create chatbot cases for correct, irrelevant, unsafe, and unsupported answers.", build:"Create a golden dataset and capture baseline results.", interview:"Explain why LLM testing differs from ordinary API testing.", topics:["LLM test design","Golden datasets","Nondeterminism","Prompt regression","Test oracles"] },
  { day:22, title:"LLM integration and local models", phase:"AI testing + DeepEval", learn:"Prompts, tokens, context windows, model settings, local inference.", code:"Connect Python to your local Ollama model.", build:"Record prompts, outputs, model name, settings, and latency.", interview:"Explain the model under test and repeatability challenges.", topics:["Ollama integration","Prompt design","Context window","Latency capture"] },
  { day:23, title:"AI evaluation dataset", phase:"AI testing + DeepEval", learn:"Golden answers, expected facts, rubrics, dataset coverage.", code:"Create at least 30 evaluation cases in JSON.", build:"Include normal, edge, negative, and unanswerable questions.", interview:"Explain how you would build an LLM test dataset.", topics:["Evaluation datasets","Expected answers","Rubric criteria","Negative and edge cases"] },
  { day:24, title:"LLM evaluation metrics", phase:"AI testing + DeepEval", learn:"Exact match, precision, recall, semantic similarity, relevance, groundedness, latency.", code:"Implement simple metric functions and test with known examples.", build:"Calculate scores manually and compare with code output.", interview:"Explain which metric fits a given test scenario.", topics:["Exact match","Precision and recall","Semantic similarity","Relevance","Groundedness/faithfulness","Latency"] },
  { day:25, title:"DeepEval fundamentals", phase:"AI testing + DeepEval", learn:"DeepEval setup, test cases, metrics, model configuration.", code:"Create a basic DeepEval test using an LLM test case and suitable metric.", build:"Run the test and inspect results or configuration errors.", interview:"Explain DeepEval, metrics, test cases, and thresholds.", topics:["DeepEval installation","LLMTestCase","Metrics","Thresholds","PyTest integration"] },
  { day:26, title:"DeepEval metrics and regression", phase:"AI testing + DeepEval", learn:"Answer relevancy, faithfulness, contextual relevance, judge limitations.", code:"Evaluate dataset cases with DeepEval and run them as tests.", build:"Inspect false positives/negatives and compare scores against a baseline.", interview:"Explain why an LLM judge can be wrong and how you validate scores.", topics:["Answer relevancy","Faithfulness","Contextual relevance","Evaluation thresholds","Regression testing"] },
  { day:27, title:"RAG testing", phase:"AI testing + DeepEval", learn:"RAG pipeline, chunking, embeddings, retrieval, context.", code:"Create RAG cases for relevant retrieval, missing context, and unsupported claims.", build:"Use suitable DeepEval RAG metrics where supported; compare with manual review.", interview:"Explain retrieval quality, faithfulness, and hallucination testing.", topics:["RAG pipeline","Retrieval precision/recall","Faithfulness","Contextual precision/recall","Citation checks"] },
  { day:28, title:"AI agent testing and reporting", phase:"AI testing + DeepEval", learn:"LangChain/LangGraph/CrewAI concepts, tool calling, routing, state, human approval.", code:"Test a small agent workflow or mocked tool call for correct selection and arguments.", build:"Add error cases, logs, evaluation summary, and report output.", interview:"Explain agent failures, retries, permissions, and human-in-the-loop.", topics:["Tool selection","Tool arguments","Routing and state","Retries and errors","Human approval","Reports"] },
  { day:29, title:"Full mock interview", phase:"Interview readiness", learn:"Review Python, QA, Playwright, PyTest, API, SQL, and AI QA.", code:"Solve one Python problem and one Playwright/PyTest task without copying.", build:"Explain your AI evaluation framework and DeepEval implementation.", interview:"Answer questions aloud; record weak answers and corrections.", topics:["Python coding","Playwright/PyTest","API/SQL","DeepEval","RAG/agents","Project explanation"] },
  { day:30, title:"Final project demonstration", phase:"Interview readiness", learn:"Review architecture and setup instructions.", code:"Run the project from a clean terminal and resolve obvious failures.", build:"Demonstrate one AI evaluation, one failing test, and a regression result.", interview:"Explain your contribution honestly and complete a final mock.", topics:["Project architecture","Clean execution","Failure analysis","Results and limitations","Interview defence"] }
];

const HABITS = [
  { id:"learn", label:"Learn the concept", detail:"Explain it in your own words." },
  { id:"code", label:"Write and run code", detail:"Do not only copy generated code." },
  { id:"test", label:"Test a negative case", detail:"Try an invalid input or failure scenario." },
  { id:"explain", label:"Explain without notes", detail:"Describe the logic aloud." },
  { id:"interview", label:"Answer one interview question", detail:"Answer first; review after." },
  { id:"revise", label:"Record mistakes and revise", detail:"Write what failed and what you learned." }
];

const LOG2BASE2_URL = "https://log2base2.com/courses/python/why-python";

// Separate course checklist. The 10-day grouping is a suggested study order,
// not an official Log2Base2 schedule.
const LOG2BASE2_TOPICS = [
  { day: 1, title: "Introduction to Python and Basics", topics: ["Why Python?", "Python block structure", "Comments in Python", "Print function", "Escape sequences", "Variables and dynamic typing", "id() and identity operator", "Input function", "String formatting"] },
  { day: 2, title: "Operators and Decision Making", topics: ["Arithmetic operators", "Power operator", "Floor division", "Assignment operators", "Relational operators", "Logical operators", "Decision making", "if, if-else, nested if and elif"] },
  { day: 3, title: "Strings and Collections", topics: ["Strings", "String indexing", "String slicing", "String methods", "Lists and list methods", "List indexing and slicing", "Tuples and tuple methods", "Dictionaries and dictionary methods", "Sets and set operations"] },
  { day: 4, title: "Loops and Functions", topics: ["Why loops?", "for loops", "range()", "while loops", "Nested loops", "break, continue and pass", "else on loops", "Function definition", "Function arguments", "return statement"] },
  { day: 5, title: "Functions, Scope and Exceptions", topics: ["Recursion", "Lambda functions", "Python scope", "Global and nonlocal keywords", "Errors and exceptions", "Exception handling", "finally clause"] },
  { day: 6, title: "File Handling and Modules", topics: ["File basics and reading", "Writing files", "Copying files", "Deleting files", "Python modules"] },
  { day: 7, title: "Classes and Inheritance", topics: ["Classes and objects", "Constructors", "Class and instance variables", "Inheritance", "Types of inheritance"] },
  { day: 8, title: "Built-in Functions", topics: ["Random number functions", "Math functions", "Useful built-in functions", "Practise with len(), sum(), min(), max() and sorted()"] },
  { day: 9, title: "Bitwise Operators", topics: ["Bitwise OR", "Bitwise AND", "Bitwise XOR", "Left shift", "Right shift", "One's complement"] },
  { day: 10, title: "Decorators and Iterators", topics: ["Passing functions as arguments", "Decorators", "Iterators", "Iteration practice", "Review weak topics"] }
];

const LOG2BASE2_STORAGE_KEY = "log2base2-python-progress-v1";
const GOOGLE_NOTES_STORAGE_KEY = "ai-qa-google-notes-v1";

const STORAGE_KEY = "ai-qa-training-tracker-v1";
const initialState = {
  startDate: "2026-10-14",
  completedDays: {},
  dayNotes: {},
  topicStatus: {},
  interviewAnswers: {},
  settings: { dailyGoalHours: 4 }
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  } catch {
    return initialState;
  }
}

function dayDate(startDate, day) {
  const d = new Date(`${startDate}T12:00:00`);
  d.setDate(d.getDate() + day - 1);
  return d;
}
function dateLabel(d) {
  return d.toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
}
function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function calcDay(startDate) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const start = new Date(`${startDate}T00:00:00`);
  return Math.min(30, Math.max(1, Math.floor((today - start) / 86400000) + 1));
}

function App() {
  const [state, setState] = useState(loadState);
  const [selectedDay, setSelectedDay] = useState(calcDay(loadState().startDate));
  const [tab, setTab] = useState("plan");
  const [search, setSearch] = useState("");
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [toast, setToast] = useState("");
  const [remindersEnabled, setRemindersEnabled] = useState(() => localStorage.getItem("ai-qa-reminders-enabled") === "true");
  const [log2base2Progress, setLog2base2Progress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LOG2BASE2_STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });
  const [googleNotes, setGoogleNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(GOOGLE_NOTES_STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [googleNoteForm, setGoogleNoteForm] = useState({ title: "", url: "", description: "", type: "docs" });
  const [editingGoogleNoteId, setEditingGoogleNoteId] = useState(null);
  const [googleNoteError, setGoogleNoteError] = useState("");
  const [log2base2Notes, setLog2base2Notes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`${LOG2BASE2_STORAGE_KEY}-notes`) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (!remindersEnabled || !("Notification" in window) || Notification.permission !== "granted") return;
    const checkReminder = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      if (mm !== "00" || !["06", "21"].includes(hh)) return;
      const slot = hh === "06" ? "morning" : "evening";
      const key = `ai-qa-reminder-${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}-${slot}`;
      if (localStorage.getItem(key)) return;
      const title = slot === "morning" ? "AI QA Training — Start today's lesson" : "AI QA Training — Progress check";
      const body = slot === "morning"
        ? `Day ${calcDay(state.startDate)}: open your daily plan and begin the learning/coding session.`
        : "Tick today's checklist, save your practice notes, and write an interview answer.";
      new Notification(title, { body });
      localStorage.setItem(key, "true");
    };
    checkReminder();
    const timer = window.setInterval(checkReminder, 30000);
    return () => window.clearInterval(timer);
  }, [remindersEnabled, state.startDate]);

  async function toggleReminders() {
    if (!("Notification" in window)) {
      notify("This browser does not support desktop notifications.");
      return;
    }
    if (Notification.permission === "denied") {
      notify("Notifications are blocked in browser settings. Allow them for this site, then try again.");
      return;
    }
    let permission = Notification.permission;
    if (permission !== "granted") permission = await Notification.requestPermission();
    if (permission === "granted") {
      const next = !remindersEnabled;
      setRemindersEnabled(next);
      localStorage.setItem("ai-qa-reminders-enabled", String(next));
      notify(next ? "Reminders enabled while this app is open." : "Reminders disabled.");
    } else {
      notify("Notification permission was not granted.");
    }
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem(LOG2BASE2_STORAGE_KEY, JSON.stringify(log2base2Progress));
  }, [log2base2Progress]);

  useEffect(() => {
    localStorage.setItem(GOOGLE_NOTES_STORAGE_KEY, JSON.stringify(googleNotes));
  }, [googleNotes]);

  useEffect(() => {
    localStorage.setItem(`${LOG2BASE2_STORAGE_KEY}-notes`, JSON.stringify(log2base2Notes));
  }, [log2base2Notes]);

  const completedCount = Object.values(state.completedDays).filter(x => x.done).length;
  const totalChecks = DAYS.reduce((sum, d) => sum + HABITS.length, 0);
  const checkedCount = Object.values(state.completedDays).reduce((sum, d) => sum + Object.values(d.checks || {}).filter(Boolean).length, 0);
  const progress = Math.round((checkedCount / totalChecks) * 100);
  const day = DAYS.find(d => d.day === selectedDay) || DAYS[0];
  const allTopics = DAYS.flatMap(d => d.topics.map((topic, idx) => ({
    id:`d${d.day}-t${idx}`, topic, day:d.day, dayTitle:d.title,
    done: Boolean(state.topicStatus[`d${d.day}-t${idx}`])
  })));
  const topicDone = allTopics.filter(t => t.done).length;
  const filteredTopics = allTopics.filter(t => `${t.topic} ${t.dayTitle} day ${t.day}`.toLowerCase().includes(search.toLowerCase()));
  const log2base2Total = LOG2BASE2_TOPICS.reduce((sum, section) => sum + section.topics.length, 0);
  const log2base2Completed = Object.values(log2base2Progress).filter(Boolean).length;

  function toggleLog2Base2Topic(id, value) {
    setLog2base2Progress(prev => ({ ...prev, [id]: value }));
  }

  function updateLog2Base2Note(dayNo, value) {
    setLog2base2Notes(prev => ({ ...prev, [dayNo]: value }));
  }

  function saveGoogleNote(event) {
    event.preventDefault();
    setGoogleNoteError("");
    const title = googleNoteForm.title.trim();
    const url = googleNoteForm.url.trim();
    if (!title || !url) {
      setGoogleNoteError("Enter both a title and a Google URL.");
      return;
    }
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      setGoogleNoteError("Enter a valid URL starting with https://");
      return;
    }
    const host = parsed.hostname.toLowerCase();
    const isGoogleDocs = host === "docs.google.com";
    const isGoogleKeep = host === "keep.google.com";
    if (parsed.protocol !== "https:" || (!isGoogleDocs && !isGoogleKeep)) {
      setGoogleNoteError("Use a Google Docs (docs.google.com) or Google Keep (keep.google.com) URL.");
      return;
    }
    const note = {
      id: editingGoogleNoteId || (window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`),
      title,
      url: parsed.href,
      description: googleNoteForm.description.trim(),
      type: isGoogleKeep ? "keep" : "docs",
      updatedAt: new Date().toISOString()
    };
    setGoogleNotes(prev => editingGoogleNoteId
      ? prev.map(item => item.id === editingGoogleNoteId ? note : item)
      : [note, ...prev]);
    setGoogleNoteForm({ title: "", url: "", description: "", type: "docs" });
    setEditingGoogleNoteId(null);
    notify(editingGoogleNoteId ? "Google note updated." : "Google note saved.");
  }

  function editGoogleNote(note) {
    setGoogleNoteForm({ title: note.title, url: note.url, description: note.description || "", type: note.type });
    setEditingGoogleNoteId(note.id);
    setGoogleNoteError("");
    document.getElementById("google-notes-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function deleteGoogleNote(id) {
    if (!window.confirm("Delete this saved Google note link?")) return;
    setGoogleNotes(prev => prev.filter(note => note.id !== id));
    if (editingGoogleNoteId === id) cancelGoogleNoteEdit();
    notify("Google note deleted.");
  }

  function cancelGoogleNoteEdit() {
    setEditingGoogleNoteId(null);
    setGoogleNoteForm({ title: "", url: "", description: "", type: "docs" });
    setGoogleNoteError("");
  }

  function updateDayCheck(dayNo, id, value) {
    setState(prev => {
      const current = prev.completedDays[dayNo] || { checks: {}, done: false };
      const checks = { ...current.checks, [id]: value };
      return { ...prev, completedDays: { ...prev.completedDays, [dayNo]: { ...current, checks, done: HABITS.every(h => checks[h.id]) } } };
    });
  }
  function updateNote(dayNo, value) {
    setState(prev => ({ ...prev, dayNotes: { ...prev.dayNotes, [dayNo]: value } }));
  }
  function toggleTopic(id, value) {
    setState(prev => ({ ...prev, topicStatus: { ...prev.topicStatus, [id]: value } }));
  }
  function updateAnswer(dayNo, value) {
    setState(prev => ({ ...prev, interviewAnswers: { ...prev.interviewAnswers, [dayNo]: value } }));
  }
  function exportProgress() {
    const blob = new Blob([JSON.stringify({ exportedAt:new Date().toISOString(), ...state }, null, 2)], { type:"application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-qa-training-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  function resetProgress() {
    if (window.confirm("Reset all saved progress, notes, and topic checkmarks? This cannot be undone unless you exported your progress.")) {
      setState({ ...initialState, startDate: state.startDate });
      setSelectedDay(1);
    }
  }
  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  const dueDate = dayDate(state.startDate, 30);
  const todayDay = calcDay(state.startDate);
  const daysLeft = Math.max(0, 30 - Math.floor((new Date().setHours(0,0,0,0) - new Date(`${state.startDate}T00:00:00`)) / 86400000));
  const phaseGroups = useMemo(() => {
    const groups = {};
    DAYS.forEach(d => { (groups[d.phase] ||= []).push(d); });
    return groups;
  }, []);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-icon"><Target size={21}/></div><div><strong>AI QA Training Tracker</strong><span>30-day hands-on plan</span></div></div>
        <div className="top-actions">
          <button className={`button ${remindersEnabled ? "primary" : "secondary"}`} onClick={toggleReminders}><Clock3 size={16}/>{remindersEnabled ? "Reminders on" : "Enable reminders"}</button>
          <button className="button secondary" onClick={exportProgress}><Download size={16}/> Export progress</button>
          <button className="icon-button" title="Reset progress" onClick={resetProgress}><RotateCcw size={17}/></button>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><Flame size={14}/> PRACTICE • TRACK • IMPROVE</span>
            <h1>Build the skills.<br/><em>Prove them yourself.</em></h1>
            <p>A practical roadmap for Python automation, Playwright, PyTest, API, SQL, DeepEval, RAG and AI agents. Progress is marked by your practice—not by reading alone.</p>
            <div className="date-setting">
              <label htmlFor="startDate">Plan start date</label>
              <input id="startDate" type="date" value={state.startDate} onChange={e => { setState(p => ({...p, startDate:e.target.value})); notify("Start date updated"); }}/>
              <span>Finish target: {dateLabel(dueDate)}</span>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card"><span>Current plan day</span><strong>{todayDay}<small>/30</small></strong><span>{todayDay > 1 ? `${Math.max(0,30-todayDay+1)} days including today` : "Start with Day 1"}</span></div>
            <div className="stat-card"><span>Daily checklist</span><strong>{progress}<small>%</small></strong><div className="progress-track"><div style={{width:`${progress}%`}}/></div><span>{checkedCount}/{totalChecks} checklist items</span></div>
            <div className="stat-card"><span>Topics completed</span><strong>{topicDone}<small>/{allTopics.length}</small></strong><div className="progress-track"><div style={{width:`${topicDone/allTopics.length*100}%`}}/></div><span>Mark topics only after practice</span></div>
          </div>
        </section>

        <nav className="tabs">
          <button className={tab==="plan"?"active":""} onClick={()=>setTab("plan")}><CalendarDays size={16}/> Daily plan</button>
          <button className={tab==="topics"?"active":""} onClick={()=>setTab("topics")}><BookOpen size={16}/> All topics</button>
          <button className={tab==="log2base2"?"active":""} onClick={()=>setTab("log2base2")}><Code2 size={16}/> Log2Base2 Python</button>
          <button className={tab==="google-notes"?"active":""} onClick={()=>setTab("google-notes")}><NotebookPen size={16}/> Google Notes</button>
          <button className={tab==="progress"?"active":""} onClick={()=>setTab("progress")}><Trophy size={16}/> Progress review</button>
        </nav>

        {tab === "plan" && <>
          <section className="section-heading">
            <div><span className="eyebrow">YOUR DAILY WORKFLOW</span><h2>Choose a day and do the work</h2></div>
            <span className="muted">4 hours per day</span>
          </section>
          <div className="day-layout">
            <aside className="day-list">
              {DAYS.map(d => {
                const item = state.completedDays[d.day] || { checks:{} };
                const done = HABITS.every(h => item.checks?.[h.id]);
                return <button key={d.day} className={`day-option ${selectedDay===d.day?"selected":""}`} onClick={()=>setSelectedDay(d.day)}>
                  <span className={`day-number ${done?"is-done":""}`}>{done?<CheckCircle2 size={17}/>:String(d.day).padStart(2,"0")}</span>
                  <span className="day-option-text"><strong>{d.title}</strong><small>{dateLabel(dayDate(state.startDate,d.day))}</small></span>
                  {selectedDay===d.day?<ChevronUp size={15}/>:<ChevronDown size={15}/>}
                </button>;
              })}
            </aside>
            <section className="day-detail">
              <div className="day-detail-head">
                <div><span className="eyebrow">DAY {day.day} · {day.phase.toUpperCase()}</span><h2>{day.title}</h2><p>{dateLabel(dayDate(state.startDate,day.day))}</p></div>
                <div className="day-badge">{HABITS.filter(h=>state.completedDays[day.day]?.checks?.[h.id]).length}/{HABITS.length}<small>tasks</small></div>
              </div>
              <div className="schedule-grid">
                <div className="schedule-card"><div className="schedule-time"><Clock3 size={15}/> 6:00–7:00 AM <span>LEARN</span></div><p>{day.learn}</p></div>
                <div className="schedule-card"><div className="schedule-time"><Code2 size={15}/> 7:00–8:00 AM <span>CODE</span></div><p>{day.code}</p></div>
                <div className="schedule-card"><div className="schedule-time"><Target size={15}/> 8:00–9:00 PM <span>BUILD</span></div><p>{day.build}</p></div>
                <div className="schedule-card"><div className="schedule-time"><BookOpen size={15}/> 9:00–10:00 PM <span>INTERVIEW</span></div><p>{day.interview}</p></div>
              </div>
              <div className="checklist-card">
                <div className="card-title"><h3><CheckCircle2 size={18}/> Daily checklist</h3><span>{HABITS.filter(h=>state.completedDays[day.day]?.checks?.[h.id]).length} of {HABITS.length} completed</span></div>
                {HABITS.map(h => <label className="check-row" key={h.id}>
                  <input type="checkbox" checked={Boolean(state.completedDays[day.day]?.checks?.[h.id])} onChange={e=>updateDayCheck(day.day,h.id,e.target.checked)}/>
                  <span className="custom-check"><CheckCircle2 size={16}/></span>
                  <span><strong>{h.label}</strong><small>{h.detail}</small></span>
                </label>)}
              </div>
              <div className="topic-card">
                <div className="card-title"><h3><BookOpen size={18}/> Topics to master</h3><span>{day.topics.filter((t,i)=>state.topicStatus[`d${day.day}-t${i}`]).length}/{day.topics.length}</span></div>
                {day.topics.map((t,i) => {
                  const id = `d${day.day}-t${i}`;
                  return <label className="topic-row" key={id}><input type="checkbox" checked={Boolean(state.topicStatus[id])} onChange={e=>toggleTopic(id,e.target.checked)}/><span>{t}</span></label>;
                })}
              </div>
              <div className="notes-card">
                <h3>Practice notes and errors</h3>
                <p>Record what failed, what you changed, and what you can now explain independently.</p>
                <textarea value={state.dayNotes[day.day] || ""} onChange={e=>updateNote(day.day,e.target.value)} placeholder="Example: Locator failed because the label was not associated with the input. I changed to get_by_role and verified it..." rows={4}/>
                <h3 className="question-heading">Interview question — answer before looking up a solution</h3>
                <p className="question">{day.interview}</p>
                <textarea value={state.interviewAnswers[day.day] || ""} onChange={e=>updateAnswer(day.day,e.target.value)} placeholder="Write your answer in your own words..." rows={3}/>
                <button className="button primary" onClick={()=>notify("Your notes save automatically in this browser.")}><Save size={16}/> Save notes</button>
              </div>
            </section>
          </div>
        </>}

        {tab === "topics" && <>
          <section className="section-heading"><div><span className="eyebrow">COMPLETE CURRICULUM</span><h2>All resume-related topics</h2><p className="muted">Check a topic only after you can explain or demonstrate it.</p></div><span className="topic-count">{topicDone}/{allTopics.length} complete</span></section>
          <div className="search-box"><BookOpen size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Python, DeepEval, fixtures, SQL..."/></div>
          <div className="topic-results">
            {filteredTopics.map(t=><label key={t.id} className={`all-topic ${t.done?"completed":""}`}><input type="checkbox" checked={t.done} onChange={e=>toggleTopic(t.id,e.target.checked)}/><span><strong>{t.topic}</strong><small>Day {t.day} · {t.dayTitle}</small></span>{t.done&&<CheckCircle2 size={17}/>}</label>)}
            {!filteredTopics.length && <div className="empty-state">No topics match that search.</div>}
          </div>
        </>}

        {tab === "progress" && <>
          <section className="section-heading"><div><span className="eyebrow">REVIEW YOUR WORK</span><h2>Progress review</h2><p className="muted">Completion reflects your own checklist and topic marks.</p></div><button className="button secondary" onClick={exportProgress}><Download size={16}/> Export JSON</button></section>
          <div className="review-grid">
            <div className="review-card"><span>Days with all checklist items complete</span><strong>{completedCount}/30</strong><div className="progress-track"><div style={{width:`${completedCount/30*100}%`}}/></div></div>
            <div className="review-card"><span>Topics marked complete</span><strong>{topicDone}/{allTopics.length}</strong><div className="progress-track"><div style={{width:`${topicDone/allTopics.length*100}%`}}/></div></div>
            <div className="review-card"><span>Days with notes</span><strong>{Object.values(state.dayNotes).filter(n=>n?.trim()).length}/30</strong><p>Use notes to capture errors and fixes.</p></div>
            <div className="review-card"><span>Interview answers written</span><strong>{Object.values(state.interviewAnswers).filter(n=>n?.trim()).length}/30</strong><p>Practise answering before reading solutions.</p></div>
          </div>
          <div className="checklist-card">
            <div className="card-title"><h3>Weekly review</h3><span>Use evidence, not guesswork</span></div>
            {Object.entries(phaseGroups).map(([phase,days])=>{
              const checks = days.reduce((s,d)=>s+Object.values(state.completedDays[d.day]?.checks||{}).filter(Boolean).length,0);
              const max = days.length*HABITS.length;
              const topics = days.reduce((s,d)=>s+d.topics.filter((t,i)=>state.topicStatus[`d${d.day}-t${i}`]).length,0);
              const topicMax = days.reduce((s,d)=>s+d.topics.length,0);
              return <div className="phase-progress" key={phase}><div className="phase-line"><strong>{phase}</strong><span>{Math.round(checks/max*100)}% checklist · {topics}/{topicMax} topics</span></div><div className="progress-track"><div style={{width:`${checks/max*100}%`}}/></div><small>{days.length} days · {days[0].day}–{days[days.length-1].day}</small></div>;
            })}
          </div>
          <div className="warning-note"><AlertCircle size={18}/><p>This tracker stores data in this browser using local storage. Export your progress JSON regularly. If you open the deployed app on another browser or device, progress will not sync automatically without adding a backend/database.</p></div>
        </>}
        {tab === "log2base2" && <div className="log2base2-page">
          <section className="section-heading log2base2-heading">
            <div>
              <span className="eyebrow">SEPARATE PYTHON COURSE</span>
              <h2>Log2Base2 Python</h2>
              <p className="muted">Track this course separately from your 30-day AI QA plan. Mark a topic complete only after you practise it and can explain it.</p>
              <a href={LOG2BASE2_URL} target="_blank" rel="noreferrer">Open Log2Base2 Python course ↗</a>
            </div>
            <span className="topic-count">{log2base2Completed}/{log2base2Total} topics complete</span>
          </section>
          <div className="progress-track log2base2-progress"><div style={{ width: `${log2base2Total ? (log2base2Completed / log2base2Total) * 100 : 0}%` }} /></div>
          <p className="muted log2base2-description">Suggested sequence: 10 study groups. You can take longer and revisit any topic. This is not the official course's day-by-day schedule.</p>
          {LOG2BASE2_TOPICS.map(section => {
            const sectionCompleted = section.topics.filter((_, index) => log2base2Progress[`d${section.day}-t${index}`]).length;
            return <section className="topic-card log2base2-day-card" key={section.day}>
              <div className="card-title"><h3>Day {section.day}: {section.title}</h3><span>{sectionCompleted}/{section.topics.length}</span></div>
              {section.topics.map((topic, index) => {
                const id = `d${section.day}-t${index}`;
                return <label className="topic-row" key={id}>
                  <input type="checkbox" checked={Boolean(log2base2Progress[id])} onChange={event => toggleLog2Base2Topic(id, event.target.checked)} />
                  <span>{topic}</span>
                </label>;
              })}
              <label className="notes-label" style={{ display: "block", marginTop: "12px" }}>
                <strong>Practice notes for Day {section.day}</strong>
                <textarea rows={2} value={log2base2Notes[section.day] || ""} onChange={event => updateLog2Base2Note(section.day, event.target.value)} placeholder="Record code you wrote, output, errors, and what you can explain..." />
              </label>
            </section>;
          })}
        </div>}

        {tab === "google-notes" && <section className="google-notes-page">
          <section className="section-heading google-notes-heading">
            <div>
              <span className="eyebrow"><NotebookPen size={13}/> PERSONAL STUDY LINKS</span>
              <h2>Google Notes</h2>
              <p className="muted">Save Google Docs and Google Keep links for lessons, coding practice, interview answers, and revision.</p>
            </div>
            <span className="topic-count">{googleNotes.length} saved {googleNotes.length === 1 ? "note" : "notes"}</span>
          </section>

          <form id="google-notes-form" className="google-note-form" onSubmit={saveGoogleNote}>
            <div className="google-note-form-title">
              <h3>{editingGoogleNoteId ? <Pencil size={17}/> : <Plus size={17}/>} {editingGoogleNoteId ? "Edit saved link" : "Add a Google note link"}</h3>
              <span className="muted">Links only — the note content stays in Google.</span>
            </div>
            <div className="google-note-fields">
              <label className="google-note-field">
                <span>Note title</span>
                <input value={googleNoteForm.title} onChange={e => setGoogleNoteForm(prev => ({ ...prev, title: e.target.value }))} placeholder="e.g. Python interview notes" maxLength={120} required />
              </label>
              <label className="google-note-field">
                <span>Google URL</span>
                <input type="url" value={googleNoteForm.url} onChange={e => setGoogleNoteForm(prev => ({ ...prev, url: e.target.value }))} placeholder="https://docs.google.com/document/d/..." required />
              </label>
              <label className="google-note-field google-note-description">
                <span>Description <small>(optional)</small></span>
                <textarea rows={3} value={googleNoteForm.description} onChange={e => setGoogleNoteForm(prev => ({ ...prev, description: e.target.value }))} placeholder="What is this note for? Python basics, Playwright locators, interview answers..." maxLength={500}/>
              </label>
            </div>
            {googleNoteError && <p className="google-note-error" role="alert">{googleNoteError}</p>}
            <div className="google-note-form-actions">
              <button className="button primary" type="submit"><Save size={16}/>{editingGoogleNoteId ? "Update link" : "Save link"}</button>
              {editingGoogleNoteId && <button className="button secondary" type="button" onClick={cancelGoogleNoteEdit}><X size={16}/> Cancel edit</button>}
            </div>
          </form>

          <div className="google-notes-list-heading">
            <div><h3>Saved links</h3><p className="muted">Open a link in a new tab. Make sure the Google document is shared with your account.</p></div>
          </div>
          {googleNotes.length === 0 ? <div className="google-notes-empty">
            <div className="google-notes-empty-icon"><NotebookPen size={25}/></div>
            <h3>No Google notes saved yet</h3>
            <p>Add a Google Docs or Google Keep URL above to create your first shortcut.</p>
          </div> : <div className="google-notes-grid">
            {googleNotes.map(note => <article className="google-note-card" key={note.id}>
              <div className="google-note-card-top">
                <div className={`google-note-type-icon ${note.type === "keep" ? "keep" : "docs"}`}><NotebookPen size={19}/></div>
                <span className="google-note-type">{note.type === "keep" ? "GOOGLE KEEP" : "GOOGLE DOCS"}</span>
              </div>
              <h3>{note.title}</h3>
              {note.description ? <p className="google-note-card-description">{note.description}</p> : <p className="google-note-card-description muted">No description added.</p>}
              <p className="google-note-url" title={note.url}>{note.url}</p>
              <div className="google-note-card-actions">
                <a className="button primary" href={note.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={15}/> Open note</a>
                <button className="button secondary" type="button" onClick={() => editGoogleNote(note)} aria-label={`Edit ${note.title}`}><Pencil size={15}/> Edit</button>
                <button className="icon-button google-note-delete" type="button" onClick={() => deleteGoogleNote(note.id)} aria-label={`Delete ${note.title}`} title="Delete note"><Trash2 size={15}/></button>
              </div>
            </article>)}
          </div>}
          <div className="warning-note google-notes-warning"><AlertCircle size={18}/><p>Only the title, URL, and description are saved in this browser's localStorage. Your Google Docs/Keep content remains in Google. These shortcuts do not sync to other browsers or devices.</p></div>
        </section>}

        <footer><span>AI QA Training Tracker</span><span>Practice honestly. Mark progress only after demonstrating the skill.</span></footer>
      </main>
      {toast && <div className="toast"><CheckCircle2 size={16}/>{toast}</div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
