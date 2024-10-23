import { ScanModel } from "./product.model";

export interface PricingRule {
    condition(item: ScanModel): boolean;
    action(items: ScanModel[]): number;
}