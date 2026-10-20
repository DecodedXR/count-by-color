/** @OnlyCurrentDoc */ // asks Google for access to this spreadsheet only, not all your sheets

/**
 * Count and Sum by Color for Google Sheets: formulas that count or add up cells by their
 * background (or text) color. Type them like any other formula:
 *
 *   =COUNTBYCOLOR(A2:A50, D1)          cells in A2:A50 with the same fill color as D1
 *   =SUMBYCOLOR(B2:B50, D1)            sum of the numbers in B2:B50 filled like D1
 *   =COUNTBYCOLOR(A2:A50, D1, "text")  match the text color instead of the fill
 *   =SUMBYCOLOR(B2:B50, "#ff0000")     a hex color works too
 *
 * Sheets doesn't recalculate when only a color changes, so after recoloring cells use
 * 🎨 Color → Refresh Color Formulas.
 */

const FUNCTIONS = /\b(COUNTBYCOLOR|SUMBYCOLOR)\s*\(/i;

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🎨 Color')
    .addItem('Refresh Color Formulas', 'refreshColorFormulas')
    .addToUi();
}

/**
 * Counts the cells in a range whose fill color matches a color cell.
 * @param {A2:A50} range The cells to check.
 * @param {D1} color A cell with the color to count, or a hex color like "#ff0000".
 * @param {"text"} mode Optional: "text" to match text color instead of fill.
 * @return The number of matching cells.
 * @customfunction
 */
function COUNTBYCOLOR(range, color, mode) {
  const c = colorCall_('COUNTBYCOLOR');
  return countByColor_(c.colors, c.target);
}

/**
 * Adds up the numbers in a range whose fill color matches a color cell.
 * @param {B2:B50} range The cells to add up.
 * @param {D1} color A cell with the color to match, or a hex color like "#ff0000".
 * @param {"text"} mode Optional: "text" to match text color instead of fill.
 * @return The sum of the matching numbers.
 * @customfunction
 */
function SUMBYCOLOR(range, color, mode) {
  const c = colorCall_('SUMBYCOLOR');
  return sumByColor_(c.range.getValues(), c.colors, c.target);
}

/**
 * Custom functions receive values, not cells, so colors can't be read from the arguments.
 * Instead, read this cell's formula and resolve the references in it.
 * ponytail: with two calls of the same function in one cell, the first one wins.
 */
function colorCall_(fn) {
  const cell = SpreadsheetApp.getActiveRange();
  const args = formulaArgs_(cell.getFormula(), fn);
  if (!args || args.length < 2) throw new Error('Use ' + fn + '(range, color_cell) with cell references.');
  const sheet = cell.getSheet();
  const range = resolve_(sheet, args[0]);
  const text = /text|font/i.test(args[2] || '');
  const hex = unquote_(args[1]);
  const target = /^#[0-9a-f]{3,8}$/i.test(hex) ? hex
    : text ? resolve_(sheet, args[1]).getFontColor()
    : resolve_(sheet, args[1]).getBackground();
  const colors = text ? range.getFontColors() : range.getBackgrounds();
  return { range, colors, target };
}

/** "Sheet 2!A1:B3", "'My sheet'!A1" or "A1:B3" (also accepted as a quoted string). */
function resolve_(sheet, ref) {
  const a1 = unquote_(ref);
  return a1.includes('!') ? sheet.getParent().getRange(a1) : sheet.getRange(a1);
}

/** The argument texts of the first fn(...) call in a formula; splits on top-level , or ; */
function formulaArgs_(formula, fn) {
  const m = new RegExp('(^|[^A-Z0-9_.])' + fn + ' *[(]', 'i').exec(formula || '');
  if (!m) return null;
  const args = [];
  let depth = 0, quote = '', cur = '';
  for (let i = m.index + m[0].length; i < formula.length; i++) {
    const ch = formula[i];
    if (quote) { cur += ch; if (ch === quote) quote = ''; continue; }
    if (ch === '"' || ch === "'") { quote = ch; cur += ch; continue; }
    if (ch === '(' || ch === '{') depth++;
    if (ch === ')' || ch === '}') {
      if (!depth) { args.push(cur.trim()); return args.filter(a => a !== ''); }
      depth--;
    }
    if ((ch === ',' || ch === ';') && !depth) { args.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  return null;
}

function unquote_(s) {
  s = String(s || '').trim();
  return /^".*"$/.test(s) ? s.slice(1, -1) : s;
}

function same_(a, b) {
  const norm = c => String(c).toLowerCase().replace(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/, '#$1$1$2$2$3$3');
  return norm(a) === norm(b);
}

function countByColor_(colors, target) {
  return colors.flat().filter(c => same_(c, target)).length;
}

function sumByColor_(values, colors, target) {
  let total = 0;
  values.forEach((row, r) => row.forEach((v, c) => {
    if (typeof v === 'number' && same_(colors[r][c], target)) total += v;
  }));
  return total;
}

/** Sheets caches custom function results, so re-enter each color formula to recalculate it. */
function refreshColorFormulas() {
  let n = 0;
  SpreadsheetApp.getActiveSpreadsheet().getSheets().forEach(sheet => {
    const range = sheet.getDataRange();
    const formulas = range.getFormulas();
    const hits = [];
    formulas.forEach((row, r) => row.forEach((f, c) => { if (FUNCTIONS.test(f)) hits.push([r + 1, c + 1, f]); }));
    hits.forEach(([r, c]) => range.getCell(r, c).setValue(''));
    SpreadsheetApp.flush();
    hits.forEach(([r, c, f]) => range.getCell(r, c).setFormula(f));
    n += hits.length;
  });
  SpreadsheetApp.getActive().toast(n + ' color formula' + (n === 1 ? '' : 's') + ' refreshed.');
}
