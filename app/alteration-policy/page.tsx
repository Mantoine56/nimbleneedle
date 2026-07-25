import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Ruler,
  Scissors,
  ShieldCheck,
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Alteration, Cancellation & Fit Guarantee Policy | Nimble Needle Tailoring',
  description:
    'Read Nimble Needle Tailoring’s cancellation, refund, workmanship guarantee, and final fitting policy.',
  alternates: {
    canonical: '/alteration-policy',
  },
};

const policySections = [
  {
    id: 'cancellations-and-refunds',
    title: 'Cancellations and refunds',
    icon: RotateCcw,
    body: (
      <>
        <p>
          If an order is cancelled before alteration work begins, amounts paid for the
          alteration service will be refunded.
        </p>
        <p>
          Once cutting, sewing, or other alteration work has begun, completed labour and
          materials are non-refundable. Completed alteration services are final, subject
          to our workmanship guarantee and applicable consumer rights.
        </p>
      </>
    ),
  },
  {
    id: 'workmanship-guarantee',
    title: '30-day workmanship guarantee',
    icon: ShieldCheck,
    body: (
      <>
        <p>
          Please notify us of a workmanship concern within 30 days of pickup. If our
          stitching or alteration work comes undone, or does not match the approved work
          order, we will inspect and correct it at no additional charge.
        </p>
        <p>
          The guarantee does not cover changes of preference, changes in body
          measurements, ordinary wear, damage after pickup, pre-existing garment
          conditions, or work performed by another business.
        </p>
      </>
    ),
  },
  {
    id: 'final-fitting',
    title: 'Final fitting',
    icon: Ruler,
    body: (
      <>
        <p>
          When a second or final fitting is requested, customers should try on the
          garment before taking it home.
        </p>
        <p>
          If a customer chooses not to complete the requested fitting, later fit
          adjustments may involve an additional charge. This does not exclude corrections
          covered by our workmanship guarantee.
        </p>
      </>
    ),
  },
];

export default function AlterationPolicyPage() {
  return (
    <div className="min-h-screen bg-white mobile-safe">
      <Navigation />
      <SocialSidebar />
      <div className="pt-20">
        <Breadcrumb items={[{ label: 'Alteration Policy', current: true }]} />
      </div>

      <main>
        <section className="relative overflow-hidden bg-gray-950 text-white">
          <div
            className="absolute inset-0 opacity-[0.08]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
              backgroundSize: '28px 28px',
            }}
          />
          <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-pink-400">
                <Scissors className="h-5 w-5" aria-hidden="true" />
                Customer care
              </div>
              <h1 className="font-league-spartan text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Alteration, Cancellation &amp; Fit Guarantee Policy
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
                Clear expectations protect your garment and help us deliver the fit and
                workmanship you approved.
              </p>
              <p className="mt-8 text-sm text-gray-400">Last updated: July 25, 2026</p>
            </div>
          </div>
        </section>

        <section className="bg-pink-50/60">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <CheckCircle2
                className="mt-1 h-6 w-6 flex-none text-pink-600"
                aria-hidden="true"
              />
              <p className="max-w-3xl text-base leading-7 text-gray-700">
                By approving an alteration work order, you confirm the requested work,
                quoted price, and this policy.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {policySections.map((section, index) => {
              const Icon = section.icon;

              return (
                <article
                  id={section.id}
                  key={section.id}
                  className="grid gap-6 py-10 md:grid-cols-[4rem_1fr] md:gap-8 md:py-14"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="mb-5 flex items-baseline gap-3">
                      <span className="font-league-spartan text-sm font-semibold text-pink-600">
                        0{index + 1}
                      </span>
                      <h2 className="font-league-spartan text-2xl font-bold text-gray-950 sm:text-3xl">
                        {section.title}
                      </h2>
                    </div>
                    <div className="max-w-3xl space-y-4 text-base leading-8 text-gray-600">
                      {section.body}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-sm leading-6 text-gray-500">
            This policy does not limit any rights available under applicable law.
          </p>
        </section>

        <section className="bg-gray-100">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <h2 className="font-league-spartan text-2xl font-bold text-gray-950 sm:text-3xl">
                Have a question about your garment?
              </h2>
              <p className="mt-2 text-gray-600">
                Speak with our team before approving your alteration work order.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition-colors hover:border-pink-300 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              >
                Contact us
              </Link>
              <Link
                href="/bookings"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-pink-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              >
                Book an appointment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
