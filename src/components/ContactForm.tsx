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
		"w-full rounded-[3px] border border-border/60 bg-background px-2 py-1.5 text-base sm:text-sm text-foreground transition placeholder:text-subtle focus:border-muted focus:outline-none";

	return (
		<form onSubmit={handleSubmit} className="space-y-5" aria-busy={isSubmitting}>
			<div className="grid gap-5 sm:grid-cols-2">
				<div className="space-y-1">
					<label htmlFor="name" className="text-muted block text-xs">
						Name
					</label>
					<input id="name" name="name" autoComplete="name" required maxLength={100} className={fieldClass} />
				</div>
				<div className="space-y-1">
					<label htmlFor="contact" className="text-muted block text-xs">
						Email
					</label>
					<input
						id="contact"
						name="contact"
						type="email"
						autoComplete="email"
						required
						maxLength={100}
						className={fieldClass}
					/>
				</div>
			</div>
			<div className="space-y-1">
				<label htmlFor="message" className="text-muted block text-xs">
					Message
				</label>
				<textarea
					id="message"
					name="message"
					required
					maxLength={1000}
					rows={4}
					placeholder="What’s on your mind?"
					className={`${fieldClass} min-h-24 resize-y`}
				/>
			</div>
			<div className="hidden" aria-hidden="true">
				<label htmlFor="website">Website (leave blank)</label>
				<input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
			</div>
			<button
				type="submit"
				disabled={isSubmitting}
				className="text-foreground border-border/60 bg-background hover:border-muted hover:bg-surface focus-visible:outline-border rounded-[3px] border px-3 py-1.5 text-sm transition focus-visible:outline-1 focus-visible:outline-offset-2 disabled:cursor-wait disabled:opacity-50">
				{isSubmitting ? "Sending…" : "Send message"}
			</button>
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
