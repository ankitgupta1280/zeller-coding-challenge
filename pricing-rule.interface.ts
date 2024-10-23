import { ScanModel } from "./product.model";

export interface PricingRule {
    condition(items: ScanModel): boolean;
    action(items: ScanModel[]): number;
}