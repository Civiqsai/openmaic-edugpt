/**
 * Azure OpenAI Image Generation Adapter
 *
 * Uses OpenAI-compatible /images/generations endpoint on Azure.
 * Endpoint: https://{resource}.cognitiveservices.azure.com/openai/deployments/{deployment}/images/generations
 *
 * Supported models:
 * - gpt-image-1.5 (Azure GPT-Image)
 *
 * Authentication: api-key header (Azure style)
 */

import type {
  ImageGenerationConfig,
  ImageGenerationOptions,
  ImageGenerationResult,
} from '../types';

const DEFAULT_MODEL = 'gpt-image-1.5';

export async function testAzureImageConnectivity(
  config: ImageGenerationConfig,
): Promise<{ success: boolean; message: string }> {
  if (!config.baseUrl) {
    return { success: false, message: 'Azure Image base URL is required' };
  }
  try {
    const url = `${config.baseUrl.replace(/\/+$/, '')}/images/generations?api-version=2025-04-01-preview`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': config.apiKey,
      },
      body: JSON.stringify({
        model: config.model || DEFAULT_MODEL,
        prompt: 'test',
        n: 1,
        size: '1024x1024',
      }),
    });
    if (response.status === 401 || response.status === 403) {
      return { success: false, message: `Azure Image auth failed (${response.status})` };
    }
    return { success: true, message: 'Connected to Azure Image' };
  } catch (err) {
    return { success: false, message: `Azure Image connectivity error: ${err}` };
  }
}

export async function generateWithAzureImage(
  config: ImageGenerationConfig,
  options: ImageGenerationOptions,
): Promise<ImageGenerationResult> {
  if (!config.baseUrl) {
    throw new Error('Azure Image base URL is required');
  }

  const baseUrl = config.baseUrl.replace(/\/+$/, '');
  const url = `${baseUrl}/images/generations?api-version=2025-04-01-preview`;

  // Map aspect ratio to size string
  const sizeMap: Record<string, string> = {
    '16:9': '1792x1024',
    '4:3': '1024x768',
    '1:1': '1024x1024',
    '9:16': '1024x1792',
  };
  const size = sizeMap[options.aspectRatio || '16:9'] || '1024x1024';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': config.apiKey,
    },
    body: JSON.stringify({
      model: config.model || DEFAULT_MODEL,
      prompt: options.prompt,
      n: 1,
      size,
      response_format: 'b64_json',
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Azure image generation failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  const imageData = data.data?.[0];
  if (!imageData) {
    throw new Error('Azure returned empty image response');
  }

  const [w, h] = size.split('x').map(Number);

  return {
    url: imageData.url,
    base64: imageData.b64_json,
    width: w,
    height: h,
  };
}
