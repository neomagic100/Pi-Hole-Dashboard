# Pi-Hole Dashboard

A mobile-friendly dashboard built with **Vue.js** for managing and monitoring your **Pi-hole** network-wide ad blocker. It provides an intuitive user experience with real-time updates and a sleek design.

![screenshot_long](https://github.com/user-attachments/assets/eddfa2cf-da64-4851-b1cf-3df32333c627)

## 🚀 Features

- **Real-Time Statistics**: View live stats for blocked ads, DNS queries, and more.
- **Mobile Optimization**: Fully responsive design for seamless use on mobile devices.
- **WebSocket Integration**: Get real-time data updates without needing to refresh the page.
- **Customizable UI**: Modify and personalize the interface to fit your needs.

## ⚠️ Warning

Warning: This Application is Not Secure

Please be aware that this app is not secure and should not be used in any production environment or exposed to the public internet. It is intended for personal or development use only. Do not rely on it for any sensitive data or in any environment where security is critical. Users are encouraged to implement proper security measures before considering it for broader usage.

## 🛠️ Installation

### Prerequisites

- Docker and compose installed on your system.
- Access to your Pi-hole API token (required for data fetching).

### Steps

1. **Clone the repository**:

   ```bash
   git clone -b dev https://github.com/neomagic100/Pi-Hole-Dashboard.git
   cd Pi-Hole-Dashboard
   ```

2. **Edit Environment Variables**:

   - Add your Pi-Hole IPs and API Keys in the format currently in the file _websockets/.env_

3. **Run Docker (compose)**:

   ```bash
   docker compose up -d [middleware frontend]
   ```

4. **Access the dashboard**:
   Open your browser and navigate to `http://localhost:8008` (or the port specified).

## ⚙️ Usage

- **Dashboard Overview**: Get a quick view of the Pi-hole's activity, including blocked domains, DNS queries, and network performance.
- **WebSocket**: Real-time updates on the dashboard with WebSocket integration.
- **Custom Configuration**: Update configuration settings in the `.env` file for your Pi-hole instance.

## 👨‍💻 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. Commit your changes:
   ```bash
   git commit -S -m "Add some feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/my-new-feature
   ```
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📧 Support

For issues or suggestions, open an [issue](https://github.com/neomagic100/Pi-Hole-Dashboard/issues) or contact me directly.

Feel free to let me know if any further adjustments are needed!
