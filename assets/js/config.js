/*
  EDIT THIS SECTION FOR EACH CONTRACTOR PREVIEW
  Change these values before sending the preview link.
*/
window.PREVIEW_CONFIG = {
  clientCompanyName: "Apex Ridge Construction",
  primaryService: "Kitchen Remodeling",
  serviceType: "remodeling and construction",
  city: "Rocklin",
  phone: "(916) 555-0142",
  email: "hello@apexridgeconstruction.com",
  yearsExperience: "18+",
  licenseNumber: "CA License #1094827",
  insuranceStatus: "Fully insured",
  projectsCompleted: "240+",
  reviewRating: "4.9",
  topServices: "kitchen remodels, additions, ADUs, bathrooms, and commercial tenant improvements"
};

(function applyPreviewConfig() {
  const cfg = window.PREVIEW_CONFIG;
  const tokens = {
    "Apex Ridge Construction": cfg.clientCompanyName,
    "Kitchen Remodeling": cfg.primaryService,
    "remodeling and construction": cfg.serviceType,
    "Rocklin": cfg.city,
    "(916) 555-0142": cfg.phone,
    "hello@apexridgeconstruction.com": cfg.email,
    "18+": cfg.yearsExperience,
    "CA License #1094827": cfg.licenseNumber,
    "Fully insured": cfg.insuranceStatus,
    "240+": cfg.projectsCompleted,
    "4.9": cfg.reviewRating,
    "kitchen remodels, additions, ADUs, bathrooms, and commercial tenant improvements": cfg.topServices,
    "[CLIENT COMPANY NAME]": cfg.clientCompanyName,
    "[PRIMARY SERVICE]": cfg.primaryService,
    "[SERVICE TYPE]": cfg.serviceType,
    "[CITY]": cfg.city,
    "[PHONE]": cfg.phone,
    "[EMAIL]": cfg.email,
    "[YEARS EXPERIENCE]": cfg.yearsExperience,
    "[LICENSE NUMBER]": cfg.licenseNumber,
    "[INSURANCE STATUS]": cfg.insuranceStatus,
    "[PROJECTS COMPLETED]": cfg.projectsCompleted,
    "[REVIEW RATING]": cfg.reviewRating,
    "[TOP SERVICES]": cfg.topServices
  };

  function replaceTokens(value) {
    if (!value) return value;
    return Object.entries(tokens).reduce((text, [token, replacement]) => {
      return text.split(token).join(replacement);
    }, value);
  }

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.nodeValue = replaceTokens(node.nodeValue);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "STYLE"].includes(node.tagName)) return;
    ["value", "placeholder", "alt", "title", "aria-label", "content", "href"].forEach((attr) => {
      if (node.hasAttribute(attr)) {
        node.setAttribute(attr, replaceTokens(node.getAttribute(attr)));
      }
    });
    Array.from(node.childNodes).forEach(walk);
  }

  function updateLinks() {
    document.querySelectorAll("[data-phone-link]").forEach((link) => {
      link.textContent = cfg.phone;
      link.href = `tel:${cfg.phone.replace(/[^\d+]/g, "")}`;
    });
    document.querySelectorAll("[data-email-link]").forEach((link) => {
      link.textContent = cfg.email;
      link.href = `mailto:${cfg.email}`;
    });
    document.querySelectorAll("[data-company-mark]").forEach((mark) => {
      const initials = cfg.clientCompanyName
        .replace(/[\[\]]/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
      mark.textContent = initials || "CC";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    walk(document.body);
    document.title = replaceTokens(document.title);
    document.querySelectorAll("meta[content]").forEach((meta) => {
      meta.setAttribute("content", replaceTokens(meta.getAttribute("content")));
    });
    updateLinks();
  });
})();
