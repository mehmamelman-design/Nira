// Temporary category visibility control
// When the user asks to reactivate these categories, simply set HIDE_TEMPORARY_CATEGORIES to false or empty the array.
export const HIDE_TEMPORARY_CATEGORIES = true;

export const TEMPORARILY_HIDDEN_CATEGORY_IDS = [
  'kabablar',
  'kabab',
  'sorbalar',
  'isti_yemekler'
] as const;

export function isCategoryTemporarilyHidden(categoryId?: string | null): boolean {
  if (!HIDE_TEMPORARY_CATEGORIES || !categoryId) return false;
  const cleanId = categoryId.trim().toLowerCase();
  return TEMPORARILY_HIDDEN_CATEGORY_IDS.some(hiddenId => cleanId === hiddenId || cleanId.startsWith(hiddenId));
}

export function isItemInHiddenCategory(item: { category?: string }): boolean {
  if (!HIDE_TEMPORARY_CATEGORIES || !item?.category) return false;
  return isCategoryTemporarilyHidden(item.category);
}
