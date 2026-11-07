import { useEffect, useRef, useState } from "react";

const draftKey = "contact-form-draft";
const draftFields = ["name", "contact", "message"] as const;

const greetings = ["Hi Anton,", "Hey Anton,", "Hello Anton,", "Hi there, Anton,"];
const replyPhrases = ["You can reach me at", "Find me at", "Drop me a reply at", "My email is"];

export default function ContactForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const [greeting, setGreeting] = useState(greetings[0]);
	const [replyPhrase, setReplyPhrase] = useState(replyPhrases[0]);

	useEffect(() => {
		try {
			const draft = JSON.parse(localStorage.getItem(draftKey) || "null");
			if (draft && typeof draft === "object") {
				for (const name of draftFields) {
					const field = formRef.current?.elements.namedItem(name);
					if (
						(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) &&
						typeof draft[name] === "string"
					) {
						field.value = draft[name].slice(0, field.maxLength);
					}
				}
			}
		} catch {
			// Drafts are optional when storage is unavailable or invalid.
		}
		setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
		setReplyPhrase(replyPhrases[Math.floor(Math.random() * replyPhrases.length)]);
	}, []);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });

	const saveDraft = () => {
		if (!formRef.current) return;
		const data = new FormData(formRef.current);
		const draft = Object.fromEntries(draftFields.map((name) => [name, data.get(name)]));
		try {
			localStorage.setItem(draftKey, JSON.stringify(draft));
		} catch {
			// Sending still works when browser storage is unavailable.
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isSubmitting) return;
		const form = e.currentTarget;
		setIsSubmitting(true);
		setStatus({ type: null, message: "" });

		try {
			const formData = new FormData(form);
			const response = await fetch("/api/contact", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				form.reset();
				try {
					localStorage.removeItem(draftKey);
				} catch {
					// Storage may be disabled by the browser.
				}
				setStatus({
					type: "success",
					message: "Message sent successfully! I'll get back to you soon.",
				});
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to send message");
			}
		} catch {
			setStatus({
				type: "error",
				message: "Failed to send message. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const fieldClass =
		"font-handwritten w-full rounded-none border-0 bg-background p-1 text-xl text-foreground transition placeholder:text-subtle focus:bg-surface/50 focus:outline-none";

	return (
		<form
			ref={formRef}
			onInput={saveDraft}
			onSubmit={handleSubmit}
			className="contact-paper overflow-hidden"
			aria-busy={isSubmitting}>
			{status.type === "success" && (
				<div role="status" className="space-y-3 px-6 py-12 sm:px-8">
					<p className="font-handwritten text-heading text-3xl">Thanks for the note!</p>
					<p className="text-muted text-sm leading-relaxed">
						Your message is on its way. I’ll get back to you soon.
					</p>
					<p className="font-handwritten text-muted pt-3 text-xl">— Anton</p>
				</div>
			)}
			<div hidden={status.type === "success"} className="space-y-4 p-5 sm:space-y-5 sm:p-8">
				<p className="font-handwritten text-foreground text-xl">{greeting}</p>
				<div>
					<label htmlFor="message" className="sr-only">
						Message
					</label>
					<textarea
						id="message"
						name="message"
						required
						maxLength={1000}
						rows={4}
						placeholder="What’s on your mind?"
						className={`${fieldClass} block min-h-24 resize-none`}
					/>
				</div>
				<div className="font-handwritten flex flex-col items-start gap-0 text-xl sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2">
					<label htmlFor="contact" className="text-muted">
						{replyPhrase}
					</label>
					<input
						id="contact"
						name="contact"
						type="email"
						autoComplete="email"
						placeholder="you@example.com"
						required
						maxLength={100}
						className={`${fieldClass} max-w-64 min-w-0 sm:flex-1 sm:basis-48`}
					/>
				</div>
				<div className="font-handwritten space-y-1 text-xl">
					<label htmlFor="name" className="text-muted block">
						All the best,
					</label>
					<input
						id="name"
						name="name"
						autoComplete="name"
						placeholder="Your name"
						required
						maxLength={100}
						className={`${fieldClass} block max-w-52`}
					/>
				</div>
				<div className="hidden" aria-hidden="true">
					<label htmlFor="website">Website (leave blank)</label>
					<input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
				</div>
			</div>
			<div className="border-border/40 bg-surface/20 flex flex-wrap items-center justify-end gap-3 border-t px-5 py-4 sm:px-8">
				<button
					type={status.type === "success" ? "button" : "submit"}
					onClick={status.type === "success" ? () => setStatus({ type: null, message: "" }) : undefined}
					disabled={isSubmitting}
					className="text-foreground border-border bg-background hover:border-muted hover:bg-surface focus-visible:outline-border rounded-[3px] border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-1 focus-visible:outline-offset-2 disabled:cursor-wait disabled:opacity-50">
					{status.type === "success" ? "Write another note" : isSubmitting ? "Sending…" : "Send message"}
				</button>
				<div
					role="status"
					aria-live="polite"
					aria-atomic="true"
					className={
						status.type === "error" ? "text-sm text-red-700 dark:text-red-400" : "text-foreground text-sm"
					}>
					{status.type === "error" ? status.message : ""}
				</div>
			</div>
		</form>
	);
}
