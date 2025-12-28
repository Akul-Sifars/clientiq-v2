/**
 * FILE OVERVIEW:
 *   Purpose: PWA update notification component
 *   Key Concepts: Service Worker updates, User notifications
 *   Module Type: Component
 *   @ai_context: Shows update prompt when new service worker version is available
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRegisterSW } from "virtual:pwa-register/react";

export function PWAUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      console.log("Service worker registered:", registration);
    },
    onRegisterError(error) {
      console.error("Service worker registration error:", error);
    },
    onNeedRefresh() {
      console.log("Service worker needs refresh");
    },
    onOfflineReady() {
      console.log("App ready to work offline");
    },
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateServiceWorker(true);
    } catch (error) {
      console.error("Failed to update service worker:", error);
      setIsUpdating(false);
    }
  };

  const handleSkip = () => {
    setNeedRefresh(false);
  };

  if (!needRefresh) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Update Available</CardTitle>
          <CardDescription>
            A new version of ClientIQ is available. Would you like to update
            now?
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2">
          <Button onClick={handleUpdate} disabled={isUpdating} size="sm">
            {isUpdating ? "Updating..." : "Update Now"}
          </Button>
          <Button
            onClick={handleSkip}
            variant="outline"
            size="sm"
            disabled={isUpdating}
          >
            Later
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
