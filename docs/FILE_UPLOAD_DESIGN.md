# File Upload and Media Management Design

**Status:** Proposed design; provider and limits to be selected before implementation.

## 1. Purpose

Provide one reusable media system for project screenshots, profile images, certificate images, certificate PDFs and other approved portfolio attachments.

## 2. Supported formats

Initial allowlist:

| Type | Extensions | Typical use |
|---|---|---|
| Image | `.jpg`, `.jpeg`, `.png`, `.webp` | Project images, profile images, certificate images |
| Document | `.pdf` | Certificates and approved project documents |

Do not accept arbitrary file types. SVG is excluded initially because it can contain active content.

## 3. Storage approach

- Development: local storage outside the public executable source tree may be used temporarily.
- Production: object storage such as Cloudinary or Supabase Storage, selected after reviewing pricing, privacy, access control and deployment needs.
- PostgreSQL stores metadata and references, not the file bytes.
- Never commit uploaded user files or production credentials to Git.

## 4. Upload flow

1. Admin selects a file in the dashboard.
2. Frontend checks basic size/type for user feedback.
3. Backend verifies the administrator session and CSRF protection.
4. Backend checks size, extension, MIME type and file signature.
5. Backend generates a unique storage key.
6. File is stored in the configured storage provider.
7. Metadata is saved in the database.
8. Backend returns safe metadata to the admin frontend.
9. Admin attaches the media record to a project, certificate or profile.

The backend is authoritative; frontend checks do not replace server validation.

## 5. Media metadata

Store:
- Media ID
- Original filename for display only
- Generated storage key
- MIME type
- File size
- Image width/height where relevant
- Visibility: public or private
- Upload timestamp
- Storage provider identifier
- Optional checksum

Do not store provider secrets in metadata.

## 6. Attachment rules

- Projects can have multiple images.
- One image can be designated as the cover.
- Certificates can have one primary attachment initially, with room for additional attachments later.
- Profile can reference a profile image and CV.
- A media record may be reused; deletion must check all references.
- Replacing an attachment should not delete the old media until the replacement succeeds and references are updated.

## 7. Public and private access

Public images and published certificate documents may be delivered publicly when the owner chooses to publish them.

Private documents must:
- Be stored in private storage.
- Require an authenticated access check or short-lived signed URL.
- Never be exposed through a permanent public URL.
- Not be returned by public APIs.

The owner must explicitly decide whether a certificate/document is public before publishing it.

## 8. Initial operational limits

Choose concrete values during implementation based on provider limits and expected use. Enforce:
- Maximum file size
- Maximum files per request
- Maximum total request size
- Maximum image dimensions if needed
- Allowed formats only

Return clear errors for too-large and unsupported files.

## 9. Deletion and cleanup

- Check whether a media record is referenced before deletion.
- Prefer soft deletion or a pending-delete state where recovery is useful.
- Delete from storage only after database references are safely removed.
- Handle storage/database partial failures and provide a retryable cleanup process.
- Never cascade-delete shared media unintentionally.

## 10. Testing

Test valid image and PDF uploads, invalid extensions, MIME spoofing, signature mismatch, oversized files, unauthenticated uploads, duplicate filenames, storage provider failures, replacement behavior, private access and referenced-file deletion.
