
const csrfMetaTag = document.querySelector('meta[name="csrf-token"]')
const csrfToken = csrfMetaTag?.getAttribute('content') ?? ''

export const fetchHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {})
}