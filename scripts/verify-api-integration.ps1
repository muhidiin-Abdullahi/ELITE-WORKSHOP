# ELITE WORKSHOP LTD — manual API integration checks (development)
# Usage: ensure server is running with MONGODB_URI configured, then:
#   powershell -File scripts/verify-api-integration.ps1

$Base = if ($env:API_BASE_URL) { $env:API_BASE_URL } else { "http://localhost:5010/api/v1" }

Write-Host "Testing health at $Base/health"
$health = Invoke-RestMethod -Uri "$Base/health" -Method Get
if (-not $health.success) { throw "Health check failed" }

$contactBody = @{
  fullName = "QA Integration Test"
  email = "qa-integration@example.test"
  message = "Automated integration verification message from Phase 8."
  website = ""
} | ConvertTo-Json

Write-Host "Testing contact POST"
$contact = Invoke-RestMethod -Uri "$Base/contact" -Method Post -ContentType "application/json" -Body $contactBody
if (-not $contact.success) { throw "Contact submission failed" }

$quoteBody = @{
  fullName = "QA Quote Test"
  phone = "1234567890"
  serviceCategory = "decorated-furniture"
  projectDescription = "Integration test quotation inquiry with sufficient description length."
  website = ""
} | ConvertTo-Json

Write-Host "Testing quote POST"
$quote = Invoke-RestMethod -Uri "$Base/quotes" -Method Post -ContentType "application/json" -Body $quoteBody
if (-not $quote.success) { throw "Quote submission failed" }

Write-Host "Invalid contact (expect HTTP error)"
try {
  Invoke-WebRequest -Uri "$Base/contact" -Method Post -ContentType "application/json" -Body '{"fullName":"x","message":"short","website":""}' -SkipHttpErrorCheck | Out-Null
} catch {
  Write-Host "Invalid payload rejected as expected."
}

Write-Host "Integration API checks completed successfully."
