# Authentication and Security Design

**Status:** Security baseline to implement and test.

## 1. Security objective

The portfolio is public, but content management is private. Only the owner-authorized administrator can create, edit, publish or delete content and upload files.

Security must be enforced by the backend. Frontend route guards improve user experience but are not a security boundary.

## 2. Account model

- No public registration.
- One administrator account initially.
- Initial account created through a controlled setup/seed process.
- Administrator email must be unique.
- Account can be disabled.
- Password reset must use a controlled owner-only process; do not add an insecure public reset flow.

## 3. Password handling

- Hash passwords with Argon2id using a maintained library and current recommended parameters.
- Never store plaintext passwords.
- Never log passwords.
- Never return password hashes through an API.
- Require a strong, unique administrator password.
- Do not hard-code credentials in source code or seed files committed to Git.

## 4. Session authentication

Prefer server-side sessions for this single-admin application.

Cookie requirements:
- `HttpOnly`
- `Secure` in production
- Appropriate `SameSite` policy
- Narrow cookie path and domain where practical
- Session ID regenerated after successful login
- Session invalidated on logout
- Idle and absolute expiration policies
- Server-side session storage in production

Do not store session identifiers in localStorage. If frontend and backend are on different origins, configure cookie credentials, CORS and CSRF protection deliberately.

## 5. Authorization

Example access policy:

| Operation | Public visitor | Administrator |
|---|---:|---:|
| View published projects | Yes | Yes |
| View draft projects | No | Yes |
| Create project | No | Yes |
| Edit project | No | Yes |
| Delete project | No | Yes |
| Upload media | No | Yes |
| Manage certificates | No | Yes |
| View contact messages | No | Yes |

Apply authentication and authorization middleware to every admin route. Test direct API requests, not only UI behavior.

## 6. CSRF and CORS

Cookie-based authentication requires CSRF defenses for state-changing requests.

- Use a suitable CSRF protection approach for the selected session setup.
- Validate Origin/Referer where appropriate as defense in depth.
- Do not use wildcard CORS with credentials.
- Allow only the actual frontend origins.
- Use `SameSite` cookies as an additional layer, not as the only defense.

## 7. Request and application security

- Use Helmet or equivalent secure HTTP headers.
- Apply request body size limits.
- Validate all input on the server.
- Use parameterized database queries.
- Escape untrusted output in rendered HTML.
- Avoid unsafe DOM insertion such as assigning untrusted strings to `innerHTML`.
- Rate-limit login and public contact submission.
- Return generic login errors to avoid account enumeration.
- Keep production stack traces and internal errors private.
- Keep dependencies updated and audit them.

## 8. File upload security

- Require administrator authentication.
- Allow only the required image formats and PDF.
- Check extension, declared MIME type and file signature/content.
- Set strict file size and count limits.
- Generate storage keys; do not trust client filenames.
- Reject executable and unexpected file types.
- Store uploads outside executable application directories.
- Use object storage access controls.
- Serve untrusted documents with safe content headers.
- Consider malware scanning where available.
- Prevent path traversal and overwrite attacks.
- Check references before deleting media.

## 9. Secrets and environment

- Keep `.env` out of Git.
- Commit `.env.example` with placeholder names only.
- Use deployment secret management in production.
- Rotate any secret that is accidentally exposed.
- Never place database credentials or storage API secrets in frontend code.

## 10. Logging and monitoring

Log security-relevant events such as successful/failed login, logout, upload failures and administrative changes. Do not log passwords, cookies, session IDs, authorization headers or private document contents.

## 11. Security test checklist

- Unauthenticated requests cannot access admin endpoints.
- Public visitors cannot create, edit, publish or delete content.
- Expired sessions are rejected.
- Logout invalidates the session.
- Session ID changes after login.
- CSRF protection rejects invalid state-changing requests.
- CORS allows only approved origins.
- Login rate limiting works.
- Invalid and oversized uploads are rejected.
- Spoofed MIME types and mismatched file signatures are rejected.
- SQL injection and stored/reflected XSS test inputs are safely handled.
- Private files cannot be fetched by unauthenticated visitors.
- Error responses do not leak stack traces or secrets.
