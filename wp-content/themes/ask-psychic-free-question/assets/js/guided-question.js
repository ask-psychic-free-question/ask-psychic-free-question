(function () {
  'use strict';
  var form = document.getElementById('apfq-question-form');
  if (!form) return;
  var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step]'));
  var topics = {
    love: 'love and relationships', career: 'career and work', family: 'family and home', choice: 'a choice I am considering'
  };
  var cards = [
    { name: 'The Open Window', meaning: 'Consider what new information or perspective could make your next step clearer.' },
    { name: 'The Steady Path', meaning: 'Notice which option feels sustainable in your everyday life, not only exciting in the moment.' },
    { name: 'The Honest Voice', meaning: 'Ask what you already know, and what you still need to ask or express.' },
    { name: 'The Boundary', meaning: 'Reflect on what you can choose for yourself and what belongs to someone else.' }
  ];
  function showStep(index) {
    steps.forEach(function (step, i) { step.hidden = i !== index; });
    steps[index].querySelector('h2').focus();
  }
  document.getElementById('apfq-next').addEventListener('click', function () {
    var topic = form.querySelector('input[name="topic"]:checked');
    if (!topic) { form.querySelector('input[name="topic"]').focus(); return; }
    showStep(1);
  });
  document.getElementById('apfq-back').addEventListener('click', function () { showStep(0); });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var topic = form.querySelector('input[name="topic"]:checked');
    var path = form.querySelector('input[name="path"]:checked');
    if (!topic || !path) return;
    var context = document.getElementById('apfq-context').value.trim();
    var question = 'What would be helpful for me to understand about ' + topics[topic.value] + '?';
    if (context) question = 'How can I think through “' + context + '” in relation to ' + topics[topic.value] + '?';
    document.getElementById('apfq-result-question').textContent = question;
    document.getElementById('apfq-question-result').hidden = false;
    document.getElementById('apfq-reader-link').hidden = path.value !== 'reader';
    var cardBox = document.getElementById('apfq-card');
    cardBox.hidden = path.value !== 'card';
    document.getElementById('apfq-result-title').textContent = path.value === 'reader' ? 'Your question is ready for a human reader' : 'Your symbolic reflection';
    document.getElementById('apfq-result-copy').textContent = path.value === 'reader'
      ? 'This tool prepared wording only. Continue to the reader service to request a human response.'
      : 'This card prompt was selected locally in your browser. It is not a psychic answer.';
    if (path.value === 'card') {
      var card = cards[Math.floor(Math.random() * cards.length)];
      document.getElementById('apfq-card-name').textContent = card.name;
      document.getElementById('apfq-card-meaning').textContent = card.meaning;
    }
    document.getElementById('apfq-result-title').focus();
    document.getElementById('apfq-question-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  document.getElementById('apfq-restart').addEventListener('click', function () {
    form.reset();
    document.getElementById('apfq-question-result').hidden = true;
    showStep(0);
  });
}());
