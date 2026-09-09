// Pixels and seconds. Attraction stays much weaker than each particle's own drift.
export const CONNECTION_DISTANCE = 140;
const ATTRACTION = 1.2;
const RETURN_TO_DRIFT = 0.8;
const EDGE_MARGIN = CONNECTION_DISTANCE;
const FADE_DURATION = 4;

export interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	driftX: number;
	driftY: number;
	radius: number;
	age: number;
	ttl: number;
}

function createParticle(width: number, height: number): Particle {
	const angle = Math.random() * Math.PI * 2;
	const speed = 5 + Math.random() * 6;
	const driftX = Math.cos(angle) * speed;
	const driftY = Math.sin(angle) * speed;
	return {
		x: Math.random() * width,
		y: Math.random() * height,
		vx: driftX,
		vy: driftY,
		driftX,
		driftY,
		// Mostly small, distant dots with a few larger ones in the foreground.
		radius: 0.7 + Math.random() ** 1.5 * 1.9,
		age: 0,
		ttl: 25 + Math.random() * 40,
	};
}

export function createParticles(width: number, height: number): Particle[] {
	const count = 2 * Math.min(80, Math.max(12, Math.round((width * height) / 22000)));
	return Array.from({ length: count }, () => {
		const particle = createParticle(width, height);
		// Start with a settled, staggered scene, including for reduced motion.
		particle.age = Math.random() * particle.ttl;
		return particle;
	});
}

export function particleOpacity(particle: Particle): number {
	const fade = Math.max(0, Math.min(1, particle.age / FADE_DURATION, (particle.ttl - particle.age) / FADE_DURATION));
	return fade * fade * (3 - 2 * fade);
}

export function connectionStrength(distance: number): number {
	return Math.max(0, 1 - distance / CONNECTION_DISTANCE) ** 2;
}

export function stepParticles(particles: Particle[], elapsed: number, width: number, height: number): void {
	// Never jump ahead after a suspended tab or a slow frame.
	const dt = Math.max(0, Math.min(elapsed, 0.05));
	for (let i = 0; i < particles.length; i++) {
		particles[i].age += dt;
		if (particles[i].age >= particles[i].ttl) {
			particles[i] = createParticle(width, height);
		}
	}
	const opacities = particles.map(particleOpacity);
	for (let i = 0; i < particles.length; i++) {
		const a = particles[i];
		for (let j = i + 1; j < particles.length; j++) {
			const b = particles[j];
			const dx = b.x - a.x;
			const dy = b.y - a.y;
			const distance = Math.hypot(dx, dy);
			if (distance === 0 || distance >= CONNECTION_DISTANCE) continue;

			const pull = (ATTRACTION * connectionStrength(distance) * opacities[i] * opacities[j] * dt) / distance;
			a.vx += dx * pull;
			a.vy += dy * pull;
			b.vx -= dx * pull;
			b.vy -= dy * pull;
		}
	}

	const relaxation = 1 - Math.exp(-RETURN_TO_DRIFT * dt);
	for (const particle of particles) {
		// Connections bend paths, but never replace the particle's preferred velocity.
		particle.vx += (particle.driftX - particle.vx) * relaxation;
		particle.vy += (particle.driftY - particle.vy) * relaxation;
		particle.x += particle.vx * dt;
		particle.y += particle.vy * dt;

		// Wrap offscreen so neither dots nor their connections visibly pop.
		if (particle.x < -EDGE_MARGIN) particle.x = width + EDGE_MARGIN;
		if (particle.x > width + EDGE_MARGIN) particle.x = -EDGE_MARGIN;
		if (particle.y < -EDGE_MARGIN) particle.y = height + EDGE_MARGIN;
		if (particle.y > height + EDGE_MARGIN) particle.y = -EDGE_MARGIN;
	}
}
