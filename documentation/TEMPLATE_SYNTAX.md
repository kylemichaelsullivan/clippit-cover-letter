# Template Syntax Guide

This document explains the template syntax used in Clippit for generating cover letters and resumes.

## Overview

Clippit supports two types of template syntax:

1. **Mustache Variables** (`{{variable}}`) - For dynamic content replacement
2. **ERB Instructions** (`<%=instruction%>`) - For AI prompt instructions

## Mustache Variables

Mustache variables use the `{{variable}}` syntax and are replaced with actual values during document generation.

### Available Variables

| Variable               | Description                    | Example                                                               |
| ---------------------- | ------------------------------ | --------------------------------------------------------------------- |
| `{{Date}}`             | Current date                   | January 15, 2024                                                      |
| `{{My Name}}`          | Candidate full name            | John Doe                                                              |
| `{{My Email}}`         | Candidate email address        | john@example.com                                                      |
| `{{My Phone}}`         | Candidate phone number         | (555) 123-4567                                                        |
| `{{My Location}}`      | Candidate location             | San Francisco, CA                                                     |
| `{{My LinkedIn}}`      | Candidate LinkedIn profile     | linkedin.com/in/johndoe                                               |
| `{{My Portfolio}}`     | Candidate portfolio URL        | portfolio.com                                                         |
| `{{My Skills}}`        | All skills grouped by category | Management: Leadership, Team Building<br>Technical: JavaScript, React |
| `{{Ungrouped Skills}}` | All skills as a flat list      | Leadership, Team Building, JavaScript, React                          |
| `{{Job Company}}`      | Company name                   | Acme Corp                                                             |
| `{{Job Title}}`        | Job title                      | Senior Software Engineer                                              |
| `{{Job Manager}}`      | Hiring manager name            | Jane Smith                                                            |
| `{{Job Address}}`      | Company address                | 123 Main St, San Francisco, CA                                        |
| `{{Job Description}}`  | Job description text           | We are looking for...                                                 |

### Example Usage

```
Dear {{Job Manager}},

I am writing to express my interest in the {{Job Title}} position at {{Job Company}}.

My name is {{My Name}} and I can be reached at {{My Email}} or {{My Phone}}.

I have experience with {{My Skills}} and believe I would be a great fit for this role.

Best regards,
{{My Name}}
```

## ERB Instructions

ERB instructions use the `<%=instruction%>` syntax and provide AI prompt instructions for specific sections of the document. **Whitespace is automatically trimmed**, so both `<%=instruction%>` and `<%= instruction %>` work the same way.

### Available Instructions

| Instruction                | Description                                                     |
| -------------------------- | --------------------------------------------------------------- |
| `<%=Prompt Instructions%>` | AI prompt instructions for the current location in the template |

### Example Usage

```
Dear {{Job Manager}},

<%=Prompt Instructions%>

I am writing to express my interest in the {{Job Title}} position at {{Job Company}}.

My name is {{My Name}} and I can be reached at {{My Email}} or {{My Phone}}.

I have experience with {{My Skills}} and believe I would be a great fit for this role.

Best regards,
{{My Name}}
```

**Note**: Both `<%=Prompt Instructions%>` and `<%= Prompt Instructions %>` work identically - whitespace is automatically trimmed.

## Processing Order

1. **Mustache Variables** are processed first and replaced with actual values
2. **ERB Instructions** are processed second and replaced with AI prompt instructions

This order ensures that any mustache variables within ERB instructions are properly resolved before the AI processes the instructions.

## Custom Variables

You can create custom mustache variables by using any name within `{{}}` syntax. These will be processed by the AI system and replaced with appropriate content.

### Example

```
{{[insert company's slogan in a clever way]}}
{{[mention specific project from their portfolio]}}
{{[reference their company culture]}}
```

## Best Practices

1. **Use mustache variables** for factual information that should be replaced with actual data
2. **Use ERB instructions** for AI-generated content that requires creativity or context
3. **Keep instructions clear and specific** for better AI results
4. **Test your templates** with sample data to ensure proper replacement
5. **Use the template variables modal** to easily copy and paste variables
6. **Whitespace is flexible** - both `<%=instruction%>` and `<%= instruction %>` work the same way

## Template Examples

### Cover Letter Template

```

```

## Troubleshooting

### Common Issues

1. **Variables not replacing**: Ensure the variable name matches exactly (case-sensitive)
2. **Instructions not working**: Check that ERB syntax uses `<%=` and `%>` correctly
3. **AI not generating content**: Verify that ERB instructions are clear and specific
4. **Whitespace in ERB instructions**: Don't worry - whitespace is automatically trimmed

### Debugging

- Use the template variables modal to copy correct syntax
- Test with simple templates first
- Check the browser console for any processing errors
- Verify that all required form data is filled out
- Remember that `<%=instruction%>` and `<%= instruction %>` work identically
