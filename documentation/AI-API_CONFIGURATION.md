# AI API Configuration

This document outlines the AI API configuration and integration for the Clippit Cover Letter project, focusing on three core AI-powered features.

## Overview

The application integrates with OpenAI's API to provide three primary AI-powered features:

1. **Intelligent Skill Selection**: AI analyzes job requirements and candidate experience to select the most relevant skills
2. **Custom Cover Letter Generation**: AI creates personalized cover letters that match job requirements
3. **Resume Tailoring**: AI customizes resume content to highlight relevant experience for specific positions

## Environment Configuration

### Required Environment Variables

```typescript
// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_MODEL: z.string().default('gpt-4'),
  OPENAI_MAX_TOKENS: z.string().transform(Number).default('1000'),
});

export const env = envSchema.parse(process.env);
```

### Environment Files

- `.env.local`: Development environment variables
- `.env.test`: Testing environment variables
- `.env.production`: Production environment variables (set in deployment)

## OpenAI Service Integration

### Core Service

```typescript
// src/lib/openai.ts
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
  if (!env.OPENAI_API_KEY) {
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
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL,
        messages,
        max_tokens: env.OPENAI_MAX_TOKENS,
        temperature: 0.7,
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

### 1. Intelligent Skill Selection

AI analyzes job requirements and candidate skills to select the most relevant skills for a specific position.

```typescript
export async function selectRelevantSkills(
  jobDescription: string,
  candidateSkills: string[],
  jobTitle: string,
): Promise<string[]> {
  const systemMessage = `You are an expert at matching candidate skills to job requirements.
Analyze the job description and select the most relevant skills from the candidate's skill list.
Return only the skill names that are most relevant to this specific position.`;

  const prompt = `Job Title: ${jobTitle}

Job Description:
${jobDescription}

Available Skills:
${candidateSkills.join(', ')}

Please select the 5-8 most relevant skills for this position. Return only the skill names, separated by commas.`;

  const response = await callOpenAI(prompt, systemMessage);
  return response.content.split(',').map(skill => skill.trim());
}
```

**Usage:**

```typescript
const relevantSkills = await selectRelevantSkills(
  jobDescription,
  candidateSkills,
  jobTitle
);
```

### 2. Custom Cover Letter Generation

AI creates personalized cover letters that match job requirements and highlight relevant experience.

```typescript
export async function generateCoverLetter(
  jobDescription: string,
  companyDetails: string,
  userExperience: string,
  selectedSkills: string[],
): Promise<string> {
  const systemMessage = `You are a professional cover letter writer. Create a compelling, personalized cover letter that:
- Addresses the specific job requirements
- Highlights relevant experience and selected skills
- Shows enthusiasm for the company
- Is professional yet engaging
- Is between 200-300 words
- Uses a professional tone
- Incorporates the selected skills naturally`;

  const prompt = `Please write a cover letter for the following position:

Job Description:
${jobDescription}

Company Information:
${companyDetails}

My Experience:
${userExperience}

Selected Skills to Highlight:
${selectedSkills.join(', ')}

Please write a professional cover letter that connects my experience and skills to this specific role.`;

  const response = await callOpenAI(prompt, systemMessage);
  return response.content;
}
```

**Usage:**

```typescript
const coverLetter = await generateCoverLetter(
  jobDescription,
  companyDetails,
  userExperience,
  selectedSkills
);
```

### 3. Resume Tailoring

AI customizes resume content to highlight relevant experience for specific positions.

```typescript
export async function tailorResume(
  originalResume: string,
  jobDescription: string,
  jobTitle: string,
  selectedSkills: string[],
): Promise<string> {
  const systemMessage = `You are an expert resume writer. Tailor the provided resume to match the specific job requirements.
- Highlight relevant experience
- Emphasize selected skills
- Adjust language to match job description
- Maintain professional tone
- Keep the same structure but enhance content relevance`;

  const prompt = `Please tailor this resume for the following position:

Job Title: ${jobTitle}

Job Description:
${jobDescription}

Skills to Emphasize:
${selectedSkills.join(', ')}

Original Resume:
${originalResume}

Please provide a tailored version that highlights relevant experience and skills for this specific position.`;

  const response = await callOpenAI(prompt, systemMessage);
  return response.content;
}
```

**Usage:**

```typescript
const tailoredResume = await tailorResume(
  originalResume,
  jobDescription,
  jobTitle,
  selectedSkills
);
```

## AI Workflow Integration

### Complete AI Workflow

```typescript
export async function generateCompleteApplication(
  jobDescription: string,
  companyDetails: string,
  userExperience: string,
  candidateSkills: string[],
  originalResume: string,
  jobTitle: string,
) {
  try {
    // Step 1: Select relevant skills
    const selectedSkills = await selectRelevantSkills(
      jobDescription,
      candidateSkills,
      jobTitle
    );

    // Step 2: Generate cover letter
    const coverLetter = await generateCoverLetter(
      jobDescription,
      companyDetails,
      userExperience,
      selectedSkills
    );

    // Step 3: Tailor resume
    const tailoredResume = await tailorResume(
      originalResume,
      jobDescription,
      jobTitle,
      selectedSkills
    );

    return {
      selectedSkills,
      coverLetter,
      tailoredResume,
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
