# Provider Handbook
## for the English Access Microscholarship Program
This web application aims to help new and experienced providers plan and manage a program. It assumes that providers
- need to return to the handbook often to answer specific questions
- are at least as likely to consult the handbook on a mobile device as a laptop/desktop computer
- are sensitive to how densely the text is presented

## Technology
The application relies upon [Svelte JS](https://svelte.dev) to provide both a positive developer experience and quick performance. Page routing (hash-based) is handled by [Tinro](https://github.com/AlexxNB/tinro).

Text content is served via a static JSON file to simulate the possibility of dynamic content in the future. SVG images are used to the extent possible in order to keep assets minimal.