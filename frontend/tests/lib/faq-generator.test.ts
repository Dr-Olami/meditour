import { describe, it, expect } from 'vitest';
import { generateDoctorFaqs, mergeFaqs } from '../../src/lib/faq-generator';

const baseDoctor = {
  name: 'Aditi Singhvi',
  specialty: 'Cardiology',
  qualification: 'MBBS, MD, DM (Cardiology)',
  experienceYears: 15,
  languages: ['English', 'Hindi'],
};

describe('generateDoctorFaqs', () => {
  it('generates exactly 4 FAQs for a doctor with a hospital', () => {
    const faqs = generateDoctorFaqs(baseDoctor, 'Apollo Hospital', 'en');

    expect(faqs).toHaveLength(4);
  });

  it('includes the 4 high-value search questions (specialty, experience, hospital, booking)', () => {
    const faqs = generateDoctorFaqs(baseDoctor, 'Apollo Hospital', 'en');
    const questions = faqs.map((f) => f.question);

    expect(questions[0]).toContain('conditions does Dr. Aditi Singhvi treat');
    expect(questions[1]).toContain('years of experience');
    expect(questions[2]).toContain('hospital is Dr. Aditi Singhvi affiliated');
    expect(questions[3]).toContain('book a consultation');
  });

  it('does not generate qualification or language FAQs', () => {
    const faqs = generateDoctorFaqs(baseDoctor, 'Apollo Hospital', 'en');
    const questions = faqs.map((f) => f.question);

    // Reason: qualification and languages are surfaced in the doctor bio, so
    // they should not be duplicated as FAQs.
    expect(questions.some((q) => q.includes('qualifications'))).toBe(false);
    expect(questions.some((q) => q.includes('languages'))).toBe(false);
  });

  it('interpolates doctor and hospital data into the answers', () => {
    const faqs = generateDoctorFaqs(baseDoctor, 'Apollo Hospital', 'en');

    expect(faqs[0].answer).toContain('Cardiology');
    expect(faqs[1].answer).toContain('15 years');
    expect(faqs[2].answer).toContain('Apollo Hospital');
    expect(faqs[3].answer).toContain('Aditi Singhvi');
  });

  it('generates 4 FAQs even when hospital name is empty', () => {
    const faqs = generateDoctorFaqs(baseDoctor, '', 'en');

    expect(faqs).toHaveLength(4);
  });

  it('generates Bengali FAQs when locale is bn', () => {
    const faqs = generateDoctorFaqs(baseDoctor, 'Apollo Hospital', 'bn');

    expect(faqs).toHaveLength(4);
    // Reason: Bengali templates should produce non-English question text.
    expect(faqs[0].question).not.toContain('conditions does Dr');
  });

  it('strips a leading "Dr." honorific so templates do not render "Dr. Dr."', () => {
    // Reason: doctor frontmatter `name` often includes the "Dr." prefix, but
    // the FAQ templates already hardcode "Dr. {{name}}". Without stripping we
    // would get "Dr. Dr. Aditi Singhvi".
    const doctorWithHonorific = { ...baseDoctor, name: 'Dr. Aditi Singhvi' };
    const faqs = generateDoctorFaqs(doctorWithHonorific, 'Apollo Hospital', 'en');

    const allText = faqs.map((f) => `${f.question} ${f.answer}`).join(' ');
    expect(allText).not.toContain('Dr. Dr.');
    expect(faqs[0].question).toBe('What conditions does Dr. Aditi Singhvi treat?');
  });

  it('strips a leading "ডাঃ" honorific in Bengali templates', () => {
    const doctorWithHonorific = { ...baseDoctor, name: 'ডাঃ আদিতি সিংহভি' };
    const faqs = generateDoctorFaqs(doctorWithHonorific, 'Apollo Hospital', 'bn');

    const allText = faqs.map((f) => `${f.question} ${f.answer}`).join(' ');
    expect(allText).not.toContain('ডাঃ ডাঃ');
  });
});

describe('mergeFaqs', () => {
  it('appends manual FAQs with new questions to the end', () => {
    const auto = generateDoctorFaqs(baseDoctor, 'Apollo Hospital', 'en');
    const manual = [{ question: 'Does Dr. Aditi Singhvi offer telemedicine?', answer: 'Yes.' }];

    const merged = mergeFaqs(auto, manual);

    expect(merged).toHaveLength(5);
    expect(merged[4].question).toBe('Does Dr. Aditi Singhvi offer telemedicine?');
  });

  it('overrides auto-generated answers when manual question matches (case-insensitive)', () => {
    const auto = generateDoctorFaqs(baseDoctor, 'Apollo Hospital', 'en');
    const overrideAnswer = 'Custom override answer.';
    const manual = [
      {
        question: 'WHAT CONDITIONS DOES DR. ADITI SINGHVI TREAT?',
        answer: overrideAnswer,
      },
    ];

    const merged = mergeFaqs(auto, manual);

    // Reason: matching question (case-insensitive) replaces the auto answer;
    // non-matching auto FAQs are preserved, so total is still 4.
    expect(merged).toHaveLength(4);
    const specialty = merged.find((f) =>
      f.question.toLowerCase().includes('conditions does'),
    );
    expect(specialty?.answer).toBe(overrideAnswer);
  });
});
