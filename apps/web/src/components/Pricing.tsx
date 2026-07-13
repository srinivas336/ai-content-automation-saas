import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0/month",
    features: [
      "Basic AI content generation",
      "Limited projects",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "₹1/month",
    features: [
      "Advanced AI generation",
      "Unlimited projects",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Team collaboration",
      "Custom workflows",
      "Dedicated support",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold">
          Simple Pricing
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-xl border border-slate-700 bg-slate-900 p-6"
            >
              <h3 className="text-2xl font-semibold">
                {plan.name}
              </h3>

              <p className="mt-3 text-3xl font-bold">
                {plan.price}
              </p>

              <ul className="mt-6 space-y-3 text-slate-400">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>

              <Button className="mt-8 w-full">
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}