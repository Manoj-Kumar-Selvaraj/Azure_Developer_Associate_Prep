# Documentation: Logging in to Azure CLI

To log in to Azure CLI, use the following command:
```bash
az login
```

This will open a browser window for you to authenticate with your Azure account. If you are using a device without a browser, use:

```bash
az login --use-device-code
```

After successful login, you can verify your account with:

```bash
az account show
```

