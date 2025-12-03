# Cloudflare Pages project for documentation site
# Using direct upload mode - deployments handled via Wrangler in CI/CD
resource "cloudflare_pages_project" "docs" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = "main"
}

# Custom domain for the Pages project
resource "cloudflare_pages_domain" "docs" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.docs.name
  domain       = "docs.centy.io"
}

# CNAME record pointing to the Pages project
resource "cloudflare_record" "docs" {
  zone_id = var.cloudflare_zone_id
  name    = "docs"
  type    = "CNAME"
  content = cloudflare_pages_project.docs.subdomain
  proxied = true
  ttl     = 1 # Auto TTL when proxied
}
