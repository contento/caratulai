import {
  EchoProvider,
  createOllamaProvider,
  createLMStudioProvider,
  createOpenRouterProvider,
  type LLMProvider,
} from "@caratulai/core";

export interface ProviderOptions {
  provider: string;
  model?: string;
  baseUrl?: string;
  modelType?: "text" | "svg" | "image";
}

/**
 * Construct an LLM provider from CLI options. Env is injectable for testing; keys are read here
 * in the surface, never in `@caratulai/core`. See docs/providers.md.
 */
export function buildProvider(
  opts: ProviderOptions,
  env: Record<string, string | undefined> = process.env
): LLMProvider {
  switch (opts.provider) {
    case "echo":
      return new EchoProvider();
    case "ollama":
      return createOllamaProvider({ model: opts.model, baseUrl: opts.baseUrl });
    case "lmstudio":
      return createLMStudioProvider({ model: opts.model, baseUrl: opts.baseUrl });
    case "openrouter": {
      let apiKey = "";
      if (opts.modelType) {
        const keyName = `${opts.modelType.toUpperCase()}_MODEL_API_KEY`;
        apiKey = env[keyName] ?? "";
      }
      if (!apiKey) {
        apiKey = env.OPENROUTER_API_KEY ?? "";
      }
      return createOpenRouterProvider({
        model: opts.model,
        baseUrl: opts.baseUrl,
        apiKey,
        referer: "https://github.com/contento/caratulai",
        title: "caratulai",
      });
    }
    default:
      throw new Error(
        `Unknown provider "${opts.provider}". Use: echo | ollama | lmstudio | openrouter.`
      );
  }
}
