export const calculateDecisionScores = (decision) => {
  if (!decision || !decision.options) return decision;
  const weights = decision.weights || { salary: 8, growth: 9, balance: 7, commute: 5, risk: 6 };
  const scored = decision.options.map(opt => {
    const s = opt.scores || {};
    let sum = 0, tot = 0;
    for (const k of Object.keys(weights)) {
      if (s[k] !== undefined) { sum += s[k] * weights[k]; tot += weights[k]; }
    }
    return { ...opt, overallScore: tot > 0 ? Math.round((sum / (tot * 10)) * 100) : 75 };
  });
  const sorted = [...scored].sort((a, b) => b.overallScore - a.overallScore);
  return { ...decision, options: scored, recommendation: { winner: sorted[0].name, confidence: sorted[0].overallScore } };
};
