import { expect, test } from "vitest";
import {
	CONNECTION_DISTANCE,
	connectionStrength,
	createParticles,
	particleOpacity,
	stepParticles,
	type Particle,
} from "./particles";

function particle(x: number, y: number, vx = 0, vy = 0): Particle {
	return { x, y, vx, vy, driftX: vx, driftY: vy, radius: 1, age: 5, ttl: 30 };
}

test("density and backing simulation stay bounded", () => {
	for (const [width, height, count] of [
		[320, 640, 24],
		[1100, 880, 88],
		[8000, 4000, 160],
	]) {
		const particles = createParticles(width, height);
		expect(particles).toHaveLength(count);
		for (const p of particles) {
			expect(p.ttl).toBeGreaterThanOrEqual(25);
			expect(p.ttl).toBeLessThanOrEqual(65);
			expect(p.age).toBeGreaterThanOrEqual(0);
			expect(p.age).toBeLessThan(p.ttl);
			expect(p.radius).toBeGreaterThanOrEqual(0.7);
			expect(p.radius).toBeLessThanOrEqual(2.6);
			expect(p.x).toBeGreaterThanOrEqual(0);
			expect(p.x).toBeLessThan(width);
			expect(p.y).toBeGreaterThanOrEqual(0);
			expect(p.y).toBeLessThan(height);
			expect(Math.hypot(p.vx, p.vy)).toBeGreaterThanOrEqual(5);
			expect(Math.hypot(p.vx, p.vy)).toBeLessThanOrEqual(11);
		}
	}
});

test("particles fade in and out over four seconds", () => {
	const p = particle(100, 100);
	for (const [age, opacity] of [
		[0, 0],
		[2, 0.5],
		[4, 1],
		[15, 1],
		[26, 1],
		[28, 0.5],
		[30, 0],
		[31, 0],
	]) {
		p.age = age;
		expect(particleOpacity(p)).toBe(opacity);
	}
});

test("expired particles respawn invisibly within the viewport without changing density", () => {
	const expired = particle(100, 100);
	expired.age = expired.ttl - 0.01;
	const survivor = particle(500, 500);
	const particles = [expired, survivor];
	stepParticles(particles, 0.05, 1000, 800);
	expect(particles).toHaveLength(2);
	expect(particles[0]).not.toBe(expired);
	expect(particles[1]).toBe(survivor);
	const newborn = particles[0];
	expect(newborn.age).toBe(0);
	expect(particleOpacity(newborn)).toBe(0);
	// A newborn drifts by at most 0.55 pixels in its first step.
	expect(newborn.x).toBeGreaterThanOrEqual(-0.55);
	expect(newborn.x).toBeLessThan(1000.55);
	expect(newborn.y).toBeGreaterThanOrEqual(-0.55);
	expect(newborn.y).toBeLessThan(800.55);
	stepParticles(particles, 0.05, 1000, 800);
	expect(particleOpacity(newborn)).toBeGreaterThan(0);
});

test("invisible particles exert no attraction", () => {
	const a = particle(100, 100);
	const b = particle(150, 100);
	b.age = b.ttl;
	const particles = [a, b];
	stepParticles(particles, 0.05, 1000, 1000);
	expect(a.vx).toBe(0);
	expect(a.vy).toBe(0);
	expect(particles[1].vx).toBe(particles[1].driftX);
	expect(particles[1].vy).toBe(particles[1].driftY);
});

test("connections fade smoothly to nothing at their distance limit", () => {
	expect(connectionStrength(0)).toBe(1);
	expect(connectionStrength(CONNECTION_DISTANCE / 2)).toBe(0.25);
	expect(connectionStrength(CONNECTION_DISTANCE)).toBe(0);
	expect(connectionStrength(CONNECTION_DISTANCE * 2)).toBe(0);
});

test("isolated particles keep their own drift", () => {
	const p = particle(100, 100, 6, -3);
	stepParticles([p], 0.05, 1000, 1000);
	expect(p.x).toBeCloseTo(100.3);
	expect(p.y).toBeCloseTo(99.85);
	expect(p.vx).toBe(6);
	expect(p.vy).toBe(-3);
});

test("nearby particles receive equal, opposite, gentle attraction", () => {
	const a = particle(100, 100, 0, 6);
	const b = particle(150, 100, 0, 6);
	stepParticles([a, b], 0.05, 1000, 1000);
	expect(a.vx).toBeGreaterThan(0);
	expect(a.vx).toBeLessThan(0.06);
	expect(b.vx).toBeCloseTo(-a.vx);
	expect(a.vy).toBe(6);
	expect(b.vy).toBe(6);
});

test("distant particles do not attract", () => {
	const a = particle(100, 100);
	const b = particle(100 + CONNECTION_DISTANCE, 100);
	stepParticles([a, b], 0.05, 1000, 1000);
	expect(a.vx).toBe(0);
	expect(b.vx).toBe(0);
});

test("overlapping particles never produce invalid coordinates", () => {
	const particles = [particle(100, 100), particle(100, 100)];
	stepParticles(particles, 0.05, 1000, 1000);
	for (const p of particles) {
		expect(p.x).toBe(100);
		expect(p.y).toBe(100);
	}
});

test("particles relax back toward their independent velocity", () => {
	const p = particle(100, 100, 6, 0);
	p.vx = 7;
	stepParticles([p], 0.05, 1000, 1000);
	expect(p.vx).toBeGreaterThan(6);
	expect(p.vx).toBeLessThan(7);
});

test("long pauses are capped and wrapping happens outside connection range", () => {
	const p = particle(100, 100, 10, 0);
	stepParticles([p], 60, 1000, 1000);
	expect(p.x).toBeCloseTo(100.5);
	expect(p.age).toBeCloseTo(5.05);
	p.x = 1000 + CONNECTION_DISTANCE + 1;
	stepParticles([p], 0, 1000, 1000);
	expect(p.x).toBe(-CONNECTION_DISTANCE);
});
