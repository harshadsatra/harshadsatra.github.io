# GEO Analysis: harshadsatra.in

> **Update 2026-10-24: fixes applied** (in `src/`, built to `public/`, not yet deployed)
> - Blog link removed from the nav, `sameAs` and llms.txt
> - Positioning is now "Freelance Web Developer in Mumbai" in the H1, titles, meta and schema. Leah/DocuX appear as proof on /about-me
> - About: ~150-word factual bio, experience timeline, education and certifications, AI disclaimer removed, `ProfilePage` schema
> - Home: name in the H1, factual subtitle, services rewritten with named projects and results, `ProfessionalService` schema, heading order fixed
> - Projects: intro passage plus highlights, `CollectionPage`/`ItemList` schema (28 items), template placeholders removed
> - Contact: 6-question hiring FAQ plus `FAQPage` schema
> - Experience is now "13 years" everywhere on the site
> - Estimated score after deploy: **~72/100**
>
> **Still on you:** fill in the brackets in the bio template below if you reuse it elsewhere; create a Wikidata entry; set your GitHub bio to "13 years" (it says 11+); confirm the phone number (the site shows 8291954312, LinkedIn shows 9167234312); get third-party mentions (Reddit, YouTube, client credits).

_Audited 2026-10-24 against the local build in `public/`. It includes this session's fixes (JSON-LD, llms.txt and robots.txt), which aren't deployed yet. The live site still serves the old robots.txt and returns 404 for /llms.txt._

## 1. GEO Readiness Score: **53 / 100** (live today: ~45)

| Criterion | Weight | Score | Notes |
|---|---|---|---|
| Citability | 25 | 8 | Copy is generic marketing text with no facts, numbers or quotable definitions |
| Structural readability | 20 | 10 | One H1 per page, but the hierarchy is out of order (H3 "Services" sits above an H2, plus a stray H5/H6). No Q&A or lists of facts |
| Multi-modal | 15 | 10 | 32 project screenshots, all with alt text, plus videos. No captions or descriptions |
| Authority & brand | 20 | 8 | Person schema, 2 named testimonials, LinkedIn/GitHub. No Wikipedia/Wikidata, the **blog is down (502)**, about page carries an AI-generated disclaimer, no dates |
| Technical accessibility | 20 | 17 | Static HTML (all content works without JS), AI crawlers allowed, llms.txt, CSP fixed |

## 2. Platform breakdown

| Platform | Score | Bottleneck |
|---|---|---|
| Google AI Overviews | 55 | Needs to rank top 10 for "freelance web developer India / Mumbai"-type queries. Pages are thin (homepage ~400 words, projects ~225, contact ~100) |
| ChatGPT search | 40 | No Wikipedia/Wikidata entity, few third-party mentions |
| Perplexity | 35 | No Reddit, YouTube or community mentions |
| Bing Copilot | 45 | Not submitted to Bing Webmaster Tools / IndexNow (unverified) |

## 3. AI crawler access

After deploy, `robots.txt` allows everything. The following crawlers are also named explicitly with `Allow: /`: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended.
Nothing is blocked, and CCBot, anthropic-ai, Bytespider and cohere-ai fall under `*`. That's fine for a portfolio, where training exposure only adds to brand recall.

## 4. llms.txt

**Present in the build** (`src/llms.txt`, copied by gulp): a summary, pages, contact details and 28 projects.
Recommendations:
- Add a one-line description to each project (client industry and what you built). Right now each entry lists only the tech stack.
- Remove the Blog line until blog.harshadsatra.in is back up.

## 5. Brand mentions

| Source | Status |
|---|---|
| Wikipedia | None (0 search hits) |
| Wikidata | No entity |
| LinkedIn | Profile exists, linked via `sameAs` |
| GitHub | 41 public repos, 22 followers. Bio says **11+ yrs** |
| YouTube | None found |
| Reddit | Not checked (no API access) |
| Blog (blog.harshadsatra.in) | **502 Bad Gateway**. It's linked from the main menu, `sameAs` and llms.txt |

**Inconsistent experience claims:** GitHub says 11+ years, the homepage meta says 10+, the about page says "nearly a decade", and the old root `index.html` says 7. AI models trust a fact more when every source agrees, so pick one number and use it everywhere.

## 6. Passage-level citability

No passage falls in the 134–167 word citation range. The longest blocks are the homepage service descriptions (37–76 words) and the about-page intro (41–55 words per paragraph). None of them can be quoted on its own. They contain no facts that are specific to you: no clients, results, years or location. "Indian business landscape" appears in 4 of the 5 services, which reads as filler.

## 7. Server-side rendering

Pass. Every page is pre-rendered HTML from gulp partials. Headings, project names, links and testimonials are all in the initial HTML, so crawlers that don't run JS see the full content. `projects.json` exists but no page fetches it.

## 8. Top 5 highest-impact changes

1. **Fix or remove the blog link.** A 502 on a `sameAs` URL and in the main nav hurts trust with both crawlers and visitors.
2. **Rewrite the About intro as a 140–160 word factual bio** and remove "PS: Generated using AI." (draft below). This is the passage AI tools will quote when someone asks "who is Harshad Satra".
3. **Give each project a 1–2 sentence case-study line** on /projects covering client type, problem, what you built and the result. This turns ~225 words of names into citable proof.
4. **Add a question-led FAQ to the homepage or contact page**: "How much does a website cost?", "Do you work with clients outside India?", "What's your typical timeline?", "Which stack do you use?". These match how people phrase questions to AI search.
5. **Create a Wikidata entity** (occupation, country, official website, GitHub/LinkedIn IDs) and get mentioned on 2–3 third-party sites, for example client sites crediting "Website by Harshad Satra" or agency and directory listings. This is the main lever for ChatGPT and Perplexity.

## 9. Schema recommendations

Already added (all pages): `Person` and `WebSite` in an `@graph`.
Next:
- `/about-me`: `ProfilePage` with `mainEntity` → `#person`. Add `alumniOf` or `worksFor` if applicable, and `hasOccupation`.
- `/projects`: `ItemList` of `CreativeWork` entries (`name`, `url`, `creator` → `#person`, `keywords` = stack).
- Homepage: `ProfessionalService` with `founder` → `#person`, `areaServed`, and `makesOffer` covering the 5 services.
- FAQ: plain HTML Q&A is enough. FAQPage rich results are restricted, but AI tools still read the markup.
- Skip `Review` schema for the testimonials, because Google ignores reviews a site publishes about itself.

## 10. Content reformatting suggestions

**About intro.** Replace the current 4 paragraphs and the AI disclaimer with something like this (fill in the brackets):

> Harshad Satra is a freelance web developer and digital solution architect based in [City], India, with 11+ years of experience building websites, e-commerce stores and SaaS products. He has delivered 28+ client projects, including Better Earth Coalition, Bridge Postworks, NYUCT Venture Design and The Common Table, for brands in India, Europe and the US. His core stack is Vue.js, Nuxt.js, React and Next.js on the front end, and Node.js, Express.js and WordPress on the back end, deployed on AWS and Vercel. Every build targets three things: technical SEO, WCAG accessibility and mobile performance. Before freelancing, Harshad [role / company]. Clients describe him as someone who "understands both Frontend and Backend" well, according to Saurabh Malhotra, co-founder of Pigeon & Co. He works with startups, agencies and established businesses on new builds, redesigns and long-term maintenance. Reach him at hello@harshadsatra.in.

(~150 words. It's self-contained, starts with "X is…", and includes numbers, named clients and an attributed quote.)

**Homepage H1.** "Solution expert, creative focused web developer" doesn't include your name or location. Try something like: _"Harshad Satra: Freelance Web Developer in [City], India"_, with the current line as the subtitle.

**Services.** Open each service with a direct-answer sentence and a concrete proof point, for example: _"E-commerce development: I build WooCommerce and headless Shopify stores. Example: InOrdinary Store, [result]."_ Drop the repeated "Indian market" filler.

**Heading order.** On the homepage, change "Services" (H3, above an H2) and the H5 tagline to a `<p class="tt-heading-subtitle">`. The social-links H6 in the menu, which appears on every page, should also be a `<p>`.

**Dates.** Add "Last updated: <month year>" to /projects and /about-me, and a year to each project. The `data-year="p.Year"` attributes are unfilled template placeholders.
