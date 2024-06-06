# URL Shortener

Welcome to SHRTNR, my URL Shortener project! This application allows you to shorten long URLs, create custom aliases (not yet implemented), and track the performance of your links with detailed analytics.

## Features

- **Shorten URLs**: Quickly convert long URLs into short, manageable links.
- **Custom Aliases**: Create custom short links for easy identification and branding. (not yet implemented)
- **Analytics Tracking**: Monitor the performance of your short links with detailed analytics.
- **User-friendly Interface**: Simple and intuitive interface for creating and managing short URLs.
- **API Access**: Programmatic access to shorten URLs and retrieve analytics data.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [Supabase](https://www.supabase.com/)
- [Next.js](https://nextjs.org/) (v14.x or higher)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://prisma.io/)

## Usage

### Shortening a URL

1. Open the application in your browser.
2. Enter the long URL you want to shorten in the input field.
3. (Optional) Enter a custom alias for your short URL.
4. Click the "Shorten" button.
5. Copy and share the generated short URL.

### Viewing Analytics

(not yet implemented)

1. Open the application in your browser.
2. Navigate to the "Analytics" section.
3. Enter the short URL or alias you want to track.
4. View detailed analytics, including click counts, geographic data, and more.

## API Documentation

(not yet implemented)

The URL Shortener provides an API for programmatic access. The API documentation is available at `http://localhost:3000/api-docs`.

### Example API Usage

- **Shorten a URL**:

  ```bash
  POST /api/shorten
  Content-Type: application/json

  {
      "longUrl": "https://www.example.com",
      "customAlias": "example" // Optional
  }
  ```

- **Get URL Analytics**:

  (not yet implemented)

  ```bash
  GET /api/analytics/:alias
  ```

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for details on the code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all the contributors who have helped make this project better.
- Special thanks to the developers of the libraries and tools used in this project.

---

Feel free to reach out with any questions or feedback!

Happy URL shortening!
