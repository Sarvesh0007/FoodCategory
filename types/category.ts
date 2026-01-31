export interface SuperCategory {
  categoryType: string;
  ctaId: string;
  displayAssetUrl: string;
  rank: number;
  categoryName: string;
  categoryId: string;
  widgetType: string;
}

export interface Category {
  categoryType: string;
  ctaId: string;
  displayAssetUrl: string;
  displayName: string;
  rank: number;
  categoryId: string;
  widgetType: string;
  ctaType?: string;
  pageType?: string;
}

export interface Subcategory {
  id: string;
  imageUrl: string;
  displayText: string;
}

export interface Product {
  fsn: string;
  productRank: number;
  listingId: string;
  name: string;
  displayName: string;
  displayAssetUrl: string;
  firstClubApproved: boolean;
  quantity: string;
  packagingForm: string | null;
  markerImageCallOut?: {
    callOut: string;
  };
  markerTextCallOut?: {
    callOut: string;
  };
  price: {
    mrp: number;
    oneTimePrice: {
      memberPrice: number;
      nonMemberPrice: number;
    };
    subscriptionPrice?: {
      memberPrice?: number;
      nonMemberPrice?: number;
    };
  };
  superCategory: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  subcategory: {
    id: string;
    name: string;
  };
}
