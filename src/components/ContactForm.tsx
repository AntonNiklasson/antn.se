import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { twMerge } from "tailwind-merge";

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<{
		type: "success" | "error" | "idle";
		message: string;
	}>({ type: "error", message: "something wrent wrong" });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsSubmitting(true);
		setStatus({ type: "idle", message: "" });

		try {
			const formData = new FormData(e.currentTarget);
			const response = await fetch("/api/contact", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				setStatus({
					type: "success",
					message: "Message sent successfully! I'll get back to you soon.",
				});
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to send message");
			}
		} catch (error) {
			console.log(error);
			setStatus({
				type: "error",
				message: "Failed to send message. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="space-y-16">
			<form onSubmit={handleSubmit} className="space-y-8">
				<Input id="name" label="Name" autofocus placeholder="Who are you?" />
				<Input id="contact" label="Contact" placeholder="How can I get back to you?" />
				<Input id="message" label="Message" multiline />

				{/* Honeypot field - hidden from users but visible to bots */}
				<div className="hidden">
					<label htmlFor="website">Website (leave blank)</label>
					<input type="text" id="website" name="website" tabIndex={-1} />
				</div>

				<Button label="Send" disabled={isSubmitting} />
			</form>

			{status.type !== "idle" && (
				<div
					className={twMerge(
						"font-bold",
						status.type === "success" ? "text-success text-sm" : "text-error text-sm",
					)}>
					{status.message}
				</div>
			)}
		</div>
	);
}
