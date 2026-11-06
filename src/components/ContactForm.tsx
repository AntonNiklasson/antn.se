import { useState } from "react";

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });

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
		<form onSubmit={handleSubmit} className="contact-paper space-y-5 p-5 sm:p-8" aria-busy={isSubmitting}>
			<p className="font-handwritten text-foreground text-xl">Hi Anton,</p>
			<div>
				<label htmlFor="message" className="sr-only">
					Message
				</label>
				<textarea
					id="message"
					name="message"
					required
					maxLength={1000}
					rows={5}
					placeholder="What’s on your mind?"
					className={`${fieldClass} block min-h-24 resize-y`}
				/>
			</div>
			<div className="font-handwritten flex flex-wrap items-center gap-x-2 gap-y-2 text-xl">
				<label htmlFor="contact" className="text-muted">
					You can reach me at
				</label>
				<input
					id="contact"
					name="contact"
					type="email"
					autoComplete="email"
					placeholder="you@example.com"
					required
					maxLength={100}
					className={`${fieldClass} max-w-64 min-w-0 flex-1 basis-48`}
				/>
			</div>
			<div className="font-handwritten flex flex-wrap items-center gap-x-2 gap-y-2 text-xl">
				<label htmlFor="name" className="text-muted">
					Sincerely,
				</label>
				<input
					id="name"
					name="name"
					autoComplete="name"
					placeholder="Your name"
					required
					maxLength={100}
					className={`${fieldClass} max-w-52 min-w-0 flex-1 basis-40`}
				/>
			</div>
			<div className="hidden" aria-hidden="true">
				<label htmlFor="website">Website (leave blank)</label>
				<input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
			</div>
			<div className="pt-3 pl-4">
				<button
					type="submit"
					disabled={isSubmitting}
					className="text-foreground border-border/60 bg-background hover:border-muted hover:bg-surface focus-visible:outline-border rounded-[3px] border px-3 py-1.5 text-sm transition focus-visible:outline-1 focus-visible:outline-offset-2 disabled:cursor-wait disabled:opacity-50">
					{isSubmitting ? "Sending…" : "Send message"}
				</button>
			</div>
			<div
				role="status"
				aria-live="polite"
				aria-atomic="true"
				className={
					status.type === "error" ? "text-sm text-red-700 dark:text-red-400" : "text-foreground text-sm"
				}>
				{status.message}
			</div>
		</form>
	);
}
