import BillingHeader from "./BillingHeader";
import PaymentMethods from "./PaymentMethods";
import PricingTiers from "./PricingTiers";
import TaxFeeSettings from "./TaxFeeSettings";
import DiscountRules from "./DiscountRules";

export default function BillingMain() {
  return (
    <div className="space-y-5">
      <BillingHeader />
      <PaymentMethods />

      {/* Pricing + Tax side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PricingTiers />
        <TaxFeeSettings />
      </div>

      <DiscountRules />
    </div>
  );
}
