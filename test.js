// Self-check for formula parsing and color matching: node test.js
const vm = require('vm'), fs = require('fs'), assert = require('assert');
const ctx = {}; vm.runInNewContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8'), ctx);
const args = (f, fn) => JSON.parse(JSON.stringify(ctx.formulaArgs_(f, fn)));
assert.deepEqual(args('=COUNTBYCOLOR(A2:A50, D1)', 'COUNTBYCOLOR'), ['A2:A50', 'D1']);
assert.deepEqual(args('=countbycolor(A2:A50;D1;"text")', 'COUNTBYCOLOR'), ['A2:A50', 'D1', '"text"']);
assert.deepEqual(args("=SUMBYCOLOR('My, sheet'!B2:B9, \"#f00\")*2", 'SUMBYCOLOR'), ["'My, sheet'!B2:B9", '"#f00"']);
assert.deepEqual(args('=1+SUMBYCOLOR(INDIRECT("B"&1&":B9"),D1)', 'SUMBYCOLOR'), ['INDIRECT("B"&1&":B9")', 'D1']);
assert.equal(ctx.formulaArgs_('=SUM(A1:A3)', 'SUMBYCOLOR'), null);
assert.equal(ctx.formulaArgs_('=SUMBYCOLOR(A1', 'SUMBYCOLOR'), null);
assert.equal(ctx.unquote_('"A1:B2"'), 'A1:B2');
assert.ok(ctx.same_('#FF0000', '#f00'));
assert.ok(!ctx.same_('#ff0000', '#ff0001'));
const colors = [['#ff0000', '#ffffff'], ['#FF0000', '#00ff00']];
assert.equal(ctx.countByColor_(colors, '#f00'), 2);
assert.equal(ctx.sumByColor_([[5, 1], ['x', 2]], colors, '#ff0000'), 5); // text in a red cell is skipped
assert.equal(ctx.sumByColor_([[1.5, 1], [2.5, 2]], colors, '#ff0000'), 4);
assert.equal(ctx.formulaArgs_('=MYSUMBYCOLOR(A1,B1)', 'SUMBYCOLOR'), null);
// Refresh puts every formula back even when clearing a cell fails partway (e.g. a protected cell).
const r2 = {}; vm.runInNewContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8'), r2);
const formulas = [['=COUNTBYCOLOR(A1:A2,B1)', '=SUMBYCOLOR(A1:A2,B1)', '=SUMBYCOLOR(A3:A4,B1)']];
const cells = formulas[0].slice();
let clears = 0;
const range = { getFormulas: () => formulas, getCell: (r, c) => ({
  setValue() { if (++clears === 3) throw new Error('protected'); cells[c - 1] = ''; },
  setFormula(f) { cells[c - 1] = f; } }) };
r2.SpreadsheetApp = { getActiveSpreadsheet: () => ({ getSheets: () => [{ getDataRange: () => range }] }), flush() {}, getActive: () => ({ toast() {} }) };
assert.throws(() => r2.refreshColorFormulas(), /protected/);
assert.deepEqual(cells, formulas[0]);                                        // nothing left blank
console.log('ok');
