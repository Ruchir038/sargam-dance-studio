import React from 'react';
import { Check } from 'lucide-react';

export default function PricingSection({ packages = [], onSelectPackage }) {
  return (
    <section id="pricing" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
          MEMBERSHIPS & PACKAGES
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Transparent Pricing
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
          No hidden admission costs. Flexible plans from single drop-ins to monthly passes.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-200 ${
              pkg.isPopular
                ? 'bg-[#181526] border-rose-500 shadow-xl shadow-rose-950/30'
                : 'bg-[#13111C] border-white/10 hover:border-white/20'
            }`}
          >
            <div>
              {/* Badge */}
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium block w-fit mb-3 ${
                  pkg.isPopular
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/5 text-slate-300 border border-white/10'
                }`}
              >
                {pkg.badge}
              </span>

              <h3 className="font-display font-bold text-base text-white mb-1.5">
                {pkg.name}
              </h3>

              <div className="mb-4">
                <span className="font-display font-bold text-2xl text-white">
                  ₹{pkg.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{pkg.validity}</span>
              </div>

              {/* Features List */}
              <ul className="space-y-2 mb-6 border-t border-white/5 pt-3.5">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onSelectPackage(pkg)}
              className={`w-full py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all cursor-pointer ${
                pkg.isPopular
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200'
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
