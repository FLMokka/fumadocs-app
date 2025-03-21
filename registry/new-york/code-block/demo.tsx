"use client";

import { CodeBlock } from "@/registry/new-york/code-block/components/code-block";
import { useTheme } from "next-themes";

export default function CodeBlockDemo() {
  const { theme } = useTheme();
  return (
    <CodeBlock
      code={useGoogleAuthCode}
      title="useGoogleAuth"
      colorScheme={theme === "dark" ? "dark" : "light"}
    />
  );
}

// Code example
const useGoogleAuthCode = `import * as QueryParams from "expo-auth-session/build/QueryParams";`

// Code example
const useGoogleAuthCode2 = `import * as QueryParams from "expo-auth-session/build/QueryParams";

import { useState } from "react";

import logError from "@/lib/logError";
import { supabase } from "@/lib/supabase";

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

type GoogleAuthError = {
  code: string;
  message: string;
};

type GoogleAuthState = {
  isLoading: boolean;
  error: GoogleAuthError | null;
};

export default function useGoogleAuth() {
  const [state, setState] = useState<GoogleAuthState>({
    isLoading: false,
    error: null,
  });

  const createSessionFromUrl = async (url: string) => {
    try {
      const { params, errorCode } = QueryParams.getQueryParams(url);

      if (errorCode) return { error: "An error occurred" };

      const { access_token, refresh_token } = params;
      if (!access_token) return { error: "Something went wrong" };

      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) return { error };
      return { session: data.session };
    } catch (error) {
      logError("createSessionFromUrl", error);
      return { error: "Session creation failed" };
    }
  };

  const performOAuth = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: Linking.createURL("/"),
          skipBrowserRedirect: true,
          queryParams: {
            prompt: "select_account",
          },
        },
      });

      if (error) return { error: "An error occurred" };
      if (!data?.url) return { error: "Something went wrong" };

      const response = await WebBrowser.openAuthSessionAsync(
        data.url,
        Linking.createURL("/")
      );

      if (response.type === "success" && response.url) {
        await createSessionFromUrl(response.url);
      }
      return { error: "Authentication canceled or failed" };
    } catch (error) {
      logError("performOAuth", error);
      return { error: "Authentication failed" };
    }
  };

  const handleGoogleAuth = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    const { error } = await performOAuth();
    if (error) return setState(prev => ({ 
      ...prev, isLoading: false, error: { code: "AUTH_ERROR", message: error } 
    }));
    else return setState(prev => ({ ...prev, isLoading: false }));
  };

  return {
    handleGoogleAuth,
    isLoading: state.isLoading,
    error: state.error,
  };
}
`;