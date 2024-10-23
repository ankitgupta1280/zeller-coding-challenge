export class ProductModel {
    constructor(public sku: string, public name: string, public price: number){}
}

export interface ScanModel {
    product: ProductModel,
    quantity: number,
    scanned?: boolean,
}