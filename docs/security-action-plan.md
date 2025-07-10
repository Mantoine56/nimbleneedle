# 🔒 Security Action Plan - Nimble Needle Website

**Last Updated**: December 2024  
**Status**: In Progress  
**Next Review Date**: [Set after completion]

---

## 📋 Quick Overview

- **Critical Issues**: 1
- **High Priority**: 0  
- **Medium Priority**: 5
- **Low Priority**: 1
- **General Improvements**: 5

---

## 🚨 CRITICAL PRIORITY (Fix Immediately)

### 1. XSS Vulnerability in Blog Posts
**Risk Level**: 🔴 CRITICAL  
**Location**: `app/blog/[slug]/page.tsx` line 240  
**Impact**: Remote code execution in user browsers

- [ ] **Install DOMPurify for HTML sanitization**
  ```bash
  npm install dompurify @types/dompurify isomorphic-dompurify
  ```

- [ ] **Update blog post rendering with sanitization**
  - [ ] Import DOMPurify in `app/blog/[slug]/page.tsx`
  - [ ] Replace `dangerouslySetInnerHTML` with sanitized version
  - [ ] Test with potentially malicious HTML content
  
- [ ] **Code Implementation**:
  ```typescript
  import DOMPurify from 'isomorphic-dompurify';
  
  // Replace line 240:
  const sanitizedContent = DOMPurify.sanitize(post.content);
  <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
  ```

- [ ] **Verify fix with testing**
  - [ ] Test with `<script>alert('xss')</script>` in blog content
  - [ ] Ensure legitimate HTML tags still work
  - [ ] Check all blog posts render correctly

---

## 🟡 HIGH/MEDIUM PRIORITY

### 2. Add Security Headers
**Risk Level**: 🟡 MEDIUM  
**Location**: `next.config.js`  
**Impact**: Prevents clickjacking, XSS, MITM attacks

- [ ] **Configure security headers in Next.js**
  - [ ] Update `next.config.js` with headers configuration
  - [ ] Test headers are properly set using browser dev tools
  - [ ] Verify Google Fonts and Cal.com still work

- [ ] **Implementation**:
  ```javascript
  // Add to next.config.js
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  }
  ```

- [ ] **Content Security Policy (CSP)**
  - [ ] Draft initial CSP policy
  - [ ] Test CSP doesn't break existing functionality
  - [ ] Gradually tighten CSP restrictions
  - [ ] Document any CSP violations and fixes needed

### 3. API Rate Limiting
**Risk Level**: 🟡 MEDIUM  
**Location**: `app/api/reviews/route.js`  
**Impact**: API abuse prevention, quota protection

- [ ] **Install rate limiting library**
  ```bash
  npm install @upstash/ratelimit @upstash/redis
  # OR use a simpler in-memory solution for development
  ```

- [ ] **Implement rate limiting middleware**
  - [ ] Create `middleware.ts` file in project root
  - [ ] Add rate limiting logic for `/api/*` routes
  - [ ] Test rate limiting with multiple rapid requests
  - [ ] Configure appropriate limits (suggestions: 10 requests/minute for reviews API)

- [ ] **Alternative: Simple in-memory rate limiting**
  ```typescript
  // middleware.ts
  import { NextResponse } from 'next/server';
  import type { NextRequest } from 'next/server';
  
  const rateLimit = new Map();
  
  export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
      const now = Date.now();
      const windowMs = 60 * 1000; // 1 minute
      const maxRequests = 10;
  
      const requestData = rateLimit.get(ip) || { count: 0, resetTime: now + windowMs };
      
      if (now > requestData.resetTime) {
        requestData.count = 0;
        requestData.resetTime = now + windowMs;
      }
  
      if (requestData.count >= maxRequests) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      }
  
      requestData.count++;
      rateLimit.set(ip, requestData);
    }
  }
  ```

### 4. Form Validation & Sanitization
**Risk Level**: 🟡 MEDIUM  
**Location**: `app/contact-us/page.tsx`  
**Impact**: Prevents form spam, injection attacks

- [ ] **Install validation library (Zod is already installed)**
  - [ ] Verify Zod is in dependencies: `npm list zod`

- [ ] **Add server-side validation schema**
  ```typescript
  import { z } from 'zod';
  
  const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number").optional().or(z.literal("")),
    service: z.string().max(100).optional(),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000),
  });
  ```

- [ ] **Update form submission handling**
  - [ ] Add validation before form submission
  - [ ] Display user-friendly error messages
  - [ ] Sanitize all form inputs before processing
  - [ ] Add CSRF protection if implementing server-side submission

- [ ] **Implementation checklist**:
  - [ ] Add validation to `handleSubmit` function
  - [ ] Test form with invalid inputs
  - [ ] Test form with valid inputs
  - [ ] Add loading states and error handling
  - [ ] Test form on mobile devices

### 5. Environment Variable Security
**Risk Level**: 🟡 MEDIUM  
**Location**: Various files  
**Impact**: Prevents misconfigurations, data exposure

- [ ] **Create environment variable validation**
  - [ ] Create `lib/env.ts` file for environment validation
  - [ ] Validate all required environment variables on startup
  - [ ] Add proper TypeScript types for environment variables

- [ ] **Implementation**:
  ```typescript
  // lib/env.ts
  import { z } from 'zod';
  
  const envSchema = z.object({
    GOOGLE_PLACES_API_KEY: z.string().min(1, "Google Places API key is required"),
    GOOGLE_PLACE_ID: z.string().min(1, "Google Place ID is required"),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
  });
  
  export const env = envSchema.parse(process.env);
  ```

- [ ] **Update API routes to use validated environment variables**
  - [ ] Replace direct `process.env` access with validated `env` object
  - [ ] Test with missing environment variables
  - [ ] Ensure proper error messages for misconfiguration

### 6. Improve Error Handling
**Risk Level**: 🟡 MEDIUM  
**Location**: `app/api/reviews/route.js`  
**Impact**: Prevents information disclosure

- [ ] **Update error responses to be generic**
  - [ ] Remove detailed error messages from API responses
  - [ ] Log detailed errors server-side only
  - [ ] Return appropriate HTTP status codes

- [ ] **Implementation**:
  ```javascript
  catch (error) {
    console.error('Google Reviews API Error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
    
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503 }
    );
  }
  ```

---

## 🔵 LOW PRIORITY

### 7. Enhanced Logging & Monitoring
**Risk Level**: 🔵 LOW  
**Impact**: Better security incident detection

- [ ] **Implement structured logging**
  - [ ] Install logging library (winston, pino, or similar)
  - [ ] Add request logging for API endpoints
  - [ ] Log security-relevant events (failed authentications, rate limit hits)

- [ ] **Add monitoring alerts**
  - [ ] Set up error tracking (Sentry, LogRocket, etc.)
  - [ ] Configure alerts for unusual traffic patterns
  - [ ] Monitor API quota usage for Google Places API

---

## 🛠️ GENERAL SECURITY IMPROVEMENTS

### 8. Dependency Security
- [ ] **Set up automated dependency scanning**
  ```bash
  # Run npm audit
  npm audit
  
  # Fix automatically fixable vulnerabilities
  npm audit fix
  ```

- [ ] **Schedule regular dependency updates**
  - [ ] Set monthly reminder to check for updates
  - [ ] Test updates in development before deploying
  - [ ] Keep security-critical dependencies up to date

### 9. Content Security Policy (Advanced)
- [ ] **Implement comprehensive CSP**
  - [ ] Start with report-only mode to identify violations
  - [ ] Gradually tighten policy restrictions
  - [ ] Whitelist only necessary external domains

- [ ] **CSP Implementation**:
  ```javascript
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; " +
           "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://app.cal.com; " +
           "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
           "font-src 'self' https://fonts.gstatic.com; " +
           "img-src 'self' data: https:; " +
           "connect-src 'self' https://maps.googleapis.com https://www.google-analytics.com; " +
           "frame-src https://app.cal.com https://maps.google.com; " +
           "object-src 'none'; " +
           "base-uri 'self';",
  }
  ```

### 10. Security Testing
- [ ] **Set up security testing workflow**
  - [ ] Install security testing tools (npm audit, snyk, etc.)
  - [ ] Create security testing checklist
  - [ ] Add security tests to CI/CD pipeline

### 11. Documentation & Training
- [ ] **Create security documentation**
  - [ ] Document security procedures for team
  - [ ] Create incident response plan
  - [ ] Document environment setup security requirements

### 12. Production Deployment Security
- [ ] **Verify HTTPS configuration**
  - [ ] Ensure SSL/TLS certificates are properly configured
  - [ ] Test HTTPS redirects work correctly
  - [ ] Verify HSTS headers are set

- [ ] **Review hosting security**
  - [ ] Ensure hosting platform security best practices
  - [ ] Configure firewall rules if applicable
  - [ ] Set up monitoring and alerting

---

## 📝 Testing Checklist

After implementing fixes, verify:

- [ ] **XSS Protection Testing**
  - [ ] Test blog posts with malicious HTML
  - [ ] Verify legitimate HTML still renders
  - [ ] Test all pages for XSS vulnerabilities

- [ ] **Security Headers Testing**
  - [ ] Use online tools to test security headers (securityheaders.com)
  - [ ] Verify headers don't break functionality
  - [ ] Test on multiple browsers

- [ ] **Rate Limiting Testing**
  - [ ] Test API endpoints with rapid requests
  - [ ] Verify rate limiting works as expected
  - [ ] Test rate limit reset functionality

- [ ] **Form Security Testing**
  - [ ] Test contact form with various inputs
  - [ ] Verify validation works client and server-side
  - [ ] Test form submission limits

---

## 📊 Progress Tracking

**Overall Progress**: ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜ 0/10 complete

### Critical Issues
- [ ] XSS Vulnerability Fix (0/4 steps)

### Medium Priority  
- [ ] Security Headers (0/3 steps)
- [ ] Rate Limiting (0/3 steps)  
- [ ] Form Validation (0/4 steps)
- [ ] Environment Variables (0/3 steps)
- [ ] Error Handling (0/1 steps)

### Low Priority
- [ ] Enhanced Logging (0/2 steps)

### General Improvements
- [ ] Dependency Security (0/2 steps)
- [ ] CSP Implementation (0/2 steps)
- [ ] Security Testing (0/3 steps)
- [ ] Documentation (0/3 steps)
- [ ] Production Security (0/3 steps)

---

## 🎯 Next Steps

1. **Start with Critical Issues**: Fix XSS vulnerability immediately
2. **Implement Medium Priority**: Focus on security headers and rate limiting
3. **Test Everything**: Ensure fixes don't break existing functionality  
4. **Schedule Regular Reviews**: Set up quarterly security audits

---

## 📞 Support & Resources

- **Security Questions**: Document any questions during implementation
- **Testing Tools**: 
  - [Security Headers Test](https://securityheaders.com/)
  - [Mozilla Observatory](https://observatory.mozilla.org/)
  - [OWASP ZAP](https://www.zaproxy.org/)

---

**Note**: Update this document as you complete each item. Mark completion dates for tracking and future reference. 