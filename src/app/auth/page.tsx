'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Heart, Sparkles } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
  });

  const { login, register, isLoading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (isLogin) {
      await login(formData.email, formData.password);
    } else {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* MIA AI Branding */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="relative">
              <Heart className="h-8 w-8 text-pink-500 fill-current" />
              <Sparkles className="h-4 w-4 text-purple-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              MIA AI
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Your personal AI chat companion
          </p>
        </div>

        <Card className="border-pink-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-gray-800 dark:text-white">
              {isLogin ? 'Welcome Back!' : 'Join MIA AI'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? 'Sign in to continue chatting with MIA' 
                : 'Create your account to start chatting with MIA'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50 text-red-800">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className="border-pink-200 focus:border-pink-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required={!isLogin}
                        className="border-pink-200 focus:border-pink-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Birth Date</Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="border-pink-200 focus:border-pink-400"
                      max={new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    />
                    {!isLogin && (
                      <p className="text-xs text-gray-500">You must be 18 or older to use MIA AI</p>
                    )}
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border-pink-200 focus:border-pink-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={8}
                  className="border-pink-200 focus:border-pink-400"
                />
                {!isLogin && (
                  <p className="text-xs text-gray-500">Minimum 8 characters</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  clearError();
                  setFormData({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                  });
                }}
                className="text-sm text-pink-600 hover:text-pink-700 underline"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Sign in'
                }
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>By using MIA AI, you agree to our terms of service and privacy policy.</p>
        </div>
      </div>
    </div>
  );
}