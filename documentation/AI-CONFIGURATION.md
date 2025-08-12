# AI API Configuration

This document outlines the AI API configuration and integration for the Clippit Cover Letter project, focusing on three core AI-powered features.

## Overview

The application integrates with OpenAI's API to provide three primary AI-powered features:

1. **Intelligent Skill Selection**: AI analyzes job requirements and candidate experience to select the most relevant skills
2. **Custom Cover Letter Generation**: AI creates personalized cover letters that match job requirements
3. **Resume Tailoring**: AI customizes resume content to highlight relevant experience for specific positions

## Environment Configuration

### Quick Setup

1. Copy the sample environment file:

```bash
cp .env.sample .env.local
```

2. Edit `.env.local` and replace `sk-your-api-key-here` with your actual OpenAI API key

3. All other variables have sensible defaults and are optional

### Required Environment Variables

```typescript
// src/config/env.ts
export const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4',
  OPENAI_MAX_TOKENS: parseInt(process.env.OPENAI_MAX_TOKENS || '2000', 10),
} as const;

export function validateEnv() {
  const requiredVars = ['OPENAI_API_KEY'] as const;

  for (const varName of requiredVars) {
    if (!env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
}
```

### Environment Files

- `.env.sample`: Sample environment variables (copy this file)
- `.env.local`: Development environment variables (copy from .env.sample)
- Production: Set environment variables in your deployment platform

## AI Configuration System

The application uses a comprehensive AI configuration system located in `src/config/ai.ts` that provides:

- **Environment Variable Parsing**: Secure parsing of all OpenAI-related environment variables
- **Validation**: Comprehensive validation of configuration values
- **Defaults**: Safe default values for all configuration options
- **Security**: API key protection and safe logging practices

### Configuration Options

```typescript
// src/config/ai.ts
export type AIConfig = {
  // API Configuration
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;

  // Rate Limiting
  requestsPerMinute: number;
  requestsPerHour: number;

  // Security
  enableLogging: boolean;
  logLevel: 'none' | 'error' | 'warn' | 'info';

  // Feature Flags
  enableAI: boolean;
  enableStreaming: boolean;
  enableRetry: boolean;
};
```

### Environment Variables

| Variable                     | Default       | Description                |
| ---------------------------- | ------------- | -------------------------- |
| `OPENAI_API_KEY`             | (required)    | Your OpenAI API key        |
| `OPENAI_MODEL`               | `gpt-4o-mini` | AI model to use            |
| `OPENAI_MAX_TOKENS`          | `2000`        | Maximum tokens per request |
| `OPENAI_TEMPERATURE`         | `0.7`         | Creativity level (0.0-2.0) |
| `OPENAI_REQUESTS_PER_MINUTE` | `60`          | Rate limit per minute      |
| `OPENAI_REQUESTS_PER_HOUR`   | `1000`        | Rate limit per hour        |
| `OPENAI_ENABLE_LOGGING`      | `false`       | Enable debug logging       |
| `OPENAI_LOG_LEVEL`           | `error`       | Logging level              |
| `OPENAI_ENABLE_AI`           | `true`        | Enable AI features         |
| `OPENAI_ENABLE_STREAMING`    | `false`       | Enable streaming responses |
| `OPENAI_ENABLE_RETRY`        | `true`        | Enable retry logic         |

## OpenAI Service Integration

### Core Service

```typescript
// src/lib/openai.ts
import { getAIConfig } from '@/config/ai';

export type OpenAIResponse = {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export async function callOpenAI(
  prompt: string,
  systemMessage?: string,
): Promise<OpenAIResponse> {
  const config = getAIConfig();

  if (!config.apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  const messages = [
    ...(systemMessage
      ? [{ role: 'system' as const, content: systemMessage }]
      : []),
    { role: 'user' as const, content: prompt },
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        max_tokens: config.maxTokens,
        temperature: config.temperature,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `OpenAI API error: ${response.status} ${error.error?.message || response.statusText}`,
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from OpenAI API');
    }

    return {
      content,
      usage: data.usage,
    };
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    throw error;
  }
}
```

## Core AI Features

### 1. Custom Cover Letter Generation

AI creates personalized cover letters that match job requirements and highlight relevant experience.

```typescript
export async function generateCoverLetter(
  jobDescription: string,
  companyDetails: string,
  userExperience: string,
): Promise<string> {
  const systemMessage = `You are a professional cover letter writer. Create a compelling, personalized cover letter that:
- Addresses the specific job requirements
- Highlights relevant experience
- Shows enthusiasm for the company
- Is professional yet engaging
- Is between 200-300 words
- Uses a professional tone`;

  const prompt = `Please write a cover letter for the following position:

Job Description:
${jobDescription}

Company Information:
${companyDetails}

My Experience:
${userExperience}

Please write a professional cover letter that connects my experience to this specific role.`;

  const response = await callOpenAI(prompt, systemMessage);
  return response.content;
}
```

**Usage:**

```typescript
const coverLetter = await generateCoverLetter(
  jobDescription,
  companyDetails,
  userExperience
);
```

### 2. Template Enhancement

The application also supports AI-enhanced template processing through the template system, where ERB instructions (`<%=instruction%>`) can be processed by AI to generate dynamic content.

**Example Template with AI Enhancement:**

```
Dear {{Job Manager}},

<%=Write a compelling opening paragraph that connects my experience with {{My Skills}} to the {{Job Title}} position at {{Job Company}}%>

I am writing to express my interest in the {{Job Title}} position at {{Job Company}}.

Best regards,
{{My Name}}
```

### 3. Future AI Features

The following AI features are planned for future implementation:

- **Intelligent Skill Selection**: AI analysis of job requirements to select relevant skills
- **Resume Tailoring**: AI customization of resume content for specific positions
- **Job Description Analysis**: AI analysis of job descriptions to extract key requirements
- **Interview Preparation**: AI-generated interview questions and preparation materials

## AI Workflow Integration

### Complete AI Workflow

```typescript
export async function generateCompleteApplication(
  jobDescription: string,
  companyDetails: string,
  userExperience: string,
) {
  try {
    // Step 1: Generate cover letter
    const coverLetter = await generateCoverLetter(
      jobDescription,
      companyDetails,
      userExperience
    );

    return {
      coverLetter,
    };
  } catch (error) {
    console.error('AI generation failed:', error);
    throw error;
  }
}
```

## Security Considerations

### API Key Management

- **Environment Variables**: Store API keys in environment variables only
- **Client-Side Safety**: Never expose API keys in client-side code
- **Server-Side Validation**: Validate API keys on the server side
- **Key Rotation**: Support API key rotation for security

### Data Privacy

- **Data Minimization**: Only send necessary data to AI services
- **User Consent**: Get user consent for AI processing
- **Data Retention**: Implement appropriate data retention policies
- **Privacy Controls**: Give users control over their data

### Content Safety

- **Content Filtering**: Filter inappropriate or unsafe content
- **User Warnings**: Warn users about AI-generated content
- **Content Review**: Allow users to review and edit AI content
- **Safety Guidelines**: Follow AI safety best practices

## Error Handling

### Graceful Degradation

```typescript
try {
  const result = await generateCompleteApplication(
    jobDescription,
    companyDetails,
    userExperience,
    candidateSkills,
    originalResume,
    jobTitle
  );
  return result;
} catch (error) {
  console.error('AI generation failed:', error);

  // Provide fallback content
  return {
    selectedSkills: candidateSkills.slice(0, 5), // Use first 5 skills
    coverLetter: generateFallbackCoverLetter(),
    tailoredResume: originalResume, // Use original resume
  };
}
```

### Error Types

- **API Errors**: Handle OpenAI API errors gracefully
- **Rate Limiting**: Implement rate limiting and retry logic
- **Network Errors**: Handle network connectivity issues
- **Content Errors**: Handle content generation failures

### User Feedback

- **Loading States**: Show appropriate loading states for AI operations
- **Error Messages**: Provide clear error messages for AI failures
- **Retry Options**: Allow users to retry failed operations
- **Fallback Content**: Provide fallback content when AI fails

## Performance Optimization

### Request Optimization

- **Prompt Engineering**: Optimize prompts for better results
- **Token Management**: Monitor and optimize token usage
- **Caching**: Cache similar requests when appropriate
- **Batch Processing**: Process multiple requests efficiently

### User Experience

- **Loading Indicators**: Show progress for long-running operations
- **Streaming Responses**: Stream responses when possible
- **Background Processing**: Process AI requests in background
- **User Control**: Allow users to cancel operations

## Rate Limiting

### Implementation

```typescript
// Rate limiting implementation
const rateLimiter = {
  requests: new Map(),

  isAllowed: (userId: string) => {
    const now = Date.now();
    const userRequests = rateLimiter.requests.get(userId) || [];

    // Remove requests older than 1 hour
    const recentRequests = userRequests.filter(time => now - time < 3600000);

    if (recentRequests.length >= 10) {
      return false;
    }

    recentRequests.push(now);
    rateLimiter.requests.set(userId, recentRequests);
    return true;
  }
};
```

### Limits

- **Requests per hour**: 10 requests per user per hour
- **Token limits**: Respect OpenAI's token limits
- **Concurrent requests**: Limit concurrent AI requests
- **Timeout handling**: Handle request timeouts gracefully

## Testing

### Mock Responses

```typescript
// Mock OpenAI responses for testing
export const mockOpenAIResponse = {
  content: "This is a mock AI-generated content for testing purposes.",
  usage: {
    prompt_tokens: 100,
    completion_tokens: 200,
    total_tokens: 300,
  },
};

export const mockCallOpenAI = vi.fn().mockResolvedValue(mockOpenAIResponse);
```

### Test Scenarios

- **Successful generation**: Test successful content generation
- **API errors**: Test various API error scenarios
- **Rate limiting**: Test rate limiting behavior
- **Network failures**: Test network failure handling
- **Content validation**: Test content quality and safety

## Monitoring and Analytics

### Usage Tracking

- **Request counts**: Track API request volumes
- **Token usage**: Monitor token consumption
- **Error rates**: Track error rates and types
- **Response times**: Monitor response time performance

### Quality Metrics

- **Content quality**: Assess generated content quality
- **User satisfaction**: Track user satisfaction with AI content
- **Success rates**: Monitor successful generation rates
- **Feedback collection**: Collect user feedback on AI content

## Configuration Options

### Model Selection

- **GPT-4**: Default model for high-quality content
- **GPT-3.5-turbo**: Alternative for faster, cost-effective generation
- **Model switching**: Support switching between models
- **Model comparison**: Compare different model outputs

### Temperature Settings

- **Creative content**: Higher temperature (0.8-1.0)
- **Professional content**: Lower temperature (0.3-0.7)
- **Consistent output**: Very low temperature (0.1-0.3)
- **Dynamic adjustment**: Adjust based on content type

### Token Limits

- **Max tokens**: Configurable maximum token limits
- **Prompt optimization**: Optimize prompts to fit within limits
- **Content truncation**: Handle content that exceeds limits
- **Cost management**: Monitor and manage token costs

## Best Practices

### Prompt Engineering

- **Clear instructions**: Write clear, specific prompts
- **Context provision**: Provide relevant context
- **Format specification**: Specify desired output format
- **Quality criteria**: Define quality criteria in prompts

### Error Prevention

- **Input validation**: Validate all inputs before sending to AI
- **Content sanitization**: Sanitize user inputs
- **Output validation**: Validate AI-generated content
- **Fallback mechanisms**: Provide fallback content

### Security

- **API key protection**: Never expose API keys
- **Request validation**: Validate all requests
- **Output filtering**: Filter inappropriate content
- **Access control**: Implement proper access controls

## Troubleshooting

### Common Issues

- **API key errors**: Check environment variable configuration
- **Rate limiting**: Implement proper rate limiting
- **Network issues**: Handle network connectivity problems
- **Content quality**: Optimize prompts for better quality

### Debugging

- **Request logging**: Log API requests for debugging
- **Error tracking**: Track and analyze errors
- **Performance monitoring**: Monitor response times
- **Usage analytics**: Track usage patterns

## Future Enhancements

### Planned Features

- **Multiple AI providers**: Support multiple AI service providers
- **Advanced prompting**: Implement advanced prompt engineering
- **Content templates**: Create reusable content templates
- **Quality scoring**: Implement content quality scoring

### Scalability

- **Horizontal scaling**: Support horizontal scaling
- **Load balancing**: Implement load balancing for AI requests
- **Caching strategies**: Implement intelligent caching
- **Performance optimization**: Optimize for high-volume usage
