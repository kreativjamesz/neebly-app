export const validationSchema = {
  name(value: string) {
    if (value?.length >= 2) return true
    return 'Name needs to be at least 2 characters.'
  },
  phone(value: string) {
    if (/^[0-9-]{7,}$/.test(value)) return true
    return 'Phone number needs to be at least 7 digits.'
  },
  email(value: string) {
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
    return 'Must be a valid e-mail.'
  },
  select(value: any) {
    if (value) return true
    return 'Select an item.'
  },
  checkbox(value: string) {
    if (value === '1') return true
    return 'Must be checked.'
  },
}
