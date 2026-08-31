import { describe, it, expect } from 'vitest';
import { generateCountryFaqs, mergeCountryFaqs } from '../../src/lib/country-faq-generator';
import { getCountryMetadata, ALL_COUNTRIES } from '../../src/data/countries';
import type { CountryMetadata, CountryFAQItem } from '../../src/data/countries';

// Use a real country for realistic interpolation testing.
const bangladesh = getCountryMetadata('bangladesh')!;
const uae = getCountryMetadata('uae')!;
const usa = getCountryMetadata('usa')!;

// ─── generateCountryFaqs ─────────────────────────────────────────────────────

describe('generateCountryFaqs', () => {
  it('generates at least 8 FAQs for Bangladesh', () => {
    const faqs = generateCountryFaqs(bangladesh);
    expect(faqs.length).toBeGreaterThanOrEqual(8);
  });

  it('interpolates country name and nationality into questions', () => {
    const faqs = generateCountryFaqs(bangladesh);
    const questions = faqs.map((f) => f.question);
    expect(questions.some((q) => q.includes('Bangladesh'))).toBe(true);
    expect(questions.some((q) => q.includes('Bangladeshi'))).toBe(true);
  });

  it('includes cost savings FAQ with the country name', () => {
    const faqs = generateCountryFaqs(uae);
    const costFaq = faqs.find((f) => f.question.includes('How much can I save'));
    expect(costFaq).toBeDefined();
    expect(costFaq?.answer).toContain('40–60%');
  });

  it('includes visa process FAQ with processing time', () => {
    const faqs = generateCountryFaqs(bangladesh);
    const visaFaq = faqs.find((f) => f.question.includes('visa process'));
    expect(visaFaq).toBeDefined();
    expect(visaFaq?.answer).toContain('3–5 business days');
  });

  it('handles visa-on-arrival countries (UAE)', () => {
    const faqs = generateCountryFaqs(uae);
    const visaFaq = faqs.find((f) => f.question.includes('visa process'));
    expect(visaFaq).toBeDefined();
    expect(visaFaq?.answer).toContain('visa on arrival');
  });

  it('includes language support FAQ when country has multiple languages', () => {
    const faqs = generateCountryFaqs(bangladesh);
    const langFaq = faqs.find((f) => f.question.includes('speaking staff'));
    expect(langFaq).toBeDefined();
    expect(langFaq?.answer).toContain('Bengali');
  });

  it('includes English-only language FAQ for USA', () => {
    const faqs = generateCountryFaqs(usa);
    const langFaq = faqs.find((f) => f.question.includes('English-speaking'));
    expect(langFaq).toBeDefined();
    expect(langFaq?.answer).toContain('American');
  });

  it('includes travel logistics FAQ with flight time', () => {
    const faqs = generateCountryFaqs(bangladesh);
    const travelFaq = faqs.find((f) => f.question.includes('How do I travel'));
    expect(travelFaq).toBeDefined();
    expect(travelFaq?.answer).toContain('Dhaka');
  });

  it('includes hospital accreditation FAQ', () => {
    const faqs = generateCountryFaqs(uae);
    const hospFaq = faqs.find((f) => f.question.includes('safe and accredited'));
    expect(hospFaq).toBeDefined();
    expect(hospFaq?.answer).toContain('JCI');
  });

  it('includes cultural considerations FAQ when present', () => {
    const faqs = generateCountryFaqs(bangladesh);
    const culturalFaq = faqs.find((f) => f.question.includes('cultural and religious'));
    expect(culturalFaq).toBeDefined();
    expect(culturalFaq?.answer).toContain('Halal');
  });

  it('includes payment methods FAQ with currency code', () => {
    const faqs = generateCountryFaqs(bangladesh);
    const payFaq = faqs.find((f) => f.question.includes('payment methods'));
    expect(payFaq).toBeDefined();
    expect(payFaq?.answer).toContain('BDT');
  });

  it('includes family accommodation FAQ', () => {
    const faqs = generateCountryFaqs(uae);
    const familyFaq = faqs.find((f) => f.question.includes('family accompany'));
    expect(familyFaq).toBeDefined();
  });

  it('includes city recommendation FAQ', () => {
    const faqs = generateCountryFaqs(bangladesh);
    const cityFaq = faqs.find((f) => f.question.includes('Which Indian cities'));
    expect(cityFaq).toBeDefined();
    expect(cityFaq?.answer).toContain('Kolkata');
  });

  it('includes treatment cost FAQ with currency symbol', () => {
    const faqs = generateCountryFaqs(uae);
    const costFaq = faqs.find((f) => f.question.includes('How much does medical treatment'));
    expect(costFaq).toBeDefined();
    expect(costFaq?.answer).toContain('AED');
  });

  it('every FAQ has a non-empty question and answer', () => {
    for (const country of ALL_COUNTRIES) {
      const faqs = generateCountryFaqs(country);
      for (const faq of faqs) {
        expect(faq.question.length).toBeGreaterThan(0);
        expect(faq.answer.length).toBeGreaterThan(0);
      }
    }
  });

  it('generates FAQs for all 31 countries without throwing', () => {
    for (const country of ALL_COUNTRIES) {
      expect(() => generateCountryFaqs(country)).not.toThrow();
    }
  });
});

// ─── mergeCountryFaqs ────────────────────────────────────────────────────────

describe('mergeCountryFaqs', () => {
  it('returns auto FAQs unchanged when no manual FAQs are provided', () => {
    const auto = generateCountryFaqs(bangladesh);
    const merged = mergeCountryFaqs(auto);
    expect(merged).toEqual(auto);
  });

  it('returns auto FAQs unchanged when manual is an empty array', () => {
    const auto = generateCountryFaqs(bangladesh);
    const merged = mergeCountryFaqs(auto, []);
    expect(merged).toEqual(auto);
  });

  it('appends manual FAQs with new questions to the end', () => {
    const auto = generateCountryFaqs(bangladesh);
    const manual: CountryFAQItem[] = [
      { question: 'A completely new question?', answer: 'A custom answer.' },
    ];
    const merged = mergeCountryFaqs(auto, manual);
    expect(merged.length).toBe(auto.length + 1);
    expect(merged[merged.length - 1].question).toBe('A completely new question?');
  });

  it('replaces auto FAQs when manual has a matching question (case-insensitive)', () => {
    const auto = generateCountryFaqs(bangladesh);
    const autoQuestion = auto[0].question;
    const manual: CountryFAQItem[] = [
      { question: autoQuestion.toUpperCase(), answer: 'Override answer.' },
    ];
    const merged = mergeCountryFaqs(auto, manual);
    const match = merged.find((f) => f.question.toLowerCase() === autoQuestion.toLowerCase());
    expect(match?.answer).toBe('Override answer.');
  });

  it('does not duplicate questions (case-insensitive)', () => {
    const auto = generateCountryFaqs(bangladesh);
    const manual: CountryFAQItem[] = [
      { question: auto[0].question, answer: 'Override.' },
      { question: auto[1].question.toUpperCase(), answer: 'Override 2.' },
    ];
    const merged = mergeCountryFaqs(auto, manual);
    const questions = merged.map((f) => f.question.toLowerCase());
    const unique = new Set(questions);
    expect(unique.size).toBe(questions.length);
  });
});
