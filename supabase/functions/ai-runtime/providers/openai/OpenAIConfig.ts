/**
 * DREVAIA OS
 * OpenAI Provider Configuration
 */

export interface OpenAIConfig {

  defaultModel: string;

  defaultTemperature: number;

  defaultMaxTokens: number;

}

export const OPENAI_CONFIG: OpenAIConfig = {

  defaultModel: "gpt-5-mini",

  defaultTemperature: 0.7,

  defaultMaxTokens: 4000,

};