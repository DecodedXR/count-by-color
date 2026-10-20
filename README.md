# Free Count and Sum by Color for Google Sheets

![Count and Sum by Color for Google Sheets](assets/cover.png)

Google Sheets has no built-in way to count or add up cells by color. This adds two formulas that do, free, with no add-on:

```
=COUNTBYCOLOR(A2:A50, D1)          how many cells in A2:A50 have the same fill color as D1
=SUMBYCOLOR(B2:B50, D1)            the total of the numbers in B2:B50 filled like D1
=COUNTBYCOLOR(A2:A50, D1, "text")  match text (font) color instead of fill
=SUMBYCOLOR(B2:B50, "#ff0000")     or give a hex color
```

- Works with ranges on other tabs: `=SUMBYCOLOR('March'!B2:B50, D1)`
- Comma or semicolon separators, so it works in every spreadsheet locale
- **🎨 Color → Refresh Color Formulas** recalculates them after you recolor cells

New to this? Read the [step-by-step guide](https://decodedxr.github.io/count-by-color/count-cells-by-color-google-sheets.html).

## Setup (2 minutes)

1. In your sheet: **Extensions → Apps Script**.
2. Replace the contents of `Code.gs` with this repo's `Code.gs` and click **Save**.
3. Back in the sheet, type `=COUNTBYCOLOR(` in a cell. The formulas autocomplete like built-in ones.
4. Reload the sheet to get the **🎨 Color** menu. The first time you use it, approve the permission prompt ("Google hasn't verified this app" → **Advanced → Go to (your project name) → Allow**; it's your own script).

## Things to know

- **Recoloring doesn't trigger a recalculation.** Sheets only recalculates a formula when the values it points at change, not their colors. After changing colors, use **🎨 Color → Refresh Color Formulas**.
- Use plain cell references (`A2:A50`, `'Other tab'!A1:A9`). References built with `INDIRECT` or named ranges aren't supported.
- Colors from conditional formatting aren't seen: like every Apps Script tool, this reads the color you set, not the one a rule paints on top.
- `SUMBYCOLOR` skips text in matching cells and adds only numbers.

## More free Google tools

- [All free Google Sheets scripts](https://github.com/DecodedXR/free-google-sheets-scripts): mail merge, PDF merge, reminders, Sheets to Calendar, CSV import, Forms tools, dropdowns, Drive uploads.

## License

MIT. See `LICENSE`.
