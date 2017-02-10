import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import benchmarks from '/imports/benchmarks';

import './dashboard.html';
import './dashboard.css';

Template.dashboard.onCreated(function () {
  this.history = new ReactiveVar([]);
})

Template.dashboard.events({
  async 'click .buttons button'(event, template) {
    event.preventDefault();

    const name = event.target.dataset.benchmark;
    const benchmark = benchmarks[name + 'Benchmark'];

    // Convert form data to { size, count, reads } object
    const args = template.$('form')
      .serializeArray()
      .reduce((prev, cur) => {
        prev[cur.name] = parseInt(cur.value);
        return prev;
      }, {});

    // Run benchmark
    const result = await benchmark.run(args);

    // Add result and used settings to history
    const history = template.history.get();

    history.unshift({
      name,
      ...args,
      ...result
    });

    template.history.set(history);
  }
});

Template.dashboard.helpers({
  history() {
    return Template.instance().history.get();
  },

  round(float) {
    return float.toFixed(5);
  }
})
