output "pages_url" {
  description = "Cloudflare Pages default URL"
  value       = "https://${cloudflare_pages_project.docs.subdomain}"
}

output "custom_domain_url" {
  description = "Custom domain URL"
  value       = "https://${cloudflare_pages_domain.docs.domain}"
}

output "project_name" {
  description = "Cloudflare Pages project name"
  value       = cloudflare_pages_project.docs.name
}
