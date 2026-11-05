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
		"w-full rounded-md border border-border bg-background px-3 py-2.5 text-base text-heading transition placeholder:text-muted focus:border-fuchsia-700 focus:outline-2 focus:outline-offset-2 focus:outline-fuchsia-700";

	return (
		<form onSubmit={handleSubmit} className="space-y-6" aria-busy={isSubmitting}>
			<div className="grid gap-6 sm:grid-cols-2">
				<div className="space-y-2">
					<label htmlFor="name" className="text-heading block text-sm font-medium">
						Name
					</label>
					<input id="name" name="name" autoComplete="name" required maxLength={100} className={fieldClass} />
				</div>
				<div className="space-y-2">
					<label htmlFor="contact" className="text-heading block text-sm font-medium">
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
			<div className="space-y-2">
				<label htmlFor="message" className="text-heading block text-sm font-medium">
					Message
				</label>
				<textarea
					id="message"
					name="message"
					required
					maxLength={1000}
					rows={6}
					placeholder="What’s on your mind?"
					className={`${fieldClass} min-h-36 resize-y`}
				/>
			</div>
			<div className="hidden" aria-hidden="true">
				<label htmlFor="website">Website (leave blank)</label>
				<input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
			</div>
			<button
				type="submit"
				disabled={isSubmitting}
				className="bg-heading text-background rounded-md px-5 py-2.5 text-sm font-medium transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-700 disabled:cursor-wait disabled:opacity-50">
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
