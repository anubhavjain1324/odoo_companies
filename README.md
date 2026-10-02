# Odoo Partners Directory

A static, searchable directory of official Odoo implementation partner
companies, filterable by country and certification tier (Gold / Silver /
Ready). Every listing links out to that company's real, official profile on
`odoo.com/partners` — no contact details are invented.

Currently includes 297 real partner companies across 16 countries (India,
USA, UK, Germany, UAE, Canada, Netherlands, Australia, France, Belgium,
Brazil, Spain, Italy, Mexico, Saudi Arabia, Egypt), pulled from Odoo's own
public directory. Each country also has a short original "Odoo Partners in
[Country]" blurb (in `data.js` as `COUNTRY_INFO`) for SEO. You can add more
countries/companies, or more blurbs, by editing `data.js`.

## Files
- `index.html` — page structure, SEO meta tags, ad slot placeholders
- `script.js` — search/filter logic (pure client-side, no backend needed)
- `data.js` — the company dataset
- `robots.txt`, `sitemap.xml` — SEO basics (update the placeholder URL once you have a domain)

## 1. Test it locally
Just open `index.html` in a browser, or run a tiny local server:
```
cd odoo-partners-directory
python3 -m http.server 8000
```
Then visit http://localhost:8000

## 2. Deploy for free on GitHub Pages
1. Create a new GitHub repo (e.g. `odoo-partners-directory`).
2. Push these files to it:
   ```
   cd odoo-partners-directory
   git init
   git add .
   git commit -m "Initial Odoo partners directory"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: Settings → Pages → Source: `main` branch, `/ (root)` folder → Save.
4. Your site goes live at `https://<your-username>.github.io/<repo-name>/`
   (usually within a minute or two).
5. Optional: add a custom domain for free under Settings → Pages →
   Custom domain (you still have to buy the domain itself — GitHub Pages
   hosting stays free either way).
6. Done — the site is live at https://anubhavjain1324.github.io/odoo_companies/
   and `index.html`, `robots.txt`, and `sitemap.xml` already point to it.

## 3. Add Google AdSense (after you have real traffic)
AdSense requires a live, indexable site with real content before it approves
an account — you can't pre-activate ads before launch.
1. Deploy the site first and let it sit live for a bit so Google can crawl it.
2. Sign up at https://www.google.com/adsense/
3. Add your site URL, verify ownership (AdSense gives you a snippet).
4. Once approved, uncomment the `<script async src="...pagead2...">` line
   near the top of `index.html` and put in your real `ca-pub-XXXXXXXXXXXXXXXX` ID.
5. Replace the empty `<div class="ad-slot">` elements with your actual
   `<ins class="adsbygoogle">` ad unit code from AdSense.
6. Approval isn't guaranteed — Google reviews for original content, traffic,
   and policy compliance. A directory site with only ~136 entries and no
   organic traffic yet is often rejected on first try; growing the dataset
   (more countries/companies) and adding some original written content
   (e.g. "how to choose an Odoo partner" guides) improves your odds.

## 4. Growing the directory (to actually get search traffic)
- Add more countries/companies to `data.js` by pulling further pages from
  `https://www.odoo.com/partners/country/<slug>-<id>` (see the HTML for the
  id scheme) — always link to the real profile, never invent details.
- Consider adding short write-ups per country ("Odoo partners in Germany")
  for SEO — this is the kind of original content that helps both search
  ranking and AdSense approval.
- Register the site with Google Search Console and submit `sitemap.xml`.

## Legal note
This is an independent, unofficial resource. It is not affiliated with or
endorsed by Odoo S.A. "Odoo" is a trademark of Odoo S.A. Keep the
attribution footer intact, and don't present this as an official Odoo
property.
