// Import the existing food library JSON data
import foodLibraryJson from '@/data/food_library.json';

// Food Library Service - manages food data and provides helper functions
interface FoodItem {
  id: number;
  name: string;
  category: string;
  doshaEffects: { vata: number; pitta: number; kapha: number };
  rasa: string[];
  virya: string;
  vipaka: string;
  gunas: string[];
  nutritionalValues: { calories: number; protein: number; carbs: number; fiber: number };
  ayurvedicBenefits: string;
  contraindications: string[];
  preparationTips: string;
}

class FoodLibraryService {
  private foods: FoodItem[] = foodLibraryJson as FoodItem[];

  // Get all foods
  getAllFoods(): FoodItem[] {
    return this.foods;
  }

  // Get foods by category
  getFoodsByCategory(category: string): FoodItem[] {
    return this.foods.filter(food => food.category === category);
  }

  // Get foods suitable for a dosha (compatibility >= threshold)
  getFoodsForDosha(dosha: 'vata' | 'pitta' | 'kapha', threshold: number = 0.7): FoodItem[] {
    return this.foods.filter(food => food.doshaEffects[dosha] >= threshold);
  }

  // Filter foods based on dietary preferences
  filterByPreferences(foods: FoodItem[], preferences: any): FoodItem[] {
    let filtered = [...foods];

    // Filter by allergies
    if (preferences.allergies?.includes('Dairy')) {
      filtered = filtered.filter(f => f.category !== 'Dairy Products');
    }
    if (preferences.allergies?.includes('Nuts')) {
      filtered = filtered.filter(f => f.category !== 'Nuts & Seeds');
    }
    if (preferences.allergies?.includes('Gluten')) {
      filtered = filtered.filter(f => f.name !== 'Wheat');
    }

    // Filter by dietary preferences
    if (preferences.dietaryType?.includes('Vegetarian')) {
      // Already vegetarian by default in Ayurveda
    }
    if (preferences.dietaryType?.includes('Vegan')) {
      filtered = filtered.filter(f => f.category !== 'Dairy Products');
    }
    if (preferences.dietaryType?.includes('No Onion/Garlic')) {
      filtered = filtered.filter(f => !['Onion', 'Garlic'].includes(f.name));
    }

    // Filter by dislikes
    if (preferences.dislikes?.length > 0) {
      filtered = filtered.filter(f => 
        !preferences.dislikes.some((dislike: string) => 
          f.name.toLowerCase().includes(dislike.toLowerCase())
        )
      );
    }

    return filtered;
  }

  // Get random selection from foods array
  getRandomSelection(foods: FoodItem[], count: number = 1): FoodItem[] {
    if (foods.length === 0) return [];
    const shuffled = [...foods].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Get recommended spices for dosha
  getRecommendedSpices(dosha: string): string[] {
    const doshaSpices = {
      vata: ['Ginger', 'Cinnamon', 'Cardamom', 'Cumin'],
      pitta: ['Coriander', 'Fennel', 'Mint', 'Cumin'],
      kapha: ['Black Pepper', 'Ginger', 'Turmeric', 'Mustard Seeds']
    };
    return doshaSpices[dosha as keyof typeof doshaSpices] || [];
  }
}

// Export singleton instance
export const foodLibraryService = new FoodLibraryService();

// Export the interface and class for type checking
export type { FoodItem };
export { FoodLibraryService };