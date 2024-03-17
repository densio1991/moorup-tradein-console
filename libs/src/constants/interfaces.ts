/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PromotionDetailsInterface {
  platform: string
  name: string
  description: string
  start_date: string
  end_date: string
  status: string
  image_url: string
  eligibility: PromotionEligibilityInterface
  steps: PromotionStepsInterface[]
  claims: PromotionClaimsInterface
  conditions: PromotionConditions
}

export interface PromotionEligibilityInterface {
  title: string
  faq: FaqInterface[]
}

export interface FaqInterface {
  title: string
  content: any
}

export interface PromotionStepsInterface {
  order: number
  title: string
  description: string
}

export interface PromotionClaimsInterface {
  title: string
  description: string
  disclaimer: string
  products: PromotionProductInterface[]
}

export interface PromotionProductInterface {
  product_id: string
  product_name: string
  amount: number
  currency: string
}

export interface PromotionConditions {
  title: string
  items: PromotionConditionItemInterface[]
}

export interface PromotionConditionItemInterface {
  order: number
  description: string
}

export interface PlatformType {
  [key: string]: any;
}
