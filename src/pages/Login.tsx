import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Shield, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "doctor@ayurpractice.com",
    password: "demo123"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication - always succeeds
    localStorage.setItem('ayur-token', 'demo-user');
    localStorage.setItem('ayur-user', JSON.stringify({
      id: 1,
      name: "Dr. Sneha Patel",
      email: credentials.email,
      role: "Ayurvedic Dietitian"
    }));
    
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Leaf className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary font-['Playfair_Display']">
            AyurPractice
          </h1>
          <p className="text-muted-foreground mt-2 font-['Poppins']">
            Digital Ayurvedic Diet Management
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center font-['Playfair_Display']">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center font-['Poppins']">
              Sign in to your practitioner account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-['Poppins'] font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  className="font-['Poppins'] h-11"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="font-['Poppins'] font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    className="font-['Poppins'] h-11 pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 font-['Poppins'] font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Sign In Securely</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Credentials Helper */}
            <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-800 font-['Poppins'] font-medium mb-1">
                Demo Credentials:
              </p>
              <p className="text-xs text-green-700 font-['Poppins']">
                Email: doctor@ayurpractice.com<br />
                Password: demo123
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground font-['Poppins']">
                Your data is protected with bank-grade encryption
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground font-['Poppins']">
            Preserving traditional wisdom with modern technology
          </p>
        </div>
      </div>
    </div>
  );
}
