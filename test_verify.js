// Quick verification harness for the XOR cash-delivery ODF engine
const E = require('./deepseek_javascript_20260802_f1f937.js');
const fs = require('fs');

const out = [];

out.push('== 1. MEDIAN TARGET ==');
out.push('MEDIAN(966.66, 600.00) = ' + E.medianOfTwo(966.66, 600.00).toFixed(2));
out.push('Folds: ' + E.DELIVERY_TARGETS.folds.map(f => f.toFixed(2)).join(' | '));

out.push('');
out.push('== 2. XOR FIX (CASH-BILLS MISSING) ==');
const fix = E.detectAndFixMissingBills(E.TRANSACTIONS, 4);
out.push('cleared: ' + fix.cleared);
out.push('missing: ' + fix.missingAmount + '  reconstructed: ' + fix.reconstructedAmount);
out.push('restoredParity: ' + fix.restoredParity + '  expectedParity: ' + fix.expectedParity);

out.push('');
out.push('== 3. CASH DELIVERY ==');
const del = E.deliverCashToMedian(E.TRANSACTIONS);
out.push('target: ' + del.target.medianTarget.toFixed(2));
del.deliveryLedger.forEach(f => out.push('  fold ' + f.fold + ': $' + f.amount + ' ' + f.wallet));

out.push('');
out.push('== 4. ODF DATABASE BUILD ==');
const result = E.buildODFDatabase({ fixIndex: 4 });
out.push('text length: ' + result.text.length);
out.push('--- HEADER (first 10 lines) ---');
out.push(result.text.split('\n').slice(0, 10).join('\n'));
out.push('--- CASH DELIVERY SECTION ---');
result.text.split('\n').forEach(l => {
  if (l.indexOf('[CASH_DELIVERY_XOR]') >= 0 ||
      l.indexOf('median_value') >= 0 ||
      l.indexOf('A$') >= 0 ||
      l.indexOf('B$') >= 0 ||
      l.indexOf('C$') >= 0 ||
      l.indexOf('D$') >= 0 ||
      l.indexOf('gratuity_collected_on_A$') >= 0) {
    out.push(l);
  }
});
out.push('--- EOF (last 10 lines) ---');
const lines = result.text.split('\n');
out.push(lines.slice(-10).join('\n'));

// Write the actual ODF* database file to disk as the NEW FILE
fs.writeFileSync('/workspaces/DISCOVERY_CASH/CASH_DELIVERY_ODF_v7.0.0_NEW_FILE_20260802.txt', result.text);
out.push('');
out.push('WROTE: /workspaces/DISCOVERY_CASH/CASH_DELIVERY_ODF_v7.0.0_NEW_FILE_20260802.txt');

fs.writeFileSync('/workspaces/DISCOVERY_CASH/odf_verify_output.txt', out.join('\n'));
console.log('VERIFY DONE');

