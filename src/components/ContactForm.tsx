import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsSubmitting(true);
		setStatus({ type: null, message: "" });

		try {
			const formData = new FormData(e.currentTarget);
			const response = await fetch("/api/contact", {
				method: "POST",
				body: formData,
			});

			console.log(response);

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
			<form onSubmit={handleSubmit} className="space-y-16">
				<Input id="name" label="Name" autofocus />
				<Input id="contact" label="Email" />
				<Input id="message" label="Message" multiline />

				{/* Honeypot field - hidden from users but visible to bots */}
				<div className="hidden">
					<label htmlFor="website">Website (leave blank)</label>
					<input type="text" id="website" name="website" tabIndex={-1} />
				</div>

				<Button label="Send" disabled={isSubmitting} />
			</form>

			{status.type && (
				<div
					className={
						status.type === "success"
							? "text-sm text-green-600"
							: "text-sm text-red-600"
					}>
					{status.message}
				</div>
			)}
		</div>
	);
}
