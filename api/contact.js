// Contact form endpoint: filters spam, then forwards the enquiry to Directus.
// Uses the Directus Public role's create permission on "enquiry" (no token).
const DIRECTUS_URL = "https://cms.shwezstudio.in/items/enquiry"
const SUBJECTS = ["Say Hello", "Discuss a new project", "Collaborate on a project", "Free website audit", "Other"]
const MIN_FILL_MS = 3000

function isSpam(b) {
	if (b.website) return "honeypot"
	const elapsed = Date.now() - Number(b.ts)
	if (!Number(b.ts) || !(elapsed >= MIN_FILL_MS)) return "too fast"
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b.email) || b.email.length > 200) return "email"
	if (b.name.length < 2 || b.name.length > 100 || /https?:|www\.|[<>]/i.test(b.name)) return "name"
	if (!SUBJECTS.includes(b.subject)) return "subject"
	if (b.message.length < 10 || b.message.length > 5000) return "message length"
	if ((b.message.match(/https?:\/\/|www\./gi) || []).length > 2) return "links"
	if (/\[url=|<a\s/i.test(b.message)) return "markup"
	// Cyrillic/CJK-only blasts are the bulk of form spam on an English-only site
	if (/[\u0400-\u04FF\u4E00-\u9FFF]{5,}/.test(b.message)) return "script"
	return false
}

module.exports = async (req, res) => {
	if (req.method !== "POST") return res.status(405).json({ ok: false })

	const raw = req.body || {}
	const b = {}
	for (const k of ["name", "email", "subject", "message", "website", "ts", "src"]) b[k] = String(raw[k] ?? "").trim()

	const spam = isSpam(b)
	// Bots get a fake success so they don't retry with tweaks
	if (spam) {
		console.log("contact: rejected", spam)
		return res.status(200).json({ ok: true })
	}

	try {
		const r = await fetch(DIRECTUS_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: b.name, email: b.email, subject: b.subject, message: b.message, src: b.src.slice(0, 300) }),
		})
		if (!r.ok) throw new Error(`Directus ${r.status}: ${await r.text()}`)
		return res.status(200).json({ ok: true })
	} catch (e) {
		console.error("contact:", e.message)
		return res.status(502).json({ ok: false })
	}
}

module.exports.isSpam = isSpam
