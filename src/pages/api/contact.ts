import type { APIRoute } from "astro";
import { Resend } from "resend";
import { env } from "../../lib/env";

export const prerender = false;

const resend = new Resend(env.RESEND_API_KEY);

// Simple in-memory rate limiter
const rateLimiter = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: Request): string {
	const forwarded = request.headers.get("x-forwarded-for");
	const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
	return ip;
}

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const windowMs = 15 * 60 * 1000; // 15 minutes
	const maxRequests = 3; // 3 requests per window
	
	const record = rateLimiter.get(ip);
	
	if (!record || now > record.resetTime) {
		rateLimiter.set(ip, { count: 1, resetTime: now + windowMs });
		return true;
	}
	
	if (record.count >= maxRequests) {
		return false;
	}
	
	record.count++;
	return true;
}

export const POST: APIRoute = async ({ request }) => {
	try {
		// Rate limiting
		const ip = getRateLimitKey(request);
		if (!checkRateLimit(ip)) {
			return new Response(
				JSON.stringify({ message: "Too many requests. Please try again later." }),
				{ status: 429, headers: { "Content-Type": "application/json" } },
			);
		}

		const formData = await request.formData();
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const message = formData.get("message") as string;
		const honeypot = formData.get("website") as string; // Honeypot field

		// Honeypot check - if filled, it's likely a bot
		if (honeypot) {
			return new Response(JSON.stringify({ message: "Spam detected" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Basic validation and sanitization
		if (!name?.trim() || !email?.trim() || !message?.trim()) {
			return new Response(JSON.stringify({ message: "All fields are required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Length validation
		if (name.length > 100 || email.length > 100 || message.length > 1000) {
			return new Response(JSON.stringify({ message: "Input too long" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return new Response(JSON.stringify({ message: "Please enter a valid email address" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Send email via Resend
		const { data, error } = await resend.emails.send({
			from: "contact@antn.se",
			to: [env.CONTACT_EMAIL],
			subject: "antn.se - contact form",
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2>antn.se - contact form</h2>
					<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<p><strong>Name:</strong> ${name}</p>
						<p><strong>Email:</strong> ${email}</p>
						<p><strong>Message:</strong></p>
						<p style="background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">${message}</p>
					</div>
					<p style="color: #666; font-size: 14px;">
						Submitted at: ${new Date().toLocaleString()}
					</p>
				</div>
			`,
		});

		if (error) {
			return new Response(
				JSON.stringify({ message: "Failed to send email", error: error.message }),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		return new Response(JSON.stringify({ message: "Email sent successfully", id: data?.id }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ message: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
