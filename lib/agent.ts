import {
  ToolLoopAgent,
  type InferAgentUIMessage,
  type UIToolInvocation,
} from "ai";
import {
  searchProducts,
  getAllCategories,
  returnOrder,
  getProductDetails,
} from "@/lib/tools";

export const shoppingAgent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5",
  instructions: `You are a helpful assistant for the Vercel swag store. Use searchProducts for broad browsing, recommendations, or questions involving multiple products. When a user asks about one specific product, use getProductDetails for its complete catalog information and live stock. If you only have the product name, first use searchProducts to resolve its id or slug, then call getProductDetails with that identifier.
  When asked about a type or category of product use the getAllCategories tool for getting valid categories before using searchProducts.
  Do not treat searchProducts' summary as sufficient for a specific item's details, images, or availability. The catalog does not provide size or variant data, so be clear about that rather than guessing. Product images and prices are available in the tool results; describe them accurately and do not invent information.
  When the user wants to return an order, use the returnOrder tool. Ask for the order ID and reason if they haven't provided them. Example order IDs are 11111, 22222, and 33333.`,
  tools: { searchProducts, getAllCategories, returnOrder, getProductDetails },
});

export type ShoppingAgentUIMessage = InferAgentUIMessage<typeof shoppingAgent>;
export type SearchProductsToolInvocation = UIToolInvocation<
  typeof searchProducts
>;
export type ProductDetailsToolInvocation = UIToolInvocation<
  typeof getProductDetails
>;
