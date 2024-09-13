export const validationSchema = {
  required(value: string) {
    if (value) return true
    return 'This field is required.'
  },
  name(value: string) {
    if (value?.length >= 2) return true
    return 'Name needs to be at least 2 characters.'
  },
  price(value: number) {
    if (value > 0) return true
    return 'Price needs to be greater than 0.'
  },
  description(value: string) {
    if (value?.length >= 10) return true
    return 'Description needs to be at least 15 characters.'
  },
  categoryId(value: number) {
    if (value > 0 || value === null) return true
    return 'Category needs to be selected.'
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
