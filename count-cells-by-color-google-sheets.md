---
title: How to count and sum cells by color in Google Sheets (free)
description: Google Sheets can't COUNTIF or SUMIF by cell color. Two free custom formulas, COUNTBYCOLOR and SUMBYCOLOR, do it for fill or text color, with no add-on.
image: https://decodedxr.github.io/count-by-color/assets/cover.png
---
{% raw %}

# How to count and sum cells by color in Google Sheets (free)

You've color-coded a sheet: green for paid, red for overdue, yellow for pending. Now you want totals by color, and discover that `COUNTIF` and `SUMIF` can't see colors, and the filter-by-color menu doesn't give you a number you can use in a formula.

This guide adds two formulas that can, using [Count and Sum by Color](https://github.com/DecodedXR/count-by-color), a free, MIT-licensed Apps Script. Setup takes about two minutes.

## Step 1: Add the script

1. Open your sheet and go to **Extensions → Apps Script**.
2. Delete what's in `Code.gs`, paste in [this `Code.gs`](https://github.com/DecodedXR/count-by-color/blob/main/Code.gs), and click **Save**.
3. Close the Apps Script tab.

## Step 2: Make a color key

Pick an empty spot, say `D1:D3`, and fill each cell with one of your colors (green, red, yellow). These are the colors your formulas will look for. You can type a label in each one too.

## Step 3: Type the formulas

Next to each key cell:

```
=COUNTBYCOLOR(A2:A50, D1)     how many green cells in A2:A50
=SUMBYCOLOR(B2:B50, D1)       the total of the green amounts in B2:B50
```

They autocomplete and show help like built-in functions. A few variations:

- **Text color instead of fill:** add `"text"` as a third argument: `=COUNTBYCOLOR(A2:A50, D1, "text")`.
- **A hex color instead of a key cell:** `=SUMBYCOLOR(B2:B50, "#ff0000")`.
- **Another tab:** `=SUMBYCOLOR('March'!B2:B50, D1)`.

## Step 4: Refresh after recoloring

Sheets recalculates a formula when the *values* it uses change, not their colors. So after you recolor cells, reload the sheet once to get the **🎨 Color** menu, then click **🎨 Color → Refresh Color Formulas**. Every color formula in the file recalculates. (The first time, Google asks you to approve the script: "Google hasn't verified this app" → **Advanced → Go to (your project name) → Allow**. It's your own script.)

## FAQ

**Does it count conditional-formatting colors?** No. Scripts read the color you set on a cell, not the color a conditional-formatting rule paints over it. If your colors come from a rule, count with the rule's own condition in `COUNTIF` instead.

**Why not use the filter by color?** Filtering by color shows the matching rows, and `SUBTOTAL(109, …)` can sum what's visible. That works for a one-off look but changes as soon as someone changes the filter. A formula stays put on a summary tab.

**Is it free?** Yes, with no add-on, account or limit beyond Google's normal quotas for scripts.

**Does it slow my sheet down?** Each formula reads the colors of its range, so hundreds of them over large ranges can be slow. A handful of totals on a summary tab is instant.

---

[Get the script on GitHub](https://github.com/DecodedXR/count-by-color) · [More free Google Sheets scripts](https://decodedxr.github.io/free-google-sheets-scripts/)
{% endraw %}
