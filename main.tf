# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.96.0"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "personal-app" {
  name     = "rg-personalapp-prod-001"
  location = "southeastasia"
}

resource "azurerm_static_web_app" "web-app" {
  name                = "stapp-personalapp-prod-001"
  resource_group_name = azurerm_resource_group.personal-app.name
  location            = "eastasia"
}

resource "azurerm_dns_cname_record" "web-app-dns-record" {
  name                = "www"
  zone_name           = "jerenslensun.com"
  resource_group_name = "rg-personal-shared-001"
  ttl                 = 300
  record              = azurerm_static_web_app.web-app.default_host_name
}

resource "azurerm_static_web_app_custom_domain" "we-app-custom-domain" {
  static_web_app_id = azurerm_static_web_app.web-app.id
  domain_name       = "${azurerm_dns_cname_record.web-app-dns-record.name}.${azurerm_dns_cname_record.web-app-dns-record.zone_name}"
  validation_type   = "cname-delegation"
}