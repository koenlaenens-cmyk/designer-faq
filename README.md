# Designer FAQ Tool

Interactive FAQ tool for onboarding new designers to the design system.

## Overview

A standalone HTML application that helps designers quickly find answers to common questions about the design system, components, and workflows.

## Quick Start

Simply open the HTML file in your browser:

```bash
open index.html
```

Or use a local server:
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Features

- 🔍 Search functionality
- 📑 Categorized questions
- 🎨 Clean, accessible interface
- 💾 No build process required

## Structure

- `index.html` - Main FAQ application
- `faq-data.json` - FAQ content and data
- `faq-styles.css` - Styling
- `faq-design.png` - Design reference

## Customization

Edit `faq-data.json` to add/update FAQ content:

```json
{
  "categories": [...],
  "questions": [
    {
      "id": 1,
      "category": "Getting Started",
      "question": "How do I access the design system?",
      "answer": "..."
    }
  ]
}
```
