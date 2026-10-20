import React from 'react';
import { Check } from 'lucide-react';

export default function PricingSection({ packages = [], onSelectPackage }) {
  return (
    <section id="pricing" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-2">
          Memberships & Passes
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1C1917] tracking-tight">
          Simple, Transparent Pricing
        </h2>
        <p className="text-sm text-[#78716C] mt-2 max-w-md mx-auto">
          No hidden admission costs or lock-in contracts. Choose the plan that fits your rhythm.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 ${
              pkg.isPopular
                ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-md'
                : 'bg-white text-[#1C1917] border-[#E7E5E0] hover:border-[#D6D3CD] shadow-xs'
            }`}
          >
            <div>
              {/* Badge */}
              <span
                className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full block w-fit mb-4 ${
                  pkg.isPopular
                    ? 'bg-rose-500 text-white'
                    : 'bg-[#F5F3EF] text-[#57534E]'
                }`}
              >
                {pkg.badge}
              </span>

              <h3 className={`font-display font-medium text-lg mb-2 ${pkg.isPopular ? 'text-white' : 'text-[#1C1917]'}`}>
                {pkg.name}
              </h3>

              <div className="mb-5">
                <span className="font-display font-semibold text-3xl">
                  ₹{pkg.price.toLocaleString('en-IN')}
                </span>
                <span className={`text-[11px] block mt-1 ${pkg.isPopular ? 'text-stone-400' : 'text-[#78716C]'}`}>
                  {pkg.validity}
                </span>
              </div>

              {/* Features List */}
              <ul className={`space-y-2.5 mb-8 border-t pt-4 ${pkg.isPopular ? 'border-stone-800' : 'border-[#F0EEE9]'}`}>
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs">
                    <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${pkg.isPopular ? 'text-rose-400' : 'text-[#9F1239]'}`} />
                    <span className={pkg.isPopular ? 'text-stone-300' : 'text-[#57534E]'}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onSelectPackage(pkg)}
              className={`w-full py-2.5 rounded-full font-medium text-xs tracking-wide transition-all cursor-pointer ${
                pkg.isPopular
                  ? 'bg-white text-[#1C1917] hover:bg-stone-200'
                  : 'bg-[#1C1917] text-white hover:bg-[#292524]'
              }`}
            >
              {pkg.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
