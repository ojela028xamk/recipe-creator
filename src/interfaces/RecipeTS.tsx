export interface RecipeTS {
  id: string;
  title: string;
  servingSize: string;
  ingredients: { amount: string; ingredient: string }[];
  instructions: string[];
}
