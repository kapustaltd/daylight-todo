const STORAGE_KEY = 'daylight-tasks-v1';
const today = new Date();
const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
document.getElementById('today-date').textContent = today.toLocaleDateString(undefined, dateOptions);
document.getElementById('date-day').textContent = today.getDate();
document.getElementById('date-month').textContent = today.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();

let tasks = [];
try { tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { tasks = []; }
let filter = 'all';
let ascending = true;

const list = document.getElementById('task-list');
const empty = document.getElementById('empty-state');
const input = document.getElementById('task-input');
const dateLabel = (timestamp) => {
  const d = new Date(timestamp);
  if (d.toDateString() === today.toDateString()) return 'Today';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};
function visibleTasks() {
  const now = today.toDateString();
  let filtered = tasks.filter(task => {
    if (filter === 'completed') return task.done;
    if (filter === 'today') return !task.done && new Date(task.created).toDateString() === now;
    if (filter === 'upcoming') return !task.done && new Date(task.created).toDateString() !== now;
    return true;
  });
  return filtered.sort((a, b) => ascending ? a.created - b.created : b.created - a.created);
}
function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); render(); }
function render() {
  const shown = visibleTasks();
  list.replaceChildren();
  for (const task of shown) {
    const row = document.createElement('div');
    row.className = `task-row${task.done ? ' completed' : ''}`;
    const check = document.createElement('button');
    check.className = 'task-check'; check.setAttribute('aria-label', task.done ? 'Mark task incomplete' : 'Complete task'); check.textContent = '✓';
    check.addEventListener('click', () => { task.done = !task.done; persist(); });
    const copy = document.createElement('div'); copy.className = 'task-copy';
    const name = document.createElement('div'); name.className = 'task-name'; name.textContent = task.text; copy.append(name);
    const when = document.createElement('span'); when.className = 'task-date'; when.textContent = dateLabel(task.created);
    const tag = document.createElement('span'); tag.className = 'task-tag'; tag.textContent = task.done ? 'Done' : 'Personal';
    const remove = document.createElement('button'); remove.className = 'delete-task'; remove.setAttribute('aria-label', 'Delete task'); remove.textContent = '×';
    remove.addEventListener('click', () => { tasks = tasks.filter(item => item.id !== task.id); persist(); });
    row.append(check, copy, when, tag, remove); list.append(row);
  }
  empty.classList.toggle('visible', shown.length === 0);
  document.getElementById('task-total').textContent = shown.length;
  const open = tasks.filter(t => !t.done).length;
  const done = tasks.filter(t => t.done).length;
  document.getElementById('all-count').textContent = tasks.length;
  document.getElementById('today-count').textContent = tasks.filter(t => !t.done && new Date(t.created).toDateString() === today.toDateString()).length;
  document.getElementById('remaining-label').textContent = `${open} ${open === 1 ? 'task' : 'tasks'} remaining`;
  const percent = tasks.length ? Math.round(done / tasks.length * 100) : 0;
  document.getElementById('progress-number').textContent = `${percent}%`;
  document.getElementById('progress-fill').style.width = `${percent}%`;
  document.getElementById('progress-subtitle').textContent = tasks.length ? `${done} of ${tasks.length} tasks complete. Keep it up!` : 'Every small step counts.';
  document.getElementById('clear-completed').style.visibility = done ? 'visible' : 'hidden';
}

document.getElementById('task-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) { input.focus(); return; }
  tasks.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, created: Date.now(), done: false });
  input.value = ''; persist(); input.focus();
});
document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item === button));
  const label = button.querySelector('span:nth-child(2)').textContent;
  document.getElementById('crumb').textContent = label;
  document.getElementById('list-title').firstChild.textContent = filter === 'all' ? 'Your tasks ' : `${label} `;
  document.getElementById('page-title').innerHTML = filter === 'today' ? 'Make room for <em>what matters.</em>' : filter === 'completed' ? 'Look how far <em>you’ve come.</em>' : filter === 'upcoming' ? 'Good things are <em>on the way.</em>' : 'Your day, <em>in focus.</em>';
  document.getElementById('page-subtitle').textContent = filter === 'completed' ? 'Every finished task is a little win.' : filter === 'today' ? 'One step at a time, at your own pace.' : filter === 'upcoming' ? 'Your plans are taking shape.' : 'A clear mind starts with a clear list.';
  render();
}));
document.getElementById('clear-completed').addEventListener('click', () => { tasks = tasks.filter(task => !task.done); persist(); });
document.getElementById('sort-button').addEventListener('click', () => {
  ascending = !ascending;
  document.getElementById('sort-button').innerHTML = `${ascending ? 'Date added' : 'Newest first'} <span>⌄</span>`;
  render();
});
render();
