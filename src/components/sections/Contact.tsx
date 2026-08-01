import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Clock, Check, Loader2 } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';
import { PROFILE } from '@/data/constants';

interface FormData { name: string; email: string; subject: string; message: string; }
interface FormErrors { name?: string; email?: string; message?: string; }

export function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Portfolio Contact',
          message: formData.message,
          from_name: formData.name,
          reply_to: formData.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const contactCards = [
    { icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: MapPin, label: 'Location', value: PROFILE.location },
    { icon: Clock, label: 'Status', value: 'Open for work' },
  ];

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden">
      <motion.div 
        className="absolute left-1/4 top-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)', y: bgY }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-indigo-600 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 font-mono">// contact</p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Let's build something{' '}
            <span className="text-gradient">together</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
            Have a project in mind or want to talk? Drop me a message below!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Contact Info + Social */}
          <motion.div 
            className="lg:col-span-5 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {contactCards.map((card, i) => (
              <motion.div
                key={card.label}
                className="studio-card p-5 hover:border-indigo-300 transition-all"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                    <card.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">{card.label}</p>
                    {card.href ? (
                      <a href={card.href} className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors">{card.value}</a>
                    ) : (
                      <p className="font-bold text-sm text-slate-900">{card.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}


          </motion.div>

          {/* Right: Contact Form */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="studio-card p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                      <Check size={28} />
                    </div>
                    <h3 className="text-xl font-bold font-display text-slate-900 mb-1">Message Sent!</h3>
                    <p className="text-sm text-slate-600">Thank you! I'll get back to you shortly.</p>
                  </motion.div>
                ) : submitError ? (
                  <motion.div
                    key="error"
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                      <Mail size={28} />
                    </div>
                    <h3 className="text-xl font-bold font-display text-slate-900 mb-1">Failed to send</h3>
                    <p className="text-sm text-slate-600">Please try again or email me directly at {PROFILE.email}.</p>
                  </motion.div>
                ) : (
                  <motion.form onSubmit={handleSubmit} className="space-y-4" key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Input name="name" placeholder="Your name" value={formData.name} onChange={handleChange} error={errors.name} />
                      </div>
                      <div>
                        <Input name="email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} error={errors.email} />
                      </div>
                    </div>
                    <Input name="subject" placeholder="Subject (optional)" value={formData.subject} onChange={handleChange} />
                    <div>
                      <Textarea name="message" placeholder="Your message..." rows={4} value={formData.message} onChange={handleChange} error={errors.message} />
                    </div>
                    <Button type="submit" size="lg" className="w-full sm:w-auto min-w-[160px]" disabled={isSubmitting}>
                      {isSubmitting ? (<><Loader2 size={18} className="animate-spin" /> Sending...</>) : (<><Send size={18} /> Send Message</>)}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
