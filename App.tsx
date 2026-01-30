import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Onboarding from "@/pages/Onboarding";
import Quiz from "@/pages/Quiz";
import Dashboard from "@/pages/Dashboard";
import Airlock from "@/pages/Airlock";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Onboarding} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/airlock" component={Airlock} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
