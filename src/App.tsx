import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { WebsiteLayout } from "@/components/ui/website-layout";
import { ProtectedRoute, PublicRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientList from "./pages/PatientList";
import PatientProfile from "@/pages/PatientProfile";
import NewDietChart from "./pages/NewDietChart";
import DietPlanGenerator from "./pages/DietPlanGenerator";
import ComplianceTracking from "./pages/ComplianceTracking";
import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";
import NewAppointment from "./pages/NewAppointment";
import NotFound from "./pages/NotFound";
// New Core 6 Screens
import DoshaAssessment from './pages/DoshaAssessment';
import FoodLibrary from './pages/FoodLibrary';
import AyurBotPage from './pages/AyurBotPage';

// ...existing imports...
import DietPlanGeneratorNew from "./pages/DietPlanGeneratorNew";
import GeneratedDietChart from "./pages/GeneratedDietChart";

import AddPatient from "./pages/AddPatient";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="Vitarva-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/*" element={
              <ProtectedRoute>
                <WebsiteLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/patients" element={<PatientList />} />
                    <Route path="/patients/:id" element={<PatientProfile />} />
                    <Route path="/patients/:patientId/diet-chart/new" element={<NewDietChart />} />
                    {/* <Route path="/patients/:patientId/diet-chart/generator" element={<DietPlanGenerator />} /> */}
                    <Route path="/compliance" element={<ComplianceTracking />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/appointments/new" element={<NewAppointment />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/patients/add" element={<AddPatient />} />

                    {/* NEW CORE 6 SCREENS ROUTES */}
                    <Route path="/assessment/:patientId" element={<DoshaAssessment />} />
                    <Route path="/assessment" element={<DoshaAssessment />} />
                    <Route path="/diet-plan/generator" element={<DietPlanGeneratorNew />} />
                    <Route path="/diet-chart/:patientId/generated" element={<GeneratedDietChart />} />
                    <Route path="/patients/:id/dosha-assessment" element={<DoshaAssessment />} />
                    <Route path="/food-library" element={<FoodLibrary />} />
                    <Route path="/ayurbot" element={<AyurBotPage />} />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </WebsiteLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
