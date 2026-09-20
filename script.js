'use strict';
const projects = JSON.parse(document.getElementById('project-data').textContent);
const dialog = document.getElementById('project-dialog');
let lastProjectTrigger = null;
function openProject(id, trigger) {
  const project = projects.find(p => p.id === Number(id));
  if (!project) return;
  lastProjectTrigger = trigger;
  document.getElementById('dialog-title').textContent = project.name;
  document.getElementById('dialog-discipline').textContent = project.discipline;
  document.getElementById('dialog-headline').textContent = project.headline;
  document.getElementById('dialog-description').textContent = project.description;
  document.getElementById('dialog-stack').textContent = project.stack;
  // Illustration markup is authored locally in the static project data.
  document.getElementById('dialog-art').innerHTML = project.art;
  const link = document.getElementById('dialog-link');
  link.href = project.url;
  link.replaceChildren(document.createTextNode(project.url.startsWith('https://github.com/') ? 'View source on GitHub ' : 'Original project address '));
  const arrow = document.createElement('span');
  arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); link.append(arrow);
  dialog.showModal();
  document.body.classList.add('modal-open');
  document.getElementById('close-dialog').focus();
}
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-project]');
  if (trigger) openProject(trigger.dataset.project, trigger);
});
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  if (lastProjectTrigger?.isConnected) lastProjectTrigger.focus({preventScroll:true});
});
const disciplines = {
  privacy: {title:'01 / PRIVACY & CRYPTOGRAPHY', description:'What can a system prove without revealing what it knows?'},
  ai: {title:'02 / ARTIFICIAL INTELLIGENCE', description:'Exploring what intelligent guidance can feel like in someone’s hands.'},
  creative: {title:'03 / CREATIVE COMPUTING', description:'Code as a medium for feeling, play, and small moments of connection.'},
  onchain: {title:'04 / ON-CHAIN APPLICATIONS', description:'Shared rules, private data, and interactions recorded on-chain.'},
  communication: {title:'05 / COMMUNICATION SYSTEMS', description:'Extending an existing intercom foundation into a contest build.'}
};
document.querySelectorAll('[data-discipline]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.discipline;
    const discipline = disciplines[key];
    document.querySelectorAll('[data-discipline]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    document.getElementById('discipline-index').textContent = discipline.title;
    document.getElementById('discipline-description').textContent = discipline.description;
    const links = document.getElementById('discipline-projects');
    links.replaceChildren();
    projects.filter(p => p.category.split(' ').includes(key)).forEach(project => {
      const b = document.createElement('button');
      b.className = 'discipline-project'; b.dataset.project = project.id;
      b.append(document.createTextNode(project.name + ' '));
      const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden','true'); b.append(arrow); links.append(b);
    });
  });
});
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.getElementById('motion-toggle');
let manuallyPaused = false;
let heroVisible = true;
function updateMotion() {
  const paused = manuallyPaused || reducedMotion.matches || document.hidden || !heroVisible;
  document.querySelector('.observatory').classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(manuallyPaused || reducedMotion.matches));
  motionButton.textContent = reducedMotion.matches ? 'Motion reduced' : manuallyPaused ? '▶ Resume motion' : 'Ⅱ Pause motion';
  motionButton.disabled = reducedMotion.matches;
}
motionButton.addEventListener('click', () => { manuallyPaused = !manuallyPaused; updateMotion(); });
reducedMotion.addEventListener('change', updateMotion);
document.addEventListener('visibilitychange', updateMotion);
if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => {heroVisible = entry.isIntersecting;updateMotion();}).observe(document.querySelector('.observatory'));
updateMotion();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  let count = 0;
  document.querySelectorAll('.project-card').forEach(card => {
    card.hidden = category !== 'all' && !card.dataset.categories.split(' ').includes(category);
    if (!card.hidden) count++;
  });
  document.getElementById('project-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown.`;
}));
let writingFilter = 'all';
let allWritingShown = false;
const writingRows = [...document.querySelectorAll('.writing-row')];
const showWriting = document.getElementById('show-writing');
function renderWriting() {
  const matching = writingRows.filter(row => writingFilter === 'all' || row.dataset.writingKind === writingFilter);
  writingRows.forEach(row => {row.hidden = true;});
  matching.slice(0, allWritingShown ? matching.length : 4).forEach(row => {row.hidden = false;});
  showWriting.hidden = matching.length <= 4;
  showWriting.setAttribute('aria-expanded', String(allWritingShown));
  showWriting.textContent = allWritingShown ? 'Show fewer notes ↑' : `Show all ${matching.length} notes ↓`;
  document.getElementById('writing-status').textContent = `${Math.min(allWritingShown ? matching.length : 4, matching.length)} of ${matching.length} notes shown.`;
}
document.querySelectorAll('[data-writing-filter]').forEach(button => button.addEventListener('click', () => {
  writingFilter = button.dataset.writingFilter; allWritingShown = false;
  document.querySelectorAll('[data-writing-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  renderWriting();
}));
showWriting.addEventListener('click', () => {
  const wasExpanded = allWritingShown;
  allWritingShown = !allWritingShown; renderWriting();
  if (wasExpanded) showWriting.scrollIntoView({block:'nearest', behavior:'instant'});
});
renderWriting();
document.getElementById('year').textContent = new Date().getFullYear();
const singularityButton = document.getElementById('singularity-toggle');
singularityButton.addEventListener('click', () => {
  const active = document.querySelector('.observatory').classList.toggle('singularity-active');
  singularityButton.setAttribute('aria-pressed', String(active));
  singularityButton.querySelector('.singularity-label').textContent = active ? 'RETURN TO ORBIT ↗' : 'ENTER SINGULARITY ↗';
  document.getElementById('singularity-note').textContent = active
    ? 'Different disciplines. One point of convergence: a question worth pursuing.'
    : 'Every orbit begins with a question. At the center: curiosity.';
});
