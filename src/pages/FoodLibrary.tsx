import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Leaf, 
  Flame, 
  Snowflake, 
  Zap,
  ChefHat,
  AlertTriangle,
  Info,
  ArrowLeft,
  Grid,
  List,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Food data structure based on your new format
interface Food {
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

// Import the existing food library data
import foodLibraryData from '@/data/food_library.json';

const categories = [
  "All Categories",
  "Grains & Cereals",
  "Vegetables - Leafy Greens", 
  "Vegetables - Nightshades", 
  "Fruits - Citrus",
  "Fruits - Astringent",
  "Legumes & Pulses",
  "Dairy Products",
  "Spices - Cooling",
  "Spices - Warming",
  "Nuts & Seeds",
  "Oils & Fats"
];

const doshaColors = {
  vata: "bg-purple-100 text-purple-800",
  pitta: "bg-red-100 text-red-800", 
  kapha: "bg-blue-100 text-blue-800"
};

const getDoshaIcon = (dosha: string) => {
  switch (dosha) {
    case 'vata': return <Zap className="h-4 w-4" />;
    case 'pitta': return <Flame className="h-4 w-4" />;
    case 'kapha': return <Snowflake className="h-4 w-4" />;
    default: return <Leaf className="h-4 w-4" />;
  }
};

const getDoshaEffect = (value: number) => {
  if (value >= 0.7) return { label: "Balancing", color: "text-green-600" };
  if (value >= 0.5) return { label: "Neutral", color: "text-yellow-600" };
  return { label: "Aggravating", color: "text-red-600" };
};

export default function FoodLibrary() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  // Advanced filters
  const [vata, setVata] = useState('');
  const [pitta, setPitta] = useState('');
  const [kapha, setKapha] = useState('');
  const [caloriesMin, setCaloriesMin] = useState('');
  const [caloriesMax, setCaloriesMax] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load food data from JSON file
    const loadFoodData = async () => {
      try {
        setLoading(true);
        // Use the imported JSON data
        setFoods(foodLibraryData as Food[]);
        setFilteredFoods(foodLibraryData as Food[]);
      } catch (error) {
        console.error('Error loading food library data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFoodData();
  }, []);

  // Only search when user presses Enter or clicks Search
  const handleSearch = () => {
    let filtered = foods;

    // Name/category/benefits search
    if (searchTerm) {
      filtered = filtered.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.ayurvedicBenefits.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(food => food.category === selectedCategory);
    }

    // Dosha filters
    if (vata) filtered = filtered.filter(food => food.doshaEffects.vata >= parseFloat(vata));
    if (pitta) filtered = filtered.filter(food => food.doshaEffects.pitta >= parseFloat(pitta));
    if (kapha) filtered = filtered.filter(food => food.doshaEffects.kapha >= parseFloat(kapha));

    // Calories filter
    if (caloriesMin) filtered = filtered.filter(food => food.nutritionalValues.calories >= parseInt(caloriesMin));
    if (caloriesMax) filtered = filtered.filter(food => food.nutritionalValues.calories <= parseInt(caloriesMax));

    setFilteredFoods(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  useEffect(() => {
    filterFoods();
  }, [searchTerm, selectedCategory, foods]);

  const filterFoods = () => {
    let filtered = foods;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.ayurvedicBenefits.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(food => food.category === selectedCategory);
    }

    setFilteredFoods(filtered);
  };

  const FoodCard = ({ food }: { food: Food }) => (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
      onClick={() => setSelectedFood(food)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{food.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              {food.category}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            {food.rasa.map((taste, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {taste}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {/* Dosha Effects */}
          <div>
            <h4 className="text-sm font-medium mb-2">Dosha Effects</h4>
            <div className="flex space-x-2">
              {Object.entries(food.doshaEffects).map(([dosha, value]) => {
                const effect = getDoshaEffect(value);
                return (
                  <div key={dosha} className="flex items-center space-x-1">
                    {getDoshaIcon(dosha)}
                    <span className={`text-xs font-medium ${effect.color}`}>
                      {effect.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Properties */}
          <div>
            <h4 className="text-sm font-medium mb-1">Properties</h4>
            <p className="text-xs text-muted-foreground">
              Virya: {food.virya} • Vipaka: {food.vipaka}
            </p>
          </div>

          {/* Benefits Preview */}
          <div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {food.ayurvedicBenefits}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FoodListItem = ({ food }: { food: Food }) => (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={() => setSelectedFood(food)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-semibold">{food.name}</h3>
              <p className="text-sm text-muted-foreground">{food.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {Object.entries(food.doshaEffects).map(([dosha, value]) => {
                const effect = getDoshaEffect(value);
                return (
                  <Badge key={dosha} className={cn("text-xs", doshaColors[dosha as keyof typeof doshaColors])}>
                    {dosha.charAt(0).toUpperCase() + dosha.slice(1)}: {effect.label}
                  </Badge>
                );
              })}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {food.nutritionalValues.calories} cal
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (selectedFood) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedFood(null)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Library</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold font-['Playfair_Display']">{selectedFood.name}</h1>
              <p className="text-muted-foreground">{selectedFood.category}</p>
            </div>
          </div>
        </div>

        {/* Detailed Food Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Properties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-green-500" />
                <span>Ayurvedic Properties</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Rasa (Taste)</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedFood.rasa.map((taste, index) => (
                    <Badge key={index} variant="secondary">{taste}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Virya (Energy)</h4>
                <Badge className={selectedFood.virya === 'Heating' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                  {selectedFood.virya}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Vipaka (Post-digestive)</h4>
                <Badge variant="outline">{selectedFood.vipaka}</Badge>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Gunas (Qualities)</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedFood.gunas.map((guna, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{guna}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dosha Effects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Dosha Effects</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(selectedFood.doshaEffects).map(([dosha, value]) => {
                const effect = getDoshaEffect(value);
                return (
                  <div key={dosha} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getDoshaIcon(dosha)}
                        <span className="font-medium capitalize">{dosha}</span>
                      </div>
                      <span className={`font-semibold ${effect.color}`}>
                        {effect.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          value >= 0.7 ? 'bg-green-500' : 
                          value >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${value * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Compatibility: {Math.round(value * 100)}%
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Nutritional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ChefHat className="h-5 w-5 text-blue-500" />
                <span>Nutritional Values</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Calories:</span>
                <span className="font-semibold">{selectedFood.nutritionalValues.calories}</span>
              </div>
              <div className="flex justify-between">
                <span>Protein:</span>
                <span className="font-semibold">{selectedFood.nutritionalValues.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span>Carbs:</span>
                <span className="font-semibold">{selectedFood.nutritionalValues.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span>Fiber:</span>
                <span className="font-semibold">{selectedFood.nutritionalValues.fiber}g</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits and Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-green-500" />
                <span>Ayurvedic Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{selectedFood.ayurvedicBenefits}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ChefHat className="h-5 w-5 text-blue-500" />
                <span>Preparation Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{selectedFood.preparationTips}</p>
            </CardContent>
          </Card>
        </div>

        {/* Contraindications */}
        {selectedFood.contraindications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Contraindications & Precautions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {selectedFood.contraindications.map((contraindication, index) => (
                  <li key={index} className="text-sm flex items-start space-x-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{contraindication}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display'] flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <span>Food Library</span>
          </h1>
          <p className="text-muted-foreground">
            Complete Ayurvedic food database for informed dietary planning
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            ref={searchInputRef}
            placeholder="Search foods, benefits, or properties..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        {/* Advanced filters */}
        <div className="flex items-center space-x-2">
          <Input type="number" min="0" max="1" step="0.1" value={vata} onChange={e => setVata(e.target.value)} placeholder="Vata ≥" className="w-20" onKeyDown={handleKeyDown} />
          <Input type="number" min="0" max="1" step="0.1" value={pitta} onChange={e => setPitta(e.target.value)} placeholder="Pitta ≥" className="w-20" onKeyDown={handleKeyDown} />
          <Input type="number" min="0" max="1" step="0.1" value={kapha} onChange={e => setKapha(e.target.value)} placeholder="Kapha ≥" className="w-20" onKeyDown={handleKeyDown} />
          <Input type="number" min="0" value={caloriesMin} onChange={e => setCaloriesMin(e.target.value)} placeholder="Min Cal" className="w-20" onKeyDown={handleKeyDown} />
          <Input type="number" min="0" value={caloriesMax} onChange={e => setCaloriesMax(e.target.value)} placeholder="Max Cal" className="w-20" onKeyDown={handleKeyDown} />
        </div>
        <Button onClick={handleSearch} className="h-10">Search</Button>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredFoods.length} of {foods.length} foods
        </p>
      </div>

      {/* Food Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFoods.map(food => (
            <FoodListItem key={food.id} food={food} />
          ))}
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Loading Food Library...</h3>
          <p className="text-gray-500">Please wait while we load the food database</p>
        </div>
      )}

      {!loading && filteredFoods.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No foods found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}