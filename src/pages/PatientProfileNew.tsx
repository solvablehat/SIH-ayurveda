import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Activity, 
  Pill, 
  FileText,
  Plus,
  TrendingUp,
  User
} from "lucide-react";
import { demoPatients } from "@/data/patients";

// Dosha Profile Component
function DoshaProfile({ vata, pitta, kapha }: { vata: number; pitta: number; kapha: number }) {
  const getPrimaryDosha = () => {
    if (vata >= pitta && vata >= kapha) return "Vata";
    if (pitta >= vata && pitta >= kapha) return "Pitta";
    return "Kapha";
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm text-muted-foreground">Dosha Constitution</h4>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Vata</span>
          <span className="text-sm text-muted-foreground">{vata}%</span>
        </div>
        <Progress value={vata} className="h-2" />
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Pitta</span>
          <span className="text-sm text-muted-foreground">{pitta}%</span>
        </div>
        <Progress value={pitta} className="h-2" />
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Kapha</span>
          <span className="text-sm text-muted-foreground">{kapha}%</span>
        </div>
        <Progress value={kapha} className="h-2" />
      </div>
      <div className="pt-2">
        <Badge variant="secondary" className="font-medium">
          Primary: {getPrimaryDosha()}
        </Badge>
      </div>
    </div>
  );
}

// Medical History Card
function MedicalHistoryCard({ conditions }: { conditions: string[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Activity className="h-5 w-5 text-red-500" />
          <span>Current Conditions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {conditions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {conditions.map((condition, index) => (
              <Badge key={index} variant="destructive" className="text-sm">
                {condition}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No current conditions recorded</p>
        )}
      </CardContent>
    </Card>
  );
}

// Current Medications Card
function CurrentMedicationsCard({ medications }: { medications: string[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Pill className="h-5 w-5 text-blue-500" />
          <span>Current Medications</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {medications.length > 0 ? (
          <div className="space-y-2">
            {medications.map((medication, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md">
                <Pill className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{medication}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No current medications</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = demoPatients.find(p => p.id === parseInt(id || "0"));

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Patient Not Found</h3>
          <p className="text-muted-foreground mb-4">The requested patient could not be found.</p>
          <Button onClick={() => navigate('/patients')}>
            Back to Patient List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={patient.photo} alt={patient.name} />
              <AvatarFallback className="text-lg">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold font-['Playfair_Display']">{patient.name}</h1>
                <p className="text-lg text-muted-foreground">{patient.age} years • {patient.gender}</p>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.address}</span>
                </div>
              </div>

              {/* Visit Information */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span>Compliance: {patient.compliance}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dosha Profile */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Ayurvedic Constitution</CardTitle>
          </CardHeader>
          <CardContent>
            <DoshaProfile 
              vata={patient.dosha.vata} 
              pitta={patient.dosha.pitta} 
              kapha={patient.dosha.kapha} 
            />
          </CardContent>
        </Card>

        {/* Medical History */}
        <MedicalHistoryCard conditions={patient.conditions} />

        {/* Current Medications */}
        <CurrentMedicationsCard medications={patient.medications} />
      </div>

      {/* Compliance and Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Treatment Compliance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Overall Compliance</span>
                <span className="text-2xl font-bold text-green-600">{patient.compliance}%</span>
              </div>
              <Progress value={patient.compliance} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {patient.compliance >= 80 
                  ? "Excellent compliance! Keep up the good work." 
                  : patient.compliance >= 60 
                  ? "Good compliance, room for improvement." 
                  : "Needs attention and follow-up."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notes Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span>Clinical Notes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {patient.notes}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button 
          onClick={() => navigate(`/assessment/${patient.id}`)}
          className="flex items-center space-x-2"
        >
          <Activity className="h-4 w-4" />
          <span>New Dosha Assessment</span>
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => navigate(`/patients/${patient.id}/diet-chart/generator`)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Generate Diet Plan</span>
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => navigate('/appointments/new', { state: { patientId: patient.id } })}
          className="flex items-center space-x-2"
        >
          <Calendar className="h-4 w-4" />
          <span>Schedule Appointment</span>
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => navigate(`/compliance/${patient.id}`)}
          className="flex items-center space-x-2"
        >
          <TrendingUp className="h-4 w-4" />
          <span>View Compliance Details</span>
        </Button>
      </div>
    </div>
  );
}
