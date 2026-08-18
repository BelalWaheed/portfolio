import { describe, it, expect } from 'vitest';
import { PROJECTS, PROFILE, SKILLS, NAV_ITEMS } from '@/data/constants';

describe('Portfolio Data & Schema Integrity', () => {
  it('contains valid profile structure', () => {
    expect(PROFILE.name).toBe('Belal Waheed');
    expect(PROFILE.email).toContain('@');
    expect(PROFILE.bio).toBeDefined();
    expect(PROFILE.bio.length).toBeGreaterThan(20);
  });

  it('contains valid project definitions with high-res images', () => {
    expect(PROJECTS.length).toBeGreaterThan(0);

    PROJECTS.forEach((project) => {
      expect(project.id).toBeDefined();
      expect(project.slug).toBeDefined();
      expect(project.title).toBeDefined();
      expect(project.description).toBeDefined();
      expect(project.image).toBeDefined();
      expect(project.image.length).toBeGreaterThan(5);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.category).toBeDefined();
    });
  });

  it('contains structured skills across frontend, backend, and tools categories', () => {
    expect(SKILLS.length).toBeGreaterThan(5);
    const categories = new Set(SKILLS.map((s) => s.category));
    expect(categories.has('frontend')).toBe(true);
    expect(categories.has('backend')).toBe(true);
    expect(categories.has('tools')).toBe(true);
  });

  it('has consistent navigation anchors', () => {
    expect(NAV_ITEMS.length).toBeGreaterThan(0);
    NAV_ITEMS.forEach((item) => {
      expect(item.label).toBeDefined();
      expect(item.href).toMatch(/^[#/]/);
    });
  });
});
