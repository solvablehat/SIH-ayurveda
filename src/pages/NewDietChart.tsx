import { useNavigate, useParams } from "react-router-dom";
import { TopAppBar } from "@/components/ui/navigation";
import { 
  FileText,
  PenTool,
  Sparkles,
  Clock
} from "lucide-react";

export default function NewDietChart() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const options = [
    {
      id: 'template',
      icon: FileText,
      title: 'Select Template',
      description: 'Choose from pre-designed Ayurvedic diet templates',
      benefits: ['Quick setup', 'Proven combinations', 'Customizable'],
      action: () => navigate(`/patients/${patientId}/diet-chart/templates`)
    },
    {
      id: 'scratch',
      icon: PenTool,
      title: 'Start from Scratch',
      description: 'Create a completely personalized diet plan',
      benefits: ['Full customization', 'Dosha-based generation', 'Ingredient flexibility'],
      action: () => navigate(`/patients/${patientId}/diet-chart/generator`)
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopAppBar 
        title="New Diet Chart"
        showBack
        onBack={() => navigate(`/patients/${patientId}`)}
      />
      
      <div className="p-6">
        <div className="text-center mb-8">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">
            Choose Your Approach
          </h2>
          <p className="text-muted-foreground font-poppins">
            How would you like to create the diet chart?
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          {options.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.id}
                onClick={option.action}
                className="w-full bg-card border border-border rounded-xl p-6 hover:shadow-elevated hover:scale-[1.02] transition-all duration-200 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <IconComponent className="h-6 w-6 text-primary-foreground" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-playfair font-semibold text-foreground mb-2">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground font-poppins text-sm mb-4">
                      {option.description}
                    </p>
                    
                    <div className="space-y-1">
                      {option.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-xs font-poppins text-muted-foreground">
                            {benefit}
                          </span>  
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-gradient-wellness rounded-lg border border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-poppins font-medium text-foreground">
              Estimated Time
            </span>
          </div>
          <div className="text-sm text-muted-foreground font-poppins">
            <p>• Template selection: 5-10 minutes</p>
            <p>• Custom creation: 15-20 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}