---
title: "A free Function by Color alternative for Google Sheets"
description: Count and sum cells by fill or text color in Google Sheets with free COUNTBYCOLOR and SUMBYCOLOR formulas, no add-on, trial or subscription. An honest comparison with Function by Color.
image: https://decodedxr.github.io/count-by-color/assets/cover.png
---
{% raw %}

# A free Function by Color alternative for Google Sheets

[Function by Color](https://workspace.google.com/marketplace/app/function_by_color/431807167189) by Ablebits is the most-installed way to count and sum cells by color in Google Sheets, with more than 781,000 installs on the Google Workspace Marketplace (checked October 2026). Its listing describes a fully functional 30-day trial; after that it's a paid add-on.

If what you need is "how many cells are green, and what do the green ones add up to", two free custom formulas do it, with no add-on and no trial.

## Side by side

| | Function by Color | Free Count and Sum by Color |
|---|---|---|
| Price | Paid after a 30-day trial | Free (MIT license) |
| Count and sum by fill color | Yes | Yes: `=COUNTBYCOLOR(A2:A50, D1)`, `=SUMBYCOLOR(B2:B50, D1)` |
| By text (font) color | Yes | Yes: add `"text"` |
| Other calculations by color | 13, including AVERAGE, MAX, MIN and MEDIAN | Count and sum |
| `CELLCOLOR` (a cell's color code) | Yes | No |
| After recoloring cells | Click Refresh results ([its docs](https://ablebits.com/docs/how-to-count-sum-color/): color changes alone don't update results) | Click 🎨 Color → Refresh Color Formulas |
| Conditional formatting colors | Not stated in its docs | Not seen (a limit of Apps Script) |
| How it's installed | Workspace add-on | One script pasted into your sheet; it only asks for access to that spreadsheet |

## When the add-on is the better buy

- You want a point-and-click sidebar instead of typing formulas.
- You need calculations by color beyond count and sum, such as median or standard deviation.

## Set up the free formulas (2 minutes)

1. **Extensions → Apps Script**, paste in [this `Code.gs`](https://github.com/DecodedXR/count-by-color/blob/main/Code.gs), and click **Save**.
2. Fill a "key" cell with each color you use, for example `D1` green.
3. Type `=COUNTBYCOLOR(A2:A50, D1)` or `=SUMBYCOLOR(B2:B50, D1)`.

The full walkthrough, with tips for text colors, other tabs and locales, is in the [step-by-step guide](count-cells-by-color-google-sheets.html).

---

[Get the script on GitHub](https://github.com/DecodedXR/count-by-color) · [Step-by-step guide](count-cells-by-color-google-sheets.html) · [More free Google Sheets scripts](https://decodedxr.github.io/free-google-sheets-scripts/)
{% endraw %}
