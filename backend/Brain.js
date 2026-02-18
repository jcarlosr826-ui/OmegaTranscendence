const brain = require('brain.js');
const net = new brain.NeuralNetwork({ hiddenLayers: [10, 10] });

async function trainCreditAI() {
  const logs = await db.query('SELECT * FROM learning_logs WHERE type=$1', ['credit']);
  const trainingData = logs.rows.map(l => ({
    input: { issueType: l.issue_type, strategyUsed: l.strategy },
    output: { success: l.success ? 1 : 0 }
  }));

  net.train(trainingData, { iterations: 200 });
}

async function predictSuccess(issueType, strategy) {
  return net.run({ issueType, strategy });
}
