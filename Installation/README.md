# Azure CLI Installation Guide

This document provides step-by-step instructions to install the Azure Command-Line Interface (Azure CLI) on a Debian-based Linux system.

## Prerequisites

- A Debian-based Linux distribution (e.g., Ubuntu)
- Sudo privileges

## Installation Steps

### 1. Update Package Lists

Before installing new software, update your system's package lists to ensure you get the latest versions and security updates.

```bash
sudo apt-get update
```

### 2. Install Azure CLI

Download and run the official Microsoft installation script to install the Azure CLI.

```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

This command fetches the installation script and executes it with superuser privileges.

### 3. Verify Installation

Check the installed Azure CLI version to confirm a successful installation.

```bash
az --version
```

You should see version information and details about your Azure CLI installation.

## Additional Resources

- [Azure CLI Documentation](https://docs.microsoft.com/cli/azure/install-azure-cli)
- [Troubleshooting Installation](https://docs.microsoft.com/cli/azure/troubleshoot)
