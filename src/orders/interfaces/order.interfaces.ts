export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    product: Product;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
  }